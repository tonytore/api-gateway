declare const appConfig: {
    AUTH_SERVICE_URL: string;
    APP_NAME: string | undefined;
    NODE_ENV: "development" | "production";
    LOG_LEVEL: string | undefined;
    LOKI_URL: string;
    ACCESS_TOKEN_SECRET: string | undefined;
    REFRESH_TOKEN_SECRET: string | undefined;
    ACCESS_TOKEN_EXPIRY: number;
    ACCESS_TOKEN_EXPIRES_IN: string | undefined;
    REFRESH_TOKEN_EXPIRY: number;
    REFRESH_TOKEN_EXPIRES_IN: string | undefined;
    RABBITMQ_URL: string;
    ACCESS_COOKIE_OPTIONS: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "lax";
        maxAge: number;
    };
};
export default appConfig;
