"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding OMAR CLINIC PRO database...');
    const passwordHash = await bcrypt.hash('Admin@123', 12);
    const superAdmin = await prisma.user.upsert({
        where: { email: 'admin@omarclinic.com' },
        update: { passwordHash },
        create: {
            email: 'admin@omarclinic.com',
            passwordHash,
            firstName: 'Super',
            lastName: 'Admin',
            firstNameAr: 'مدير',
            lastNameAr: 'النظام',
            role: client_1.UserRole.SUPER_ADMIN,
            emailVerified: true,
            isActive: true,
        },
    });
    const plan = await prisma.subscriptionPlan.upsert({
        where: { id: 'seed-plan-professional' },
        update: {},
        create: {
            id: 'seed-plan-professional',
            name: 'Professional',
            nameAr: 'احترافي',
            description: 'Full clinic management for multi-branch operations',
            price: 199,
            currency: 'JOD',
            maxBranches: 5,
            maxUsers: 25,
            features: ['appointments', 'laser', 'inventory', 'accounting', 'marketing', 'whatsapp'],
            isActive: true,
        },
    });
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'omar-clinic' },
        update: {},
        create: {
            name: 'Omar Clinic',
            nameAr: 'عيادة عمر',
            slug: 'omar-clinic',
            email: 'info@omarclinic.com',
            phone: '+962791234567',
            address: 'Amman, Jordan',
            isActive: true,
            settings: { timezone: 'Asia/Amman', currency: 'JOD', locale: 'ar' },
        },
    });
    await prisma.subscription.upsert({
        where: { id: 'seed-sub-omar-clinic' },
        update: {},
        create: {
            id: 'seed-sub-omar-clinic',
            tenantId: tenant.id,
            planId: plan.id,
            status: client_1.SubscriptionStatus.ACTIVE,
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
    });
    const branchMain = await prisma.branch.upsert({
        where: { tenantId_code: { tenantId: tenant.id, code: 'MAIN' } },
        update: {},
        create: {
            tenantId: tenant.id,
            name: 'Omar Clinic - Main',
            nameAr: 'عيادة عمر - الرئيسي',
            code: 'MAIN',
            phone: '+962791234567',
            email: 'main@omarclinic.com',
            address: 'Abdoun, Amman',
            city: 'Amman',
            isActive: true,
        },
    });
    const branchSecond = await prisma.branch.upsert({
        where: { tenantId_code: { tenantId: tenant.id, code: 'SWF' } },
        update: {},
        create: {
            tenantId: tenant.id,
            name: 'Omar Clinic - Sweifieh',
            nameAr: 'عيادة عمر - الصويفية',
            code: 'SWF',
            phone: '+962791234568',
            email: 'swf@omarclinic.com',
            address: 'Sweifieh, Amman',
            city: 'Amman',
            isActive: true,
        },
    });
    const managerHash = await bcrypt.hash('Manager@123', 12);
    const manager = await prisma.user.upsert({
        where: { email: 'manager@omarclinic.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            branchId: branchMain.id,
            email: 'manager@omarclinic.com',
            passwordHash: managerHash,
            firstName: 'Sara',
            lastName: 'Ahmad',
            firstNameAr: 'سارة',
            lastNameAr: 'أحمد',
            role: client_1.UserRole.BRANCH_MANAGER,
            phone: '+962791111111',
            emailVerified: true,
        },
    });
    const permissions = [
        { code: 'patients.read', name: 'View Patients', module: 'patients' },
        { code: 'patients.write', name: 'Manage Patients', module: 'patients' },
        { code: 'appointments.manage', name: 'Manage Appointments', module: 'appointments' },
        { code: 'sales.manage', name: 'Manage Sales', module: 'sales' },
        { code: 'inventory.manage', name: 'Manage Inventory', module: 'inventory' },
    ];
    for (const perm of permissions) {
        await prisma.permission.upsert({
            where: { code: perm.code },
            update: {},
            create: perm,
        });
    }
    const patientPerm = await prisma.permission.findUnique({
        where: { code: 'patients.read' },
    });
    if (patientPerm) {
        await prisma.userPermission.upsert({
            where: {
                userId_permissionId: { userId: manager.id, permissionId: patientPerm.id },
            },
            update: {},
            create: { userId: manager.id, permissionId: patientPerm.id, granted: true },
        });
    }
    const patients = await Promise.all([
        prisma.patient.upsert({
            where: { tenantId_patientNumber: { tenantId: tenant.id, patientNumber: 'P-000001' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchMain.id,
                patientNumber: 'P-000001',
                firstName: 'Layla',
                lastName: 'Hassan',
                firstNameAr: 'ليلى',
                lastNameAr: 'حسن',
                gender: client_1.Gender.FEMALE,
                phone: '+962790000001',
                whatsapp: '+962790000001',
                email: 'layla@example.com',
            },
        }),
        prisma.patient.upsert({
            where: { tenantId_patientNumber: { tenantId: tenant.id, patientNumber: 'P-000002' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchSecond.id,
                patientNumber: 'P-000002',
                firstName: 'Omar',
                lastName: 'Khalil',
                firstNameAr: 'عمر',
                lastNameAr: 'خليل',
                gender: client_1.Gender.MALE,
                phone: '+962790000002',
                whatsapp: '+962790000002',
            },
        }),
        prisma.patient.upsert({
            where: { tenantId_patientNumber: { tenantId: tenant.id, patientNumber: 'P-000003' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchMain.id,
                patientNumber: 'P-000003',
                firstName: 'Nour',
                lastName: 'Saleh',
                firstNameAr: 'نور',
                lastNameAr: 'صالح',
                gender: client_1.Gender.FEMALE,
                phone: '+962790000003',
            },
        }),
    ]);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(14, 30, 0, 0);
    await prisma.appointment.createMany({
        skipDuplicates: true,
        data: [
            {
                tenantId: tenant.id,
                branchId: branchMain.id,
                patientId: patients[0].id,
                title: 'Laser Consultation',
                scheduledAt: tomorrow,
                duration: 30,
                status: client_1.AppointmentStatus.CONFIRMED,
            },
            {
                tenantId: tenant.id,
                branchId: branchSecond.id,
                patientId: patients[1].id,
                title: 'Follow-up Session',
                scheduledAt: nextWeek,
                duration: 45,
                status: client_1.AppointmentStatus.SCHEDULED,
            },
        ],
    });
    const laserAreas = await Promise.all([
        prisma.laserArea.upsert({
            where: { id: 'seed-area-face' },
            update: {},
            create: {
                id: 'seed-area-face',
                tenantId: tenant.id,
                name: 'Face',
                nameAr: 'الوجه',
                preset: client_1.LaserAreaPreset.FACE,
            },
        }),
        prisma.laserArea.upsert({
            where: { id: 'seed-area-underarms' },
            update: {},
            create: {
                id: 'seed-area-underarms',
                tenantId: tenant.id,
                name: 'Underarms',
                nameAr: 'الإبط',
                preset: client_1.LaserAreaPreset.UNDERARMS,
            },
        }),
        prisma.laserArea.upsert({
            where: { id: 'seed-area-legs' },
            update: {},
            create: {
                id: 'seed-area-legs',
                tenantId: tenant.id,
                name: 'Full Legs',
                nameAr: 'الساقين',
                preset: client_1.LaserAreaPreset.LEGS,
            },
        }),
    ]);
    const supplier = await prisma.supplier.upsert({
        where: { id: 'seed-supplier-1' },
        update: {},
        create: {
            id: 'seed-supplier-1',
            tenantId: tenant.id,
            name: 'MedSupply Jordan',
            phone: '+96265551234',
            email: 'orders@medsupply.jo',
        },
    });
    await Promise.all([
        prisma.product.upsert({
            where: { tenantId_sku: { tenantId: tenant.id, sku: 'SPF-50-001' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchMain.id,
                supplierId: supplier.id,
                sku: 'SPF-50-001',
                name: 'Sunscreen SPF 50',
                nameAr: 'واقي شمس SPF 50',
                category: 'Skincare',
                quantity: 25,
                minStock: 10,
                costPrice: 8,
                sellingPrice: 15,
            },
        }),
        prisma.product.upsert({
            where: { tenantId_sku: { tenantId: tenant.id, sku: 'GEL-COOL-002' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchMain.id,
                supplierId: supplier.id,
                sku: 'GEL-COOL-002',
                name: 'Cooling Gel Post-Laser',
                nameAr: 'جل التبريد بعد الليزر',
                category: 'Laser Supplies',
                quantity: 3,
                minStock: 5,
                costPrice: 12,
                sellingPrice: 22,
            },
        }),
        prisma.product.upsert({
            where: { tenantId_sku: { tenantId: tenant.id, sku: 'SERUM-VITC-003' } },
            update: {},
            create: {
                tenantId: tenant.id,
                branchId: branchSecond.id,
                sku: 'SERUM-VITC-003',
                name: 'Vitamin C Serum',
                nameAr: 'سيرum فيتامين C',
                category: 'Skincare',
                quantity: 15,
                minStock: 5,
                costPrice: 18,
                sellingPrice: 35,
            },
        }),
    ]);
    await prisma.servicePackage.upsert({
        where: { id: 'seed-pkg-laser-6' },
        update: {},
        create: {
            id: 'seed-pkg-laser-6',
            tenantId: tenant.id,
            name: 'Laser 6 Sessions Package',
            nameAr: 'باقة ليزر 6 جلسات',
            description: '6 laser sessions for one body area',
            totalSessions: 6,
            price: 180,
            validityDays: 365,
        },
    });
    await prisma.cashbox.upsert({
        where: { id: 'seed-cashbox-main' },
        update: {},
        create: {
            id: 'seed-cashbox-main',
            branchId: branchMain.id,
            name: 'Main Cashbox',
            balance: 500,
            currency: 'JOD',
        },
    });
    await prisma.lead.create({
        data: {
            tenantId: tenant.id,
            branchId: branchMain.id,
            name: 'Rania Mansour',
            phone: '+962790000099',
            source: client_1.LeadSource.INSTAGRAM,
            notes: 'Interested in laser full body package',
        },
    });
    console.log('✅ Seed completed successfully');
    console.log(`   Super Admin: admin@omarclinic.com / Admin@123`);
    console.log(`   Branch Manager: manager@omarclinic.com / Manager@123`);
    console.log(`   Tenant: ${tenant.name} (${tenant.slug})`);
    console.log(`   Branches: ${branchMain.name}, ${branchSecond.name}`);
    console.log(`   Patients: ${patients.length}, Laser Areas: ${laserAreas.length}`);
    console.log(`   Plan: ${plan.name} (${plan.price} ${plan.currency}/mo)`);
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map