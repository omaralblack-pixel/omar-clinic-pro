'use client';

import { useQuery } from '@tanstack/react-query';
import {
  DollarSign,
  Calendar,
  Users,
  UserPlus,
  CreditCard,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/store/ui-store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardStats {
  widgets: {
    todayRevenue: number;
    todayAppointments: number;
    monthlyRevenue: number;
    activePatients: number;
    newPatients: number;
    pendingPayments: number;
    inventoryAlerts: number;
    staffAttendance: number;
  };
}

interface ChartsData {
  revenueTrend: { date: string; value: number }[];
  appointmentTrend: { date: string; value: number }[];
}

export default function DashboardPage() {
  const { t, locale } = useTranslation();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiClient.get<DashboardStats>('/dashboard/stats'),
  });

  const { data: charts } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: () => apiClient.get<ChartsData>('/dashboard/charts?days=30'),
  });

  const w = stats?.widgets;

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">{t('loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('todayRevenue')} value={formatCurrency(w?.todayRevenue ?? 0, locale === 'ar' ? 'ar-JO' : 'en-US')} icon={DollarSign} />
        <StatCard title={t('todayAppointments')} value={w?.todayAppointments ?? 0} icon={Calendar} />
        <StatCard title={t('monthlyRevenue')} value={formatCurrency(w?.monthlyRevenue ?? 0)} icon={DollarSign} />
        <StatCard title={t('activePatients')} value={w?.activePatients ?? 0} icon={Users} />
        <StatCard title={t('newPatients')} value={w?.newPatients ?? 0} icon={UserPlus} />
        <StatCard title={t('pendingPayments')} value={w?.pendingPayments ?? 0} icon={CreditCard} />
        <StatCard title={t('inventoryAlerts')} value={w?.inventoryAlerts ?? 0} icon={AlertTriangle} />
        <StatCard title={t('staffAttendance')} value={w?.staffAttendance ?? 0} icon={UserCheck} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>اتجاه الإيرادات</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.revenueTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(187 85% 38%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle>اتجاه المواعيد</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.appointmentTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(187 70% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
