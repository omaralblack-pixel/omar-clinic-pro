import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
import {
  CreateCashboxDto,
  CashboxTransactionDto,
  CreateIncomeDto,
  CreateExpenseDto,
} from './dto/accounting.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth.decorators';
import { UserRole } from '@prisma/client';

@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ACCOUNTANT, UserRole.BRANCH_MANAGER, UserRole.SUPER_ADMIN)
@Controller('accounting')
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get('cashboxes')
  @ApiOperation({ summary: 'List cashboxes' })
  findCashboxes(@Query('branchId') branchId?: string) {
    return this.accountingService.findCashboxes(branchId);
  }

  @Post('cashboxes')
  createCashbox(@Body() dto: CreateCashboxDto) {
    return this.accountingService.createCashbox(dto);
  }

  @Get('cashboxes/:id/transactions')
  getCashboxTransactions(@Param('id') id: string) {
    return this.accountingService.getCashboxTransactions(id);
  }

  @Post('cashboxes/:id/transactions')
  addCashboxTransaction(@Param('id') id: string, @Body() dto: CashboxTransactionDto) {
    return this.accountingService.addCashboxTransaction(id, dto);
  }

  @Get('income')
  findIncome(
    @Query('branchId') branchId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.accountingService.findIncome(branchId, from, to);
  }

  @Post('income')
  createIncome(@Body() dto: CreateIncomeDto) {
    return this.accountingService.createIncome(dto);
  }

  @Get('expenses')
  findExpenses(
    @Query('branchId') branchId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.accountingService.findExpenses(branchId, from, to);
  }

  @Post('expenses')
  createExpense(@Body() dto: CreateExpenseDto) {
    return this.accountingService.createExpense(dto);
  }

  @Get('reports/daily')
  @ApiOperation({ summary: 'Daily financial report (JSON)' })
  dailyReport(
    @Query('date') date: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.accountingService.getDailyReport(branchId, date);
  }

  @Get('reports/monthly')
  @ApiOperation({ summary: 'Monthly financial report (JSON)' })
  monthlyReport(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('branchId') branchId?: string,
  ) {
    return this.accountingService.getMonthlyReport(branchId, year, month);
  }
}
