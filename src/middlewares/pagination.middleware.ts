import { Request, Response, NextFunction } from 'express';

export const paginationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  req.body._page = parseInt(req.body.page, 10) || 0;

  const limit = parseInt(req.body.limit, 10) || 10;
  if (limit > 25) {
    return res.status(400).send({
      status: false,
      error: {
        code: 'error.pagination-error',
        message: 'We support upto 25 items per page.',
      },
    });
  }
  req.body._limit = limit;

  return next();
};
