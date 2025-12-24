"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostBySlugSchema = exports.getPostStatusSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const schema_1 = require("../shared/schema");
exports.createPostSchema = joi_1.default.object({
    body: joi_1.default.object({
        title: joi_1.default.string().min(3).max(150).required(),
        content: joi_1.default.string().min(10).required(),
        excerpt: joi_1.default.string().max(300).optional(),
        status: joi_1.default.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').optional(),
        categoryId: joi_1.default.string().optional(),
        tags: joi_1.default.array().items(joi_1.default.string()).optional(),
    }),
});
exports.updatePostSchema = joi_1.default.object({
    body: joi_1.default.object({
        title: joi_1.default.string().min(3).max(150).optional(),
        content: joi_1.default.string().min(10).optional(),
        excerpt: joi_1.default.string().max(300).optional(),
        status: joi_1.default.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').optional(),
        categoryId: joi_1.default.string().optional(),
        tags: joi_1.default.array().items(joi_1.default.string()).optional(),
    }),
    params: joi_1.default.object({ id: (0, schema_1.idValidator)('ID') }),
    query: joi_1.default.object().length(0),
});
exports.getPostStatusSchema = joi_1.default.object({
    params: joi_1.default.object({
        status: joi_1.default.string().valid('DRAFT', 'PUBLISHED', 'ARCHIVED').required(),
    }),
    query: joi_1.default.object().length(0),
});
exports.getPostBySlugSchema = joi_1.default.object({
    params: joi_1.default.object({ slug: joi_1.default.string().required() }),
    query: joi_1.default.object().length(0),
});
