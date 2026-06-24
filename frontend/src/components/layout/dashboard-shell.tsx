'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useAuthStore } from '@/store/auth-store';
import { useUiStore } from '@/store/ui-store';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const { locale } = useUiStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
      <Sidebar />
      <div className="ps-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
