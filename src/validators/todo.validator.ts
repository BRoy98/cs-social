import { body, param, query } from 'express-validator';
import { Types } from 'mongoose';

export const listTodoValidator = [
  query('q').optional().isLength({ max: 50 }).withMessage('Query length must be less than 50'),
  query('page').optional(),
  query('limit').optional(),
  query('user_id')
    .optional()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid user id'),
];

export const createTodoValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .isString()
    .isLength({
      max: 100,
    })
    .withMessage('Description must be less than 100 characters'),
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
    .withMessage('Description must be less than 100 characters'),
  body('complete').optional().isBoolean().withMessage('Invalid input'),
];
