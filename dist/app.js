"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./rabbitmq/connection");
const logger_1 = require("./utils/logger/logger");
const authenticator_1 = require("./middleware/authenticator");
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv_1.default.config();
async function bootstrap() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(authenticator_1.gatewayAuth);
    await (0, connection_1.connectRabbitMQ)(); // VERY IMPORTANT
    app.use('/api', auth_route_1.default);
    app.use('/api', post_routes_1.default);
    app.listen(3003, () => {
        logger_1.logger.info('API Gateway running on port 3003');
    });
}
bootstrap();
