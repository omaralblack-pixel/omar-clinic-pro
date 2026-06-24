'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';

export default function VerifyOtpPage() {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/auth/verify-otp', { email, otpCode });
      setStep('reset');
      setMessage('تم التحقق. أدخل كلمة المرور الجديدة');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'فشل التحقق');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/auth/reset-password', { email, otpCode, newPassword });
      setMessage('تم تغيير كلمة المرور بنجاح');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'فشل إعادة التعيين');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="glass w-full max-w-md">
        <CardHeader>
          <CardTitle>التحقق من OTP</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'verify' ? (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>رمز OTP</Label>
                <Input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required maxLength={6} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">تحقق</Button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {message && <p className="text-sm text-emerald-600">{message}</p>}
              <div className="space-y-2">
                <Label>كلمة المرور الجديدة</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">تغيير كلمة المرور</Button>
            </form>
          )}
          <Link href="/login" className="mt-4 block text-center text-sm text-primary">العودة لتسجيل الدخول</Link>
        </CardContent>
      </Card>
    </div>
  );
}
