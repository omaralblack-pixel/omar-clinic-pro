import { CashboxTransactionType } from '@prisma/client';
export declare class CreateCashboxDto {
    branchId: string;
    name: string;
    currency?: string;
}
export declare class CashboxTransactionDto {
    type: CashboxTransactionType;
    amount: number;
    description: string;
    reference?: string;
}
export declare class CreateIncomeDto {
    branchId: string;
    category: string;
    amount: number;
    description?: string;
    reference?: string;
    recordedAt?: string;
}
export declare class CreateExpenseDto {
    branchId: string;
    category: string;
    amount: number;
    description?: string;
    reference?: string;
    recordedAt?: string;
}
export declare class ReportQueryDto {
    branchId?: string;
    from: string;
    to: string;
}
