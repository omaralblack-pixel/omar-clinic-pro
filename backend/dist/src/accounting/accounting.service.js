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
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AccountingService = class AccountingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findCashboxes(branchId) {
        return this.prisma.cashbox.findMany({
            where: { ...(branchId && { branchId }), isActive: true },
            include: { branch: { select: { name: true } } },
        });
    }
    async createCashbox(dto) {
        return this.prisma.cashbox.create({
            data: {
                branchId: dto.branchId,
                name: dto.name,
                currency: dto.currency ?? 'JOD',
            },
        });
    }
    async addCashboxTransaction(cashboxId, dto) {
        const cashbox = await this.prisma.cashbox.findUnique({ where: { id: cashboxId } });
        if (!cashbox)
            throw new common_1.NotFoundException('Cashbox not found');
        const delta = dto.type === client_1.CashboxTransactionType.EXPENSE ||
            dto.type === client_1.CashboxTransactionType.TRANSFER
            ? -dto.amount
            : dto.amount;
        const [transaction] = await this.prisma.$transaction([
            this.prisma.cashboxTransaction.create({
                data: { cashboxId, ...dto },
            }),
            this.prisma.cashbox.update({
                where: { id: cashboxId },
                data: { balance: { increment: delta } },
            }),
        ]);
        return transaction;
    }
    async getCashboxTransactions(cashboxId) {
        return this.prisma.cashboxTransaction.findMany({
            where: { cashboxId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createIncome(dto) {
        return this.prisma.incomeRecord.create({
            data: {
                branchId: dto.branchId,
                category: dto.category,
                amount: dto.amount,
                description: dto.description,
                reference: dto.reference,
                recordedAt: dto.recordedAt ? new Date(dto.recordedAt) : undefined,
            },
        });
    }
    async findIncome(branchId, from, to) {
        return this.prisma.incomeRecord.findMany({
            where: {
                ...(branchId && { branchId }),
                ...(from &&
                    to && {
                    recordedAt: { gte: new Date(from), lte: new Date(to) },
                }),
            },
            orderBy: { recordedAt: 'desc' },
        });
    }
    async createExpense(dto) {
        return this.prisma.expenseRecord.create({
            data: {
                branchId: dto.branchId,
                category: dto.category,
                amount: dto.amount,
                description: dto.description,
                reference: dto.reference,
                recordedAt: dto.recordedAt ? new Date(dto.recordedAt) : undefined,
            },
        });
    }
    async findExpenses(branchId, from, to) {
        return this.prisma.expenseRecord.findMany({
            where: {
                ...(branchId && { branchId }),
                ...(from &&
                    to && {
                    recordedAt: { gte: new Date(from), lte: new Date(to) },
                }),
            },
            orderBy: { recordedAt: 'desc' },
        });
    }
    async getDailyReport(branchId, date) {
        const start = new Date(date);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        const dateFilter = { gte: start, lt: end };
        const branchFilter = branchId ? { branchId } : {};
        const [income, expenses, payments] = await Promise.all([
            this.prisma.incomeRecord.aggregate({
                where: { ...branchFilter, recordedAt: dateFilter },
                _sum: { amount: true },
            }),
            this.prisma.expenseRecord.aggregate({
                where: { ...branchFilter, recordedAt: dateFilter },
                _sum: { amount: true },
            }),
            this.prisma.payment.findMany({
                where: {
                    paidAt: dateFilter,
                    invoice: branchId ? { branchId } : {},
                },
                include: { invoice: { select: { invoiceNumber: true } } },
            }),
        ]);
        const totalIncome = Number(income._sum.amount ?? 0);
        const totalExpenses = Number(expenses._sum.amount ?? 0);
        const salesRevenue = payments.reduce((s, p) => s + Number(p.amount), 0);
        return {
            date,
            branchId,
            income: totalIncome,
            expenses: totalExpenses,
            salesRevenue,
            net: totalIncome + salesRevenue - totalExpenses,
            payments,
        };
    }
    async getMonthlyReport(branchId, year, month) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);
        const dateFilter = { gte: start, lt: end };
        const branchFilter = branchId ? { branchId } : {};
        const [income, expenses, paymentSum] = await Promise.all([
            this.prisma.incomeRecord.aggregate({
                where: { ...branchFilter, recordedAt: dateFilter },
                _sum: { amount: true },
            }),
            this.prisma.expenseRecord.aggregate({
                where: { ...branchFilter, recordedAt: dateFilter },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: {
                    paidAt: dateFilter,
                    invoice: branchId ? { branchId } : {},
                },
                _sum: { amount: true },
            }),
        ]);
        const totalIncome = Number(income._sum.amount ?? 0);
        const totalExpenses = Number(expenses._sum.amount ?? 0);
        const salesRevenue = Number(paymentSum._sum.amount ?? 0);
        return {
            year,
            month,
            branchId,
            income: totalIncome,
            expenses: totalExpenses,
            salesRevenue,
            net: totalIncome + salesRevenue - totalExpenses,
        };
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map