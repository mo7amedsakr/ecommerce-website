import { Router } from 'express';
import { protect, signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
