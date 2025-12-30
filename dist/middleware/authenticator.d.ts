import { NextFunction, Request, Response } from 'express';
export declare const gatewayAuth: (req: Request, _res: Response, next: NextFunction) => void;
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
