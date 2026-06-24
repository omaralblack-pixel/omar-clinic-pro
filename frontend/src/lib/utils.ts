import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale = 'ar-JO') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'JOD',
  }).format(amount);
}

export function formatDate(date: string | Date, locale = 'ar') {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-JO' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}
