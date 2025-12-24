import { StatusCodes } from 'http-status-codes';
export interface ErrorType {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
    stack?: string;
    metadata?: unknown;
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    comingFrom: string;
    metadata?: unknown;
    constructor(message: string, comingFrom: string, metadata?: unknown);
    serializeErrors(): ErrorType;
}
export declare class BadRequestError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
export declare class NotFoundError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
export declare class UnauthenticatedError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
export declare class ForbiddenError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
export declare class InternalServerError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
export declare class FileTooLargeError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string, metadata?: unknown);
}
