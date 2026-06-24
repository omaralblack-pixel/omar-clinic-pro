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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SalesService = class SalesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllInvoices(tenantId, branchId, status, page = 1, limit = 20) {
        const where = {
            tenantId,
            ...(branchId && { branchId }),
            ...(status && { status }),
        };
        const [data, total] = await Promise.all([
            this.prisma.invoice.findMany({
                where,
                include: {
                    patient: { select: { firstName: true, lastName: true, patientNumber: true } },
                    items: true,
                    payments: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { issuedAt: 'desc' },
            }),
            this.prisma.invoice.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOneInvoice(id, tenantId) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id, tenantId },
            include: {
                patient: true,
                items: true,
                payments: true,
                refunds: true,
                branch: { select: { name: true } },
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async createInvoice(tenantId, dto) {
        const subtotal = dto.items.reduce((sum, item) => sum + item.unitPrice * (item.quantity ?? 1), 0);
        const discount = dto.discount ?? 0;
        const tax = dto.tax ?? 0;
        const total = subtotal - discount + tax;
        const count = await this.prisma.invoice.count({ where: { tenantId } });
        const invoiceNumber = `INV-${String(count + 1).padStart(6, '0')}`;
        return this.prisma.invoice.create({
            data: {
                tenantId,
                branchId: dto.branchId,
                patientId: dto.patientId,
                invoiceNumber,
                subtotal,
                discount,
                tax,
                total,
                notes: dto.notes,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                items: {
                    create: dto.items.map((item) => ({
                        type: item.type,
                        description: item.description,
                        quantity: item.quantity ?? 1,
                        unitPrice: item.unitPrice,
                        total: item.unitPrice * (item.quantity ?? 1),
                        referenceId: item.referenceId,
                    })),
                },
            },
            include: { items: true, patient: true },
        });
    }
    async updateInvoice(id, tenantId, dto) {
        await this.findOneInvoice(id, tenantId);
        const { items, ...rest } = dto;
        return this.prisma.invoice.update({
            where: { id },
            data: {
                ...rest,
                dueDate: rest.dueDate ? new Date(rest.dueDate) : undefined,
            },
            include: { items: true },
        });
    }
    async addPayment(invoiceId, tenantId, dto) {
        const invoice = await this.findOneInvoice(invoiceId, tenantId);
        const payment = await this.prisma.payment.create({
            data: {
                invoiceId,
                amount: dto.amount,
                method: dto.method,
                reference: dto.reference,
                notes: dto.notes,
            },
        });
        const paidTotal = await this.prisma.payment.aggregate({
            where: { invoiceId },
            _sum: { amount: true },
        });
        const paid = Number(paidTotal._sum.amount ?? 0);
        const invoiceTotal = Number(invoice.total);
        let status = client_1.InvoiceStatus.PENDING;
        if (paid >= invoiceTotal)
            status = client_1.InvoiceStatus.PAID;
        else if (paid > 0)
            status = client_1.InvoiceStatus.PARTIALLY_PAID;
        await this.prisma.invoice.update({
            where: { id: invoiceId },
            data: { status },
        });
        return payment;
    }
    async addRefund(invoiceId, tenantId, dto) {
        const invoice = await this.findOneInvoice(invoiceId, tenantId);
        const refundTotal = await this.prisma.refund.aggregate({
            where: { invoiceId },
            _sum: { amount: true },
        });
        const existingRefunds = Number(refundTotal._sum.amount ?? 0);
        if (existingRefunds + dto.amount > Number(invoice.total)) {
            throw new common_1.BadRequestException('Refund amount exceeds invoice total');
        }
        const refund = await this.prisma.refund.create({
            data: {
                invoiceId,
                paymentId: dto.paymentId,
                amount: dto.amount,
                reason: dto.reason,
            },
        });
        const newRefundTotal = existingRefunds + dto.amount;
        if (newRefundTotal >= Number(invoice.total)) {
            await this.prisma.invoice.update({
                where: { id: invoiceId },
                data: { status: client_1.InvoiceStatus.REFUNDED },
            });
        }
        return refund;
    }
    async getPayments(invoiceId, tenantId) {
        await this.findOneInvoice(invoiceId, tenantId);
        return this.prisma.payment.findMany({
            where: { invoiceId },
            include: { refunds: true },
            orderBy: { paidAt: 'desc' },
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map