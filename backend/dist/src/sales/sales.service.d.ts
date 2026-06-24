import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto, CreatePaymentDto, CreateRefundDto } from './dto/sales.dto';
import { InvoiceStatus } from '@prisma/client';
export declare class SalesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllInvoices(tenantId: string, branchId?: string, status?: InvoiceStatus, page?: number, limit?: number): Promise<{
        data: ({
            patient: {
                firstName: string;
                lastName: string;
                patientNumber: string;
            };
            items: {
                type: import(".prisma/client").$Enums.InvoiceItemType;
                description: string;
                id: string;
                createdAt: Date;
                total: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                referenceId: string | null;
                invoiceId: string;
            }[];
            payments: {
                id: string;
                createdAt: Date;
                notes: string | null;
                amount: import("@prisma/client/runtime/library").Decimal;
                method: import(".prisma/client").$Enums.PaymentMethod;
                reference: string | null;
                invoiceId: string;
                paidAt: Date;
            }[];
        } & {
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.InvoiceStatus;
            patientId: string;
            notes: string | null;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            dueDate: Date | null;
            invoiceNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            issuedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneInvoice(id: string, tenantId: string): Promise<{
        branch: {
            name: string;
        };
        patient: {
            email: string | null;
            tenantId: string;
            branchId: string;
            id: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
            gender: import(".prisma/client").$Enums.Gender;
            birthDate: Date | null;
            nationalId: string | null;
            whatsapp: string | null;
            emergencyName: string | null;
            emergencyPhone: string | null;
            patientNumber: string;
        };
        items: {
            type: import(".prisma/client").$Enums.InvoiceItemType;
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            referenceId: string | null;
            invoiceId: string;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            notes: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: import(".prisma/client").$Enums.PaymentMethod;
            reference: string | null;
            invoiceId: string;
            paidAt: Date;
        }[];
        refunds: {
            id: string;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentId: string | null;
            reason: string | null;
            invoiceId: string;
            refundedAt: Date;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        patientId: string;
        notes: string | null;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        dueDate: Date | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        issuedAt: Date;
    }>;
    createInvoice(tenantId: string, dto: CreateInvoiceDto): Promise<{
        patient: {
            email: string | null;
            tenantId: string;
            branchId: string;
            id: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
            gender: import(".prisma/client").$Enums.Gender;
            birthDate: Date | null;
            nationalId: string | null;
            whatsapp: string | null;
            emergencyName: string | null;
            emergencyPhone: string | null;
            patientNumber: string;
        };
        items: {
            type: import(".prisma/client").$Enums.InvoiceItemType;
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            referenceId: string | null;
            invoiceId: string;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        patientId: string;
        notes: string | null;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        dueDate: Date | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        issuedAt: Date;
    }>;
    updateInvoice(id: string, tenantId: string, dto: UpdateInvoiceDto): Promise<{
        items: {
            type: import(".prisma/client").$Enums.InvoiceItemType;
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            referenceId: string | null;
            invoiceId: string;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        patientId: string;
        notes: string | null;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        dueDate: Date | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        issuedAt: Date;
    }>;
    addPayment(invoiceId: string, tenantId: string, dto: CreatePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        notes: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: import(".prisma/client").$Enums.PaymentMethod;
        reference: string | null;
        invoiceId: string;
        paidAt: Date;
    }>;
    addRefund(invoiceId: string, tenantId: string, dto: CreateRefundDto): Promise<{
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentId: string | null;
        reason: string | null;
        invoiceId: string;
        refundedAt: Date;
    }>;
    getPayments(invoiceId: string, tenantId: string): Promise<({
        refunds: {
            id: string;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentId: string | null;
            reason: string | null;
            invoiceId: string;
            refundedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        notes: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        method: import(".prisma/client").$Enums.PaymentMethod;
        reference: string | null;
        invoiceId: string;
        paidAt: Date;
    })[]>;
}
