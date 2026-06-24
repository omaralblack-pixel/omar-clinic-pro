'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Zap,
  Package,
  Receipt,
  Calculator,
  Boxes,
  UserCog,
  Megaphone,
  FileBarChart,
  Building2,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/store/ui-store';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, key: 'dashboard' as const },
  { href: '/patients', icon: Users, key: 'patients' as const },
  { href: '/appointments', icon: Calendar, key: 'appointments' as const },
  { href: '/laser', icon: Zap, key: 'laser' as const },
  { href: '/packages', icon: Package, key: 'packages' as const },
  { href: '/sales', icon: Receipt, key: 'sales' as const },
  { href: '/accounting', icon: Calculator, key: 'accounting' as const },
  { href: '/inventory', icon: Boxes, key: 'inventory' as const },
  { href: '/staff', icon: UserCog, key: 'staff' as const },
  { href: '/marketing', icon: Megaphone, key: 'marketing' as const },
  { href: '/reports', icon: FileBarChart, key: 'reports' as const },
  { href: '/branches', icon: Building2, key: 'branches' as const },
  { href: '/settings', icon: Settings, key: 'settings' as const },
  { href: '/admin', icon: Shield, key: 'admin' as const },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <aside className="glass fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
          OC
        </div>
        <div>
          <p className="font-bold text-sm">{t('appName')}</p>
          <p className="text-xs text-muted-foreground">PRO</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, key }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              pathname.startsWith(href)
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <Icon className="h-5 w-5" />
            {t(key)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
