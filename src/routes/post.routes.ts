import { authMiddleware } from '../middleware/authenticator';
import { Router } from 'express';
import { validate } from '../middleware/validator';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';
import { postController } from '../controllers/post.controller';

export const postRouter = Router();

postRouter.post(
  '/posts',
  authMiddleware,
  validate(createPostSchema),
  postController.createPost,
);

postRouter.put(
  '/posts/:id',
  authMiddleware,
  validate(updatePostSchema),
  postController.updatePost,
);

postRouter.delete(
  '/posts/:id',
  authMiddleware,
  postController.deletePost,
);
