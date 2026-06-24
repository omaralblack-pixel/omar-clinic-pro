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
import { InventoryService } from './inventory.service';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  CreateProductDto,
  UpdateProductDto,
  StockMovementDto,
  InventoryTransferDto,
} from './dto/inventory.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('suppliers')
  findSuppliers(@TenantId() tenantId: string) {
    return this.inventoryService.findSuppliers(tenantId!);
  }

  @Post('suppliers')
  createSupplier(@TenantId() tenantId: string, @Body() dto: CreateSupplierDto) {
    return this.inventoryService.createSupplier(tenantId!, dto);
  }

  @Patch('suppliers/:id')
  updateSupplier(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.inventoryService.updateSupplier(id, tenantId!, dto);
  }

  @Get('products')
  @ApiOperation({ summary: 'List products' })
  findProducts(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.inventoryService.findProducts(tenantId!, branchId, page, limit);
  }

  @Get('products/low-stock')
  @ApiOperation({ summary: 'Low stock alerts' })
  lowStock(@TenantId() tenantId: string, @Query('branchId') branchId?: string) {
    return this.inventoryService.getLowStockAlerts(tenantId!, branchId);
  }

  @Get('products/:id')
  findOneProduct(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.inventoryService.findOneProduct(id, tenantId!);
  }

  @Post('products')
  createProduct(@TenantId() tenantId: string, @Body() dto: CreateProductDto) {
    return this.inventoryService.createProduct(tenantId!, dto);
  }

  @Patch('products/:id')
  updateProduct(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.inventoryService.updateProduct(id, tenantId!, dto);
  }

  @Post('products/:id/movements')
  @ApiOperation({ summary: 'Record stock movement' })
  recordMovement(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: StockMovementDto,
  ) {
    return this.inventoryService.recordStockMovement(id, tenantId!, dto);
  }

  @Get('products/:id/movements')
  getMovements(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.inventoryService.getStockMovements(id, tenantId!);
  }

  @Get('transfers')
  findTransfers(@Query('fromBranchId') fromBranchId?: string) {
    return this.inventoryService.findTransfers(fromBranchId);
  }

  @Post('transfers')
  createTransfer(@Body() dto: InventoryTransferDto) {
    return this.inventoryService.createTransfer(dto);
  }
}
