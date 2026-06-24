'use client';

import { useQuery } from '@tanstack/react-query';
import { Boxes, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from '@/store/ui-store';

interface Product {
  id: string;
  sku: string;
  name: string;
  nameAr?: string;
  category: string;
  quantity: number;
  minStock: number;
  expiryDate?: string;
}

export default function InventoryPage() {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get<{ data: Product[] }>('/inventory/products'),
  });

  const { data: alerts } = useQuery({
    queryKey: ['low-stock'],
    queryFn: () => apiClient.get<Product[]>('/inventory/alerts/low-stock'),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('inventory')}</h2>

      {(alerts ?? []).length > 0 && (
        <Card className="glass border-amber-500/30">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-amber-600">تنبيهات نقص المخزون ({alerts?.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {alerts?.map((p) => (
                <Badge key={p.id} variant="warning">
                  {p.nameAr || p.name}: {p.quantity}/{p.minStock}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass">
        <CardHeader className="flex flex-row items-center gap-3">
          <Boxes className="h-6 w-6 text-primary" />
          <CardTitle>المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>{t('loading')}</p>
          ) : !data?.data?.length ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="pb-3 text-start">SKU</th>
                  <th className="pb-3 text-start">الاسم</th>
                  <th className="pb-3 text-start">الفئة</th>
                  <th className="pb-3 text-start">الكمية</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-3 font-mono text-xs">{p.sku}</td>
                    <td className="py-3">{p.nameAr || p.name}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3">
                      <Badge variant={p.quantity <= p.minStock ? 'warning' : 'success'}>
                        {p.quantity}
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
