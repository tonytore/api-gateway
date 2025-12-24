"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticator_1 = require("../middleware/authenticator");
const express_1 = require("express");
const validator_1 = require("../middleware/validator");
const connection_1 = require("../rabbit/connection");
const post_schema_1 = require("../schemas/post.schema");
const response_helper_1 = require("../utils/helper/response_helper");
const router = (0, express_1.Router)();
router.post('/posts', authenticator_1.authMiddleware, (0, validator_1.validate)(post_schema_1.createPostSchema), (req, res) => {
    const publishedPost = (0, connection_1.publish)('blog.exchange', 'post.create', {
        action: 'post.create',
        data: req.body,
        meta: {
            userId: req.user.id,
            role: req.user.role,
            requestId: crypto.randomUUID(),
            timestamp: Date.now(),
        },
    });
    return (0, response_helper_1.successResponse)(res, 'Post creation requested', publishedPost, 202);
});
