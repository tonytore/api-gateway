import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectRabbitMQ } from './rabbitmq/connection';
import { logger } from './utils/logger/logger';
import { gatewayAuth } from './middleware/authenticator';
import postRouter from './routes/post.routes';
import { createProxyMiddleware } from 'http-proxy-middleware';
dotenv.config();

async function bootstrap() {
  const app = express();
  // Only parse JSON for direct (non-proxy) routes
  app.use('/internal', express.json());
  app.use(cookieParser());
  app.use(gatewayAuth);

  await connectRabbitMQ(); // VERY IMPORTANT

  app.get('/favicon.ico', (_req, res) => res.status(204).end());

  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/auth/',
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Basic ' + Buffer.from('gateway:gatewaySecret').toString('base64'),
      },
    }),
  );
  app.use('/api', postRouter);

  app.listen(4001, () => {
    logger.info('API Gateway running on port 4001');
  });
}

bootstrap();
