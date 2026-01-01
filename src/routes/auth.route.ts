import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRateLimiter } from '../config/rateLimiter';

const authRouter = Router();

authRouter.use(
  '/api/auth',
  createRateLimiter({ windowMs: 60_000, max: 5 }),
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
  }),
);

export default authRouter;
