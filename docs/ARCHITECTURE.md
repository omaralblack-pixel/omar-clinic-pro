# OMAR CLINIC PRO — System Architecture

## Overview

Multi-tenant SaaS platform for laser, dermatology, beauty, and cosmetic clinic management.

```
┌─────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                    │
│                    SSL · Rate Limit · Static Assets              │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
┌─────────────────┐                   ┌─────────────────┐
│  Next.js 15     │                   │  NestJS API     │
│  Frontend       │◄── REST/JSON ────►│  Backend        │
│  RTL Arabic     │                   │  JWT + RBAC     │
└─────────────────┘                   └────────┬────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    ▼                          ▼                          ▼
            ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
            │ PostgreSQL   │          │ Redis        │          │ File Storage │
            │ (Prisma ORM) │          │ Sessions/Cache│         │ S3/Local     │
            └──────────────┘          └──────────────┘          └──────────────┘
```

## Multi-Tenancy Model

| Layer | Description |
|-------|-------------|
| **Tenant** | Clinic organization (subscription owner) |
| **Branch** | Physical clinic location under a tenant |
| **User** | Staff member scoped to tenant + optional branch |
| **Data isolation** | All queries filtered by `tenantId` (+ `branchId` where applicable) |

## Backend Module Structure

```
backend/src/
├── main.ts
├── app.module.ts
├── common/           # Guards, filters, decorators, interceptors
├── config/           # Environment configuration
├── prisma/           # Prisma service
├── auth/             # Login, OTP, 2FA, sessions
├── tenants/          # Super admin: tenants, plans, subscriptions
├── branches/         # Multi-branch management
├── users/            # User CRUD + RBAC
├── patients/         # Patient profiles, medical info, files
├── appointments/     # Calendar, scheduling, reminders
├── laser/            # Sessions, areas, photos
├── packages/         # Treatment packages
├── sales/            # Invoices, payments, refunds
├── accounting/       # Income, expenses, cashbox, reports
├── inventory/        # Products, stock, suppliers
├── staff/            # Attendance, leave, payroll
├── marketing/        # Leads, campaigns, follow-ups
├── whatsapp/         # Messaging integration
├── reports/          # PDF/Excel generation
├── dashboard/        # Analytics widgets
└── files/            # Upload/storage service
```

## Frontend Route Structure

```
frontend/src/app/
├── (auth)/           # login, forgot-password, otp, 2fa
├── (dashboard)/      # Protected app shell
│   ├── dashboard/
│   ├── patients/
│   ├── appointments/
│   ├── laser/
│   ├── packages/
│   ├── sales/
│   ├── accounting/
│   ├── inventory/
│   ├── staff/
│   ├── marketing/
│   ├── reports/
│   ├── branches/
│   └── settings/
└── (admin)/          # Super admin panel
    └── admin/
```

## Security

- JWT access tokens (15 min) + refresh tokens (7 days)
- RBAC with granular permissions per module
- Tenant isolation enforced at guard + Prisma middleware level
- OTP for password reset and optional 2FA (TOTP)
- Rate limiting via Redis
- Audit logging for sensitive operations

## Roles & Permissions

| Role | Scope |
|------|-------|
| SUPER_ADMIN | Platform-wide: tenants, plans, subscriptions |
| BRANCH_MANAGER | Full branch operations |
| RECEPTIONIST | Patients, appointments, basic sales |
| DOCTOR | Patients, appointments, medical notes |
| LASER_SPECIALIST | Laser sessions, patient laser history |
| ACCOUNTANT | Sales, accounting, reports |
| MARKETING_OFFICER | Leads, campaigns, follow-ups |
