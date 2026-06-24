'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/store/ui-store';
export default function AdminPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('admin')}</h2>
      <Card className="glass"><CardHeader><CardTitle>Super Admin Panel</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Tenants · Users · Permissions · Subscriptions · Plans</p></CardContent></Card>
    </div>
  );
}
