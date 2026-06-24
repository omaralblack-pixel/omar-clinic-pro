"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(tenantId, branchId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const branchFilter = branchId ? { branchId } : {};
        const [todayAppointments, todayRevenue, monthlyRevenue, activePatients, newPatientsThisMonth, pendingPayments, lowStockProducts, todayAttendance,] = await Promise.all([
            this.prisma.appointment.count({
                where: {
                    branch: { tenantId },
                    ...branchFilter,
                    scheduledAt: { gte: today, lt: tomorrow },
                    status: { notIn: [client_1.AppointmentStatus.CANCELLED, client_1.AppointmentStatus.NO_SHOW] },
                },
            }),
            this.prisma.payment.aggregate({
                where: {
                    paidAt: { gte: today, lt: tomorrow },
                    invoice: { tenantId, ...branchFilter },
                },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: {
                    paidAt: { gte: monthStart },
                    invoice: { tenantId, ...branchFilter },
                },
                _sum: { amount: true },
            }),
            this.prisma.patient.count({
                where: { tenantId, isActive: true, ...branchFilter },
            }),
            this.prisma.patient.count({
                where: { tenantId, createdAt: { gte: monthStart }, ...branchFilter },
            }),
            this.prisma.invoice.count({
                where: {
                    tenantId,
                    ...branchFilter,
                    status: { in: [client_1.InvoiceStatus.PENDING, client_1.InvoiceStatus.PARTIALLY_PAID] },
                },
            }),
            (async () => {
                const products = await this.prisma.product.findMany({
                    where: { tenantId, ...branchFilter, isActive: true },
                    select: { quantity: true, minStock: true },
                });
                return products.filter((p) => p.quantity <= p.minStock).length;
            })(),
            this.prisma.attendanceRecord.count({
                where: {
                    branch: { tenantId },
                    ...branchFilter,
                    date: today,
                    status: 'PRESENT',
                },
            }),
        ]);
        return {
            widgets: {
                todayRevenue: Number(todayRevenue._sum.amount ?? 0),
                todayAppointments,
                monthlyRevenue: Number(monthlyRevenue._sum.amount ?? 0),
                activePatients,
                newPatients: newPatientsThisMonth,
                pendingPayments,
                inventoryAlerts: lowStockProducts,
                staffAttendance: todayAttendance,
            },
        };
    }
    async getCharts(tenantId, branchId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const branchFilter = branchId ? { branchId } : {};
        const payments = await this.prisma.payment.findMany({
            where: {
                paidAt: { gte: startDate },
                invoice: { tenantId, ...branchFilter },
            },
            select: { amount: true, paidAt: true },
        });
        const appointments = await this.prisma.appointment.findMany({
            where: {
                branch: { tenantId },
                ...branchFilter,
                scheduledAt: { gte: startDate },
            },
            select: { scheduledAt: true, status: true },
        });
        const revenueByDay = this.groupByDay(payments, (p) => p.paidAt, (p) => Number(p.amount));
        const appointmentsByDay = this.groupByDay(appointments, (a) => a.scheduledAt, () => 1);
        return {
            revenueTrend: revenueByDay,
            appointmentTrend: appointmentsByDay,
        };
    }
    groupByDay(items, dateFn, valueFn) {
        const map = new Map();
        for (const item of items) {
            const key = dateFn(item).toISOString().split('T')[0];
            map.set(key, (map.get(key) ?? 0) + valueFn(item));
        }
        return Array.from(map.entries())
            .map(([date, value]) => ({ date, value }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map