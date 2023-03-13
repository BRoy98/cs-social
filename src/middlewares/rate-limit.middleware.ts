import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = new Redis(process.env.REDIS_URL || '');

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    points: 200, // Number of points
    duration: 60, // Per 60 seconds
  });

  // 200 req per min for logged in users
  const key = req.body._user ? req.body._user.id : req.ip;
  const pointsToConsume = req.body._user?.id ? 1 : 30;

  rateLimiterRedis
    .consume(key, pointsToConsume)
    .then(() => {
      next();
    })
    .catch((_) => {
      return res.status(429).send('Too Many Requests');
    });
};
