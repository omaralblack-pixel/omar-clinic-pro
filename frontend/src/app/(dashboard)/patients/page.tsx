'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from '@/store/ui-store';

interface Patient {
  id: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  isActive: boolean;
}

export default function PatientsPage() {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => apiClient.get<{ data: Patient[]; meta: { total: number } }>('/patients'),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('patients')}</h2>
        <Link href="/patients/new">
          <Button><Plus className="h-4 w-4" />{t('add')}</Button>
        </Link>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>{t('patients')} ({data?.meta.total ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>{t('loading')}</p>
          ) : !data?.data.length ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-3 text-start">#</th>
                    <th className="pb-3 text-start">الاسم</th>
                    <th className="pb-3 text-start">الهاتف</th>
                    <th className="pb-3 text-start">الجنس</th>
                    <th className="pb-3 text-start">الحالة</th>
                    <th className="pb-3 text-start"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((p) => (
                    <tr key={p.id} className="border-b border-white/5">
                      <td className="py-3 font-mono text-xs">{p.patientNumber}</td>
                      <td className="py-3">{p.firstName} {p.lastName}</td>
                      <td className="py-3">{p.phone}</td>
                      <td className="py-3">{p.gender}</td>
                      <td className="py-3">
                        <Badge variant={p.isActive ? 'success' : 'secondary'}>
                          {p.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Link href={`/patients/${p.id}`} className="text-primary hover:underline">
                          {t('edit')}
                        </Link>
                      </td>
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
