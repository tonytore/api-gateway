import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { logger } from './utils/logger/logger';
import { gatewayAuth } from './middleware/authenticator';
import postRouter from './routes/post.routes';
import { createProxyMiddleware } from 'http-proxy-middleware';
import appConfig from './config/app_config';
import { connectRabbitMQ } from './rabbitmq/connection';
// import {
//   loginLimiter,
//   refreshLimiter,
//   registerLimiter,
// } from './utils/limiters';
dotenv.config();

async function connectWithRetry() {
  while (true) {
    try {
      await connectRabbitMQ();
      logger.info('RabbitMQ connected');
      break;
    } catch (error) {
      logger.warn('RabbitMQ not ready, retrying in 5s...', error);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

async function bootstrap() {
  const app = express();
  app.use(cookieParser());

  await connectWithRetry(); // VERY IMPORTANT

  app.get('/favicon.ico', (_req, res) => res.status(204).end());

  app.use(
    createProxyMiddleware({
      target: appConfig.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathFilter: '/api/auth',
      pathRewrite: {
        '^/api/auth': '/auth',
      },
      headers: {
        'X-Internal-Token': appConfig.INTERNAL_SERVICE_TOKEN!,
      },
    }),
  );

  app.use(express.json());

  app.use('/api', postRouter);

  app.use(gatewayAuth);

  app.listen(4001, () => {
    logger.info('API Gateway running on port 4001');
  });
}

bootstrap();
