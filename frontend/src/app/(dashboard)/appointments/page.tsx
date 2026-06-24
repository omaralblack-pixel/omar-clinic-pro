'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiClient } from '@/lib/api/client';
import { APPOINTMENT_STATUS_LABELS, type Appointment, type Patient } from '@/lib/types';
import { useTranslation } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';
import { formatDate } from '@/lib/utils';

function toDateStr(d: Date) {
  return d.toISOString().split('T')[0];
}

function StatusBadge({ status }: { status: string }) {
  const info = APPOINTMENT_STATUS_LABELS[status] ?? { ar: status, color: 'default' };
  return (
    <Badge variant={info.color as 'default' | 'success' | 'warning' | 'destructive'}>
      {info.ar}
    </Badge>
  );
}

export default function AppointmentsPage() {
  const { t, locale } = useTranslation();
  const { user } = useAuthStore();
  const qc = useQueryClient();
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientId: '',
    title: '',
    scheduledAt: '',
    duration: '30',
    notes: '',
  });

  const dateStr = toDateStr(currentDate);
  const endpoint =
    view === 'daily'
      ? `/appointments/calendar/daily?date=${dateStr}`
      : view === 'weekly'
        ? `/appointments/calendar/weekly?date=${dateStr}`
        : `/appointments/calendar/monthly?date=${dateStr}`;

  const { data: calendarData, isLoading } = useQuery({
    queryKey: ['appointments-calendar', view, dateStr],
    queryFn: () =>
      apiClient.get<{ appointments: Appointment[]; view: string; start: string; end: string }>(endpoint),
  });

  const { data: patientsData } = useQuery({
    queryKey: ['patients-select'],
    queryFn: () => apiClient.get<{ data: Patient[] }>('/patients?limit=100'),
  });

  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => apiClient.post('/appointments', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments-calendar'] });
      setShowForm(false);
      setForm({ patientId: '', title: '', scheduledAt: '', duration: '30', notes: '' });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.patch(`/appointments/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments-calendar'] }),
  });

  const appointments = calendarData?.appointments ?? [];

  const shiftDate = (days: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.branchId) return;
    createMutation.mutate({
      branchId: user.branchId,
      patientId: form.patientId,
      title: form.title,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
      duration: parseInt(form.duration, 10),
      notes: form.notes || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t('appointments')}</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          {t('add')}
        </Button>
      </div>

      {showForm && (
        <Card className="glass">
          <CardHeader>
            <CardTitle>موعد جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>المريض</Label>
                <Select value={form.patientId} onValueChange={(v) => setForm({ ...form, patientId: v })}>
                  <SelectTrigger><SelectValue placeholder="اختر المريض" /></SelectTrigger>
                  <SelectContent>
                    {patientsData?.data.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} — {p.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>التاريخ والوقت</Label>
                <Input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>المدة (دقيقة)</Label>
                <Input
                  type="number"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>ملاحظات</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? t('loading') : t('save')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="daily">يومي</TabsTrigger>
            <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
            <TabsTrigger value="monthly">شهري</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => shiftDate(view === 'monthly' ? -30 : view === 'weekly' ? -7 : -1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-medium">
              {formatDate(currentDate, locale)}
            </span>
            <Button variant="outline" size="icon" onClick={() => shiftDate(view === 'monthly' ? 30 : view === 'weekly' ? 7 : 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentDate(new Date())}>
              اليوم
            </Button>
          </div>
        </div>

        <TabsContent value={view}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>
                {view === 'daily' ? 'جدول اليوم' : view === 'weekly' ? 'جدول الأسبوع' : 'جدول الشهر'}
                {' '}({appointments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>{t('loading')}</p>
              ) : appointments.length === 0 ? (
                <p className="text-muted-foreground">{t('noData')}</p>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-background/40 p-4"
                    >
                      <div>
                        <p className="font-semibold">{apt.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.patient.firstName} {apt.patient.lastName} · {apt.patient.phone}
                        </p>
                        <p className="text-sm">
                          {new Date(apt.scheduledAt).toLocaleString(locale === 'ar' ? 'ar-JO' : 'en-US')} · {apt.duration} د
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={apt.status} />
                        <Select
                          value={apt.status}
                          onValueChange={(status) => statusMutation.mutate({ id: apt.id, status })}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(APPOINTMENT_STATUS_LABELS).map((s) => (
                              <SelectItem key={s} value={s}>
                                {APPOINTMENT_STATUS_LABELS[s].ar}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
