// import rateLimit from 'express-rate-limit';
// import RedisStore, { RedisReply } from 'rate-limit-redis';
// import { redis } from './redisClient';
// import { logger } from '../utils/logger/logger';

// export const createRateLimiter = (options: { windowMs: number; max: number }) =>
//   rateLimit({
//     windowMs: options.windowMs,
//     max: options.max,
//     standardHeaders: true,
//     legacyHeaders: false,
//     store: new RedisStore({
//       sendCommand: (...args: [string, ...string[]]) =>
//         redis.call(...args) as Promise<RedisReply>,
//     }),
//     handler: (req, res) => {
//       logger.warn('Rate limit exceeded', {
//         ip: req.ip,
//         path: req.originalUrl,
//       });

//       res.status(429).json({
//         success: false,
//         message: 'Too many requests, please try again later',
//       });
//     },
//   });
