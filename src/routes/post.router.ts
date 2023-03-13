import express from 'express';
import { PostController } from '../controllers/post.controller';
import { paginationMiddleware } from '../middlewares/pagination.middleware';
import {
  createPostValidator,
  updatePostValidator,
  createCommentValidator,
  deleteCommentValidator,
  validate,
} from '../validators';

const router = express.Router();
const controller = new PostController();

router.get('/', paginationMiddleware, controller.list);
router.post('/', validate(createPostValidator), controller.create);
router.put('/:postId', validate(updatePostValidator), controller.update);
router.delete('/:postId', controller.delete);

router.post('/:postId/comment', validate(createCommentValidator), controller.addComment);
router.delete('/:postId/comment/:commentId', validate(deleteCommentValidator), controller.deleteComment);

export default router;
