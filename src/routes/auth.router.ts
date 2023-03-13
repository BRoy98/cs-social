import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/refresh', controller.refresh);

export default router;
