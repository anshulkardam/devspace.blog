"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogupdateSchema = exports.blogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    bio: zod_1.default.string()
});
exports.signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5),
});
exports.blogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.blogupdateSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
