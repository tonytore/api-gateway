"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayAuth = void 0;
exports.requireAuth = requireAuth;
const auth_1 = require("../utils/helper/auth");
const response_helper_1 = require("../utils/helper/response_helper");
const gatewayAuth = (req, _res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return next();
    }
    try {
        const payload = (0, auth_1.verifyAccessToken)(accessToken);
        req.user = {
            id: payload.userId,
            role: payload.role,
        };
        req.sessionId = payload.sessionId;
        next();
    }
    catch {
        return next();
    }
};
exports.gatewayAuth = gatewayAuth;
function requireAuth(req, res, next) {
    if (!req.user) {
        return (0, response_helper_1.errorResponse)(res, 'Authentication required', 'requireAuth', 401);
    }
    next();
}
