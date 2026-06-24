import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    login(dto: LoginDto, ipAddress?: string, userAgent?: string): Promise<{
        requires2FA: boolean;
        message: string;
    } | {
        accessToken: string;
        refreshToken: string;
        user: {
            [x: string]: unknown;
        };
        requires2FA?: undefined;
        message?: undefined;
    }>;
    logout(userId: string, token?: string): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        valid: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    setup2FA(userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    enable2FA(userId: string, otpCode: string): Promise<{
        message: string;
    }>;
    disable2FA(userId: string, otpCode: string): Promise<{
        message: string;
    }>;
    getSessions(userId: string): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date;
        ipAddress: string | null;
        userAgent: string | null;
    }[]>;
    revokeSession(userId: string, sessionId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    private createSession;
    private validateOtp;
    private generateOtp;
    private otpExpiry;
    private sanitizeUser;
}
