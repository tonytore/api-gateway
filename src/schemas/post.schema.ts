import joi from 'joi';
import { idValidator } from '../shared/schema';

export const createPostSchema = joi.object({
  body: joi.object({
    title: joi.string().min(3).max(150).required(),
    content: joi.string().min(10).required(),
    excerpt: joi.string().max(300).optional(),
    status: joi.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').optional(),
    categoryId: joi.string().optional(),
    tags: joi.array().items(joi.string()).optional(),
  }),
});

export const updatePostSchema = joi.object({
  body: joi.object({
    title: joi.string().min(3).max(150).optional(),
    content: joi.string().min(10).optional(),
    excerpt: joi.string().max(300).optional(),
    status: joi.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').optional(),
    categoryId: joi.string().optional(),
    tags: joi.array().items(joi.string()).optional(),
  }),
  params: joi.object({ id: idValidator('ID') }),
  query: joi.object().length(0),
});

export const getPostStatusSchema = joi.object({
  params: joi.object({
    status: joi.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').required(),
  }),
  query: joi.object().length(0),
});

export const getPostBySlugSchema = joi.object({
  params: joi.object({ slug: joi.string().required() }),
  query: joi.object().length(0),
});
