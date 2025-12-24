import { Response } from 'express';
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}
export declare const successResponse: <T>(res: Response, message: string, data?: T, statusCode?: number) => Response;
export declare const errorResponse: (res: Response, message: string, error?: unknown, statusCode?: number) => Response;
