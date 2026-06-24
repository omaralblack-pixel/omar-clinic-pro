'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/api/client';
import type { LaserSession, LaserArea, Patient } from '@/lib/types';
import { useTranslation } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';
import { formatDate } from '@/lib/utils';

const AREA_PRESETS = [
  { value: 'FACE', ar: 'الوجه' },
  { value: 'FULL_BODY', ar: 'كامل الجسم' },
  { value: 'BIKINI', ar: 'Bikini' },
  { value: 'UNDERARMS', ar: 'الإبط' },
  { value: 'LEGS', ar: 'الأرجل' },
  { value: 'ARMS', ar: 'الذراعين' },
  { value: 'CUSTOM', ar: 'مخصص' },
];

export default function LaserPage() {
  const { t, locale } = useTranslation();
  const { user } = useAuthStore();
  const qc = useQueryClient();
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    patientId: '',
    areaId: '',
    sessionNumber: '1',
    sessionDate: '',
    device: '',
    energyLevel: '',
    pulseWidth: '',
    notes: '',
  });

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['laser-sessions'],
    queryFn: () => apiClient.get<{ data: LaserSession[] }>('/laser/sessions?limit=50'),
  });

  const { data: areas } = useQuery({
    queryKey: ['laser-areas'],
    queryFn: () => apiClient.get<LaserArea[]>('/laser/areas'),
  });

  const { data: patientsData } = useQuery({
    queryKey: ['patients-select'],
    queryFn: () => apiClient.get<{ data: Patient[] }>('/patients?limit=100'),
  });

  const createSession = useMutation({
    mutationFn: (body: Record<string, unknown>) => apiClient.post('/laser/sessions', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['laser-sessions'] });
      setShowSessionForm(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.branchId) return;
    createSession.mutate({
      branchId: user.branchId,
      patientId: sessionForm.patientId,
      areaId: sessionForm.areaId,
      sessionNumber: parseInt(sessionForm.sessionNumber, 10),
      sessionDate: new Date(sessionForm.sessionDate).toISOString(),
      device: sessionForm.device || undefined,
      energyLevel: sessionForm.energyLevel || undefined,
      pulseWidth: sessionForm.pulseWidth || undefined,
      notes: sessionForm.notes || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('laser')}</h2>
        <Button onClick={() => setShowSessionForm(!showSessionForm)}>
          <Plus className="h-4 w-4" />
          جلسة جديدة
        </Button>
      </div>

      <Tabs defaultValue="sessions">
        <TabsList>
          <TabsTrigger value="sessions">الجلسات</TabsTrigger>
          <TabsTrigger value="areas">مناطق العلاج</TabsTrigger>
        </TabsList>

        <TabsContent value="areas">
          <Card className="glass">
            <CardHeader><CardTitle>مناطق الليزر</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(areas ?? []).map((area) => (
                  <div key={area.id} className="rounded-lg border border-white/10 p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-medium">{area.nameAr || area.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{area.preset}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          {showSessionForm && (
            <Card className="glass mb-6">
              <CardHeader><CardTitle>تسجيل جلسة ليزر</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>المريض</Label>
                    <Select value={sessionForm.patientId} onValueChange={(v) => setSessionForm({ ...sessionForm, patientId: v })}>
                      <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                      <SelectContent>
                        {patientsData?.data.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>المنطقة</Label>
                    <Select value={sessionForm.areaId} onValueChange={(v) => setSessionForm({ ...sessionForm, areaId: v })}>
                      <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                      <SelectContent>
                        {(areas ?? []).map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.nameAr || a.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الجلسة</Label>
                    <Input type="number" value={sessionForm.sessionNumber} onChange={(e) => setSessionForm({ ...sessionForm, sessionNumber: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>التاريخ</Label>
                    <Input type="datetime-local" value={sessionForm.sessionDate} onChange={(e) => setSessionForm({ ...sessionForm, sessionDate: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>الجهاز</Label>
                    <Input value={sessionForm.device} onChange={(e) => setSessionForm({ ...sessionForm, device: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>مستوى الطاقة</Label>
                    <Input value={sessionForm.energyLevel} onChange={(e) => setSessionForm({ ...sessionForm, energyLevel: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>عرض النبضة</Label>
                    <Input value={sessionForm.pulseWidth} onChange={(e) => setSessionForm({ ...sessionForm, pulseWidth: e.target.value })} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>ملاحظات</Label>
                    <Input value={sessionForm.notes} onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" disabled={createSession.isPending}>{t('save')}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card className="glass">
            <CardHeader><CardTitle>سجل الجلسات</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? (
                <p>{t('loading')}</p>
              ) : !sessions?.data?.length ? (
                <p className="text-muted-foreground">{t('noData')}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="pb-3 text-start">#</th>
                        <th className="pb-3 text-start">المريض</th>
                        <th className="pb-3 text-start">المنطقة</th>
                        <th className="pb-3 text-start">التاريخ</th>
                        <th className="pb-3 text-start">الجهاز</th>
                        <th className="pb-3 text-start">الطاقة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.data.map((s) => (
                        <tr key={s.id} className="border-b border-white/5">
                          <td className="py-3">{s.sessionNumber}</td>
                          <td className="py-3">{s.patient.firstName} {s.patient.lastName}</td>
                          <td className="py-3">{s.area.nameAr || s.area.name}</td>
                          <td className="py-3">{formatDate(s.sessionDate, locale)}</td>
                          <td className="py-3">{s.device || '—'}</td>
                          <td className="py-3">{s.energyLevel || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
