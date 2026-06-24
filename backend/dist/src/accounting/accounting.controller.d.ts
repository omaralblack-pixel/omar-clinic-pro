import { AccountingService } from './accounting.service';
import { CreateCashboxDto, CashboxTransactionDto, CreateIncomeDto, CreateExpenseDto } from './dto/accounting.dto';
export declare class AccountingController {
    private accountingService;
    constructor(accountingService: AccountingService);
    findCashboxes(branchId?: string): Promise<({
        branch: {
            name: string;
        };
    } & {
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        balance: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    createCashbox(dto: CreateCashboxDto): Promise<{
        branchId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
    getCashboxTransactions(id: string): Promise<{
        type: import(".prisma/client").$Enums.CashboxTransactionType;
        description: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        cashboxId: string;
    }[]>;
    addCashboxTransaction(id: string, dto: CashboxTransactionDto): Promise<{
        type: import(".prisma/client").$Enums.CashboxTransactionType;
        description: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        cashboxId: string;
    }>;
    findIncome(branchId?: string, from?: string, to?: string): Promise<{
        description: string | null;
        branchId: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        category: string;
        recordedAt: Date;
    }[]>;
    createIncome(dto: CreateIncomeDto): Promise<{
        description: string | null;
        branchId: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        category: string;
        recordedAt: Date;
    }>;
    findExpenses(branchId?: string, from?: string, to?: string): Promise<{
        description: string | null;
        branchId: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        category: string;
        recordedAt: Date;
    }[]>;
    createExpense(dto: CreateExpenseDto): Promise<{
        description: string | null;
        branchId: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        category: string;
        recordedAt: Date;
    }>;
    dailyReport(date: string, branchId?: string): Promise<{
        date: string;
        branchId: string | undefined;
        income: number;
        expenses: number;
        salesRevenue: number;
        net: number;
        payments: ({
            invoice: {
                invoiceNumber: string;
            };
        } & {
            id: string;
            createdAt: Date;
            notes: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: import(".prisma/client").$Enums.PaymentMethod;
            reference: string | null;
            invoiceId: string;
            paidAt: Date;
        })[];
    }>;
    monthlyReport(year: number, month: number, branchId?: string): Promise<{
        year: number;
        month: number;
        branchId: string | undefined;
        income: number;
        expenses: number;
        salesRevenue: number;
        net: number;
    }>;
}
