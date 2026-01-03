import { Router } from 'express';
import { requireAuth } from '@/middleware/authenticator';
import { createProxyMiddleware } from 'http-proxy-middleware';

const postRouter = Router();


postRouter.use(
  '/posts',
  createProxyMiddleware({
    target: 'http://localhost:4002',
    changeOrigin: true,
  }),
);

export default postRouter;
