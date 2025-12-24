"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const custom_error_handler_1 = require("../utils/error/custom_error_handler");
function authorize(allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new custom_error_handler_1.UnauthenticatedError('Please log in to continue', 'authorize middleware');
        }
        if (!allowedRoles.includes(user.role)) {
            throw new custom_error_handler_1.ForbiddenError("You don't have permission to perform this action", 'authorize middleware');
        }
        next();
    };
}
