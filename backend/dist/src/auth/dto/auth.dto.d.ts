export declare class LoginDto {
    email: string;
    password: string;
    otpCode?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otpCode: string;
    newPassword: string;
}
export declare class VerifyOtpDto {
    email: string;
    otpCode: string;
}
export declare class Enable2faDto {
    otpCode: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
