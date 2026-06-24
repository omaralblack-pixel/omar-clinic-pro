export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    tenantId?: string;
    branchId?: string;
}
export declare const CurrentUser: (...dataOrPipes: (keyof JwtPayload | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
export declare const TenantId: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const BranchId: (...dataOrPipes: unknown[]) => ParameterDecorator;
