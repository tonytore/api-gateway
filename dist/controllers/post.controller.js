"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const connection_1 = require("../rabbitmq/connection");
const crypto_1 = __importDefault(require("crypto"));
const response_helper_1 = require("../utils/helper/response_helper");
const catch_async_1 = __importDefault(require("../utils/helper/catch_async"));
exports.postController = {
    createPost: (0, catch_async_1.default)(async (req, res) => {
        const publishedPost = await (0, connection_1.postPublish)('post.exchange', 'post.create', {
            action: 'post.create',
            payload: {
                data: req.body,
                meta: {
                    userId: req.user.id,
                    role: req.user.role,
                    requestId: crypto_1.default.randomUUID(),
                    timestamp: Date.now(),
                },
            },
        });
        return (0, response_helper_1.successResponse)(res, 'Post creation requested', publishedPost, 202);
    }),
    updatePost: (0, catch_async_1.default)(async (req, res) => {
        await (0, connection_1.postPublish)('post.exchange', 'post.update', {
            action: 'post.update',
            payload: {
                data: { id: req.params.id, ...req.body },
                meta: {
                    userId: req.user.id,
                    role: req.user.role,
                    requestId: crypto_1.default.randomUUID(),
                    timestamp: Date.now(),
                },
            },
        });
        return (0, response_helper_1.successResponse)(res, 'Post update requested', null, 202);
    }),
    deletePost: (0, catch_async_1.default)(async (req, res) => {
        await (0, connection_1.postPublish)('post.exchange', 'post.delete', {
            action: 'post.delete',
            payload: {
                data: { id: req.params.id },
                meta: {
                    userId: req.user.id,
                    role: req.user.role,
                    requestId: crypto_1.default.randomUUID(),
                    timestamp: Date.now(),
                },
            },
        });
        return (0, response_helper_1.successResponse)(res, 'Post deletion requested', null, 202);
    }),
};
