"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobType = exports.certificateStatus = exports.grade = exports.currentYear = exports.cgpa = exports.maritalStatus = exports.gender = exports.timestamps = exports.address = exports.emailSchema = exports.phoneNumberSchema = exports.optIdSchema = exports.certificateNumberSchema = exports.idSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const shortcuts_js_1 = require("./shortcuts.js");
const idSchema = (value) => joi_1.default.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
    'string.pattern.base': `${value} field must have valid ID format`,
    'string.base': `${value} field must be a string`,
    'string.empty': `${value} field cannot be empty`,
    'string.required': `${value} field is required`,
});
exports.idSchema = idSchema;
const certificateNumberSchema = (value) => joi_1.default.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
    'string.pattern.base': `${value} field must have valid ID format`,
    'string.base': `${value} field must be a string`,
    'string.empty': `${value} field cannot be empty`,
    'string.required': `${value} field is required`,
});
exports.certificateNumberSchema = certificateNumberSchema;
const optIdSchema = (value) => joi_1.default.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
    'string.pattern.base': `${value} field must have valid ID format`,
    'string.base': `${value} field must be a string`,
});
exports.optIdSchema = optIdSchema;
const phoneNumberSchema = (value) => joi_1.default.string()
    .pattern(/^09\d{8}$/)
    .required()
    .messages({
    'string.pattern.base': `${value} field must be a valid phone number`,
    'string.base': `${value} field must be a number`,
    'string.empty': `${value} field cannot be empty`,
    'string.required': `${value} field is required`,
});
exports.phoneNumberSchema = phoneNumberSchema;
const emailSchema = (value) => joi_1.default.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
    'string.email': `${value} field must be a valid email address`,
    'string.base': `${value} field must be a string`,
    'string.empty': `${value} field cannot be empty`,
    'any.required': `${value} field is required`,
});
exports.emailSchema = emailSchema;
exports.address = joi_1.default.string().max(300);
exports.timestamps = {
    createdAt: joi_1.default.date().iso().optional(),
    updatedAt: joi_1.default.date().iso().optional(),
};
exports.gender = joi_1.default.string().valid('Male', 'Female').required();
exports.maritalStatus = joi_1.default.string()
    .valid('Single', 'Married', 'Divorced', 'Widowed')
    .required();
exports.cgpa = joi_1.default.number().min(0).max(4).precision(2).required();
exports.currentYear = new Date().getFullYear();
exports.grade = joi_1.default.string().valid('A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS', 'D_PLUS', 'D', 'D_MINUS', 'F');
exports.certificateStatus = joi_1.default.string().valid('GRADUATED', 'LEARNING', 'FAILED');
exports.jobType = shortcuts_js_1.requiredString.valid('FULL-TIME', 'PART-TIME', 'MIXED');
