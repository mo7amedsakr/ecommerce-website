import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import { getAllOrders, createOrder } from '../controllers/orderController';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllOrders).post(createOrder);

export default router;
