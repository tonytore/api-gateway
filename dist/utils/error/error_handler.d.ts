import { Request, Response, NextFunction } from 'express';
declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => void;
export default errorHandler;
