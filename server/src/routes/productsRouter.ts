import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import { getAllProducts, getProduct } from '../controllers/productController';

const router = Router();

router.route('/').get(getAllProducts).post();

router.route('/:slug').get(getProduct);

export default router;
