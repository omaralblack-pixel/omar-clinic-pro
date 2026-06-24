import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(tenantId: string, branchId?: string): Promise<{
        widgets: {
            todayRevenue: number;
            todayAppointments: number;
            monthlyRevenue: number;
            activePatients: number;
            newPatients: number;
            pendingPayments: number;
            inventoryAlerts: number;
            staffAttendance: number;
        };
    }>;
    getCharts(tenantId: string, branchId?: string, days?: number): Promise<{
        revenueTrend: {
            date: string;
            value: number;
        }[];
        appointmentTrend: {
            date: string;
            value: number;
        }[];
    }>;
    private groupByDay;
}
