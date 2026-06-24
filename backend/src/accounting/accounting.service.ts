import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCashboxDto,
  CashboxTransactionDto,
  CreateIncomeDto,
  CreateExpenseDto,
} from './dto/accounting.dto';
import { CashboxTransactionType } from '@prisma/client';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async findCashboxes(branchId?: string) {
    return this.prisma.cashbox.findMany({
      where: { ...(branchId && { branchId }), isActive: true },
      include: { branch: { select: { name: true } } },
    });
  }

  async createCashbox(dto: CreateCashboxDto) {
    return this.prisma.cashbox.create({
      data: {
        branchId: dto.branchId,
        name: dto.name,
        currency: dto.currency ?? 'JOD',
      },
    });
  }

  async addCashboxTransaction(cashboxId: string, dto: CashboxTransactionDto) {
    const cashbox = await this.prisma.cashbox.findUnique({ where: { id: cashboxId } });
    if (!cashbox) throw new NotFoundException('Cashbox not found');

    const delta =
      dto.type === CashboxTransactionType.EXPENSE ||
      dto.type === CashboxTransactionType.TRANSFER
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

  async getCashboxTransactions(cashboxId: string) {
    return this.prisma.cashboxTransaction.findMany({
      where: { cashboxId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createIncome(dto: CreateIncomeDto) {
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

  async findIncome(branchId?: string, from?: string, to?: string) {
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

  async createExpense(dto: CreateExpenseDto) {
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

  async findExpenses(branchId?: string, from?: string, to?: string) {
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

  async getDailyReport(branchId: string | undefined, date: string) {
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

  async getMonthlyReport(branchId: string | undefined, year: number, month: number) {
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
}
