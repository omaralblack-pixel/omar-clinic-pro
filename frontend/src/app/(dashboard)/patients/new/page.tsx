'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth-store';
import { useTranslation } from '@/store/ui-store';
import type { Branch } from '@/lib/types';

export default function NewPatientPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    branchId: user?.branchId ?? '',
    firstName: '',
    lastName: '',
    firstNameAr: '',
    lastNameAr: '',
    gender: 'FEMALE',
    phone: '',
    whatsapp: '',
    email: '',
    nationalId: '',
    address: '',
    birthDate: '',
    emergencyName: '',
    emergencyPhone: '',
    allergies: '',
    skinType: '',
    medicalNotes: '',
  });

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: () => apiClient.get<Branch[]>('/branches'),
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiClient.post<{ id: string }>('/patients', {
        branchId: form.branchId,
        firstName: form.firstName,
        lastName: form.lastName,
        firstNameAr: form.firstNameAr || undefined,
        lastNameAr: form.lastNameAr || undefined,
        gender: form.gender,
        phone: form.phone,
        whatsapp: form.whatsapp || undefined,
        email: form.email || undefined,
        nationalId: form.nationalId || undefined,
        address: form.address || undefined,
        birthDate: form.birthDate || undefined,
        emergencyName: form.emergencyName || undefined,
        emergencyPhone: form.emergencyPhone || undefined,
        medicalInfo: {
          allergies: form.allergies || undefined,
          skinType: form.skinType || undefined,
          medicalNotes: form.medicalNotes || undefined,
        },
      }),
    onSuccess: (data: { id: string }) => router.push(`/patients/${data.id}`),
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">إضافة مريض جديد</h2>
      <Card className="glass">
        <CardHeader><CardTitle>البيانات الشخصية</CardTitle></CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2 sm:col-span-2">
              <Label>الفرع</Label>
              <Select value={form.branchId} onValueChange={(v) => set('branchId', v)}>
                <SelectTrigger><SelectValue placeholder="اختر الفرع" /></SelectTrigger>
                <SelectContent>
                  {(branches ?? []).map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.nameAr || b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الاسم الأول (EN)</Label>
              <Input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>اسم العائلة (EN)</Label>
              <Input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>الاسم الأول (AR)</Label>
              <Input value={form.firstNameAr} onChange={(e) => set('firstNameAr', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>اسم العائلة (AR)</Label>
              <Input value={form.lastNameAr} onChange={(e) => set('lastNameAr', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>الجنس</Label>
              <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="FEMALE">أنثى</SelectItem>
                  <SelectItem value="MALE">ذكر</SelectItem>
                  <SelectItem value="OTHER">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>تاريخ الميلاد</Label>
              <Input type="date" value={form.birthDate} onChange={(e) => set('birthDate', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>الهاتف *</Label>
              <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>البريد</Label>
              <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>الرقم الوطني</Label>
              <Input value={form.nationalId} onChange={(e) => set('nationalId', e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>العنوان</Label>
              <Input value={form.address} onChange={(e) => set('address', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>جهة الطوارئ</Label>
              <Input value={form.emergencyName} onChange={(e) => set('emergencyName', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>هاتف الطوارئ</Label>
              <Input value={form.emergencyPhone} onChange={(e) => set('emergencyPhone', e.target.value)} />
            </div>

            <div className="sm:col-span-2 mt-4">
              <h3 className="mb-3 font-semibold">المعلومات الطبية</h3>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>الحساسية</Label>
              <Input value={form.allergies} onChange={(e) => set('allergies', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>نوع البشرة</Label>
              <Select value={form.skinType} onValueChange={(v) => set('skinType', v)}>
                <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                <SelectContent>
                  {['TYPE_I', 'TYPE_II', 'TYPE_III', 'TYPE_IV', 'TYPE_V', 'TYPE_VI'].map((t) => (
                    <SelectItem key={t} value={t}>{t.replace('TYPE_', 'Type ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>ملاحظات طبية</Label>
              <Input value={form.medicalNotes} onChange={(e) => set('medicalNotes', e.target.value)} />
            </div>

            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? t('loading') : t('save')}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                {t('cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
