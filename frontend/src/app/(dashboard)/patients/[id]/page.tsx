'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/api/client';
import type { Patient } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useTranslation } from '@/store/ui-store';

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, locale } = useTranslation();

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => apiClient.get<Patient>(`/patients/${id}`),
  });

  const { data: timeline } = useQuery({
    queryKey: ['patient-timeline', id],
    queryFn: () => apiClient.get<Array<{ id: string; type: string; title: string; description?: string; createdAt: string }>>(`/patients/${id}/timeline`),
  });

  if (isLoading) return <p>{t('loading')}</p>;
  if (!patient) return <p>المريض غير موجود</p>;

  const whatsappUrl = patient.whatsapp
    ? `https://wa.me/${patient.whatsapp.replace(/\D/g, '')}`
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patients">
          <Button variant="ghost" size="icon"><ArrowRight className="h-5 w-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">
            {patient.firstNameAr || patient.firstName} {patient.lastNameAr || patient.lastName}
          </h2>
          <p className="text-muted-foreground font-mono text-sm">{patient.patientNumber}</p>
        </div>
        <Badge variant={patient.isActive ? 'success' : 'secondary'} className="ms-auto">
          {patient.isActive ? 'نشط' : 'غير نشط'}
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-1">
          <CardHeader><CardTitle>معلومات الاتصال</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" />{patient.phone}</div>
            {patient.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" />{patient.email}</div>}
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Chat
                </Button>
              </a>
            )}
            {patient.address && <p className="text-muted-foreground">{patient.address}</p>}
            {patient.branch && <p>الفرع: {patient.branch.nameAr || patient.branch.name}</p>}
          </CardContent>
        </Card>

        <Card className="glass lg:col-span-2">
          <Tabs defaultValue="medical">
            <CardHeader>
              <TabsList>
                <TabsTrigger value="medical">طبي</TabsTrigger>
                <TabsTrigger value="packages">الباقات</TabsTrigger>
                <TabsTrigger value="timeline">السجل</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="medical" className="space-y-2 text-sm">
                <p><strong>الحساسية:</strong> {patient.medicalInfo?.allergies || '—'}</p>
                <p><strong>الأمراض:</strong> {patient.medicalInfo?.diseases || '—'}</p>
                <p><strong>الأدوية:</strong> {patient.medicalInfo?.medications || '—'}</p>
                <p><strong>نوع البشرة:</strong> {patient.medicalInfo?.skinType || '—'}</p>
                <p><strong>ملاحظات:</strong> {patient.medicalInfo?.medicalNotes || '—'}</p>
              </TabsContent>
              <TabsContent value="packages">
                {!patient.patientPackages?.length ? (
                  <p className="text-muted-foreground">{t('noData')}</p>
                ) : (
                  <div className="space-y-3">
                    {patient.patientPackages.map((pp) => (
                      <div key={pp.id} className="rounded-lg border border-white/10 p-3">
                        <p className="font-medium">{pp.package.nameAr || pp.package.name}</p>
                        <p className="text-sm text-muted-foreground">
                          متبقي {pp.remainingSessions} / {pp.totalSessions} · ينتهي {formatDate(pp.expirationDate, locale)}
                        </p>
                        <div className="mt-2 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(pp.usedSessions / pp.totalSessions) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="timeline">
                {!timeline?.length ? (
                  <p className="text-muted-foreground">{t('noData')}</p>
                ) : (
                  <div className="space-y-3">
                    {timeline.map((ev) => (
                      <div key={ev.id} className="border-s-2 border-primary ps-4">
                        <p className="font-medium">{ev.title}</p>
                        {ev.description && <p className="text-sm text-muted-foreground">{ev.description}</p>}
                        <p className="text-xs text-muted-foreground">{formatDate(ev.createdAt, locale)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
