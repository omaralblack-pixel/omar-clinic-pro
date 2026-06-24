'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n/translations';

interface UiState {
  locale: Locale;
  sidebarOpen: boolean;
  setLocale: (locale: Locale) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      locale: 'ar',
      sidebarOpen: true,
      setLocale: (locale) => set({ locale }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'omar-clinic-ui' },
  ),
);

export function useTranslation() {
  const locale = useUiStore((s) => s.locale);
  const { translations } = require('@/lib/i18n/translations');
  const t = (key: keyof typeof translations.ar) => translations[locale][key];
  return { t, locale, dir: locale === 'ar' ? 'rtl' : 'ltr' };
}
