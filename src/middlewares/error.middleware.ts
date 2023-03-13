import { Response } from 'express';
import CutShortError from '../helpers/cutshort-error';

export const errorMiddleware = async (err: Error, _, res: Response, __) => {
  if (err instanceof CutShortError) {
    return res.status(err.statusCode || 400).send({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  return res.status(500).send({
    success: false,
    error: {
      code: 'error.something-went-wrong',
      message: 'Sorry, something went wrong.',
    },
  });
};
