import { Request, Response, NextFunction } from 'express';
import {
  ForbiddenError,
  UnauthenticatedError,
} from '../utils/error/custom_error_handler';

export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new UnauthenticatedError(
        'Please log in to continue',
        'authorize middleware',
      );
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError(
        "You don't have permission to perform this action",
        'authorize middleware',
      );
    }

    next();
  };
}
