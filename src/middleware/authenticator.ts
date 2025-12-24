import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger/logger';
import { verifyAccessToken } from '../utils/helper/auth';
import { UnauthenticatedError } from '../utils/error/custom_error_handler';

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new UnauthenticatedError(
      'Please log in to access this resource',
      'AuthMiddleware',
    );
  }

  const token = accessToken;

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    const user = payload;
    if (!user) {
      throw new UnauthenticatedError(
        'Your session is invalid. Please log in again',
        'AuthMiddleware',
      );
    }

    return next();
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    throw new UnauthenticatedError(
      'Your session has expired. Please log in again',
      'AuthMiddleware',
      {
        originalError: errorMessage,
      },
    );
  }
}

export async function optAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return next();
  }

  const token = accessToken;

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    return next();
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';
    logger.info('optAuth: token verify failed — continuing unauthenticated', {
      message: errorMessage,
    });

    return next();
  }
}
