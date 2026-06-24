'use client';

import { Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useUiStore, useTranslation } from '@/store/ui-store';
import { apiClient } from '@/lib/api/client';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, logout, accessToken } = useAuthStore();
  const { locale, setLocale } = useUiStore();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (accessToken) await apiClient.post('/auth/logout');
    } catch {
      /* ignore */
    }
    logout();
    router.push('/login');
  };

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-lg font-semibold">{t('dashboard')}</h1>
        {user && (
          <p className="text-xs text-muted-foreground">
            {user.firstName} {user.lastName} · {user.role}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          title={locale === 'ar' ? 'English' : 'العربية'}
        >
          <Globe className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
    </header>
  );
}
