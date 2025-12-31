import env from 'dotenv';
env.config();

const appConfig = {
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOKI_URL: process.env.LOKI_URL || 'http://loki:3100',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: 18000,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRY: 86400,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  RABBITMQ_URL: process.env.RABBITMQ_ENDPOINT || 'amqp://localhost',
  ACCESS_COOKIE_OPTIONS: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax' as const,
    maxAge: 54000000, // 15 minutes in milliseconds
  },
};

export default appConfig;
