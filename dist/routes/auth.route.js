"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const authRouter = (0, express_1.Router)();
authRouter.use('/auth', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4000',
    changeOrigin: true,
}));
exports.default = authRouter;
