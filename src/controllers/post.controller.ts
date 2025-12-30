import { Request, Response } from 'express';
import { postPublish } from '../rabbitmq/connection';
import crypto from 'crypto';
import { successResponse } from '../utils/helper/response_helper';
import catchAsync from '../utils/helper/catch_async';

export const postController = {
  createPost: catchAsync(async (req: Request, res: Response) => {
    const publishedPost = await postPublish('post.exchange', 'post.create', {
      action: 'post.create',
      payload: {
        data: req.body,
        meta: {
          userId: req.user!.id,
          role: req.user!.role,
          requestId: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      },
    });

    return successResponse(res, 'Post creation requested', publishedPost, 202);
  }),

  updatePost: catchAsync(async (req: Request, res: Response) => {
    await postPublish('post.exchange', 'post.update', {
      action: 'post.update',
      payload: {
        data: { id: req.params.id, ...req.body },
        meta: {
          userId: req.user!.id,
          role: req.user!.role,
          requestId: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      },
    });

    return successResponse(res, 'Post update requested', null, 202);
  }),

  deletePost: catchAsync(async (req: Request, res: Response) => {
    await postPublish('post.exchange', 'post.delete', {
      action: 'post.delete',
      payload: {
        data: { id: req.params.id },
        meta: {
          userId: req.user!.id,
          role: req.user!.role,
          requestId: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      },
    });

    return successResponse(res, 'Post deletion requested', null, 202);
  }),
};
