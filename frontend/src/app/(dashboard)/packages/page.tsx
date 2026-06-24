'use client';

import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import type { ServicePackage } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/store/ui-store';

interface PatientPackageTracking {
  id: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  expirationDate: string;
  isActive: boolean;
  patient: { firstName: string; lastName: string; phone: string };
  package: { name: string; nameAr?: string };
}

export default function PackagesPage() {
  const { t, locale } = useTranslation();

  const { data: packages, isLoading } = useQuery({
    queryKey: ['service-packages'],
    queryFn: () => apiClient.get<ServicePackage[]>('/packages'),
  });

  const { data: tracking } = useQuery({
    queryKey: ['patient-packages'],
    queryFn: () => apiClient.get<PatientPackageTracking[]>('/packages/patient/tracking'),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('packages')}</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(packages ?? []).map((pkg) => (
          <Card key={pkg.id} className="glass">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{pkg.nameAr || pkg.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{pkg.totalSessions} جلسات</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(Number(pkg.price), locale === 'ar' ? 'ar-JO' : 'en-US')}</p>
              <p className="text-xs text-muted-foreground">صلاحية {pkg.validityDays} يوم</p>
              <Badge className="mt-2" variant={pkg.isActive ? 'success' : 'secondary'}>
                {pkg.isActive ? 'نشط' : 'غير نشط'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass">
        <CardHeader><CardTitle>تتبع باقات المرضى</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p>{t('loading')}</p>
          ) : !tracking?.length ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-3 text-start">المريض</th>
                    <th className="pb-3 text-start">الباقة</th>
                    <th className="pb-3 text-start">المستخدم</th>
                    <th className="pb-3 text-start">المتبقي</th>
                    <th className="pb-3 text-start">الانتهاء</th>
                  </tr>
                </thead>
                <tbody>
                  {tracking.map((pp) => (
                    <tr key={pp.id} className="border-b border-white/5">
                      <td className="py-3">{pp.patient.firstName} {pp.patient.lastName}</td>
                      <td className="py-3">{pp.package.nameAr || pp.package.name}</td>
                      <td className="py-3">{pp.usedSessions}/{pp.totalSessions}</td>
                      <td className="py-3">{pp.remainingSessions}</td>
                      <td className="py-3">{new Date(pp.expirationDate).toLocaleDateString('ar-JO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
