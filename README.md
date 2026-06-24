# OMAR CLINIC PRO

**نظام إدارة عيادات الليزر والجلدية والتجميل — Multi-Tenant SaaS**

Enterprise-grade clinic management platform with Arabic RTL-first UI, JWT authentication, RBAC, and full clinic operations modules.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, Shadcn-style UI, React Query, Zustand |
| Backend | NestJS, PostgreSQL, Prisma ORM, JWT, RBAC |
| Infrastructure | Docker, Docker Compose, Nginx, Redis, Daily Backups |

---

## Project Structure

```
omar-clinic-pro/
├── backend/          # NestJS API
│   ├── prisma/       # Schema + seed
│   └── src/          # Modules (auth, patients, laser, ...)
├── frontend/         # Next.js 15 App
│   └── src/
├── docs/             # Architecture & database docs
├── nginx/            # Reverse proxy config
└── docker-compose.yml
```

---

## Quick Start (Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 16
- Redis (optional for sessions)

### 1. Database

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run prisma:seed
```

### 2. Backend

```bash
cd backend
npm run start:dev
# API: http://localhost:4000/api/v1
# Swagger: http://localhost:4000/docs
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
# App: http://localhost:3000
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@omarclinic.com | Admin@123 |
| Branch Manager | manager@omarclinic.com | Manager@123 |

---

## Docker Production

```bash
# Set secrets
export JWT_SECRET=your-secure-secret
export JWT_REFRESH_SECRET=your-refresh-secret

docker compose up -d --build
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api/v1
- Nginx: http://localhost:80
- PostgreSQL: localhost:5432
- Redis: localhost:6379

Daily backups stored in `./backups/`

---

## Modules

- **Authentication** — Login, Logout, OTP, 2FA, Sessions
- **Dashboard** — Revenue, appointments, charts
- **Patients** — Profiles, medical info, documents, timeline
- **Appointments** — Calendar, reminders (WhatsApp/SMS)
- **Laser** — Sessions, areas, before/after photos
- **Packages** — Session packages tracking
- **Sales** — Invoices, payments, refunds
- **Accounting** — Income, expenses, cashbox, reports
- **Inventory** — Stock, suppliers, alerts
- **Staff** — Attendance, leave, payroll
- **Marketing CRM** — Leads, campaigns, follow-ups
- **Reports** — Revenue, patients, staff (PDF/Excel ready)
- **Multi-Branch** — Multiple clinic locations
- **Super Admin** — Tenants, plans, subscriptions

---

## API Documentation

Swagger UI available at `/docs` when backend is running.

---

## Security Notes

- Change `JWT_SECRET` and `JWT_REFRESH_SECRET` in production
- Use HTTPS via Nginx SSL termination
- Enable 2FA for admin accounts
- Review RBAC permissions per role

---

## License

Proprietary — OMAR CLINIC PRO © 2026
