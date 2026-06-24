'use client';

import { useQuery } from '@tanstack/react-query';
import { Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import type { Invoice } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useTranslation } from '@/store/ui-store';

const STATUS_MAP: Record<string, { ar: string; variant: 'default' | 'success' | 'warning' | 'destructive' }> = {
  DRAFT: { ar: 'مسودة', variant: 'default' },
  PENDING: { ar: 'معلق', variant: 'warning' },
  PARTIALLY_PAID: { ar: 'مدفوع جزئياً', variant: 'warning' },
  PAID: { ar: 'مدفوع', variant: 'success' },
  REFUNDED: { ar: 'مسترد', variant: 'destructive' },
  CANCELLED: { ar: 'ملغي', variant: 'destructive' },
};

export default function SalesPage() {
  const { t, locale } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => apiClient.get<{ data: Invoice[]; meta: { total: number } }>('/sales/invoices'),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('sales')}</h2>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center gap-3">
          <Receipt className="h-6 w-6 text-primary" />
          <CardTitle>الفواتير ({data?.meta.total ?? 0})</CardTitle>
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
                    <th className="pb-3 text-start">رقم الفاتورة</th>
                    <th className="pb-3 text-start">المريض</th>
                    <th className="pb-3 text-start">المبلغ</th>
                    <th className="pb-3 text-start">الحالة</th>
                    <th className="pb-3 text-start">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((inv) => {
                    const st = STATUS_MAP[inv.status] ?? { ar: inv.status, variant: 'default' as const };
                    return (
                      <tr key={inv.id} className="border-b border-white/5">
                        <td className="py-3 font-mono">{inv.invoiceNumber}</td>
                        <td className="py-3">{inv.patient.firstName} {inv.patient.lastName}</td>
                        <td className="py-3 font-semibold">
                          {formatCurrency(Number(inv.total), locale === 'ar' ? 'ar-JO' : 'en-US')}
                        </td>
                        <td className="py-3"><Badge variant={st.variant}>{st.ar}</Badge></td>
                        <td className="py-3">{formatDate(inv.issuedAt, locale)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
