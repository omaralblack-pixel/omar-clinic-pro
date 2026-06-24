import { PrismaService } from '../prisma/prisma.service';
import { ReportFilterDto } from './dto/reports.dto';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    private dateRange;
    getRevenueReport(tenantId: string, filters: ReportFilterDto): Promise<{
        format: string;
        note: string;
        period: {
            from: string | undefined;
            to: string | undefined;
        };
        branchId: string | undefined;
        summary: {
            invoiceCount: number;
            totalInvoiced: number;
            totalDiscount: number;
            totalTax: number;
            totalCollected: number;
            paymentCount: number;
        };
        byPaymentMethod: {
            method: import(".prisma/client").$Enums.PaymentMethod;
            amount: number;
            count: number;
        }[];
    }>;
    getAppointmentsReport(tenantId: string, filters: ReportFilterDto): Promise<{
        format: string;
        note: string;
        period: {
            from: string | undefined;
            to: string | undefined;
        };
        total: number;
        byStatus: {
            status: import(".prisma/client").$Enums.AppointmentStatus;
            count: number;
        }[];
        byBranch: {
            branchId: string;
            branchName: string;
            count: number;
        }[];
        completionRate: string;
    }>;
    getPatientsReport(tenantId: string, filters: ReportFilterDto): Promise<{
        format: string;
        note: string;
        period: {
            from: string | undefined;
            to: string | undefined;
        };
        total: number;
        active: number;
        inactive: number;
        byGender: {
            gender: import(".prisma/client").$Enums.Gender;
            count: number;
        }[];
        byBranch: {
            branchId: string;
            branchName: string;
            count: number;
        }[];
    }>;
}
