import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportFilterDto } from './dto/reports.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  private dateRange(from?: string, to?: string) {
    const range: { gte?: Date; lte?: Date } = {};
    if (from) range.gte = new Date(from);
    if (to) range.lte = new Date(to);
    return Object.keys(range).length ? range : undefined;
  }

  async getRevenueReport(tenantId: string, filters: ReportFilterDto) {
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

  async getAppointmentsReport(tenantId: string, filters: ReportFilterDto) {
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
      completionRate:
        total > 0
          ? (
              (byStatus.find((s) => s.status === AppointmentStatus.COMPLETED)?._count ?? 0) /
              total
            ).toFixed(2)
          : '0.00',
    };
  }

  async getPatientsReport(tenantId: string, filters: ReportFilterDto) {
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
}
