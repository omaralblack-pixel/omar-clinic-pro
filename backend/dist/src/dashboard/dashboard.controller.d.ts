import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
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
}
