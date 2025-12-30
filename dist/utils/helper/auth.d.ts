interface AccessTokenPayload {
    userId: string;
    role: string;
    sessionId: string;
}
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export {};
