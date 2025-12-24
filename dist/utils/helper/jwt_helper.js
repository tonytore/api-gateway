"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const custom_error_handler_js_1 = require("../error/custom_error_handler.js");
dotenv_1.default.config();
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, } = process.env;
class JwtService {
    getAuthTokens(payload) {
        const accessToken = this.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = this.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        return { accessToken, refreshToken };
    }
    async verify(token, secret) {
        const decoded = await new Promise((resolve, reject) => {
            const callback = (err, decoded) => {
                if (err) {
                    reject(new custom_error_handler_js_1.ForbiddenError('You do not have permission', 'Forbidden'));
                }
                else {
                    resolve(decoded);
                }
            };
            jsonwebtoken_1.default.verify(token, secret, callback);
        });
        return decoded;
    }
    sign(payload, secret, options) {
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
}
exports.JwtService = JwtService;
