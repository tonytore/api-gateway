import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const authRouter = Router();

authRouter.use(
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
  }),
);

export default authRouter;
