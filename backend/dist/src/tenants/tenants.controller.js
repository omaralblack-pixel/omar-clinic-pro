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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenants_service_1 = require("./tenants.service");
const tenant_dto_1 = require("./dto/tenant.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const auth_decorators_1 = require("../common/decorators/auth.decorators");
const client_1 = require("@prisma/client");
let TenantsController = class TenantsController {
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    findAllPlans(activeOnly) {
        return this.tenantsService.findAllPlans(activeOnly !== false);
    }
    createPlan(dto) {
        return this.tenantsService.createPlan(dto);
    }
    updatePlan(planId, dto) {
        return this.tenantsService.updatePlan(planId, dto);
    }
    createSubscription(dto) {
        return this.tenantsService.createSubscription(dto);
    }
    updateSubscription(id, dto) {
        return this.tenantsService.updateSubscription(id, dto);
    }
    findAllTenants(page, limit) {
        return this.tenantsService.findAllTenants(page, limit);
    }
    findOneTenant(id) {
        return this.tenantsService.findOneTenant(id);
    }
    createTenant(dto) {
        return this.tenantsService.createTenant(dto);
    }
    updateTenant(id, dto) {
        return this.tenantsService.updateTenant(id, dto);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Get)('plans/all'),
    (0, swagger_1.ApiOperation)({ summary: 'List subscription plans' }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAllPlans", null);
__decorate([
    (0, common_1.Post)('plans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Patch)('plans/:planId'),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateSubscriptionPlanDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updatePlan", null);
__decorate([
    (0, common_1.Post)('subscriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign subscription to tenant' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Patch)('subscriptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updateSubscription", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all tenants (super admin)' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAllTenants", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findOneTenant", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updateTenant", null);
exports.TenantsController = TenantsController = __decorate([
    (0, swagger_1.ApiTags)('Tenants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, auth_decorators_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map