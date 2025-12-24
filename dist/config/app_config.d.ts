declare const appConfig: {
    APP_NAME: string | undefined;
    NODE_ENV: "development" | "production";
    LOG_LEVEL: string | undefined;
    LOKI_URL: string;
    ACCESS_TOKEN_SECRET: string | undefined;
    RABBITMQ_URL: string;
};
export default appConfig;
