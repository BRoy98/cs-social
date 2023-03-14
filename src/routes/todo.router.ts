import express from 'express';
import { TodoController } from '../controllers/todo.controller';
import { paginationMiddleware } from '../middlewares/pagination.middleware';
import {
  validate,
  listTodoValidator,
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator,
} from '../validators';

const router = express.Router();
const controller = new TodoController();

router.get('/', validate(listTodoValidator), paginationMiddleware, controller.list);
router.post('/', validate(createTodoValidator), controller.create);
router.put('/:todoId', validate(updateTodoValidator), controller.update);
router.delete('/:todoId', validate(deleteTodoValidator), controller.delete);

export default router;
