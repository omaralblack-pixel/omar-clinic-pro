import { WhatsAppMessageType } from '@prisma/client';
export declare class SendMessageDto {
    phone: string;
    message: string;
    type?: WhatsAppMessageType;
}
export declare class SendAppointmentReminderDto {
    appointmentId: string;
    customMessage?: string;
}
