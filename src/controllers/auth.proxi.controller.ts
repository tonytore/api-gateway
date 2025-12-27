import axios from "axios";
import { errorResponse, successResponse } from "../utils/helper/response_helper";
import catchAsync from "../utils/helper/catch_async";
import { Request, Response } from "express";

const AUTH_SERVICE_URL = "http://localhost:3001";

export const authProxyController = {
    register: catchAsync(async (req: Request, res: Response) => {
        const response = await axios.post(
            `${AUTH_SERVICE_URL}/auth/register`,
            req.body
        );

        return successResponse(res, 'User registered successfully', response.data);

    }),

    login: catchAsync(async (req: Request, res: Response) => {
        const response = await axios.post(
            `${AUTH_SERVICE_URL}/auth/login`,
            req.body,
            {
                withCredentials: true,
            }
        );

        // 🔥 FORWARD COOKIE
        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
            res.setHeader("Set-Cookie", setCookie);
        }

        return successResponse(res, "Login successful", response.data, response.status);
    })
}