"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appConfig = {
    APP_NAME: process.env.APP_NAME,
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOKI_URL: process.env.LOKI_URL || 'http://loki:3100',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    RABBITMQ_URL: process.env.RABBITMQ_ENDPOINT || 'amqp://localhost',
};
exports.default = appConfig;
