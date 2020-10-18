"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const productController_1 = require("../controllers/productController");
const router = express_1.Router();
router.route('/').get(productController_1.getAllProducts).post(productController_1.createProduct);
router
    .route('/:slug')
    .get(productController_1.getProduct)
    .patch(authController_1.protect, authController_1.restrictToAdmin, productController_1.updateProduct);
exports.default = router;
