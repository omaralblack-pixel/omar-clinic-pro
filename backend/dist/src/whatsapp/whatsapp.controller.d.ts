import { WhatsappService } from './whatsapp.service';
import { SendMessageDto, SendAppointmentReminderDto } from './dto/whatsapp.dto';
export declare class WhatsappController {
    private whatsappService;
    constructor(whatsappService: WhatsappService);
    sendMessage(tenantId: string, dto: SendMessageDto): Promise<{
        type: import(".prisma/client").$Enums.WhatsAppMessageType;
        tenantId: string;
        id: string;
        phone: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ReminderStatus;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        sentAt: Date | null;
        message: string;
    }>;
    sendAppointmentReminder(tenantId: string, dto: SendAppointmentReminderDto): Promise<{
        type: import(".prisma/client").$Enums.WhatsAppMessageType;
        tenantId: string;
        id: string;
        phone: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ReminderStatus;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        sentAt: Date | null;
        message: string;
    }>;
    getHistory(tenantId: string, page?: number, limit?: number): Promise<{
        data: {
            type: import(".prisma/client").$Enums.WhatsAppMessageType;
            tenantId: string;
            id: string;
            phone: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.ReminderStatus;
            metadata: import("@prisma/client/runtime/library").JsonValue;
            sentAt: Date | null;
            message: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
