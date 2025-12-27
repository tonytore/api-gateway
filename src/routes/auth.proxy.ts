import express from "express";

import { errorResponse, successResponse } from "../utils/helper/response_helper";
import { authProxyController } from "../controllers/auth.proxi.controller";

const authProxy = express.Router();



authProxy.post("/register", authProxyController.register);

authProxy.post("/login", authProxyController.login);

export default authProxy;
