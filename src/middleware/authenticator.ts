import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/helper/auth';
import { errorResponse } from '../utils/helper/response_helper';

export const gatewayAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return next();
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    req.sessionId = payload.sessionId;
    next();
  } catch {
    return next();
  }
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return errorResponse(res, 'Authentication required', 'requireAuth', 401);
  }
  next();
}
