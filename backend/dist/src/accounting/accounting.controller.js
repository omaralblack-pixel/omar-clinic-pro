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
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accounting_service_1 = require("./accounting.service");
const accounting_dto_1 = require("./dto/accounting.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const auth_decorators_1 = require("../common/decorators/auth.decorators");
const client_1 = require("@prisma/client");
let AccountingController = class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    findCashboxes(branchId) {
        return this.accountingService.findCashboxes(branchId);
    }
    createCashbox(dto) {
        return this.accountingService.createCashbox(dto);
    }
    getCashboxTransactions(id) {
        return this.accountingService.getCashboxTransactions(id);
    }
    addCashboxTransaction(id, dto) {
        return this.accountingService.addCashboxTransaction(id, dto);
    }
    findIncome(branchId, from, to) {
        return this.accountingService.findIncome(branchId, from, to);
    }
    createIncome(dto) {
        return this.accountingService.createIncome(dto);
    }
    findExpenses(branchId, from, to) {
        return this.accountingService.findExpenses(branchId, from, to);
    }
    createExpense(dto) {
        return this.accountingService.createExpense(dto);
    }
    dailyReport(date, branchId) {
        return this.accountingService.getDailyReport(branchId, date);
    }
    monthlyReport(year, month, branchId) {
        return this.accountingService.getMonthlyReport(branchId, year, month);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('cashboxes'),
    (0, swagger_1.ApiOperation)({ summary: 'List cashboxes' }),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findCashboxes", null);
__decorate([
    (0, common_1.Post)('cashboxes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.CreateCashboxDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createCashbox", null);
__decorate([
    (0, common_1.Get)('cashboxes/:id/transactions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getCashboxTransactions", null);
__decorate([
    (0, common_1.Post)('cashboxes/:id/transactions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accounting_dto_1.CashboxTransactionDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "addCashboxTransaction", null);
__decorate([
    (0, common_1.Get)('income'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findIncome", null);
__decorate([
    (0, common_1.Post)('income'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.CreateIncomeDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createIncome", null);
__decorate([
    (0, common_1.Get)('expenses'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findExpenses", null);
__decorate([
    (0, common_1.Post)('expenses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounting_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('reports/daily'),
    (0, swagger_1.ApiOperation)({ summary: 'Daily financial report (JSON)' }),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "dailyReport", null);
__decorate([
    (0, common_1.Get)('reports/monthly'),
    (0, swagger_1.ApiOperation)({ summary: 'Monthly financial report (JSON)' }),
    __param(0, (0, common_1.Query)('year')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "monthlyReport", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('Accounting'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, auth_decorators_1.Roles)(client_1.UserRole.ACCOUNTANT, client_1.UserRole.BRANCH_MANAGER, client_1.UserRole.SUPER_ADMIN),
    (0, common_1.Controller)('accounting'),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map