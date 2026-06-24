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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, AssignPermissionsDto } from './dto/user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/auth.decorators';
import { CurrentUser, TenantId } from '../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  @ApiOperation({ summary: 'List users (RBAC)' })
  findAll(
    @TenantId() tenantId: string,
    @CurrentUser('role') role: UserRole,
    @Query('branchId') branchId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const scopeTenantId = role === UserRole.SUPER_ADMIN ? null : tenantId;
    return this.usersService.findAll(scopeTenantId, branchId, page, limit);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  findOne(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const scopeTenantId = role === UserRole.SUPER_ADMIN ? undefined : tenantId;
    return this.usersService.findOne(id, scopeTenantId);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  create(
    @Body() dto: CreateUserDto,
    @CurrentUser('role') role: UserRole,
    @TenantId() tenantId: string,
  ) {
    return this.usersService.create(dto, role, tenantId);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @TenantId() tenantId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const scopeTenantId = role === UserRole.SUPER_ADMIN ? undefined : tenantId;
    return this.usersService.update(id, dto, scopeTenantId, role);
  }

  @Patch(':id/permissions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  @ApiOperation({ summary: 'Assign RBAC permissions' })
  assignPermissions(
    @Param('id') id: string,
    @Body() dto: AssignPermissionsDto,
    @TenantId() tenantId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const scopeTenantId = role === UserRole.SUPER_ADMIN ? undefined : tenantId;
    return this.usersService.assignPermissions(id, dto, scopeTenantId);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER)
  deactivate(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const scopeTenantId = role === UserRole.SUPER_ADMIN ? undefined : tenantId;
    return this.usersService.deactivate(id, scopeTenantId);
  }
}
