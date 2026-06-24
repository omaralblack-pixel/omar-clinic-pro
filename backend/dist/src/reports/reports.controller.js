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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const reports_dto_1 = require("./dto/reports.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    revenue(tenantId, filters) {
        return this.reportsService.getRevenueReport(tenantId, filters);
    }
    appointments(tenantId, filters) {
        return this.reportsService.getAppointmentsReport(tenantId, filters);
    }
    patients(tenantId, filters) {
        return this.reportsService.getPatientsReport(tenantId, filters);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('revenue'),
    (0, swagger_1.ApiOperation)({
        summary: 'Revenue report (JSON)',
        description: 'PDF/Excel export planned for future release',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'JSON revenue report' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "revenue", null);
__decorate([
    (0, common_1.Get)('appointments'),
    (0, swagger_1.ApiOperation)({
        summary: 'Appointments report (JSON)',
        description: 'PDF/Excel export planned for future release',
    }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "appointments", null);
__decorate([
    (0, common_1.Get)('patients'),
    (0, swagger_1.ApiOperation)({
        summary: 'Patients report (JSON)',
        description: 'PDF/Excel export planned for future release',
    }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "patients", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map