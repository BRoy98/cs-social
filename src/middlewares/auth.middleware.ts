import { Request, Response, NextFunction } from 'express';
import { getSessionDetails } from '../services/auth.service';

const unauthorized = {
  message: 'Unauthorized Request',
  code: 'error.unauthorized',
};

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.Authorization || req.headers.authorization;

    if (!authorization) return res.status(401).send(unauthorized);

    // check for auth
    const accessToken = authorization
      .toString()
      .replace(/bearer /i, '')
      .replace(/Bearer /i, '');

    const sessionDetails = await getSessionDetails(accessToken);

    if (!sessionDetails?.user) {
      return res.status(401).send(unauthorized);
    }

    req.body._user = sessionDetails.user;

    return next();
  } catch (error) {
    return res.status(401).send(unauthorized);
  }
};
