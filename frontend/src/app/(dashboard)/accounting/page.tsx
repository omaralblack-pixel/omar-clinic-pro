'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/store/ui-store';
export default function AccountingPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('accounting')}</h2>
      <Card className="glass"><CardHeader><CardTitle>{t('accounting')}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Income · Expenses · Cashbox · Daily/Monthly/Annual Reports</p></CardContent></Card>
    </div>
  );
}
