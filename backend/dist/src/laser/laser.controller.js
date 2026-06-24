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
exports.LaserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const laser_service_1 = require("./laser.service");
const laser_dto_1 = require("./dto/laser.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let LaserController = class LaserController {
    constructor(laserService) {
        this.laserService = laserService;
    }
    findAllAreas(tenantId) {
        return this.laserService.findAllAreas(tenantId);
    }
    findOneArea(id, tenantId) {
        return this.laserService.findOneArea(id, tenantId);
    }
    createArea(tenantId, dto) {
        return this.laserService.createArea(tenantId, dto);
    }
    updateArea(id, tenantId, dto) {
        return this.laserService.updateArea(id, tenantId, dto);
    }
    removeArea(id, tenantId) {
        return this.laserService.removeArea(id, tenantId);
    }
    findAllSessions(tenantId, branchId, patientId, page, limit) {
        return this.laserService.findAllSessions(tenantId, branchId, patientId, page, limit);
    }
    findOneSession(id, tenantId) {
        return this.laserService.findOneSession(id, tenantId);
    }
    createSession(tenantId, dto) {
        return this.laserService.createSession(tenantId, dto);
    }
    updateSession(id, tenantId, dto) {
        return this.laserService.updateSession(id, tenantId, dto);
    }
    removeSession(id, tenantId) {
        return this.laserService.removeSession(id, tenantId);
    }
    addPhoto(id, tenantId, dto) {
        return this.laserService.addSessionPhoto(id, tenantId, dto);
    }
    removePhoto(sessionId, photoId, tenantId) {
        return this.laserService.removeSessionPhoto(sessionId, photoId, tenantId);
    }
};
exports.LaserController = LaserController;
__decorate([
    (0, common_1.Get)('areas'),
    (0, swagger_1.ApiOperation)({ summary: 'List laser treatment areas' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "findAllAreas", null);
__decorate([
    (0, common_1.Get)('areas/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "findOneArea", null);
__decorate([
    (0, common_1.Post)('areas'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, laser_dto_1.CreateLaserAreaDto]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "createArea", null);
__decorate([
    (0, common_1.Patch)('areas/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, laser_dto_1.UpdateLaserAreaDto]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "updateArea", null);
__decorate([
    (0, common_1.Delete)('areas/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "removeArea", null);
__decorate([
    (0, common_1.Get)('sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'List laser sessions' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('branchId')),
    __param(2, (0, common_1.Query)('patientId')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "findAllSessions", null);
__decorate([
    (0, common_1.Get)('sessions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "findOneSession", null);
__decorate([
    (0, common_1.Post)('sessions'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, laser_dto_1.CreateLaserSessionDto]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "createSession", null);
__decorate([
    (0, common_1.Patch)('sessions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, laser_dto_1.UpdateLaserSessionDto]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Delete)('sessions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "removeSession", null);
__decorate([
    (0, common_1.Post)('sessions/:id/photos'),
    (0, swagger_1.ApiOperation)({ summary: 'Add before/after photo to session' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, laser_dto_1.AddSessionPhotoDto]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Delete)('sessions/:sessionId/photos/:photoId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Param)('photoId')),
    __param(2, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], LaserController.prototype, "removePhoto", null);
exports.LaserController = LaserController = __decorate([
    (0, swagger_1.ApiTags)('Laser'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('laser'),
    __metadata("design:paramtypes", [laser_service_1.LaserService])
], LaserController);
//# sourceMappingURL=laser.controller.js.map