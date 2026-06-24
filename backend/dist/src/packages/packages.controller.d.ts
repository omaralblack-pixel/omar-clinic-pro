import { PackagesService } from './packages.service';
import { CreateServicePackageDto, UpdateServicePackageDto, AssignPatientPackageDto, UseSessionDto, UpdatePatientPackageDto } from './dto/package.dto';
export declare class PackagesController {
    private packagesService;
    constructor(packagesService: PackagesService);
    findPatientPackages(tenantId: string, patientId?: string): Promise<({
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            patientNumber: string;
        };
        package: {
            description: string | null;
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            totalSessions: number;
            validityDays: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        packageId: string;
        totalSessions: number;
        usedSessions: number;
        remainingSessions: number;
        purchaseDate: Date;
        expirationDate: Date;
    })[]>;
    findOnePatientPackage(id: string, tenantId: string): Promise<{
        patient: {
            email: string | null;
            tenantId: string;
            branchId: string;
            id: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
            gender: import(".prisma/client").$Enums.Gender;
            birthDate: Date | null;
            nationalId: string | null;
            whatsapp: string | null;
            emergencyName: string | null;
            emergencyPhone: string | null;
            patientNumber: string;
        };
        package: {
            description: string | null;
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            totalSessions: number;
            validityDays: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        packageId: string;
        totalSessions: number;
        usedSessions: number;
        remainingSessions: number;
        purchaseDate: Date;
        expirationDate: Date;
    }>;
    assignPackage(tenantId: string, dto: AssignPatientPackageDto): Promise<{
        patient: {
            email: string | null;
            tenantId: string;
            branchId: string;
            id: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
            gender: import(".prisma/client").$Enums.Gender;
            birthDate: Date | null;
            nationalId: string | null;
            whatsapp: string | null;
            emergencyName: string | null;
            emergencyPhone: string | null;
            patientNumber: string;
        };
        package: {
            description: string | null;
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            totalSessions: number;
            validityDays: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        packageId: string;
        totalSessions: number;
        usedSessions: number;
        remainingSessions: number;
        purchaseDate: Date;
        expirationDate: Date;
    }>;
    useSession(id: string, tenantId: string, dto: UseSessionDto): Promise<{
        package: {
            description: string | null;
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            totalSessions: number;
            validityDays: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        packageId: string;
        totalSessions: number;
        usedSessions: number;
        remainingSessions: number;
        purchaseDate: Date;
        expirationDate: Date;
    }>;
    updatePatientPackage(id: string, tenantId: string, dto: UpdatePatientPackageDto): Promise<{
        package: {
            description: string | null;
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            totalSessions: number;
            validityDays: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        packageId: string;
        totalSessions: number;
        usedSessions: number;
        remainingSessions: number;
        purchaseDate: Date;
        expirationDate: Date;
    }>;
    findAllPackages(tenantId: string, activeOnly?: boolean): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        totalSessions: number;
        validityDays: number;
    }[]>;
    findOnePackage(id: string, tenantId: string): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        totalSessions: number;
        validityDays: number;
    }>;
    createPackage(tenantId: string, dto: CreateServicePackageDto): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        totalSessions: number;
        validityDays: number;
    }>;
    updatePackage(id: string, tenantId: string, dto: UpdateServicePackageDto): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        totalSessions: number;
        validityDays: number;
    }>;
    removePackage(id: string, tenantId: string): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        totalSessions: number;
        validityDays: number;
    }>;
}
