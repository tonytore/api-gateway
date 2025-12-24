import { NextFunction, Request, Response } from 'express';
export declare function authMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void>;
export declare function optAuthMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void>;
