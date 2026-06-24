import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto, Enable2faDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, req: Request): Promise<{
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
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, req: Request): Promise<{
        message: string;
    }>;
    setup2FA(userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    enable2FA(userId: string, dto: Enable2faDto): Promise<{
        message: string;
    }>;
    disable2FA(userId: string, dto: Enable2faDto): Promise<{
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
}
