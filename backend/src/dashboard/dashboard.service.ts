import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus, InvoiceStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(tenantId: string, branchId?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const branchFilter = branchId ? { branchId } : {};

    const [
      todayAppointments,
      todayRevenue,
      monthlyRevenue,
      activePatients,
      newPatientsThisMonth,
      pendingPayments,
      lowStockProducts,
      todayAttendance,
    ] = await Promise.all([
      this.prisma.appointment.count({
        where: {
          branch: { tenantId },
          ...branchFilter,
          scheduledAt: { gte: today, lt: tomorrow },
          status: { notIn: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] },
        },
      }),
      this.prisma.payment.aggregate({
        where: {
          paidAt: { gte: today, lt: tomorrow },
          invoice: { tenantId, ...branchFilter },
        },
        _sum: { amount: true },
      }),
      this.prisma.payment.aggregate({
        where: {
          paidAt: { gte: monthStart },
          invoice: { tenantId, ...branchFilter },
        },
        _sum: { amount: true },
      }),
      this.prisma.patient.count({
        where: { tenantId, isActive: true, ...branchFilter },
      }),
      this.prisma.patient.count({
        where: { tenantId, createdAt: { gte: monthStart }, ...branchFilter },
      }),
      this.prisma.invoice.count({
        where: {
          tenantId,
          ...branchFilter,
          status: { in: [InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID] },
        },
      }),
      (async () => {
        const products = await this.prisma.product.findMany({
          where: { tenantId, ...branchFilter, isActive: true },
          select: { quantity: true, minStock: true },
        });
        return products.filter((p) => p.quantity <= p.minStock).length;
      })(),
      this.prisma.attendanceRecord.count({
        where: {
          branch: { tenantId },
          ...branchFilter,
          date: today,
          status: 'PRESENT',
        },
      }),
    ]);

    return {
      widgets: {
        todayRevenue: Number(todayRevenue._sum.amount ?? 0),
        todayAppointments,
        monthlyRevenue: Number(monthlyRevenue._sum.amount ?? 0),
        activePatients,
        newPatients: newPatientsThisMonth,
        pendingPayments,
        inventoryAlerts: lowStockProducts,
        staffAttendance: todayAttendance,
      },
    };
  }

  async getCharts(tenantId: string, branchId?: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const branchFilter = branchId ? { branchId } : {};

    const payments = await this.prisma.payment.findMany({
      where: {
        paidAt: { gte: startDate },
        invoice: { tenantId, ...branchFilter },
      },
      select: { amount: true, paidAt: true },
    });

    const appointments = await this.prisma.appointment.findMany({
      where: {
        branch: { tenantId },
        ...branchFilter,
        scheduledAt: { gte: startDate },
      },
      select: { scheduledAt: true, status: true },
    });

    const revenueByDay = this.groupByDay(
      payments,
      (p) => p.paidAt,
      (p) => Number(p.amount),
    );

    const appointmentsByDay = this.groupByDay(
      appointments,
      (a) => a.scheduledAt,
      () => 1,
    );

    return {
      revenueTrend: revenueByDay,
      appointmentTrend: appointmentsByDay,
    };
  }

  private groupByDay<T>(
    items: T[],
    dateFn: (item: T) => Date,
    valueFn: (item: T) => number,
  ) {
    const map = new Map<string, number>();
    for (const item of items) {
      const key = dateFn(item).toISOString().split('T')[0];
      map.set(key, (map.get(key) ?? 0) + valueFn(item));
    }
    return Array.from(map.entries())
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
