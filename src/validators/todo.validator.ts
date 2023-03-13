import { body } from 'express-validator';

export const createTodoValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .isString()
    .isLength({
      max: 100,
    })
    .withMessage('Description must be less than 100 characters')
    .optional(),
];

export const updateTodoValidator = [
  body('title').optional().isString().withMessage('Invalid input'),
  body('description')
    .optional()
    .isString()
    .isLength({
      max: 100,
    })
    .withMessage('Invalid input'),
  body('complete').optional().isBoolean().withMessage('Invalid input'),
];
