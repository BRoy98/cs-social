import { body, param } from 'express-validator';
import { Types } from 'mongoose';

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
  param('todoId')
    .notEmpty()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid request'),
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
