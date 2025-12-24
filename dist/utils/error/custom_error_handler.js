"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTooLargeError = exports.InternalServerError = exports.ForbiddenError = exports.UnauthenticatedError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, comingFrom, metadata) {
        super(message);
        this.comingFrom = comingFrom;
        this.metadata = metadata;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor); // For better stack trace
    }
    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom,
            stack: this.stack,
            metadata: this.metadata,
        };
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = 'error';
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        this.status = 'error';
    }
}
exports.NotFoundError = NotFoundError;
class UnauthenticatedError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        this.status = 'error';
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class ForbiddenError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
        this.status = 'error';
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.status = 'error';
    }
}
exports.InternalServerError = InternalServerError;
class FileTooLargeError extends CustomError {
    constructor(message, comingFrom, metadata) {
        super(message, comingFrom, metadata);
        this.statusCode = http_status_codes_1.StatusCodes.REQUEST_TOO_LONG;
        this.status = 'error';
    }
}
exports.FileTooLargeError = FileTooLargeError;
