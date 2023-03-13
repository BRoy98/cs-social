import express from 'express';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import authRoutes from './auth.router';
import todoRoutes from './todo.router';

const router = express.Router();

router.get('/', (req, res) => res.send(`<pre>Cutshort API 🔥🚀</pre>`));
router.use('/auth', authRoutes);
router.use('/todo', jwtAuthMiddleware, todoRoutes);

export default router;
