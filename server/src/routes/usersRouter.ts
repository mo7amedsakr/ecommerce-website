import { Router } from 'express';
import {
  protect,
  restrictToAdmin,
  signup,
  login,
} from '../controllers/authController';
import {
  getAllUsers,
  getUser,
  getMe,
  updateUser,
} from '../controllers/usersController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getMe', protect, getMe, getUser);

router.get('/', protect, restrictToAdmin, getAllUsers);

router
  .route('/:id')
  .get(protect, restrictToAdmin, getUser)
  .patch(protect, updateUser);

export default router;
