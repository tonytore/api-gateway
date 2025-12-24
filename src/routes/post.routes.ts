import { authMiddleware } from '../middleware/authenticator';
import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validator';
import { publish } from '../rabbit/connection';
import { createPostSchema } from '../schemas/post.schema';
import { successResponse } from '../utils/helper/response_helper';

const router = Router();

router.post(
  '/posts',
  authMiddleware,
  validate(createPostSchema),
  (req: Request, res: Response) => {
    const publishedPost = publish('blog.exchange', 'post.create', {
      action: 'post.create',
      data: req.body,
      meta: {
        userId: req.user!.id,
        role: req.user!.role,
        requestId: crypto.randomUUID(),
        timestamp: Date.now(),
      },
    });

    return successResponse(res, 'Post creation requested', publishedPost, 202);
  },
);
