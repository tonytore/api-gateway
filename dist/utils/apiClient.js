"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const app_configs_js_1 = __importDefault(require("../config/app_configs.js"));
const custom_error_handler_js_1 = require("./error/custom_error_handler.js");
const httpsAgent = new https_1.default.Agent({
    rejectUnauthorized: false,
});
const httpClient = axios_1.default.create({
    baseURL: app_configs_js_1.default.CLIENT_URL,
    httpsAgent,
    headers: {
        "User-Agent": "internal-microservice-client",
    },
    timeout: 5000,
});
httpClient.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
        const { statusCode, message, comingFrom, metadata } = error.response.data;
        switch (statusCode) {
            case 400:
                throw new custom_error_handler_js_1.BadRequestError(message, comingFrom || "Common Service", metadata);
            case 401:
                throw new custom_error_handler_js_1.UnauthenticatedError(message, comingFrom || "Common Service", metadata);
            case 403:
                throw new custom_error_handler_js_1.ForbiddenError(message, comingFrom || "Common Service", metadata);
            case 404:
                throw new custom_error_handler_js_1.NotFoundError(message, comingFrom || "Common Service", metadata);
            default:
                throw new custom_error_handler_js_1.InternalServerError(message || "Error from BMLA Service", comingFrom || "BMLA Service", metadata);
        }
    }
    else if (error.request) {
        throw new custom_error_handler_js_1.InternalServerError("No response received from Common Service", "BMLA Service");
    }
    else {
        throw new custom_error_handler_js_1.InternalServerError(error.message, "BMLA Service");
    }
});
exports.default = httpClient;
