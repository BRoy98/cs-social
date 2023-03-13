import safe from 'safe-regex';
import { Request, Response, NextFunction } from 'express';
import CutShortError from '../helpers/cutshort-error';

export const paginationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!safe(req.query.q)) {
    return next(new CutShortError('error.invalid-query', 'Invalid query.', 400));
  }

  req.body._page = Math.max(1, parseInt(String(req.query.page), 10) || 1) - 1;

  const limit = parseInt(String(req.query.limit), 10) || 10;
  if (limit > 25) {
    return next(new CutShortError('error.pagination-error', 'We support upto 25 items per page.', 400));
  }
  req.body._limit = limit;

  return next();
};
