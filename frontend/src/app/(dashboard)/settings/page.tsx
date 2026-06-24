'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/store/ui-store';
export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('settings')}</h2>
      <Card className="glass"><CardHeader><CardTitle>{t('settings')}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">2FA · Sessions · Profile · Notifications · WhatsApp Integration</p></CardContent></Card>
    </div>
  );
}
