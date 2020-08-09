import { Router } from 'express';
import { protect, restrictToAdmin } from '../controllers/authController';
import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/productController';

const router = Router();

router.route('/').get(getAllProducts).post(createProduct);

router.route('/:slug').get(getProduct);

export default router;
