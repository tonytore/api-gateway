import env from 'dotenv';
env.config();

const appConfig = {
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOKI_URL: process.env.LOKI_URL || 'http://loki:3100',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  RABBITMQ_URL: process.env.RABBITMQ_ENDPOINT || 'amqp://localhost',
};

export default appConfig;
