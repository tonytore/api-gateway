"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const authenticator_1 = require("../middleware/authenticator");
const postRouter = (0, express_1.Router)();
postRouter.use('/posts', authenticator_1.requireAuth, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4002',
    changeOrigin: true,
}));
exports.default = postRouter;
