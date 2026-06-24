import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { OtpPurpose } from '@prisma/client';
import {
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { JwtPayload } from '../common/decorators/current-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { tenant: true, branch: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(dto.password, user.passwordHash);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.twoFactorEnabled) {
      if (!dto.otpCode) {
        return { requires2FA: true, message: 'Two-factor authentication required' };
      }
      const valid = authenticator.verify({
        token: dto.otpCode,
        secret: user.twoFactorSecret!,
      });
      if (!valid) throw new UnauthorizedException('Invalid 2FA code');
    }

    const tokens = await this.generateTokens(user);
    await this.createSession(user.id, tokens.accessToken, ipAddress, userAgent);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async logout(userId: string, token?: string) {
    if (token) {
      await this.prisma.session.deleteMany({ where: { userId, token } });
    } else {
      await this.prisma.session.deleteMany({ where: { userId } });
    }
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      return { message: 'If the email exists, an OTP has been sent' };
    }

    const code = this.generateOtp();
    await this.prisma.otpToken.create({
      data: {
        userId: user.id,
        code,
        purpose: OtpPurpose.PASSWORD_RESET,
        expiresAt: this.otpExpiry(),
      },
    });

    // TODO: Send OTP via email/SMS in production
    console.log(`[OTP] Password reset for ${user.email}: ${code}`);

    return { message: 'If the email exists, an OTP has been sent' };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    await this.validateOtp(dto.email, dto.otpCode, OtpPurpose.PASSWORD_RESET);
    return { valid: true, message: 'OTP verified' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.validateOtp(
      dto.email,
      dto.otpCode,
      OtpPurpose.PASSWORD_RESET,
    );

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return { message: 'Password reset successfully' };
  }

  async refreshToken(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(stored.user);
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    return tokens;
  }

  async setup2FA(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, 'OMAR CLINIC PRO', secret);
    const qrCode = await QRCode.toDataURL(otpauth);

    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });

    return { secret, qrCode };
  }

  async enable2FA(userId: string, otpCode: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.twoFactorSecret) {
      throw new BadRequestException('Setup 2FA first');
    }

    const valid = authenticator.verify({
      token: otpCode,
      secret: user.twoFactorSecret,
    });
    if (!valid) throw new BadRequestException('Invalid OTP code');

    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true },
    });

    return { message: '2FA enabled successfully' };
  }

  async disable2FA(userId: string, otpCode: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.twoFactorSecret) throw new BadRequestException('2FA not enabled');

    const valid = authenticator.verify({
      token: otpCode,
      secret: user.twoFactorSecret,
    });
    if (!valid) throw new BadRequestException('Invalid OTP code');

    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });

    return { message: '2FA disabled successfully' };
  }

  async getSessions(userId: string) {
    return this.prisma.session.findMany({
      where: { userId, expiresAt: { gt: new Date() } },
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revokeSession(userId: string, sessionId: string) {
    await this.prisma.session.deleteMany({
      where: { id: sessionId, userId },
    });
    return { message: 'Session revoked' };
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    role: string;
    tenantId: string | null;
    branchId: string | null;
  }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId ?? undefined,
      branchId: user.branchId ?? undefined,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES', '15m'),
    });

    const refreshToken = uuidv4();
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  private async createSession(
    userId: string,
    token: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    await this.prisma.session.create({
      data: {
        userId,
        token,
        ipAddress,
        userAgent,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  }

  private async validateOtp(email: string, code: string, purpose: OtpPurpose) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) throw new BadRequestException('Invalid OTP');

    const otp = await this.prisma.otpToken.findFirst({
      where: {
        userId: user.id,
        code,
        purpose,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) throw new BadRequestException('Invalid or expired OTP');

    await this.prisma.otpToken.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    return user;
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private otpExpiry(): Date {
    const minutes = parseInt(
      this.config.get('OTP_EXPIRES_MINUTES', '10'),
      10,
    );
    return new Date(Date.now() + minutes * 60 * 1000);
  }

  private sanitizeUser(user: Record<string, unknown>) {
    const { passwordHash, twoFactorSecret, ...safe } = user;
    return safe;
  }
}
