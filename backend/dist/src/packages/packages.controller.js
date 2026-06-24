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
exports.PackagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const packages_service_1 = require("./packages.service");
const package_dto_1 = require("./dto/package.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let PackagesController = class PackagesController {
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    findPatientPackages(tenantId, patientId) {
        return this.packagesService.findPatientPackages(tenantId, patientId);
    }
    findOnePatientPackage(id, tenantId) {
        return this.packagesService.findOnePatientPackage(id, tenantId);
    }
    assignPackage(tenantId, dto) {
        return this.packagesService.assignPackage(tenantId, dto);
    }
    useSession(id, tenantId, dto) {
        return this.packagesService.useSession(id, tenantId, dto);
    }
    updatePatientPackage(id, tenantId, dto) {
        return this.packagesService.updatePatientPackage(id, tenantId, dto);
    }
    findAllPackages(tenantId, activeOnly) {
        return this.packagesService.findAllPackages(tenantId, activeOnly !== false);
    }
    findOnePackage(id, tenantId) {
        return this.packagesService.findOnePackage(id, tenantId);
    }
    createPackage(tenantId, dto) {
        return this.packagesService.createPackage(tenantId, dto);
    }
    updatePackage(id, tenantId, dto) {
        return this.packagesService.updatePackage(id, tenantId, dto);
    }
    removePackage(id, tenantId) {
        return this.packagesService.removePackage(id, tenantId);
    }
};
exports.PackagesController = PackagesController;
__decorate([
    (0, common_1.Get)('patient/tracking'),
    (0, swagger_1.ApiOperation)({ summary: 'Patient package tracking' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "findPatientPackages", null);
__decorate([
    (0, common_1.Get)('patient/tracking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "findOnePatientPackage", null);
__decorate([
    (0, common_1.Post)('patient/assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign package to patient' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, package_dto_1.AssignPatientPackageDto]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "assignPackage", null);
__decorate([
    (0, common_1.Patch)('patient/tracking/:id/use-session'),
    (0, swagger_1.ApiOperation)({ summary: 'Deduct session from patient package' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, package_dto_1.UseSessionDto]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "useSession", null);
__decorate([
    (0, common_1.Patch)('patient/tracking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, package_dto_1.UpdatePatientPackageDto]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "updatePatientPackage", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List service packages' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "findAllPackages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "findOnePackage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, package_dto_1.CreateServicePackageDto]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "createPackage", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, package_dto_1.UpdateServicePackageDto]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "updatePackage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "removePackage", null);
exports.PackagesController = PackagesController = __decorate([
    (0, swagger_1.ApiTags)('Packages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('packages'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackagesController);
//# sourceMappingURL=packages.controller.js.map