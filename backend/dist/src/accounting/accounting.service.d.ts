import { PrismaService } from '../prisma/prisma.service';
import { CreateCashboxDto, CashboxTransactionDto, CreateIncomeDto, CreateExpenseDto } from './dto/accounting.dto';
export declare class AccountingService {
    private prisma;
    constructor(prisma: PrismaService);
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
    addCashboxTransaction(cashboxId: string, dto: CashboxTransactionDto): Promise<{
        type: import(".prisma/client").$Enums.CashboxTransactionType;
        description: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        cashboxId: string;
    }>;
    getCashboxTransactions(cashboxId: string): Promise<{
        type: import(".prisma/client").$Enums.CashboxTransactionType;
        description: string;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        reference: string | null;
        cashboxId: string;
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
    getDailyReport(branchId: string | undefined, date: string): Promise<{
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
    getMonthlyReport(branchId: string | undefined, year: number, month: number): Promise<{
        year: number;
        month: number;
        branchId: string | undefined;
        income: number;
        expenses: number;
        salesRevenue: number;
        net: number;
    }>;
}
