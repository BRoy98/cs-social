import { body } from 'express-validator';

export const createTodoValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
];
