export const APPOINTMENT_STATUS_LABELS: Record<string, { ar: string; en: string; color: string }> = {
  SCHEDULED: { ar: 'مجدول', en: 'Scheduled', color: 'default' },
  CONFIRMED: { ar: 'مؤكد', en: 'Confirmed', color: 'success' },
  ARRIVED: { ar: 'وصل', en: 'Arrived', color: 'success' },
  IN_PROGRESS: { ar: 'جاري', en: 'In Progress', color: 'warning' },
  COMPLETED: { ar: 'مكتمل', en: 'Completed', color: 'success' },
  CANCELLED: { ar: 'ملغي', en: 'Cancelled', color: 'destructive' },
  NO_SHOW: { ar: 'لم يحضر', en: 'No Show', color: 'destructive' },
};

export interface Appointment {
  id: string;
  title: string;
  scheduledAt: string;
  duration: number;
  status: string;
  notes?: string;
  patient: { id: string; firstName: string; lastName: string; phone: string };
  doctor?: { firstName: string; lastName: string } | null;
  branch?: { name: string; nameAr?: string };
}

export interface Patient {
  id: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  gender: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  birthDate?: string;
  nationalId?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  isActive: boolean;
  medicalInfo?: {
    allergies?: string;
    diseases?: string;
    medications?: string;
    pregnancyStatus?: string;
    skinType?: string;
    medicalNotes?: string;
  };
  branch?: { id: string; name: string; nameAr?: string };
  timelineEvents?: Array<{ id: string; type: string; title: string; description?: string; createdAt: string }>;
  patientPackages?: Array<{
    id: string;
    totalSessions: number;
    usedSessions: number;
    remainingSessions: number;
    expirationDate: string;
    package: { name: string; nameAr?: string };
  }>;
}

export interface LaserSession {
  id: string;
  sessionNumber: number;
  sessionDate: string;
  device?: string;
  energyLevel?: string;
  pulseWidth?: string;
  notes?: string;
  patient: { firstName: string; lastName: string };
  area: { name: string; nameAr?: string };
  specialist?: { firstName: string; lastName: string } | null;
  photos?: Array<{ id: string; type: string; fileUrl: string }>;
}

export interface LaserArea {
  id: string;
  name: string;
  nameAr?: string;
  preset: string;
  isActive: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  nameAr?: string;
  totalSessions: number;
  price: string | number;
  validityDays: number;
  isActive: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  subtotal: string | number;
  discount: string | number;
  tax: string | number;
  total: string | number;
  issuedAt: string;
  patient: { firstName: string; lastName: string; phone: string };
}

export interface Branch {
  id: string;
  name: string;
  nameAr?: string;
  code: string;
  phone?: string;
  city?: string;
  isActive: boolean;
}
