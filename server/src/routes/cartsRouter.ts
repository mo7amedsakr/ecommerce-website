import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import {
  getCart,
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from '../controllers/cartController';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getCart).post(createCartItem);
router.route('/:id').delete(deleteCartItem).patch(updateCartItem);

export default router;
