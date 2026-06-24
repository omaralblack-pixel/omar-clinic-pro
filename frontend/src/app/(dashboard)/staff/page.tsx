'use client';

import { useQuery } from '@tanstack/react-query';
import { UserCog, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from '@/store/ui-store';

interface Employee {
  id: string;
  employeeNo: string;
  department?: string;
  jobTitle?: string;
  isActive: boolean;
  user: { firstName: string; lastName: string; email: string };
}

interface Attendance {
  id: string;
  date: string;
  status: string;
  checkIn?: string;
  employee: { user: { firstName: string; lastName: string } };
}

export default function StaffPage() {
  const { t } = useTranslation();

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => apiClient.get<{ data: Employee[] }>('/staff/employees'),
  });

  const { data: attendance } = useQuery({
    queryKey: ['attendance-today'],
    queryFn: () => {
      const today = new Date().toISOString().split('T')[0];
      return apiClient.get<Attendance[]>(`/staff/attendance?date=${today}`);
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('staff')}</h2>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>حضور اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          {!attendance?.length ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <div className="space-y-2">
              {attendance.map((a) => (
                <div key={a.id} className="flex justify-between rounded-lg border border-white/10 p-3 text-sm">
                  <span>{a.employee.user.firstName} {a.employee.user.lastName}</span>
                  <Badge variant={a.status === 'PRESENT' ? 'success' : 'warning'}>{a.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          <CardTitle>الموظفين ({employees?.data?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!employees?.data?.length ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="pb-3 text-start">#</th>
                  <th className="pb-3 text-start">الاسم</th>
                  <th className="pb-3 text-start">القسم</th>
                  <th className="pb-3 text-start">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {employees.data.map((e) => (
                  <tr key={e.id} className="border-b border-white/5">
                    <td className="py-3 font-mono">{e.employeeNo}</td>
                    <td className="py-3">{e.user.firstName} {e.user.lastName}</td>
                    <td className="py-3">{e.department || '—'}</td>
                    <td className="py-3">
                      <Badge variant={e.isActive ? 'success' : 'secondary'}>
                        {e.isActive ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
