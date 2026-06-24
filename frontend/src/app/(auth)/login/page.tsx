'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth-store';
import { useTranslation } from '@/store/ui-store';

export default function LoginPage() {
  const [email, setEmail] = useState('manager@omarclinic.com');
  const [password, setPassword] = useState('Manager@123');
  const [otpCode, setOtpCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiClient.post<{
        requires2FA?: boolean;
        user?: { id: string; email: string; firstName: string; lastName: string; role: string; tenantId?: string; branchId?: string };
        accessToken?: string;
        refreshToken?: string;
      }>('/auth/login', { email, password, otpCode: otpCode || undefined });

      if (res.requires2FA) {
        setRequires2FA(true);
        return;
      }

      if (res.user && res.accessToken && res.refreshToken) {
        setAuth(res.user, res.accessToken, res.refreshToken);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="glass w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            OC
          </div>
          <CardTitle>{t('appName')}</CardTitle>
          <CardDescription>{t('tagline')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {requires2FA && (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input id="otp" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('loading') : t('login')}
            </Button>
            <Link href="/forgot-password" className="block text-center text-sm text-primary hover:underline">
              {t('forgotPassword')}
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
