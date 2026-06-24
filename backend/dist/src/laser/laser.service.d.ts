import { PrismaService } from '../prisma/prisma.service';
import { CreateLaserAreaDto, UpdateLaserAreaDto, CreateLaserSessionDto, UpdateLaserSessionDto, AddSessionPhotoDto } from './dto/laser.dto';
export declare class LaserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllAreas(tenantId: string): Promise<{
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        preset: import(".prisma/client").$Enums.LaserAreaPreset;
    }[]>;
    findOneArea(id: string, tenantId: string): Promise<{
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        preset: import(".prisma/client").$Enums.LaserAreaPreset;
    }>;
    createArea(tenantId: string, dto: CreateLaserAreaDto): Promise<{
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        preset: import(".prisma/client").$Enums.LaserAreaPreset;
    }>;
    updateArea(id: string, tenantId: string, dto: UpdateLaserAreaDto): Promise<{
        tenantId: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nameAr: string | null;
        preset: import(".prisma/client").$Enums.LaserAreaPreset;
    }>;
    removeArea(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    findAllSessions(tenantId: string, branchId?: string, patientId?: string, page?: number, limit?: number): Promise<{
        data: ({
            patient: {
                firstName: string;
                lastName: string;
                patientNumber: string;
            };
            specialist: {
                firstName: string;
                lastName: string;
            } | null;
            area: {
                tenantId: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                nameAr: string | null;
                preset: import(".prisma/client").$Enums.LaserAreaPreset;
            };
            photos: {
                type: import(".prisma/client").$Enums.DocumentType;
                id: string;
                createdAt: Date;
                fileUrl: string;
                fileName: string;
                notes: string | null;
                sessionId: string;
            }[];
        } & {
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            parameters: import("@prisma/client/runtime/library").JsonValue;
            patientId: string;
            notes: string | null;
            areaId: string;
            specialistId: string | null;
            sessionNumber: number;
            sessionDate: Date;
            device: string | null;
            energyLevel: string | null;
            pulseWidth: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneSession(id: string, tenantId: string): Promise<{
        branch: {
            name: string;
        };
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
        specialist: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
        area: {
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            preset: import(".prisma/client").$Enums.LaserAreaPreset;
        };
        photos: {
            type: import(".prisma/client").$Enums.DocumentType;
            id: string;
            createdAt: Date;
            fileUrl: string;
            fileName: string;
            notes: string | null;
            sessionId: string;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        parameters: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        notes: string | null;
        areaId: string;
        specialistId: string | null;
        sessionNumber: number;
        sessionDate: Date;
        device: string | null;
        energyLevel: string | null;
        pulseWidth: string | null;
    }>;
    createSession(tenantId: string, dto: CreateLaserSessionDto): Promise<{
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
        area: {
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            preset: import(".prisma/client").$Enums.LaserAreaPreset;
        };
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        parameters: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        notes: string | null;
        areaId: string;
        specialistId: string | null;
        sessionNumber: number;
        sessionDate: Date;
        device: string | null;
        energyLevel: string | null;
        pulseWidth: string | null;
    }>;
    updateSession(id: string, tenantId: string, dto: UpdateLaserSessionDto): Promise<{
        area: {
            tenantId: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            preset: import(".prisma/client").$Enums.LaserAreaPreset;
        };
        photos: {
            type: import(".prisma/client").$Enums.DocumentType;
            id: string;
            createdAt: Date;
            fileUrl: string;
            fileName: string;
            notes: string | null;
            sessionId: string;
        }[];
    } & {
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        parameters: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        notes: string | null;
        areaId: string;
        specialistId: string | null;
        sessionNumber: number;
        sessionDate: Date;
        device: string | null;
        energyLevel: string | null;
        pulseWidth: string | null;
    }>;
    removeSession(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    addSessionPhoto(id: string, tenantId: string, dto: AddSessionPhotoDto): Promise<{
        type: import(".prisma/client").$Enums.DocumentType;
        id: string;
        createdAt: Date;
        fileUrl: string;
        fileName: string;
        notes: string | null;
        sessionId: string;
    }>;
    removeSessionPhoto(sessionId: string, photoId: string, tenantId: string): Promise<{
        message: string;
    }>;
}
