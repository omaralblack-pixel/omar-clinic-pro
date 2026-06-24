import { ReportsService } from './reports.service';
import { ReportFilterDto } from './dto/reports.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    revenue(tenantId: string, filters: ReportFilterDto): Promise<{
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
    appointments(tenantId: string, filters: ReportFilterDto): Promise<{
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
    patients(tenantId: string, filters: ReportFilterDto): Promise<{
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
