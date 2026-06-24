import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreatePaymentDto,
  CreateRefundDto,
} from './dto/sales.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';
import { InvoiceStatus } from '@prisma/client';

@ApiTags('Sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('invoices')
  @ApiOperation({ summary: 'List invoices' })
  findAllInvoices(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('status') status?: InvoiceStatus,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.salesService.findAllInvoices(tenantId!, branchId, status, page, limit);
  }

  @Get('invoices/:id')
  findOneInvoice(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.salesService.findOneInvoice(id, tenantId!);
  }

  @Post('invoices')
  @ApiOperation({ summary: 'Create invoice' })
  createInvoice(@TenantId() tenantId: string, @Body() dto: CreateInvoiceDto) {
    return this.salesService.createInvoice(tenantId!, dto);
  }

  @Patch('invoices/:id')
  updateInvoice(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateInvoiceDto,
  ) {
    return this.salesService.updateInvoice(id, tenantId!, dto);
  }

  @Get('invoices/:id/payments')
  @ApiOperation({ summary: 'List invoice payments' })
  getPayments(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.salesService.getPayments(id, tenantId!);
  }

  @Post('invoices/:id/payments')
  @ApiOperation({ summary: 'Record payment' })
  addPayment(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.salesService.addPayment(id, tenantId!, dto);
  }

  @Post('invoices/:id/refunds')
  @ApiOperation({ summary: 'Process refund' })
  addRefund(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: CreateRefundDto,
  ) {
    return this.salesService.addRefund(id, tenantId!, dto);
  }
}
