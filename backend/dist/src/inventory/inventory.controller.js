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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const inventory_dto_1 = require("./dto/inventory.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    findSuppliers(tenantId) {
        return this.inventoryService.findSuppliers(tenantId);
    }
    createSupplier(tenantId, dto) {
        return this.inventoryService.createSupplier(tenantId, dto);
    }
    updateSupplier(id, tenantId, dto) {
        return this.inventoryService.updateSupplier(id, tenantId, dto);
    }
    findProducts(tenantId, branchId, page, limit) {
        return this.inventoryService.findProducts(tenantId, branchId, page, limit);
    }
    lowStock(tenantId, branchId) {
        return this.inventoryService.getLowStockAlerts(tenantId, branchId);
    }
    findOneProduct(id, tenantId) {
        return this.inventoryService.findOneProduct(id, tenantId);
    }
    createProduct(tenantId, dto) {
        return this.inventoryService.createProduct(tenantId, dto);
    }
    updateProduct(id, tenantId, dto) {
        return this.inventoryService.updateProduct(id, tenantId, dto);
    }
    recordMovement(id, tenantId, dto) {
        return this.inventoryService.recordStockMovement(id, tenantId, dto);
    }
    getMovements(id, tenantId) {
        return this.inventoryService.getStockMovements(id, tenantId);
    }
    findTransfers(fromBranchId) {
        return this.inventoryService.findTransfers(fromBranchId);
    }
    createTransfer(dto) {
        return this.inventoryService.createTransfer(dto);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('suppliers'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findSuppliers", null);
__decorate([
    (0, common_1.Post)('suppliers'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Patch)('suppliers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, inventory_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'List products' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('branchId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findProducts", null);
__decorate([
    (0, common_1.Get)('products/low-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Low stock alerts' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "lowStock", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findOneProduct", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, inventory_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Post)('products/:id/movements'),
    (0, swagger_1.ApiOperation)({ summary: 'Record stock movement' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, inventory_dto_1.StockMovementDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "recordMovement", null);
__decorate([
    (0, common_1.Get)('products/:id/movements'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getMovements", null);
__decorate([
    (0, common_1.Get)('transfers'),
    __param(0, (0, common_1.Query)('fromBranchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findTransfers", null);
__decorate([
    (0, common_1.Post)('transfers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.InventoryTransferDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createTransfer", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map