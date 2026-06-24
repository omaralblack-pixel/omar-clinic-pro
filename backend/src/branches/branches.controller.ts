import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantId } from '../common/decorators/current-user.decorator';

@ApiTags('Branches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Get()
  @ApiOperation({ summary: 'List branches for current tenant' })
  findAll(
    @TenantId() tenantId: string,
    @Query('activeOnly') activeOnly?: boolean,
  ) {
    return this.branchesService.findAll(tenantId!, activeOnly !== false);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.branchesService.findOne(id, tenantId!);
  }

  @Post()
  create(@TenantId() tenantId: string, @Body() dto: CreateBranchDto) {
    return this.branchesService.create(tenantId!, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @Body() dto: UpdateBranchDto,
  ) {
    return this.branchesService.update(id, tenantId!, dto);
  }

  @Delete(':id')
  deactivate(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.branchesService.deactivate(id, tenantId!);
  }
}
