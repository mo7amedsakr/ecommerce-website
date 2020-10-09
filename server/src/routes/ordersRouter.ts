import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import {
  getAllOrders,
  createOrder,
  getOrder,
} from '../controllers/orderController';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllOrders).post(createOrder);
router.get('/:orderId', getOrder);

export default router;
