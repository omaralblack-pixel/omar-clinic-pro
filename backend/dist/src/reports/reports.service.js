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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    dateRange(from, to) {
        const range = {};
        if (from)
            range.gte = new Date(from);
        if (to)
            range.lte = new Date(to);
        return Object.keys(range).length ? range : undefined;
    }
    async getRevenueReport(tenantId, filters) {
        const dateFilter = this.dateRange(filters.from, filters.to);
        const branchFilter = filters.branchId ? { branchId: filters.branchId } : {};
        const [invoices, payments, byMethod] = await Promise.all([
            this.prisma.invoice.aggregate({
                where: { tenantId, ...branchFilter, ...(dateFilter && { issuedAt: dateFilter }) },
                _sum: { total: true, discount: true, tax: true },
                _count: true,
            }),
            this.prisma.payment.aggregate({
                where: {
                    ...(dateFilter && { paidAt: dateFilter }),
                    invoice: { tenantId, ...branchFilter },
                },
                _sum: { amount: true },
                _count: true,
            }),
            this.prisma.payment.groupBy({
                by: ['method'],
                where: {
                    ...(dateFilter && { paidAt: dateFilter }),
                    invoice: { tenantId, ...branchFilter },
                },
                _sum: { amount: true },
                _count: true,
            }),
        ]);
        return {
            format: 'json',
            note: 'PDF and Excel export planned for a future release',
            period: { from: filters.from, to: filters.to },
            branchId: filters.branchId,
            summary: {
                invoiceCount: invoices._count,
                totalInvoiced: Number(invoices._sum.total ?? 0),
                totalDiscount: Number(invoices._sum.discount ?? 0),
                totalTax: Number(invoices._sum.tax ?? 0),
                totalCollected: Number(payments._sum.amount ?? 0),
                paymentCount: payments._count,
            },
            byPaymentMethod: byMethod.map((m) => ({
                method: m.method,
                amount: Number(m._sum.amount ?? 0),
                count: m._count,
            })),
        };
    }
    async getAppointmentsReport(tenantId, filters) {
        const dateFilter = this.dateRange(filters.from, filters.to);
        const where = {
            tenantId,
            ...(filters.branchId && { branchId: filters.branchId }),
            ...(dateFilter && { scheduledAt: dateFilter }),
        };
        const [total, byStatus, byBranch] = await Promise.all([
            this.prisma.appointment.count({ where }),
            this.prisma.appointment.groupBy({
                by: ['status'],
                where,
                _count: true,
            }),
            this.prisma.appointment.groupBy({
                by: ['branchId'],
                where,
                _count: true,
            }),
        ]);
        const branches = await this.prisma.branch.findMany({
            where: { tenantId },
            select: { id: true, name: true },
        });
        const branchMap = Object.fromEntries(branches.map((b) => [b.id, b.name]));
        return {
            format: 'json',
            note: 'PDF and Excel export planned for a future release',
            period: { from: filters.from, to: filters.to },
            total,
            byStatus: byStatus.map((s) => ({
                status: s.status,
                count: s._count,
            })),
            byBranch: byBranch.map((b) => ({
                branchId: b.branchId,
                branchName: branchMap[b.branchId] ?? b.branchId,
                count: b._count,
            })),
            completionRate: total > 0
                ? ((byStatus.find((s) => s.status === client_1.AppointmentStatus.COMPLETED)?._count ?? 0) /
                    total).toFixed(2)
                : '0.00',
        };
    }
    async getPatientsReport(tenantId, filters) {
        const dateFilter = this.dateRange(filters.from, filters.to);
        const where = {
            tenantId,
            ...(filters.branchId && { branchId: filters.branchId }),
            ...(dateFilter && { createdAt: dateFilter }),
        };
        const [total, byGender, byBranch, activeCount] = await Promise.all([
            this.prisma.patient.count({ where }),
            this.prisma.patient.groupBy({
                by: ['gender'],
                where,
                _count: true,
            }),
            this.prisma.patient.groupBy({
                by: ['branchId'],
                where,
                _count: true,
            }),
            this.prisma.patient.count({ where: { ...where, isActive: true } }),
        ]);
        const branches = await this.prisma.branch.findMany({
            where: { tenantId },
            select: { id: true, name: true },
        });
        const branchMap = Object.fromEntries(branches.map((b) => [b.id, b.name]));
        return {
            format: 'json',
            note: 'PDF and Excel export planned for a future release',
            period: { from: filters.from, to: filters.to },
            total,
            active: activeCount,
            inactive: total - activeCount,
            byGender: byGender.map((g) => ({ gender: g.gender, count: g._count })),
            byBranch: byBranch.map((b) => ({
                branchId: b.branchId,
                branchName: branchMap[b.branchId] ?? b.branchId,
                count: b._count,
            })),
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map