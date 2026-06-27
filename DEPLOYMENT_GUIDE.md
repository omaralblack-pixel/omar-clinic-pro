# دليل نشر مشروع OMAR CLINIC PRO

يهدف هذا الدليل إلى توفير تعليمات شاملة لنشر مشروع OMAR CLINIC PRO، وهو نظام إدارة عيادات متكامل (Multi-Tenant SaaS) يتكون من واجهة أمامية (Frontend) مبنية باستخدام Next.js، وواجهة خلفية (Backend) مبنية باستخدام NestJS، مع قاعدة بيانات PostgreSQL وخدمة Redis.

## 1. نظرة عامة على المشروع والتقنيات المستخدمة

| المكوّن | التقنية |
| :------ | :------ |
| **الواجهة الأمامية (Frontend)** | Next.js 15, TypeScript, TailwindCSS, React Query, Zustand |
| **الواجهة الخلفية (Backend)** | NestJS, PostgreSQL, Prisma ORM, JWT, RBAC |
| **قاعدة البيانات** | PostgreSQL |
| **الـ Cache / Sessions** | Redis |
| **الـ Reverse Proxy** | Nginx |
| **الـ Orchestration** | Docker, Docker Compose |

## 2. المتطلبات الأساسية (Prerequisites)

قبل البدء بالنشر، تأكد من توفر المتطلبات التالية على خادمك:

*   **Docker و Docker Compose:** (موصى به للنشر السهل)
    *   [تثبيت Docker](https://docs.docker.com/engine/install/)
    *   [تثبيت Docker Compose](https://docs.docker.com/compose/install/)
*   **Node.js (الإصدار 20 أو أحدث) و npm:** (للنشر اليدوي)
    *   [تثبيت Node.js](https://nodejs.org/en/download/package-manager)
*   **PostgreSQL (الإصدار 16 أو أحدث):** (للنشر اليدوي)
    *   [تثبيت PostgreSQL](https://www.postgresql.org/download/)
*   **Redis Server:** (للنشر اليدوي)
    *   [تثبيت Redis](https://redis.io/docs/getting-started/installation/)
*   **Git:** لنسخ المستودع.

## 3. إعدادات البيئة (Environment Variables)

يستخدم المشروع ملفات `.env` لإدارة متغيرات البيئة. ستحتاج إلى إنشاء هذه الملفات في مجلدات `backend` و `frontend`.

### 3.1. Backend (`backend/.env`)

قم بإنشاء ملف `.env` في مجلد `backend` بالاعتماد على `backend/.env.example` وقم بتعديل القيم حسب بيئة النشر الخاصة بك:

```env
NODE_ENV=production
PORT=4000
API_PREFIX=api/v1

# Database
DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"

# JWT - قم بتغيير هذه القيم إلى سلاسل عشوائية قوية في بيئة الإنتاج
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRES=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# OTP
OTP_EXPIRES_MINUTES=10

# File Storage - إذا كنت تستخدم تخزين محلي، تأكد من أن المسار قابل للكتابة
STORAGE_TYPE=local
STORAGE_PATH=./uploads
STORAGE_MAX_SIZE=10485760

# CORS - قم بتغيير هذا إلى نطاق الواجهة الأمامية الخاص بك في بيئة الإنتاج
CORS_ORIGIN=*

# WhatsApp (اختياري - قم بتكوينه مع مزود الخدمة الخاص بك)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
```

**ملاحظات هامة:**
*   **`DATABASE_URL`**: يجب أن يشير إلى قاعدة بيانات PostgreSQL الخاصة بك. مثال: `postgresql://omar:omar_secret@localhost:5432/omar_clinic_pro?schema=public`.
*   **`JWT_SECRET` و `JWT_REFRESH_SECRET`**: قم بتوليد سلاسل عشوائية قوية جداً لهذه المتغيرات لأمان التطبيق.
*   **`CORS_ORIGIN`**: في بيئة الإنتاج، يجب أن تكون هذه القيمة هي نطاق الواجهة الأمامية (مثال: `https://your-frontend-domain.com`) بدلاً من `*`.

### 3.2. Frontend (`frontend/.env`)

قم بإنشاء ملف `.env` في مجلد `frontend` بالاعتماد على `frontend/.env.example` وقم بتعديل القيم:

```env
NEXT_PUBLIC_API_URL="https://your-backend-api-domain.com/api/v1"
NEXT_PUBLIC_APP_NAME="OMAR CLINIC PRO"
```

**ملاحظات هامة:**
*   **`NEXT_PUBLIC_API_URL`**: يجب أن يشير إلى الرابط العام للواجهة الخلفية (Backend API) الخاصة بك.

## 4. خيارات النشر (Deployment Options)

### 4.1. النشر باستخدام Docker Compose (موصى به)

هذه هي الطريقة الأسهل والأكثر موثوقية لنشر المشروع، حيث تقوم بتشغيل جميع الخدمات (PostgreSQL, Redis, Backend, Frontend, Nginx) في حاويات Docker معزولة.

1.  **نسخ المستودع:**
    ```bash
    git clone https://github.com/omaralblack-pixel/omar-clinic-pro.git
    cd omar-clinic-pro
    ```

2.  **إعداد ملفات البيئة:**
    *   قم بإنشاء وتعديل ملف `backend/.env` كما هو موضح في القسم 3.1.
    *   قم بإنشاء وتعديل ملف `frontend/.env` كما هو موضح في القسم 3.2.

3.  **تشغيل المشروع:**
    ```bash
    docker compose up -d --build
    ```
    سيقوم هذا الأمر ببناء صور Docker وتشغيل جميع الخدمات في الخلفية.

4.  **التحقق من حالة الخدمات:**
    ```bash
    docker compose ps
    ```

5.  **الوصول إلى التطبيق:**
    *   الواجهة الأمامية ستكون متاحة عادةً على المنفذ 80 أو 443 (عبر Nginx) أو المنفذ 3000 إذا لم يتم استخدام Nginx.
    *   الواجهة الخلفية ستكون متاحة على المنفذ 4000.

### 4.2. النشر اليدوي (بدون Docker)

إذا كنت تفضل النشر اليدوي، اتبع الخطوات التالية:

#### 4.2.1. إعداد قاعدة البيانات (PostgreSQL)

1.  **تثبيت PostgreSQL:** إذا لم يكن مثبتاً بالفعل.
2.  **إنشاء مستخدم وقاعدة بيانات:**
    ```bash
    sudo -u postgres psql -c "CREATE USER omar WITH PASSWORD 'omar_secret';"
    sudo -u postgres psql -c "CREATE DATABASE omar_clinic_pro OWNER omar;"
    sudo -u postgres psql -c "ALTER USER omar WITH SUPERUSER;" # قد تحتاج هذه الصلاحية لـ Prisma Migrate
    ```
    **ملاحظة:** تأكد من مطابقة اسم المستخدم وكلمة المرور واسم قاعدة البيانات مع ما هو موجود في `DATABASE_URL` في ملف `backend/.env`.

3.  **استعادة البيانات (اختياري):**
    إذا كان لديك ملف `database_backup.sql`، يمكنك استعادته:
    ```bash
    sudo -u postgres psql -d omar_clinic_pro -f database_backup.sql
    ```

4.  **تطبيق ترحيلات Prisma:**
    ```bash
    cd omar-clinic-pro/backend
    export DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public" # استخدم DATABASE_URL الصحيح
    npm install
    npx prisma migrate deploy
    npm run prisma:seed # لتعبئة قاعدة البيانات ببيانات أولية
    ```

#### 4.2.2. إعداد وتشغيل الواجهة الخلفية (Backend - NestJS)

1.  **نسخ المستودع:**
    ```bash
    git clone https://github.com/omaralblack-pixel/omar-clinic-pro.git
    cd omar-clinic-pro/backend
    ```

2.  **إعداد ملف البيئة:**
    *   قم بإنشاء وتعديل ملف `.env` كما هو موضح في القسم 3.1.

3.  **تثبيت الاعتمادات وبناء المشروع:**
    ```bash
    npm install
    npm run build
    ```

4.  **تشغيل الخادم:**
    يمكنك استخدام `pm2` لإدارة عملية الـ Backend في الخلفية:
    ```bash
    npm install -g pm2 # إذا لم يكن مثبتاً
    pm2 start dist/src/main.js --name "omar-backend"
    pm2 save
    pm2 startup
    ```
    الـ Backend سيعمل على المنفذ 4000 افتراضياً.

#### 4.2.3. إعداد وتشغيل الواجهة الأمامية (Frontend - Next.js)

1.  **نسخ المستودع:**
    ```bash
    git clone https://github.com/omaralblack-pixel/omar-clinic-pro.git
    cd omar-clinic-pro/frontend
    ```

2.  **إعداد ملف البيئة:**
    *   قم بإنشاء وتعديل ملف `.env` كما هو موضح في القسم 3.2.

3.  **تثبيت الاعتمادات وبناء المشروع:**
    ```bash
    npm install
    npm run build
    ```

4.  **تشغيل الخادم:**
    يمكنك استخدام `pm2` لإدارة عملية الـ Frontend في الخلفية:
    ```bash
    pm2 start "npm start" --name "omar-frontend" --cwd /home/ubuntu/omar-clinic-pro/frontend
    pm2 save
    ```
    الـ Frontend سيعمل على المنفذ 3000 افتراضياً.

#### 4.2.4. إعداد Nginx كـ Reverse Proxy (اختياري ولكن موصى به)

لتحسين الأداء والأمان وإدارة شهادات SSL، يوصى باستخدام Nginx كـ Reverse Proxy.

1.  **تثبيت Nginx:**
    ```bash
    sudo apt update
    sudo apt install nginx
    ```

2.  **تكوين Nginx:**
    يمكنك استخدام ملف `nginx/nginx.conf` الموجود في المستودع كقالب. قم بتعديله ليناسب نطاقك وإعداداتك.
    مثال لملف تكوين Nginx (عادةً في `/etc/nginx/sites-available/your_domain`):

    ```nginx
    server {
        listen 80;
        server_name your_domain.com www.your_domain.com;

        location /api/v1/ {
            proxy_pass http://localhost:4000/api/v1/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **تفعيل التكوين وإعادة تشغيل Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
    sudo nginx -t # للتحقق من صحة التكوين
    sudo systemctl restart nginx
    ```

## 5. النسخ الاحتياطي لقاعدة البيانات (Database Backup)

تم تضمين ملف `database_backup.sql` في جذر المستودع. يمكنك استخدامه لاستعادة قاعدة البيانات في أي بيئة PostgreSQL أخرى.

**للاستعادة:**

1.  تأكد من إنشاء قاعدة البيانات والمستخدم بالصلاحيات المناسبة (كما في القسم 4.2.1).
2.  قم بتشغيل الأمر التالي:
    ```bash
    sudo -u postgres psql -d omar_clinic_pro -f /path/to/your/cloned/repo/database_backup.sql
    ```

---
