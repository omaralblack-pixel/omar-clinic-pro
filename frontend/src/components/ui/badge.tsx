import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          default: 'bg-primary/20 text-primary',
          secondary: 'bg-secondary text-secondary-foreground',
          success: 'bg-emerald-500/20 text-emerald-600',
          warning: 'bg-amber-500/20 text-amber-600',
          destructive: 'bg-red-500/20 text-red-600',
        }[variant],
        className,
      )}
      {...props}
    />
  );
}
