interface AccessTokenPayload {
    userId: string;
    role: string;
}
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export {};
