import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WhatsappService } from './whatsapp.service';
import { SendMessageDto, SendAppointmentReminderDto } from './dto/whatsapp.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('WhatsApp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('whatsapp')
export class WhatsappController {
  constructor(private whatsappService: WhatsappService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send WhatsApp message' })
  sendMessage(@TenantId() tenantId: string, @Body() dto: SendMessageDto) {
    return this.whatsappService.sendMessage(tenantId!, dto);
  }

  @Post('appointment-reminder')
  @ApiOperation({ summary: 'Send appointment reminder via WhatsApp' })
  sendAppointmentReminder(
    @TenantId() tenantId: string,
    @Body() dto: SendAppointmentReminderDto,
  ) {
    return this.whatsappService.sendAppointmentReminder(tenantId!, dto);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Message history' })
  getHistory(
    @TenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.whatsappService.getMessageHistory(tenantId!, page, limit);
  }
}
