"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const auth_decorators_1 = require("../common/decorators/auth.decorators");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(tenantId, role, branchId, page, limit) {
        const scopeTenantId = role === client_1.UserRole.SUPER_ADMIN ? null : tenantId;
        return this.usersService.findAll(scopeTenantId, branchId, page, limit);
    }
    findOne(id, tenantId, role) {
        const scopeTenantId = role === client_1.UserRole.SUPER_ADMIN ? undefined : tenantId;
        return this.usersService.findOne(id, scopeTenantId);
    }
    create(dto, role, tenantId) {
        return this.usersService.create(dto, role, tenantId);
    }
    update(id, dto, tenantId, role) {
        const scopeTenantId = role === client_1.UserRole.SUPER_ADMIN ? undefined : tenantId;
        return this.usersService.update(id, dto, scopeTenantId, role);
    }
    assignPermissions(id, dto, tenantId, role) {
        const scopeTenantId = role === client_1.UserRole.SUPER_ADMIN ? undefined : tenantId;
        return this.usersService.assignPermissions(id, dto, scopeTenantId);
    }
    deactivate(id, tenantId, role) {
        const scopeTenantId = role === client_1.UserRole.SUPER_ADMIN ? undefined : tenantId;
        return this.usersService.deactivate(id, scopeTenantId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List users (RBAC)' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Query)('branchId')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.TenantId)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/permissions'),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Assign RBAC permissions' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.TenantId)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.AssignPermissionsDto, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "assignPermissions", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BRANCH_MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deactivate", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map