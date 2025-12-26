import { authMiddleware } from '../middleware/authenticator';
import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validator';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';
import { successResponse } from '../utils/helper/response_helper';
import { postPublish } from '../rabbitmq/connection';
import crypto from 'crypto';

export const postRouter = Router();

postRouter.post(
  '/posts',
  authMiddleware,
  validate(createPostSchema),
  async (req: Request, res: Response) => {
    const publishedPost = await postPublish('post.exchange', 'post.create', {
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

postRouter.put(
  '/posts/:id',
  authMiddleware,
  validate(updatePostSchema),
  async (req: Request, res: Response) => {
    await postPublish('blog.exchange', 'post.update', {
      action: 'post.update',
      data: { id: req.params.id, ...req.body },
      meta: {
        userId: req.user!.id,
        role: req.user!.role,
        requestId: crypto.randomUUID(),
        timestamp: Date.now(),
      },
    });

    return successResponse(res, 'Post update requested', null, 202);
  },
);

postRouter.delete(
  '/posts/:id',
  authMiddleware,
  async (req: Request, res: Response) => {
    await postPublish('blog.exchange', 'post.delete', {
      action: 'post.delete',
      data: { id: req.params.id },
      meta: {
        userId: req.user!.id,
        role: req.user!.role,
        requestId: crypto.randomUUID(),
        timestamp: Date.now(),
      },
    });

    return successResponse(res, 'Post deletion requested', null, 202);
  },
);

