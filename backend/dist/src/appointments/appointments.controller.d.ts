import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto, UpdateAppointmentStatusDto, CreateReminderDto } from './dto/appointment.dto';
import { AppointmentStatus } from '@prisma/client';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findAll(tenantId: string, branchId?: string, status?: AppointmentStatus, page?: number, limit?: number): Promise<{
        data: ({
            branch: {
                name: string;
                nameAr: string | null;
            };
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                phone: string;
                patientNumber: string;
            };
            doctor: {
                id: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            description: string | null;
            title: string;
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            patientId: string;
            notes: string | null;
            doctorId: string | null;
            scheduledAt: Date;
            duration: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    daily(tenantId: string, date: string, branchId?: string): Promise<{
        view: "daily" | "weekly" | "monthly";
        start: Date;
        end: Date;
        appointments: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                phone: string;
            };
            doctor: {
                id: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            description: string | null;
            title: string;
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            patientId: string;
            notes: string | null;
            doctorId: string | null;
            scheduledAt: Date;
            duration: number;
        })[];
    }>;
    weekly(tenantId: string, date: string, branchId?: string): Promise<{
        view: "daily" | "weekly" | "monthly";
        start: Date;
        end: Date;
        appointments: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                phone: string;
            };
            doctor: {
                id: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            description: string | null;
            title: string;
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            patientId: string;
            notes: string | null;
            doctorId: string | null;
            scheduledAt: Date;
            duration: number;
        })[];
    }>;
    monthly(tenantId: string, date: string, branchId?: string): Promise<{
        view: "daily" | "weekly" | "monthly";
        start: Date;
        end: Date;
        appointments: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                phone: string;
            };
            doctor: {
                id: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            description: string | null;
            title: string;
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            patientId: string;
            notes: string | null;
            doctorId: string | null;
            scheduledAt: Date;
            duration: number;
        })[];
    }>;
    pendingReminders(tenantId: string): Promise<({
        appointment: {
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                whatsapp: string | null;
            };
        } & {
            description: string | null;
            title: string;
            tenantId: string;
            branchId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            patientId: string;
            notes: string | null;
            doctorId: string | null;
            scheduledAt: Date;
            duration: number;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ReminderStatus;
        scheduledAt: Date;
        channel: import(".prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
        errorMessage: string | null;
        appointmentId: string;
    })[]>;
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
        doctor: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
        reminders: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.ReminderStatus;
            scheduledAt: Date;
            channel: import(".prisma/client").$Enums.ReminderChannel;
            sentAt: Date | null;
            errorMessage: string | null;
            appointmentId: string;
        }[];
    } & {
        description: string | null;
        title: string;
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        patientId: string;
        notes: string | null;
        doctorId: string | null;
        scheduledAt: Date;
        duration: number;
    }>;
    create(tenantId: string, dto: CreateAppointmentDto): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
        };
        doctor: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        description: string | null;
        title: string;
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        patientId: string;
        notes: string | null;
        doctorId: string | null;
        scheduledAt: Date;
        duration: number;
    }>;
    update(id: string, tenantId: string, dto: UpdateAppointmentDto): Promise<{
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
        doctor: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            tenantId: string | null;
            branchId: string | null;
            id: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            firstNameAr: string | null;
            lastNameAr: string | null;
            phone: string | null;
            avatar: string | null;
            isActive: boolean;
            emailVerified: boolean;
            twoFactorEnabled: boolean;
            twoFactorSecret: string | null;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        description: string | null;
        title: string;
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        patientId: string;
        notes: string | null;
        doctorId: string | null;
        scheduledAt: Date;
        duration: number;
    }>;
    updateStatus(id: string, tenantId: string, dto: UpdateAppointmentStatusDto): Promise<{
        description: string | null;
        title: string;
        tenantId: string;
        branchId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        patientId: string;
        notes: string | null;
        doctorId: string | null;
        scheduledAt: Date;
        duration: number;
    }>;
    createReminder(id: string, tenantId: string, dto: CreateReminderDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ReminderStatus;
        scheduledAt: Date;
        channel: import(".prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
        errorMessage: string | null;
        appointmentId: string;
    }>;
    remove(id: string, tenantId: string): Promise<{
        message: string;
    }>;
}
