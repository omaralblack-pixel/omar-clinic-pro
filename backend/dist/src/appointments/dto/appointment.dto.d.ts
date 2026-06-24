import { AppointmentStatus, ReminderChannel } from '@prisma/client';
export declare class CreateAppointmentDto {
    branchId: string;
    patientId: string;
    doctorId?: string;
    title: string;
    description?: string;
    scheduledAt: string;
    duration?: number;
    notes?: string;
}
declare const UpdateAppointmentDto_base: import("@nestjs/common").Type<Partial<CreateAppointmentDto>>;
export declare class UpdateAppointmentDto extends UpdateAppointmentDto_base {
}
export declare class UpdateAppointmentStatusDto {
    status: AppointmentStatus;
}
export declare class CreateReminderDto {
    channel: ReminderChannel;
    scheduledAt: string;
}
export declare class CalendarQueryDto {
    branchId?: string;
    date: string;
}
export {};
