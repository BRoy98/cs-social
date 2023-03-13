import { validationResult } from 'express-validator';

export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    status: false,
    error: {
      code: 'error.invalid-request',
      message: errors?.array()?.[0]?.msg || 'Invalid Request',
    },
  });
};

export * from './todo.validator';
