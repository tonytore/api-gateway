"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.optAuthMiddleware = optAuthMiddleware;
const logger_1 = require("../utils/logger/logger");
const auth_1 = require("../utils/helper/auth");
const custom_error_handler_1 = require("../utils/error/custom_error_handler");
async function authMiddleware(req, _res, next) {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        throw new custom_error_handler_1.UnauthenticatedError('Please log in to access this resource', 'AuthMiddleware');
    }
    const token = accessToken;
    try {
        const payload = (0, auth_1.verifyAccessToken)(token);
        req.user = {
            id: payload.userId,
            role: payload.role,
        };
        const user = payload;
        if (!user) {
            throw new custom_error_handler_1.UnauthenticatedError('Your session is invalid. Please log in again', 'AuthMiddleware');
        }
        return next();
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        throw new custom_error_handler_1.UnauthenticatedError('Your session has expired. Please log in again', 'AuthMiddleware', {
            originalError: errorMessage,
        });
    }
}
async function optAuthMiddleware(req, _res, next) {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return next();
    }
    const token = accessToken;
    try {
        const payload = (0, auth_1.verifyAccessToken)(token);
        req.user = {
            id: payload.userId,
            role: payload.role,
        };
        return next();
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        logger_1.logger.info('optAuth: token verify failed — continuing unauthenticated', {
            message: errorMessage,
        });
        return next();
    }
}
