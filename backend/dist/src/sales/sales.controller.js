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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sales_service_1 = require("./sales.service");
const sales_dto_1 = require("./dto/sales.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let SalesController = class SalesController {
    constructor(salesService) {
        this.salesService = salesService;
    }
    findAllInvoices(tenantId, branchId, status, page, limit) {
        return this.salesService.findAllInvoices(tenantId, branchId, status, page, limit);
    }
    findOneInvoice(id, tenantId) {
        return this.salesService.findOneInvoice(id, tenantId);
    }
    createInvoice(tenantId, dto) {
        return this.salesService.createInvoice(tenantId, dto);
    }
    updateInvoice(id, tenantId, dto) {
        return this.salesService.updateInvoice(id, tenantId, dto);
    }
    getPayments(id, tenantId) {
        return this.salesService.getPayments(id, tenantId);
    }
    addPayment(id, tenantId, dto) {
        return this.salesService.addPayment(id, tenantId, dto);
    }
    addRefund(id, tenantId, dto) {
        return this.salesService.addRefund(id, tenantId, dto);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Get)('invoices'),
    (0, swagger_1.ApiOperation)({ summary: 'List invoices' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('branchId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAllInvoices", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findOneInvoice", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, swagger_1.ApiOperation)({ summary: 'Create invoice' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sales_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Patch)('invoices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, sales_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Get)('invoices/:id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'List invoice payments' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getPayments", null);
__decorate([
    (0, common_1.Post)('invoices/:id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Record payment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, sales_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "addPayment", null);
__decorate([
    (0, common_1.Post)('invoices/:id/refunds'),
    (0, swagger_1.ApiOperation)({ summary: 'Process refund' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, sales_dto_1.CreateRefundDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "addRefund", null);
exports.SalesController = SalesController = __decorate([
    (0, swagger_1.ApiTags)('Sales'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map