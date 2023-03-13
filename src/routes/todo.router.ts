import express from 'express';
import { TodoController } from '../controllers/todo.controller';
import { paginationMiddleware } from '../middlewares/pagination.middleware';
import { createTodoValidator, updateTodoValidator, validate } from '../validators';

const router = express.Router();
const controller = new TodoController();

router.get('/', paginationMiddleware, controller.list);
router.post('/', validate(createTodoValidator), controller.create);
router.put('/:todoId', validate(updateTodoValidator), controller.update);
router.delete('/:todoId', controller.delete);

export default router;
