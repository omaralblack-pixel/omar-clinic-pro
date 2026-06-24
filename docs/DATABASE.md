# OMAR CLINIC PRO — Database Schema Reference

## Entity Relationship Overview

```
Tenant ──┬── Branch ──┬── User
         │            ├── Patient ──┬── Appointment
         │            │              ├── LaserSession
         │            │              ├── PatientPackage
         │            │              └── Invoice
         │            ├── Product (Inventory)
         │            ├── Employee (Staff)
         │            └── Lead (Marketing)
         ├── SubscriptionPlan
         └── Subscription
```

## Core Tables (40+ models)

### Platform & Auth
- `tenants`, `branches`, `subscription_plans`, `subscriptions`
- `users`, `roles`, `permissions`, `role_permissions`, `user_roles`
- `sessions`, `otp_tokens`, `refresh_tokens`, `audit_logs`

### Clinical
- `patients`, `patient_medical_info`, `patient_documents`, `patient_timeline_events`
- `laser_areas`, `laser_sessions`, `laser_session_photos`
- `appointments`, `appointment_reminders`
- `service_packages`, `patient_packages`

### Financial
- `invoices`, `invoice_items`, `payments`, `refunds`
- `income_records`, `expense_records`, `cashboxes`, `cashbox_transactions`

### Operations
- `products`, `suppliers`, `stock_movements`, `inventory_transfers`
- `employees`, `attendance_records`, `leave_requests`, `payroll_records`
- `leads`, `campaigns`, `follow_ups`, `whatsapp_messages`

## Indexing Strategy

- Composite indexes on `(tenantId, branchId)` for branch-scoped queries
- `(tenantId, createdAt)` for timeline and reporting
- `(patientId, date)` for appointments and sessions
- `(status, scheduledAt)` for appointment calendar queries

## Enums

See `backend/prisma/schema.prisma` for full enum definitions including:
- User roles, appointment status, payment methods
- Invoice status, stock movement types, lead sources
