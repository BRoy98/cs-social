import { body, param, query } from 'express-validator';
import { Types } from 'mongoose';

export const listPostValidator = [
  query('q').optional().isLength({ max: 50 }).withMessage('Query length must be less than 50'),
  query('page').optional(),
  query('limit').optional(),
  query('user_id')
    .optional()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid user id'),
];

export const createPostValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description')
    .notEmpty()
    .isString()
    .isLength({
      max: 200,
    })
    .withMessage('Description must be less than 200 characters'),
];

export const updatePostValidator = [
  param('postId')
    .notEmpty()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid request'),
  body('title').optional().isString().withMessage('Invalid input'),
  body('description')
    .notEmpty()
    .isString()
    .isLength({
      max: 200,
    })
    .withMessage('Description must be less than 200 characters'),
];

export const createCommentValidator = [
  param('postId')
    .notEmpty()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid request'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

export const deleteCommentValidator = [
  param('postId')
    .notEmpty()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid request'),
  param('commentId')
    .notEmpty()
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage('Invalid request'),
];
