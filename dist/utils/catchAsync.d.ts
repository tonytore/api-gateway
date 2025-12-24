import { Request, Response, NextFunction } from 'express';
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
declare const catchAsync: (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
