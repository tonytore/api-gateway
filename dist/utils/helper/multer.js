"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMemory = exports.upload = exports.UPLOAD_DIR = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cuid2_1 = require("@paralleldrive/cuid2");
exports.UPLOAD_DIR = path_1.default.join(process.cwd(), "uploads");
const upload = (filePath) => {
    const DIR = path_1.default.join(exports.UPLOAD_DIR, `/${filePath}`);
    console.log("DIR", DIR);
    if (!fs_1.default.existsSync(DIR)) {
        fs_1.default.mkdirSync(DIR, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, DIR);
        },
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const base = path_1.default
                .basename(file.originalname, ext)
                .replace(/\s+/g, "_")
                .slice(0, 50);
            cb(null, `${base}-${(0, cuid2_1.createId)()}${ext}`);
        },
    });
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: 100 * 1024 * 1024, fieldSize: 10 * 1024 * 1024 },
    });
};
exports.upload = upload;
exports.uploadMemory = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
