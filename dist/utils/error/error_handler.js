"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const response_helper_js_1 = require("../helper/response_helper.js");
const custom_error_handler_js_1 = require("./custom_error_handler.js");
const logger_js_1 = require("../logger/logger.js");
const errorHandler = (err, req, res, _next) => {
    if (res.headersSent) {
        logger_js_1.logger.error({ message: err.message, stack: err.stack, ip: req.ip });
        return;
    }
    if (err instanceof custom_error_handler_js_1.CustomError) {
        const errorDetails = err.serializeErrors();
        logger_js_1.logger.error({
            message: errorDetails.message,
            statusCode: errorDetails.statusCode,
            comingFrom: errorDetails.comingFrom,
            status: errorDetails.status,
            stack: err.stack,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            requestId: req.headers['x-request-id'] || 'N/A',
        });
        (0, response_helper_js_1.errorResponse)(res, errorDetails.message, errorDetails, errorDetails.statusCode);
        return;
    }
    else {
        logger_js_1.logger.error({
            message: err.message,
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            comingFrom: 'Unknown',
            status: 'error',
            stack: err.stack,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            requestId: req.headers['x-request-id'] || 'N/A',
        });
        (0, response_helper_js_1.errorResponse)(res, 'Something went wrong!', err, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        return;
    }
};
exports.default = errorHandler;
