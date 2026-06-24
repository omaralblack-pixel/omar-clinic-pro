"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const otplib_1 = require("otplib");
const QRCode = require("qrcode");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async login(dto, ipAddress, userAgent) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
            include: { tenant: true, branch: true },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const validPassword = await bcrypt.compare(dto.password, user.passwordHash);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.twoFactorEnabled) {
            if (!dto.otpCode) {
                return { requires2FA: true, message: 'Two-factor authentication required' };
            }
            const valid = otplib_1.authenticator.verify({
                token: dto.otpCode,
                secret: user.twoFactorSecret,
            });
            if (!valid)
                throw new common_1.UnauthorizedException('Invalid 2FA code');
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
    async logout(userId, token) {
        if (token) {
            await this.prisma.session.deleteMany({ where: { userId, token } });
        }
        else {
            await this.prisma.session.deleteMany({ where: { userId } });
        }
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
        return { message: 'Logged out successfully' };
    }
    async forgotPassword(dto) {
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
                purpose: client_1.OtpPurpose.PASSWORD_RESET,
                expiresAt: this.otpExpiry(),
            },
        });
        console.log(`[OTP] Password reset for ${user.email}: ${code}`);
        return { message: 'If the email exists, an OTP has been sent' };
    }
    async verifyOtp(dto) {
        await this.validateOtp(dto.email, dto.otpCode, client_1.OtpPurpose.PASSWORD_RESET);
        return { valid: true, message: 'OTP verified' };
    }
    async resetPassword(dto) {
        const user = await this.validateOtp(dto.email, dto.otpCode, client_1.OtpPurpose.PASSWORD_RESET);
        const passwordHash = await bcrypt.hash(dto.newPassword, 12);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });
        return { message: 'Password reset successfully' };
    }
    async refreshToken(refreshToken) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.generateTokens(stored.user);
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
        return tokens;
    }
    async setup2FA(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const secret = otplib_1.authenticator.generateSecret();
        const otpauth = otplib_1.authenticator.keyuri(user.email, 'OMAR CLINIC PRO', secret);
        const qrCode = await QRCode.toDataURL(otpauth);
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorSecret: secret },
        });
        return { secret, qrCode };
    }
    async enable2FA(userId, otpCode) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user?.twoFactorSecret) {
            throw new common_1.BadRequestException('Setup 2FA first');
        }
        const valid = otplib_1.authenticator.verify({
            token: otpCode,
            secret: user.twoFactorSecret,
        });
        if (!valid)
            throw new common_1.BadRequestException('Invalid OTP code');
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorEnabled: true },
        });
        return { message: '2FA enabled successfully' };
    }
    async disable2FA(userId, otpCode) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user?.twoFactorSecret)
            throw new common_1.BadRequestException('2FA not enabled');
        const valid = otplib_1.authenticator.verify({
            token: otpCode,
            secret: user.twoFactorSecret,
        });
        if (!valid)
            throw new common_1.BadRequestException('Invalid OTP code');
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorEnabled: false, twoFactorSecret: null },
        });
        return { message: '2FA disabled successfully' };
    }
    async getSessions(userId) {
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
    async revokeSession(userId, sessionId) {
        await this.prisma.session.deleteMany({
            where: { id: sessionId, userId },
        });
        return { message: 'Session revoked' };
    }
    async generateTokens(user) {
        const payload = {
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
        const refreshToken = (0, uuid_1.v4)();
        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return { accessToken, refreshToken };
    }
    async createSession(userId, token, ipAddress, userAgent) {
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
    async validateOtp(email, code, purpose) {
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (!user)
            throw new common_1.BadRequestException('Invalid OTP');
        const otp = await this.prisma.otpToken.findFirst({
            where: {
                userId: user.id,
                code,
                purpose,
                usedAt: null,
                expiresAt: { gt: new Date() },
            },
        });
        if (!otp)
            throw new common_1.BadRequestException('Invalid or expired OTP');
        await this.prisma.otpToken.update({
            where: { id: otp.id },
            data: { usedAt: new Date() },
        });
        return user;
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    otpExpiry() {
        const minutes = parseInt(this.config.get('OTP_EXPIRES_MINUTES', '10'), 10);
        return new Date(Date.now() + minutes * 60 * 1000);
    }
    sanitizeUser(user) {
        const { passwordHash, twoFactorSecret, ...safe } = user;
        return safe;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map