'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/store/ui-store';
export default function ReportsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('reports')}</h2>
      <Card className="glass"><CardHeader><CardTitle>{t('reports')}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Revenue · Appointments · Patients · Staff · Inventory · PDF · Excel</p></CardContent></Card>
    </div>
  );
}
