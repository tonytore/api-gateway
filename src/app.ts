import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectRabbitMQ } from './rabbitmq/connection';
import { postRouter } from './routes/post.routes';
import { logger } from './utils/logger/logger';
import authProxy from './routes/auth.proxy';
dotenv.config();

async function bootstrap() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    await connectRabbitMQ(); // VERY IMPORTANT
    

app.use("/auth", authProxy);
    app.use('/api', postRouter);

    app.listen(3003, () => {
        logger.info('API Gateway running on port 3003');
    });
}

bootstrap();
