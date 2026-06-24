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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const staff_service_1 = require("./staff.service");
const staff_dto_1 = require("./dto/staff.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const client_1 = require("@prisma/client");
let StaffController = class StaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    findEmployees(branchId) {
        return this.staffService.findEmployees(branchId);
    }
    findOneEmployee(id) {
        return this.staffService.findOneEmployee(id);
    }
    createEmployee(dto) {
        return this.staffService.createEmployee(dto);
    }
    updateEmployee(id, dto) {
        return this.staffService.updateEmployee(id, dto);
    }
    getAttendance(branchId, from, to) {
        return this.staffService.getAttendance(branchId, from, to);
    }
    recordAttendance(dto) {
        return this.staffService.recordAttendance(dto);
    }
    getLeaveRequests(employeeId, status) {
        return this.staffService.getLeaveRequests(employeeId, status);
    }
    createLeaveRequest(dto) {
        return this.staffService.createLeaveRequest(dto);
    }
    updateLeaveStatus(id, dto) {
        return this.staffService.updateLeaveStatus(id, dto);
    }
    getPayroll(employeeId, year) {
        return this.staffService.getPayroll(employeeId, year);
    }
    createPayroll(dto) {
        return this.staffService.createPayroll(dto);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Get)('employees'),
    (0, swagger_1.ApiOperation)({ summary: 'List employees' }),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findEmployees", null);
__decorate([
    (0, common_1.Get)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findOneEmployee", null);
__decorate([
    (0, common_1.Post)('employees'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Patch)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Get)('attendance'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Post)('attendance'),
    (0, swagger_1.ApiOperation)({ summary: 'Record attendance' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.RecordAttendanceDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "recordAttendance", null);
__decorate([
    (0, common_1.Get)('leave'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "getLeaveRequests", null);
__decorate([
    (0, common_1.Post)('leave'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "createLeaveRequest", null);
__decorate([
    (0, common_1.Patch)('leave/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_dto_1.UpdateLeaveStatusDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "updateLeaveStatus", null);
__decorate([
    (0, common_1.Get)('payroll'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "getPayroll", null);
__decorate([
    (0, common_1.Post)('payroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Create payroll record' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "createPayroll", null);
exports.StaffController = StaffController = __decorate([
    (0, swagger_1.ApiTags)('Staff'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map