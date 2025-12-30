import { Request, Response } from 'express';
export declare const postController: {
    createPost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updatePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deletePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
