import jwt from 'jsonwebtoken';
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};
export declare class JwtService {
    getAuthTokens(payload: object): AuthTokens;
    verify(token: string, secret: string): Promise<jwt.JwtPayload>;
    sign(payload: object, secret: string, options?: jwt.SignOptions): string;
}
