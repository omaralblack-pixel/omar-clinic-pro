'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';
import type { Branch } from '@/lib/types';
import { useTranslation } from '@/store/ui-store';

export default function BranchesPage() {
  const { t } = useTranslation();
  const { data: branches, isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => apiClient.get<Branch[]>('/branches'),
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('branches')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {(branches ?? []).map((b) => (
          <Card key={b.id} className="glass">
            <CardHeader className="flex flex-row items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>{b.nameAr || b.name}</CardTitle>
                <p className="text-sm text-muted-foreground font-mono">{b.code}</p>
              </div>
              <Badge className="ms-auto" variant={b.isActive ? 'success' : 'secondary'}>
                {b.isActive ? 'نشط' : 'غير نشط'}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {b.city && <p>{b.city}</p>}
              {b.phone && <p>{b.phone}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      {isLoading && <p>{t('loading')}</p>}
      {!isLoading && !branches?.length && <p className="text-muted-foreground">{t('noData')}</p>}
    </div>
  );
}
