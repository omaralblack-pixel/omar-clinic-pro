import { InvoiceStatus, InvoiceItemType, PaymentMethod } from '@prisma/client';
export declare class InvoiceItemDto {
    type: InvoiceItemType;
    description: string;
    quantity?: number;
    unitPrice: number;
    referenceId?: string;
}
export declare class CreateInvoiceDto {
    branchId: string;
    patientId: string;
    discount?: number;
    tax?: number;
    notes?: string;
    dueDate?: string;
    items: InvoiceItemDto[];
}
declare const UpdateInvoiceDto_base: import("@nestjs/common").Type<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
    status?: InvoiceStatus;
}
export declare class CreatePaymentDto {
    amount: number;
    method: PaymentMethod;
    reference?: string;
    notes?: string;
}
export declare class CreateRefundDto {
    amount: number;
    paymentId?: string;
    reason?: string;
}
export {};
