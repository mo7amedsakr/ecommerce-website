import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import {
  getCart,
  createCartItem,
  deleteCartItem,
  updateCartItem,
  deleteCart,
} from '../controllers/cartController';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getCart).post(createCartItem).delete(deleteCart);
router.route('/:id').delete(deleteCartItem).patch(updateCartItem);

export default router;
