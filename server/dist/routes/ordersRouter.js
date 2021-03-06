"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const orderController_1 = require("../controllers/orderController");
const router = express_1.Router({ mergeParams: true });
router.use(authController_1.protect);
router.route('/').get(orderController_1.getAllOrders).post(orderController_1.createOrder);
router.get('/:orderId', orderController_1.getOrder);
exports.default = router;
