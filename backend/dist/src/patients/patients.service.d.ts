import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto, UpdateMedicalInfoDto } from './dto/patient.dto';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, branchId?: string, search?: string, page?: number, limit?: number): Promise<{
        data: ({
            branch: {
                name: string;
                nameAr: string | null;
            };
            medicalInfo: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                allergies: string | null;
                diseases: string | null;
                medications: string | null;
                pregnancyStatus: import(".prisma/client").$Enums.PregnancyStatus;
                skinType: import(".prisma/client").$Enums.SkinType | null;
                medicalNotes: string | null;
                patientId: string;
            } | null;
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, tenantId: string): Promise<{
        branch: {
            email: string | null;
            tenantId: string;
            id: string;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nameAr: string | null;
            address: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue;
            code: string;
            city: string | null;
        };
        medicalInfo: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            allergies: string | null;
            diseases: string | null;
            medications: string | null;
            pregnancyStatus: import(".prisma/client").$Enums.PregnancyStatus;
            skinType: import(".prisma/client").$Enums.SkinType | null;
            medicalNotes: string | null;
            patientId: string;
        } | null;
        documents: {
            type: import(".prisma/client").$Enums.DocumentType;
            title: string;
            id: string;
            createdAt: Date;
            patientId: string;
            fileUrl: string;
            fileName: string;
            mimeType: string | null;
            fileSize: number | null;
            notes: string | null;
        }[];
        timelineEvents: {
            type: import(".prisma/client").$Enums.TimelineEventType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            patientId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue;
            createdById: string | null;
        }[];
        patientPackages: ({
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
        })[];
    } & {
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
    }>;
    create(tenantId: string, dto: CreatePatientDto): Promise<{
        medicalInfo: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            allergies: string | null;
            diseases: string | null;
            medications: string | null;
            pregnancyStatus: import(".prisma/client").$Enums.PregnancyStatus;
            skinType: import(".prisma/client").$Enums.SkinType | null;
            medicalNotes: string | null;
            patientId: string;
        } | null;
    } & {
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
    }>;
    update(id: string, tenantId: string, dto: UpdatePatientDto): Promise<{
        medicalInfo: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            allergies: string | null;
            diseases: string | null;
            medications: string | null;
            pregnancyStatus: import(".prisma/client").$Enums.PregnancyStatus;
            skinType: import(".prisma/client").$Enums.SkinType | null;
            medicalNotes: string | null;
            patientId: string;
        } | null;
    } & {
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
    }>;
    updateMedicalInfo(id: string, tenantId: string, dto: UpdateMedicalInfoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        allergies: string | null;
        diseases: string | null;
        medications: string | null;
        pregnancyStatus: import(".prisma/client").$Enums.PregnancyStatus;
        skinType: import(".prisma/client").$Enums.SkinType | null;
        medicalNotes: string | null;
        patientId: string;
    }>;
    getTimeline(id: string, tenantId: string): Promise<({
        createdBy: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        type: import(".prisma/client").$Enums.TimelineEventType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        patientId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        createdById: string | null;
    })[]>;
}
