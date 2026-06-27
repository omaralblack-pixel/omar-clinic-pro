--
-- PostgreSQL database dump
--

\restrict FrzENJrqejoNC4v4lSQ6TbPjGVKepvdy1FidKxPneBR85Cr6b3sZx3Az9inKpdk

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: AppointmentStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."AppointmentStatus" AS ENUM (
    'SCHEDULED',
    'CONFIRMED',
    'ARRIVED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW'
);


ALTER TYPE public."AppointmentStatus" OWNER TO omar;

--
-- Name: AttendanceStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."AttendanceStatus" AS ENUM (
    'PRESENT',
    'ABSENT',
    'LATE',
    'HALF_DAY',
    'ON_LEAVE'
);


ALTER TYPE public."AttendanceStatus" OWNER TO omar;

--
-- Name: CampaignStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."CampaignStatus" AS ENUM (
    'DRAFT',
    'ACTIVE',
    'PAUSED',
    'COMPLETED'
);


ALTER TYPE public."CampaignStatus" OWNER TO omar;

--
-- Name: CashboxTransactionType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."CashboxTransactionType" AS ENUM (
    'INCOME',
    'EXPENSE',
    'TRANSFER',
    'ADJUSTMENT'
);


ALTER TYPE public."CashboxTransactionType" OWNER TO omar;

--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."DocumentType" AS ENUM (
    'DOCUMENT',
    'CONSENT_FORM',
    'BEFORE_PHOTO',
    'AFTER_PHOTO',
    'OTHER'
);


ALTER TYPE public."DocumentType" OWNER TO omar;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE public."Gender" OWNER TO omar;

--
-- Name: InvoiceItemType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."InvoiceItemType" AS ENUM (
    'TREATMENT',
    'PACKAGE',
    'PRODUCT'
);


ALTER TYPE public."InvoiceItemType" OWNER TO omar;

--
-- Name: InvoiceStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."InvoiceStatus" AS ENUM (
    'DRAFT',
    'PENDING',
    'PARTIALLY_PAID',
    'PAID',
    'REFUNDED',
    'CANCELLED'
);


ALTER TYPE public."InvoiceStatus" OWNER TO omar;

--
-- Name: LaserAreaPreset; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."LaserAreaPreset" AS ENUM (
    'FACE',
    'FULL_BODY',
    'BIKINI',
    'UNDERARMS',
    'LEGS',
    'ARMS',
    'CUSTOM'
);


ALTER TYPE public."LaserAreaPreset" OWNER TO omar;

--
-- Name: LeadSource; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."LeadSource" AS ENUM (
    'FACEBOOK',
    'INSTAGRAM',
    'WHATSAPP',
    'WEBSITE',
    'REFERRAL',
    'WALK_IN',
    'OTHER'
);


ALTER TYPE public."LeadSource" OWNER TO omar;

--
-- Name: LeadStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."LeadStatus" AS ENUM (
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'CONVERTED',
    'LOST'
);


ALTER TYPE public."LeadStatus" OWNER TO omar;

--
-- Name: LeaveStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."LeaveStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED'
);


ALTER TYPE public."LeaveStatus" OWNER TO omar;

--
-- Name: OtpPurpose; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."OtpPurpose" AS ENUM (
    'PASSWORD_RESET',
    'EMAIL_VERIFICATION',
    'TWO_FACTOR',
    'LOGIN'
);


ALTER TYPE public."OtpPurpose" OWNER TO omar;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CASH',
    'VISA',
    'MASTERCARD',
    'BANK_TRANSFER',
    'CLIQ'
);


ALTER TYPE public."PaymentMethod" OWNER TO omar;

--
-- Name: PregnancyStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."PregnancyStatus" AS ENUM (
    'NOT_APPLICABLE',
    'NOT_PREGNANT',
    'PREGNANT',
    'BREASTFEEDING'
);


ALTER TYPE public."PregnancyStatus" OWNER TO omar;

--
-- Name: ReminderChannel; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."ReminderChannel" AS ENUM (
    'WHATSAPP',
    'SMS',
    'EMAIL'
);


ALTER TYPE public."ReminderChannel" OWNER TO omar;

--
-- Name: ReminderStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."ReminderStatus" AS ENUM (
    'PENDING',
    'SENT',
    'FAILED',
    'CANCELLED'
);


ALTER TYPE public."ReminderStatus" OWNER TO omar;

--
-- Name: SkinType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."SkinType" AS ENUM (
    'TYPE_I',
    'TYPE_II',
    'TYPE_III',
    'TYPE_IV',
    'TYPE_V',
    'TYPE_VI'
);


ALTER TYPE public."SkinType" OWNER TO omar;

--
-- Name: StockMovementType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."StockMovementType" AS ENUM (
    'STOCK_IN',
    'STOCK_OUT',
    'TRANSFER_IN',
    'TRANSFER_OUT',
    'ADJUSTMENT'
);


ALTER TYPE public."StockMovementType" OWNER TO omar;

--
-- Name: SubscriptionStatus; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."SubscriptionStatus" AS ENUM (
    'TRIAL',
    'ACTIVE',
    'PAST_DUE',
    'CANCELLED',
    'EXPIRED'
);


ALTER TYPE public."SubscriptionStatus" OWNER TO omar;

--
-- Name: TimelineEventType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."TimelineEventType" AS ENUM (
    'VISIT',
    'SESSION',
    'PAYMENT',
    'NOTE',
    'APPOINTMENT',
    'PACKAGE'
);


ALTER TYPE public."TimelineEventType" OWNER TO omar;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."UserRole" AS ENUM (
    'SUPER_ADMIN',
    'BRANCH_MANAGER',
    'RECEPTIONIST',
    'DOCTOR',
    'LASER_SPECIALIST',
    'ACCOUNTANT',
    'MARKETING_OFFICER'
);


ALTER TYPE public."UserRole" OWNER TO omar;

--
-- Name: WhatsAppMessageType; Type: TYPE; Schema: public; Owner: omar
--

CREATE TYPE public."WhatsAppMessageType" AS ENUM (
    'APPOINTMENT_REMINDER',
    'PAYMENT_REMINDER',
    'PROMOTIONAL',
    'CUSTOM'
);


ALTER TYPE public."WhatsAppMessageType" OWNER TO omar;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO omar;

--
-- Name: appointment_reminders; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.appointment_reminders (
    id text NOT NULL,
    appointment_id text NOT NULL,
    channel public."ReminderChannel" NOT NULL,
    scheduled_at timestamp(3) without time zone NOT NULL,
    status public."ReminderStatus" DEFAULT 'PENDING'::public."ReminderStatus" NOT NULL,
    sent_at timestamp(3) without time zone,
    error_message text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.appointment_reminders OWNER TO omar;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.appointments (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text NOT NULL,
    patient_id text NOT NULL,
    doctor_id text,
    title text NOT NULL,
    description text,
    scheduled_at timestamp(3) without time zone NOT NULL,
    duration integer DEFAULT 30 NOT NULL,
    status public."AppointmentStatus" DEFAULT 'SCHEDULED'::public."AppointmentStatus" NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.appointments OWNER TO omar;

--
-- Name: attendance_records; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.attendance_records (
    id text NOT NULL,
    employee_id text NOT NULL,
    branch_id text NOT NULL,
    date date NOT NULL,
    check_in timestamp(3) without time zone,
    check_out timestamp(3) without time zone,
    status public."AttendanceStatus" DEFAULT 'PRESENT'::public."AttendanceStatus" NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.attendance_records OWNER TO omar;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    tenant_id text,
    user_id text,
    action text NOT NULL,
    entity text NOT NULL,
    entity_id text,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    ip_address text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO omar;

--
-- Name: branches; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.branches (
    id text NOT NULL,
    tenant_id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    code text NOT NULL,
    phone text,
    email text,
    address text,
    city text,
    is_active boolean DEFAULT true NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.branches OWNER TO omar;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.campaigns (
    id text NOT NULL,
    tenant_id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    platform public."LeadSource" NOT NULL,
    budget numeric(10,2),
    status public."CampaignStatus" DEFAULT 'DRAFT'::public."CampaignStatus" NOT NULL,
    start_date timestamp(3) without time zone,
    end_date timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.campaigns OWNER TO omar;

--
-- Name: cashbox_transactions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.cashbox_transactions (
    id text NOT NULL,
    cashbox_id text NOT NULL,
    type public."CashboxTransactionType" NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text NOT NULL,
    reference text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cashbox_transactions OWNER TO omar;

--
-- Name: cashboxes; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.cashboxes (
    id text NOT NULL,
    branch_id text NOT NULL,
    name text NOT NULL,
    balance numeric(10,2) DEFAULT 0 NOT NULL,
    currency text DEFAULT 'JOD'::text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cashboxes OWNER TO omar;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.employees (
    id text NOT NULL,
    user_id text NOT NULL,
    branch_id text NOT NULL,
    employee_no text NOT NULL,
    department text,
    job_title text,
    salary numeric(10,2),
    hire_date timestamp(3) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.employees OWNER TO omar;

--
-- Name: expense_records; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.expense_records (
    id text NOT NULL,
    branch_id text NOT NULL,
    category text NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text,
    reference text,
    recorded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.expense_records OWNER TO omar;

--
-- Name: follow_ups; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.follow_ups (
    id text NOT NULL,
    lead_id text NOT NULL,
    notes text NOT NULL,
    scheduled_at timestamp(3) without time zone,
    completed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.follow_ups OWNER TO omar;

--
-- Name: income_records; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.income_records (
    id text NOT NULL,
    branch_id text NOT NULL,
    category text NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text,
    reference text,
    recorded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.income_records OWNER TO omar;

--
-- Name: inventory_transfers; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.inventory_transfers (
    id text NOT NULL,
    from_branch_id text NOT NULL,
    to_branch_id text NOT NULL,
    product_sku text NOT NULL,
    quantity integer NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    notes text,
    transferred_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.inventory_transfers OWNER TO omar;

--
-- Name: invoice_items; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.invoice_items (
    id text NOT NULL,
    invoice_id text NOT NULL,
    type public."InvoiceItemType" NOT NULL,
    description text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL,
    reference_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.invoice_items OWNER TO omar;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.invoices (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text NOT NULL,
    patient_id text NOT NULL,
    invoice_number text NOT NULL,
    status public."InvoiceStatus" DEFAULT 'PENDING'::public."InvoiceStatus" NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    discount numeric(10,2) DEFAULT 0 NOT NULL,
    tax numeric(10,2) DEFAULT 0 NOT NULL,
    total numeric(10,2) NOT NULL,
    notes text,
    issued_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    due_date timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.invoices OWNER TO omar;

--
-- Name: laser_areas; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.laser_areas (
    id text NOT NULL,
    tenant_id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    preset public."LaserAreaPreset" DEFAULT 'CUSTOM'::public."LaserAreaPreset" NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.laser_areas OWNER TO omar;

--
-- Name: laser_session_photos; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.laser_session_photos (
    id text NOT NULL,
    session_id text NOT NULL,
    type public."DocumentType" NOT NULL,
    file_url text NOT NULL,
    file_name text NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.laser_session_photos OWNER TO omar;

--
-- Name: laser_sessions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.laser_sessions (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text NOT NULL,
    patient_id text NOT NULL,
    specialist_id text,
    area_id text NOT NULL,
    session_number integer NOT NULL,
    session_date timestamp(3) without time zone NOT NULL,
    device text,
    energy_level text,
    pulse_width text,
    parameters jsonb DEFAULT '{}'::jsonb NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.laser_sessions OWNER TO omar;

--
-- Name: leads; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.leads (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text,
    patient_id text,
    campaign_id text,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    source public."LeadSource" NOT NULL,
    status public."LeadStatus" DEFAULT 'NEW'::public."LeadStatus" NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.leads OWNER TO omar;

--
-- Name: leave_requests; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.leave_requests (
    id text NOT NULL,
    employee_id text NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    reason text NOT NULL,
    status public."LeaveStatus" DEFAULT 'PENDING'::public."LeaveStatus" NOT NULL,
    approved_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.leave_requests OWNER TO omar;

--
-- Name: otp_tokens; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.otp_tokens (
    id text NOT NULL,
    user_id text NOT NULL,
    code text NOT NULL,
    purpose public."OtpPurpose" NOT NULL,
    expires_at timestamp(3) without time zone NOT NULL,
    used_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.otp_tokens OWNER TO omar;

--
-- Name: patient_documents; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.patient_documents (
    id text NOT NULL,
    patient_id text NOT NULL,
    type public."DocumentType" NOT NULL,
    title text NOT NULL,
    file_url text NOT NULL,
    file_name text NOT NULL,
    mime_type text,
    file_size integer,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.patient_documents OWNER TO omar;

--
-- Name: patient_medical_info; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.patient_medical_info (
    id text NOT NULL,
    patient_id text NOT NULL,
    allergies text,
    diseases text,
    medications text,
    pregnancy_status public."PregnancyStatus" DEFAULT 'NOT_APPLICABLE'::public."PregnancyStatus" NOT NULL,
    skin_type public."SkinType",
    medical_notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.patient_medical_info OWNER TO omar;

--
-- Name: patient_packages; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.patient_packages (
    id text NOT NULL,
    patient_id text NOT NULL,
    package_id text NOT NULL,
    total_sessions integer NOT NULL,
    used_sessions integer DEFAULT 0 NOT NULL,
    remaining_sessions integer NOT NULL,
    purchase_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expiration_date timestamp(3) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.patient_packages OWNER TO omar;

--
-- Name: patient_timeline_events; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.patient_timeline_events (
    id text NOT NULL,
    patient_id text NOT NULL,
    type public."TimelineEventType" NOT NULL,
    title text NOT NULL,
    description text,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_by_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.patient_timeline_events OWNER TO omar;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.patients (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text NOT NULL,
    patient_number text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    first_name_ar text,
    last_name_ar text,
    gender public."Gender" NOT NULL,
    birth_date timestamp(3) without time zone,
    national_id text,
    phone text NOT NULL,
    whatsapp text,
    email text,
    address text,
    emergency_name text,
    emergency_phone text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.patients OWNER TO omar;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.payments (
    id text NOT NULL,
    invoice_id text NOT NULL,
    amount numeric(10,2) NOT NULL,
    method public."PaymentMethod" NOT NULL,
    reference text,
    notes text,
    paid_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.payments OWNER TO omar;

--
-- Name: payroll_records; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.payroll_records (
    id text NOT NULL,
    employee_id text NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    base_salary numeric(10,2) NOT NULL,
    bonuses numeric(10,2) DEFAULT 0 NOT NULL,
    deductions numeric(10,2) DEFAULT 0 NOT NULL,
    net_salary numeric(10,2) NOT NULL,
    paid_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.payroll_records OWNER TO omar;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.permissions (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    name_ar text,
    module text NOT NULL,
    description text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.permissions OWNER TO omar;

--
-- Name: products; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.products (
    id text NOT NULL,
    tenant_id text NOT NULL,
    branch_id text NOT NULL,
    supplier_id text,
    sku text NOT NULL,
    name text NOT NULL,
    name_ar text,
    category text NOT NULL,
    unit text DEFAULT 'piece'::text NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    min_stock integer DEFAULT 5 NOT NULL,
    cost_price numeric(10,2) NOT NULL,
    selling_price numeric(10,2) NOT NULL,
    expiry_date timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.products OWNER TO omar;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.refresh_tokens (
    id text NOT NULL,
    user_id text NOT NULL,
    token text NOT NULL,
    expires_at timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO omar;

--
-- Name: refunds; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.refunds (
    id text NOT NULL,
    invoice_id text NOT NULL,
    payment_id text,
    amount numeric(10,2) NOT NULL,
    reason text,
    refunded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.refunds OWNER TO omar;

--
-- Name: service_packages; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.service_packages (
    id text NOT NULL,
    tenant_id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    description text,
    total_sessions integer NOT NULL,
    price numeric(10,2) NOT NULL,
    validity_days integer DEFAULT 365 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.service_packages OWNER TO omar;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    user_id text NOT NULL,
    token text NOT NULL,
    ip_address text,
    user_agent text,
    expires_at timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sessions OWNER TO omar;

--
-- Name: stock_movements; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.stock_movements (
    id text NOT NULL,
    product_id text NOT NULL,
    branch_id text NOT NULL,
    type public."StockMovementType" NOT NULL,
    quantity integer NOT NULL,
    notes text,
    reference text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.stock_movements OWNER TO omar;

--
-- Name: subscription_plans; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.subscription_plans (
    id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    description text,
    price numeric(10,2) NOT NULL,
    currency text DEFAULT 'JOD'::text NOT NULL,
    max_branches integer DEFAULT 1 NOT NULL,
    max_users integer DEFAULT 5 NOT NULL,
    features jsonb DEFAULT '[]'::jsonb NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.subscription_plans OWNER TO omar;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.subscriptions (
    id text NOT NULL,
    tenant_id text NOT NULL,
    plan_id text NOT NULL,
    status public."SubscriptionStatus" DEFAULT 'TRIAL'::public."SubscriptionStatus" NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO omar;

--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.suppliers (
    id text NOT NULL,
    tenant_id text NOT NULL,
    name text NOT NULL,
    phone text,
    email text,
    address text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.suppliers OWNER TO omar;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.tenants (
    id text NOT NULL,
    name text NOT NULL,
    name_ar text,
    slug text NOT NULL,
    logo text,
    email text NOT NULL,
    phone text,
    address text,
    is_active boolean DEFAULT true NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tenants OWNER TO omar;

--
-- Name: user_permissions; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.user_permissions (
    id text NOT NULL,
    user_id text NOT NULL,
    permission_id text NOT NULL,
    granted boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_permissions OWNER TO omar;

--
-- Name: users; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.users (
    id text NOT NULL,
    tenant_id text,
    branch_id text,
    email text NOT NULL,
    password_hash text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    first_name_ar text,
    last_name_ar text,
    phone text,
    avatar text,
    role public."UserRole" DEFAULT 'RECEPTIONIST'::public."UserRole" NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    two_factor_enabled boolean DEFAULT false NOT NULL,
    two_factor_secret text,
    last_login_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO omar;

--
-- Name: whatsapp_messages; Type: TABLE; Schema: public; Owner: omar
--

CREATE TABLE public.whatsapp_messages (
    id text NOT NULL,
    tenant_id text NOT NULL,
    phone text NOT NULL,
    type public."WhatsAppMessageType" NOT NULL,
    message text NOT NULL,
    status public."ReminderStatus" DEFAULT 'PENDING'::public."ReminderStatus" NOT NULL,
    sent_at timestamp(3) without time zone,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.whatsapp_messages OWNER TO omar;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b4862cc1-30a3-4049-99ba-7785446efe3a	41da42e178f8a0812b0698054925cf14c6007a366b9834bb908d925777d91370	2026-06-27 07:47:58.880393+00	20260627074758_init	\N	\N	2026-06-27 07:47:58.770523+00	1
\.


--
-- Data for Name: appointment_reminders; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.appointment_reminders (id, appointment_id, channel, scheduled_at, status, sent_at, error_message, created_at) FROM stdin;
\.


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.appointments (id, tenant_id, branch_id, patient_id, doctor_id, title, description, scheduled_at, duration, status, notes, created_at, updated_at) FROM stdin;
cmqw25o0w000lo1j7icjsqj3t	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	cmqw25o04000go1j7w5792038	\N	Laser Consultation	\N	2026-06-28 10:00:00	30	CONFIRMED	\N	2026-06-27 07:48:12.129	2026-06-27 07:48:12.129
cmqw25o0w000mo1j7jh0tugnk	cmqw25nsh0001o1j79anrcfmj	cmqw25nsp0005o1j7p3ur8qf5	cmqw25o0r000io1j7p4rz1c7u	\N	Follow-up Session	\N	2026-07-04 14:30:00	45	SCHEDULED	\N	2026-06-27 07:48:12.129	2026-06-27 07:48:12.129
\.


--
-- Data for Name: attendance_records; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.attendance_records (id, employee_id, branch_id, date, check_in, check_out, status, notes, created_at) FROM stdin;
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.audit_logs (id, tenant_id, user_id, action, entity, entity_id, metadata, ip_address, created_at) FROM stdin;
\.


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.branches (id, tenant_id, name, name_ar, code, phone, email, address, city, is_active, settings, created_at, updated_at) FROM stdin;
cmqw25nsm0003o1j7yw65ztq9	cmqw25nsh0001o1j79anrcfmj	Omar Clinic - Main	عيادة عمر - الرئيسي	MAIN	+962791234567	main@omarclinic.com	Abdoun, Amman	Amman	t	{}	2026-06-27 07:48:11.83	2026-06-27 07:48:11.83
cmqw25nsp0005o1j7p3ur8qf5	cmqw25nsh0001o1j79anrcfmj	Omar Clinic - Sweifieh	عيادة عمر - الصويفية	SWF	+962791234568	swf@omarclinic.com	Sweifieh, Amman	Amman	t	{}	2026-06-27 07:48:11.833	2026-06-27 07:48:11.833
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.campaigns (id, tenant_id, name, name_ar, platform, budget, status, start_date, end_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: cashbox_transactions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.cashbox_transactions (id, cashbox_id, type, amount, description, reference, created_at) FROM stdin;
\.


--
-- Data for Name: cashboxes; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.cashboxes (id, branch_id, name, balance, currency, is_active, created_at, updated_at) FROM stdin;
seed-cashbox-main	cmqw25nsm0003o1j7yw65ztq9	Main Cashbox	500.00	JOD	t	2026-06-27 07:48:12.144	2026-06-27 07:48:12.144
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.employees (id, user_id, branch_id, employee_no, department, job_title, salary, hire_date, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: expense_records; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.expense_records (id, branch_id, category, amount, description, reference, recorded_at, created_at) FROM stdin;
\.


--
-- Data for Name: follow_ups; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.follow_ups (id, lead_id, notes, scheduled_at, completed_at, created_at) FROM stdin;
\.


--
-- Data for Name: income_records; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.income_records (id, branch_id, category, amount, description, reference, recorded_at, created_at) FROM stdin;
\.


--
-- Data for Name: inventory_transfers; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.inventory_transfers (id, from_branch_id, to_branch_id, product_sku, quantity, status, notes, transferred_at, created_at) FROM stdin;
\.


--
-- Data for Name: invoice_items; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.invoice_items (id, invoice_id, type, description, quantity, unit_price, total, reference_id, created_at) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.invoices (id, tenant_id, branch_id, patient_id, invoice_number, status, subtotal, discount, tax, total, notes, issued_at, due_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: laser_areas; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.laser_areas (id, tenant_id, name, name_ar, preset, is_active, created_at, updated_at) FROM stdin;
seed-area-face	cmqw25nsh0001o1j79anrcfmj	Face	الوجه	FACE	t	2026-06-27 07:48:12.131	2026-06-27 07:48:12.131
seed-area-underarms	cmqw25nsh0001o1j79anrcfmj	Underarms	الإبط	UNDERARMS	t	2026-06-27 07:48:12.131	2026-06-27 07:48:12.131
seed-area-legs	cmqw25nsh0001o1j79anrcfmj	Full Legs	الساقين	LEGS	t	2026-06-27 07:48:12.131	2026-06-27 07:48:12.131
\.


--
-- Data for Name: laser_session_photos; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.laser_session_photos (id, session_id, type, file_url, file_name, notes, created_at) FROM stdin;
\.


--
-- Data for Name: laser_sessions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.laser_sessions (id, tenant_id, branch_id, patient_id, specialist_id, area_id, session_number, session_date, device, energy_level, pulse_width, parameters, notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.leads (id, tenant_id, branch_id, patient_id, campaign_id, name, phone, email, source, status, notes, created_at, updated_at) FROM stdin;
cmqw25o1e000uo1j78gnfgz82	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	\N	\N	Rania Mansour	+962790000099	\N	INSTAGRAM	NEW	Interested in laser full body package	2026-06-27 07:48:12.146	2026-06-27 07:48:12.146
\.


--
-- Data for Name: leave_requests; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.leave_requests (id, employee_id, start_date, end_date, reason, status, approved_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: otp_tokens; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.otp_tokens (id, user_id, code, purpose, expires_at, used_at, created_at) FROM stdin;
\.


--
-- Data for Name: patient_documents; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.patient_documents (id, patient_id, type, title, file_url, file_name, mime_type, file_size, notes, created_at) FROM stdin;
\.


--
-- Data for Name: patient_medical_info; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.patient_medical_info (id, patient_id, allergies, diseases, medications, pregnancy_status, skin_type, medical_notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: patient_packages; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.patient_packages (id, patient_id, package_id, total_sessions, used_sessions, remaining_sessions, purchase_date, expiration_date, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: patient_timeline_events; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.patient_timeline_events (id, patient_id, type, title, description, metadata, created_by_id, created_at) FROM stdin;
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.patients (id, tenant_id, branch_id, patient_number, first_name, last_name, first_name_ar, last_name_ar, gender, birth_date, national_id, phone, whatsapp, email, address, emergency_name, emergency_phone, is_active, created_at, updated_at) FROM stdin;
cmqw25o04000go1j7w5792038	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	P-000001	Layla	Hassan	ليلى	حسن	FEMALE	\N	\N	+962790000001	+962790000001	layla@example.com	\N	\N	\N	t	2026-06-27 07:48:12.1	2026-06-27 07:48:12.1
cmqw25o0r000io1j7p4rz1c7u	cmqw25nsh0001o1j79anrcfmj	cmqw25nsp0005o1j7p3ur8qf5	P-000002	Omar	Khalil	عمر	خليل	MALE	\N	\N	+962790000002	+962790000002	\N	\N	\N	\N	t	2026-06-27 07:48:12.1	2026-06-27 07:48:12.1
cmqw25o0s000ko1j7gx6gekms	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	P-000003	Nour	Saleh	نور	صالح	FEMALE	\N	\N	+962790000003	\N	\N	\N	\N	\N	t	2026-06-27 07:48:12.1	2026-06-27 07:48:12.1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.payments (id, invoice_id, amount, method, reference, notes, paid_at, created_at) FROM stdin;
\.


--
-- Data for Name: payroll_records; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.payroll_records (id, employee_id, month, year, base_salary, bonuses, deductions, net_salary, paid_at, created_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.permissions (id, code, name, name_ar, module, description, created_at) FROM stdin;
cmqw25nzr0008o1j70syfmrp9	patients.read	View Patients	\N	patients	\N	2026-06-27 07:48:12.088
cmqw25nzu0009o1j7eaze1efk	patients.write	Manage Patients	\N	patients	\N	2026-06-27 07:48:12.09
cmqw25nzw000ao1j7h3luztp1	appointments.manage	Manage Appointments	\N	appointments	\N	2026-06-27 07:48:12.092
cmqw25nzx000bo1j72uukaxy4	sales.manage	Manage Sales	\N	sales	\N	2026-06-27 07:48:12.094
cmqw25nzz000co1j7cj91ta1x	inventory.manage	Manage Inventory	\N	inventory	\N	2026-06-27 07:48:12.095
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.products (id, tenant_id, branch_id, supplier_id, sku, name, name_ar, category, unit, quantity, min_stock, cost_price, selling_price, expiry_date, is_active, created_at, updated_at) FROM stdin;
cmqw25o14000oo1j7b2jsg18r	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	seed-supplier-1	GEL-COOL-002	Cooling Gel Post-Laser	جل التبريد بعد الليزر	Laser Supplies	piece	3	5	12.00	22.00	\N	t	2026-06-27 07:48:12.137	2026-06-27 07:48:12.137
cmqw25o15000qo1j7drs2ma1x	cmqw25nsh0001o1j79anrcfmj	cmqw25nsp0005o1j7p3ur8qf5	\N	SERUM-VITC-003	Vitamin C Serum	سيرum فيتامين C	Skincare	piece	15	5	18.00	35.00	\N	t	2026-06-27 07:48:12.137	2026-06-27 07:48:12.137
cmqw25o15000so1j7yinv04pu	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	seed-supplier-1	SPF-50-001	Sunscreen SPF 50	واقي شمس SPF 50	Skincare	piece	25	10	8.00	15.00	\N	t	2026-06-27 07:48:12.137	2026-06-27 07:48:12.137
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.refresh_tokens (id, user_id, token, expires_at, created_at) FROM stdin;
cmqw29xgo0001o1kv26fyvk97	cmqw25nzo0007o1j7q5izt06k	9f7fdc11-4371-4339-9045-a610a27fd0a9	2026-07-04 07:51:30.984	2026-06-27 07:51:30.985
\.


--
-- Data for Name: refunds; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.refunds (id, invoice_id, payment_id, amount, reason, refunded_at, created_at) FROM stdin;
\.


--
-- Data for Name: service_packages; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.service_packages (id, tenant_id, name, name_ar, description, total_sessions, price, validity_days, is_active, created_at, updated_at) FROM stdin;
seed-pkg-laser-6	cmqw25nsh0001o1j79anrcfmj	Laser 6 Sessions Package	باقة ليزر 6 جلسات	6 laser sessions for one body area	6	180.00	365	t	2026-06-27 07:48:12.141	2026-06-27 07:48:12.141
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.sessions (id, user_id, token, ip_address, user_agent, expires_at, created_at) FROM stdin;
cmqw29xgr0003o1kvk5laek3d	cmqw25nzo0007o1j7q5izt06k	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbXF3MjVuem8wMDA3bzFqN3E1aXp0MDZrIiwiZW1haWwiOiJtYW5hZ2VyQG9tYXJjbGluaWMuY29tIiwicm9sZSI6IkJSQU5DSF9NQU5BR0VSIiwidGVuYW50SWQiOiJjbXF3MjVuc2gwMDAxbzFqNzlhbnJjZm1qIiwiYnJhbmNoSWQiOiJjbXF3MjVuc20wMDAzbzFqN3l3NjV6dHE5IiwiaWF0IjoxNzgyNTQ2NjkwLCJleHAiOjE3ODI1NDc1OTB9.oqVUSJy5rp8RyEcqxMYtG1sYV7BXtD2w9b-Ih919h7k	::ffff:10.123.16.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0	2026-06-27 08:06:30.986	2026-06-27 07:51:30.987
\.


--
-- Data for Name: stock_movements; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.stock_movements (id, product_id, branch_id, type, quantity, notes, reference, created_at) FROM stdin;
\.


--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.subscription_plans (id, name, name_ar, description, price, currency, max_branches, max_users, features, is_active, created_at, updated_at) FROM stdin;
seed-plan-professional	Professional	احترافي	Full clinic management for multi-branch operations	199.00	JOD	5	25	["appointments", "laser", "inventory", "accounting", "marketing", "whatsapp"]	t	2026-06-27 07:48:11.822	2026-06-27 07:48:11.822
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.subscriptions (id, tenant_id, plan_id, status, start_date, end_date, created_at, updated_at) FROM stdin;
seed-sub-omar-clinic	cmqw25nsh0001o1j79anrcfmj	seed-plan-professional	ACTIVE	2026-06-27 07:48:11.827	2027-06-27 07:48:11.827	2026-06-27 07:48:11.828	2026-06-27 07:48:11.828
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.suppliers (id, tenant_id, name, phone, email, address, is_active, created_at, updated_at) FROM stdin;
seed-supplier-1	cmqw25nsh0001o1j79anrcfmj	MedSupply Jordan	+96265551234	orders@medsupply.jo	\N	t	2026-06-27 07:48:12.134	2026-06-27 07:48:12.134
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.tenants (id, name, name_ar, slug, logo, email, phone, address, is_active, settings, created_at, updated_at) FROM stdin;
cmqw25nsh0001o1j79anrcfmj	Omar Clinic	عيادة عمر	omar-clinic	\N	info@omarclinic.com	+962791234567	Amman, Jordan	t	{"locale": "ar", "currency": "JOD", "timezone": "Asia/Amman"}	2026-06-27 07:48:11.825	2026-06-27 07:48:11.825
\.


--
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.user_permissions (id, user_id, permission_id, granted, created_at) FROM stdin;
cmqw25o01000eo1j7bp6eo8v8	cmqw25nzo0007o1j7q5izt06k	cmqw25nzr0008o1j70syfmrp9	t	2026-06-27 07:48:12.098
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.users (id, tenant_id, branch_id, email, password_hash, first_name, last_name, first_name_ar, last_name_ar, phone, avatar, role, is_active, email_verified, two_factor_enabled, two_factor_secret, last_login_at, created_at, updated_at) FROM stdin;
cmqw25ns90000o1j75ajvlco0	\N	\N	admin@omarclinic.com	$2b$12$u3X7nspsafb3yhzIe4ZofObQJLlW.F.qx1B/Mw/sZYpwIXrkSLdf6	Super	Admin	مدير	النظام	\N	\N	SUPER_ADMIN	t	t	f	\N	\N	2026-06-27 07:48:11.817	2026-06-27 07:48:11.817
cmqw25nzo0007o1j7q5izt06k	cmqw25nsh0001o1j79anrcfmj	cmqw25nsm0003o1j7yw65ztq9	manager@omarclinic.com	$2b$12$3AbljxNGyeNpDT2uC7GaO.ZNDRKbRVutuaIleojJT.jUbn0kp/gjy	Sara	Ahmad	سارة	أحمد	+962791111111	\N	BRANCH_MANAGER	t	t	f	\N	2026-06-27 07:51:30.988	2026-06-27 07:48:12.084	2026-06-27 07:51:30.989
\.


--
-- Data for Name: whatsapp_messages; Type: TABLE DATA; Schema: public; Owner: omar
--

COPY public.whatsapp_messages (id, tenant_id, phone, type, message, status, sent_at, metadata, created_at) FROM stdin;
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: appointment_reminders appointment_reminders_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointment_reminders
    ADD CONSTRAINT appointment_reminders_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: attendance_records attendance_records_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: cashbox_transactions cashbox_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.cashbox_transactions
    ADD CONSTRAINT cashbox_transactions_pkey PRIMARY KEY (id);


--
-- Name: cashboxes cashboxes_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.cashboxes
    ADD CONSTRAINT cashboxes_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: expense_records expense_records_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.expense_records
    ADD CONSTRAINT expense_records_pkey PRIMARY KEY (id);


--
-- Name: follow_ups follow_ups_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.follow_ups
    ADD CONSTRAINT follow_ups_pkey PRIMARY KEY (id);


--
-- Name: income_records income_records_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.income_records
    ADD CONSTRAINT income_records_pkey PRIMARY KEY (id);


--
-- Name: inventory_transfers inventory_transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.inventory_transfers
    ADD CONSTRAINT inventory_transfers_pkey PRIMARY KEY (id);


--
-- Name: invoice_items invoice_items_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: laser_areas laser_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_areas
    ADD CONSTRAINT laser_areas_pkey PRIMARY KEY (id);


--
-- Name: laser_session_photos laser_session_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_session_photos
    ADD CONSTRAINT laser_session_photos_pkey PRIMARY KEY (id);


--
-- Name: laser_sessions laser_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_sessions
    ADD CONSTRAINT laser_sessions_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: leave_requests leave_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_pkey PRIMARY KEY (id);


--
-- Name: otp_tokens otp_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.otp_tokens
    ADD CONSTRAINT otp_tokens_pkey PRIMARY KEY (id);


--
-- Name: patient_documents patient_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_documents
    ADD CONSTRAINT patient_documents_pkey PRIMARY KEY (id);


--
-- Name: patient_medical_info patient_medical_info_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_medical_info
    ADD CONSTRAINT patient_medical_info_pkey PRIMARY KEY (id);


--
-- Name: patient_packages patient_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_packages
    ADD CONSTRAINT patient_packages_pkey PRIMARY KEY (id);


--
-- Name: patient_timeline_events patient_timeline_events_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_timeline_events
    ADD CONSTRAINT patient_timeline_events_pkey PRIMARY KEY (id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: payroll_records payroll_records_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refunds refunds_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.refunds
    ADD CONSTRAINT refunds_pkey PRIMARY KEY (id);


--
-- Name: service_packages service_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.service_packages
    ADD CONSTRAINT service_packages_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: stock_movements stock_movements_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (id);


--
-- Name: subscription_plans subscription_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.subscription_plans
    ADD CONSTRAINT subscription_plans_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: user_permissions user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_messages whatsapp_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.whatsapp_messages
    ADD CONSTRAINT whatsapp_messages_pkey PRIMARY KEY (id);


--
-- Name: appointment_reminders_appointment_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX appointment_reminders_appointment_id_idx ON public.appointment_reminders USING btree (appointment_id);


--
-- Name: appointment_reminders_status_scheduled_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX appointment_reminders_status_scheduled_at_idx ON public.appointment_reminders USING btree (status, scheduled_at);


--
-- Name: appointments_branch_id_scheduled_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX appointments_branch_id_scheduled_at_idx ON public.appointments USING btree (branch_id, scheduled_at);


--
-- Name: appointments_patient_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX appointments_patient_id_idx ON public.appointments USING btree (patient_id);


--
-- Name: appointments_status_scheduled_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX appointments_status_scheduled_at_idx ON public.appointments USING btree (status, scheduled_at);


--
-- Name: attendance_records_branch_id_date_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX attendance_records_branch_id_date_idx ON public.attendance_records USING btree (branch_id, date);


--
-- Name: attendance_records_employee_id_date_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX attendance_records_employee_id_date_key ON public.attendance_records USING btree (employee_id, date);


--
-- Name: audit_logs_entity_entity_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX audit_logs_entity_entity_id_idx ON public.audit_logs USING btree (entity, entity_id);


--
-- Name: audit_logs_tenant_id_created_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX audit_logs_tenant_id_created_at_idx ON public.audit_logs USING btree (tenant_id, created_at);


--
-- Name: branches_tenant_id_code_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX branches_tenant_id_code_key ON public.branches USING btree (tenant_id, code);


--
-- Name: branches_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX branches_tenant_id_idx ON public.branches USING btree (tenant_id);


--
-- Name: campaigns_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX campaigns_tenant_id_idx ON public.campaigns USING btree (tenant_id);


--
-- Name: cashbox_transactions_cashbox_id_created_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX cashbox_transactions_cashbox_id_created_at_idx ON public.cashbox_transactions USING btree (cashbox_id, created_at);


--
-- Name: cashboxes_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX cashboxes_branch_id_idx ON public.cashboxes USING btree (branch_id);


--
-- Name: employees_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX employees_branch_id_idx ON public.employees USING btree (branch_id);


--
-- Name: employees_user_id_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX employees_user_id_key ON public.employees USING btree (user_id);


--
-- Name: expense_records_branch_id_recorded_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX expense_records_branch_id_recorded_at_idx ON public.expense_records USING btree (branch_id, recorded_at);


--
-- Name: follow_ups_lead_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX follow_ups_lead_id_idx ON public.follow_ups USING btree (lead_id);


--
-- Name: income_records_branch_id_recorded_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX income_records_branch_id_recorded_at_idx ON public.income_records USING btree (branch_id, recorded_at);


--
-- Name: inventory_transfers_from_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX inventory_transfers_from_branch_id_idx ON public.inventory_transfers USING btree (from_branch_id);


--
-- Name: invoice_items_invoice_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX invoice_items_invoice_id_idx ON public.invoice_items USING btree (invoice_id);


--
-- Name: invoices_branch_id_issued_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX invoices_branch_id_issued_at_idx ON public.invoices USING btree (branch_id, issued_at);


--
-- Name: invoices_patient_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX invoices_patient_id_idx ON public.invoices USING btree (patient_id);


--
-- Name: invoices_status_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX invoices_status_idx ON public.invoices USING btree (status);


--
-- Name: invoices_tenant_id_invoice_number_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX invoices_tenant_id_invoice_number_key ON public.invoices USING btree (tenant_id, invoice_number);


--
-- Name: laser_areas_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX laser_areas_tenant_id_idx ON public.laser_areas USING btree (tenant_id);


--
-- Name: laser_session_photos_session_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX laser_session_photos_session_id_idx ON public.laser_session_photos USING btree (session_id);


--
-- Name: laser_sessions_branch_id_session_date_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX laser_sessions_branch_id_session_date_idx ON public.laser_sessions USING btree (branch_id, session_date);


--
-- Name: laser_sessions_patient_id_session_date_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX laser_sessions_patient_id_session_date_idx ON public.laser_sessions USING btree (patient_id, session_date);


--
-- Name: leads_source_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX leads_source_idx ON public.leads USING btree (source);


--
-- Name: leads_tenant_id_status_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX leads_tenant_id_status_idx ON public.leads USING btree (tenant_id, status);


--
-- Name: leave_requests_employee_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX leave_requests_employee_id_idx ON public.leave_requests USING btree (employee_id);


--
-- Name: otp_tokens_user_id_purpose_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX otp_tokens_user_id_purpose_idx ON public.otp_tokens USING btree (user_id, purpose);


--
-- Name: patient_documents_patient_id_type_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patient_documents_patient_id_type_idx ON public.patient_documents USING btree (patient_id, type);


--
-- Name: patient_medical_info_patient_id_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX patient_medical_info_patient_id_key ON public.patient_medical_info USING btree (patient_id);


--
-- Name: patient_packages_expiration_date_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patient_packages_expiration_date_idx ON public.patient_packages USING btree (expiration_date);


--
-- Name: patient_packages_patient_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patient_packages_patient_id_idx ON public.patient_packages USING btree (patient_id);


--
-- Name: patient_timeline_events_patient_id_created_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patient_timeline_events_patient_id_created_at_idx ON public.patient_timeline_events USING btree (patient_id, created_at);


--
-- Name: patients_national_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patients_national_id_idx ON public.patients USING btree (national_id);


--
-- Name: patients_phone_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patients_phone_idx ON public.patients USING btree (phone);


--
-- Name: patients_tenant_id_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX patients_tenant_id_branch_id_idx ON public.patients USING btree (tenant_id, branch_id);


--
-- Name: patients_tenant_id_patient_number_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX patients_tenant_id_patient_number_key ON public.patients USING btree (tenant_id, patient_number);


--
-- Name: payments_invoice_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX payments_invoice_id_idx ON public.payments USING btree (invoice_id);


--
-- Name: payroll_records_employee_id_month_year_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX payroll_records_employee_id_month_year_key ON public.payroll_records USING btree (employee_id, month, year);


--
-- Name: permissions_code_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX permissions_code_key ON public.permissions USING btree (code);


--
-- Name: permissions_module_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX permissions_module_idx ON public.permissions USING btree (module);


--
-- Name: products_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX products_branch_id_idx ON public.products USING btree (branch_id);


--
-- Name: products_quantity_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX products_quantity_idx ON public.products USING btree (quantity);


--
-- Name: products_tenant_id_sku_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX products_tenant_id_sku_key ON public.products USING btree (tenant_id, sku);


--
-- Name: refresh_tokens_token_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX refresh_tokens_token_key ON public.refresh_tokens USING btree (token);


--
-- Name: refresh_tokens_user_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX refresh_tokens_user_id_idx ON public.refresh_tokens USING btree (user_id);


--
-- Name: refunds_invoice_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX refunds_invoice_id_idx ON public.refunds USING btree (invoice_id);


--
-- Name: service_packages_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX service_packages_tenant_id_idx ON public.service_packages USING btree (tenant_id);


--
-- Name: sessions_expires_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX sessions_expires_at_idx ON public.sessions USING btree (expires_at);


--
-- Name: sessions_token_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX sessions_token_key ON public.sessions USING btree (token);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX sessions_user_id_idx ON public.sessions USING btree (user_id);


--
-- Name: stock_movements_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX stock_movements_branch_id_idx ON public.stock_movements USING btree (branch_id);


--
-- Name: stock_movements_product_id_created_at_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX stock_movements_product_id_created_at_idx ON public.stock_movements USING btree (product_id, created_at);


--
-- Name: subscriptions_status_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX subscriptions_status_idx ON public.subscriptions USING btree (status);


--
-- Name: subscriptions_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX subscriptions_tenant_id_idx ON public.subscriptions USING btree (tenant_id);


--
-- Name: suppliers_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX suppliers_tenant_id_idx ON public.suppliers USING btree (tenant_id);


--
-- Name: tenants_slug_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX tenants_slug_key ON public.tenants USING btree (slug);


--
-- Name: user_permissions_user_id_permission_id_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX user_permissions_user_id_permission_id_key ON public.user_permissions USING btree (user_id, permission_id);


--
-- Name: users_branch_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX users_branch_id_idx ON public.users USING btree (branch_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: omar
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_role_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX users_role_idx ON public.users USING btree (role);


--
-- Name: users_tenant_id_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX users_tenant_id_idx ON public.users USING btree (tenant_id);


--
-- Name: whatsapp_messages_tenant_id_status_idx; Type: INDEX; Schema: public; Owner: omar
--

CREATE INDEX whatsapp_messages_tenant_id_status_idx ON public.whatsapp_messages USING btree (tenant_id, status);


--
-- Name: appointment_reminders appointment_reminders_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointment_reminders
    ADD CONSTRAINT appointment_reminders_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: appointments appointments_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: attendance_records attendance_records_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: attendance_records attendance_records_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: audit_logs audit_logs_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: branches branches_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaigns campaigns_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cashbox_transactions cashbox_transactions_cashbox_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.cashbox_transactions
    ADD CONSTRAINT cashbox_transactions_cashbox_id_fkey FOREIGN KEY (cashbox_id) REFERENCES public.cashboxes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cashboxes cashboxes_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.cashboxes
    ADD CONSTRAINT cashboxes_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: employees employees_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_records expense_records_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.expense_records
    ADD CONSTRAINT expense_records_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: follow_ups follow_ups_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.follow_ups
    ADD CONSTRAINT follow_ups_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: income_records income_records_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.income_records
    ADD CONSTRAINT income_records_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: inventory_transfers inventory_transfers_from_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.inventory_transfers
    ADD CONSTRAINT inventory_transfers_from_branch_id_fkey FOREIGN KEY (from_branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: invoice_items invoice_items_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invoices invoices_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: invoices invoices_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: laser_session_photos laser_session_photos_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_session_photos
    ADD CONSTRAINT laser_session_photos_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.laser_sessions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: laser_sessions laser_sessions_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_sessions
    ADD CONSTRAINT laser_sessions_area_id_fkey FOREIGN KEY (area_id) REFERENCES public.laser_areas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: laser_sessions laser_sessions_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_sessions
    ADD CONSTRAINT laser_sessions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: laser_sessions laser_sessions_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_sessions
    ADD CONSTRAINT laser_sessions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: laser_sessions laser_sessions_specialist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.laser_sessions
    ADD CONSTRAINT laser_sessions_specialist_id_fkey FOREIGN KEY (specialist_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: leads leads_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: leads leads_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: leads leads_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: leads leads_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_requests leave_requests_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: otp_tokens otp_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.otp_tokens
    ADD CONSTRAINT otp_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: patient_documents patient_documents_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_documents
    ADD CONSTRAINT patient_documents_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: patient_medical_info patient_medical_info_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_medical_info
    ADD CONSTRAINT patient_medical_info_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: patient_packages patient_packages_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_packages
    ADD CONSTRAINT patient_packages_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.service_packages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: patient_packages patient_packages_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_packages
    ADD CONSTRAINT patient_packages_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: patient_timeline_events patient_timeline_events_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_timeline_events
    ADD CONSTRAINT patient_timeline_events_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: patient_timeline_events patient_timeline_events_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patient_timeline_events
    ADD CONSTRAINT patient_timeline_events_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: patients patients_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: patients patients_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payroll_records payroll_records_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: products products_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refunds refunds_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.refunds
    ADD CONSTRAINT refunds_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: refunds refunds_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.refunds
    ADD CONSTRAINT refunds_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: service_packages service_packages_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.service_packages
    ADD CONSTRAINT service_packages_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock_movements stock_movements_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: stock_movements stock_movements_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: subscriptions subscriptions_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.subscription_plans(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: subscriptions subscriptions_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_permissions user_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_permissions user_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: omar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict FrzENJrqejoNC4v4lSQ6TbPjGVKepvdy1FidKxPneBR85Cr6b3sZx3Az9inKpdk

