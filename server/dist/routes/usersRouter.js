"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const usersController_1 = require("../controllers/usersController");
const cartsRouter_1 = __importDefault(require("./cartsRouter"));
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const router = express_1.Router();
router.use('/carts', cartsRouter_1.default);
router.use('/orders', ordersRouter_1.default);
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/getMe', authController_1.protect, usersController_1.getMe, usersController_1.getUser);
// protect, restrictToAdmin,
router.get('/', usersController_1.getAllUsers);
router
    .route('/:id')
    .get(authController_1.protect, authController_1.restrictToAdmin, usersController_1.getUser)
    .patch(authController_1.protect, usersController_1.updateUser);
exports.default = router;
