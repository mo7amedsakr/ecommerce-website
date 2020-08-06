import { Router } from 'express';
import { protect, signup, login } from '../controllers/authController';
import { getAllUsers, getUser } from '../controllers/usersController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/', getAllUsers);

router.route('/:id').get(getUser);

export default router;
