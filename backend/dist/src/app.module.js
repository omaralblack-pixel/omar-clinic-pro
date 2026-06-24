"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tenants_module_1 = require("./tenants/tenants.module");
const branches_module_1 = require("./branches/branches.module");
const patients_module_1 = require("./patients/patients.module");
const appointments_module_1 = require("./appointments/appointments.module");
const laser_module_1 = require("./laser/laser.module");
const packages_module_1 = require("./packages/packages.module");
const sales_module_1 = require("./sales/sales.module");
const accounting_module_1 = require("./accounting/accounting.module");
const inventory_module_1 = require("./inventory/inventory.module");
const staff_module_1 = require("./staff/staff.module");
const marketing_module_1 = require("./marketing/marketing.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const reports_module_1 = require("./reports/reports.module");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const files_module_1 = require("./files/files.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            branches_module_1.BranchesModule,
            patients_module_1.PatientsModule,
            appointments_module_1.AppointmentsModule,
            laser_module_1.LaserModule,
            packages_module_1.PackagesModule,
            sales_module_1.SalesModule,
            accounting_module_1.AccountingModule,
            inventory_module_1.InventoryModule,
            staff_module_1.StaffModule,
            marketing_module_1.MarketingModule,
            dashboard_module_1.DashboardModule,
            reports_module_1.ReportsModule,
            whatsapp_module_1.WhatsappModule,
            files_module_1.FilesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map