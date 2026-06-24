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
exports.MarketingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const marketing_service_1 = require("./marketing.service");
const marketing_dto_1 = require("./dto/marketing.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let MarketingController = class MarketingController {
    constructor(marketingService) {
        this.marketingService = marketingService;
    }
    findLeads(tenantId, status, source, page, limit) {
        return this.marketingService.findLeads(tenantId, status, source, page, limit);
    }
    findOneLead(id, tenantId) {
        return this.marketingService.findOneLead(id, tenantId);
    }
    createLead(tenantId, dto) {
        return this.marketingService.createLead(tenantId, dto);
    }
    updateLead(id, tenantId, dto) {
        return this.marketingService.updateLead(id, tenantId, dto);
    }
    findCampaigns(tenantId) {
        return this.marketingService.findCampaigns(tenantId);
    }
    findOneCampaign(id, tenantId) {
        return this.marketingService.findOneCampaign(id, tenantId);
    }
    createCampaign(tenantId, dto) {
        return this.marketingService.createCampaign(tenantId, dto);
    }
    updateCampaign(id, tenantId, dto) {
        return this.marketingService.updateCampaign(id, tenantId, dto);
    }
    pendingFollowUps(tenantId) {
        return this.marketingService.getPendingFollowUps(tenantId);
    }
    createFollowUp(id, tenantId, dto) {
        return this.marketingService.createFollowUp(id, tenantId, dto);
    }
    completeFollowUp(leadId, followUpId, tenantId, dto) {
        return this.marketingService.completeFollowUp(leadId, followUpId, tenantId, dto);
    }
};
exports.MarketingController = MarketingController;
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('source')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "findLeads", null);
__decorate([
    (0, common_1.Get)('leads/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "findOneLead", null);
__decorate([
    (0, common_1.Post)('leads'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, marketing_dto_1.CreateLeadDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "createLead", null);
__decorate([
    (0, common_1.Patch)('leads/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, marketing_dto_1.UpdateLeadDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "updateLead", null);
__decorate([
    (0, common_1.Get)('campaigns'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "findCampaigns", null);
__decorate([
    (0, common_1.Get)('campaigns/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "findOneCampaign", null);
__decorate([
    (0, common_1.Post)('campaigns'),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, marketing_dto_1.CreateCampaignDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Patch)('campaigns/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, marketing_dto_1.UpdateCampaignDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "updateCampaign", null);
__decorate([
    (0, common_1.Get)('follow-ups/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Pending follow-ups' }),
    __param(0, (0, current_user_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "pendingFollowUps", null);
__decorate([
    (0, common_1.Post)('leads/:id/follow-ups'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.TenantId)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, marketing_dto_1.CreateFollowUpDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "createFollowUp", null);
__decorate([
    (0, common_1.Patch)('leads/:leadId/follow-ups/:followUpId/complete'),
    __param(0, (0, common_1.Param)('leadId')),
    __param(1, (0, common_1.Param)('followUpId')),
    __param(2, (0, current_user_decorator_1.TenantId)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, marketing_dto_1.CompleteFollowUpDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "completeFollowUp", null);
exports.MarketingController = MarketingController = __decorate([
    (0, swagger_1.ApiTags)('Marketing'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('marketing'),
    __metadata("design:paramtypes", [marketing_service_1.MarketingService])
], MarketingController);
//# sourceMappingURL=marketing.controller.js.map