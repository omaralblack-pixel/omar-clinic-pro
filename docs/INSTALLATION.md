# دليل التثبيت — OMAR CLINIC PRO

## المتطلبات

- Node.js 20+
- PostgreSQL 16
- (اختياري) Docker Desktop
- (اختياري) Redis

---

## التثبيت السريع (بدون Docker)

### 1. PostgreSQL

أنشئ قاعدة بيانات:

```sql
CREATE DATABASE omar_clinic_pro;
CREATE USER omar WITH PASSWORD 'omar_secret';
GRANT ALL PRIVILEGES ON DATABASE omar_clinic_pro TO omar;
```

### 2. Backend

```powershell
cd omar-clinic-pro\backend
Copy-Item .env.example .env
npm install
npx prisma db push
npm run prisma:seed
npm run start:dev
```

### 3. Frontend

```powershell
cd omar-clinic-pro\frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

### 4. افتح المتصفح

- الواجهة: http://localhost:3000/login
- API: http://localhost:4000/api/v1
- Swagger: http://localhost:4000/docs

---

## بيانات الدخول

| الدور | البريد | كلمة المرور |
|-------|--------|-------------|
| مدير فرع | manager@omarclinic.com | Manager@123 |
| Super Admin | admin@omarclinic.com | Admin@123 |

> استخدم **manager@omarclinic.com** للوصول الكامل للوحة التحكم (مرتبط بعيادة Omar Clinic).

---

## Docker (إنتاج)

```bash
docker compose up -d --build
```

---

## استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| `Can't reach database` | تأكد من تشغيل PostgreSQL وصحة `DATABASE_URL` في `.env` |
| `401 Unauthorized` | سجّل الدخول من `/login` |
| Dashboard فارغ | استخدم حساب manager وليس super admin (بدون tenant) |
| OTP في التطوير | راجع console الخادم — يُطبع الرمز هناك |

---

## أوامر مفيدة

```bash
npx prisma studio      # عرض البيانات
npm run prisma:seed    # إعادة البيانات التجريبية
npm run build          # بناء للإنتاج
```
