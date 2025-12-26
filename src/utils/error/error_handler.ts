import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../helper/response_helper';
import { CustomError } from './custom_error_handler';
import { logger } from '../logger/logger';
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (res.headersSent) {
    logger.error({ message: err.message, stack: err.stack, ip: req.ip });
    return;
  }

  if (err instanceof CustomError) {
    const errorDetails = err.serializeErrors();

    logger.error({
      message: errorDetails.message,
      statusCode: errorDetails.statusCode,
      comingFrom: errorDetails.comingFrom,
      status: errorDetails.status,
      stack: err.stack,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: req.headers['x-request-id'] || 'N/A',
    });

    errorResponse(
      res,
      errorDetails.message,
      errorDetails,
      errorDetails.statusCode,
    );
    return;
  } else {
    logger.error({
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      comingFrom: 'Unknown',
      status: 'error',
      stack: err.stack,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: req.headers['x-request-id'] || 'N/A',
    });

    errorResponse(
      res,
      'Something went wrong!',
      err,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
    return;
  }
};

export default errorHandler;
