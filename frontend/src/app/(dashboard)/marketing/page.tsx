'use client';

import { useQuery } from '@tanstack/react-query';
import { Megaphone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import { useTranslation } from '@/store/ui-store';

interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  createdAt: string;
}

interface Campaign {
  id: string;
  name: string;
  nameAr?: string;
  platform: string;
  status: string;
}

export default function MarketingPage() {
  const { t } = useTranslation();

  const { data: leads } = useQuery({
    queryKey: ['leads'],
    queryFn: () => apiClient.get<{ data: Lead[] }>('/marketing/leads'),
  });

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => apiClient.get<Campaign[]>('/marketing/campaigns'),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('marketing')}</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Leads ({leads?.data?.length ?? 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!leads?.data?.length ? (
              <p className="text-muted-foreground">{t('noData')}</p>
            ) : (
              <div className="space-y-2">
                {leads.data.slice(0, 10).map((l) => (
                  <div key={l.id} className="flex items-center justify-between rounded-lg border border-white/10 p-3 text-sm">
                    <div>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-muted-foreground">{l.phone} · {l.source}</p>
                    </div>
                    <Badge>{l.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <CardTitle>الحملات ({campaigns?.length ?? 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!campaigns?.length ? (
              <p className="text-muted-foreground">{t('noData')}</p>
            ) : (
              <div className="space-y-2">
                {campaigns.map((c) => (
                  <div key={c.id} className="rounded-lg border border-white/10 p-3 text-sm">
                    <p className="font-medium">{c.nameAr || c.name}</p>
                    <p className="text-muted-foreground">{c.platform} · {c.status}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
