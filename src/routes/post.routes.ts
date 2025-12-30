import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { requireAuth } from '../middleware/authenticator';

const postRouter = Router();

postRouter.use(
  '/posts',
  requireAuth,
  createProxyMiddleware({
    target: 'http://localhost:4002',
    changeOrigin: true,
  }),
);

export default postRouter;
