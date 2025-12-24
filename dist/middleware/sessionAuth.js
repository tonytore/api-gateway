"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionAuth = void 0;
const session_service_1 = require("../module/session/session.service");
const sessionAuth = async (req, res, next) => {
    const sessionId = req.headers["x-session-id"];
    if (!sessionId) {
        return res.status(401).json({ message: "Session ID missing" });
    }
    const session = await session_service_1.SessionService.findSession(String(sessionId));
    if (!session) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }
    // Attach user info to request for controllers
    req.sessionId = session.id;
    req.userId = session.user_id;
    // Update last activity timestamp
    await session_service_1.SessionService.updateLastActivity(session.id);
    next();
};
exports.sessionAuth = sessionAuth;
