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

import cartsRouter from './cartsRouter';
import ordersRouter from './ordersRouter';

const router = Router();

router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);

router.post('/signup', signup);
router.post('/login', login);
router.get('/getMe', protect, getMe, getUser);

// protect, restrictToAdmin,
router.get('/', getAllUsers);

router
  .route('/:id')
  .get(protect, restrictToAdmin, getUser)
  .patch(protect, updateUser);

export default router;
