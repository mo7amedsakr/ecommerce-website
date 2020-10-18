"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.updateCartItem = exports.getCart = exports.deleteCartItem = exports.createCartItem = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const typeorm_1 = require("typeorm");
const Cart_1 = require("../entity/Cart");
const Product_1 = require("../entity/Product");
exports.createCartItem = catchAsync_1.catchAsync(async (req, res, next) => {
    if (!req.body.productId || !req.body.color || !req.body.size) {
        return next(new appError_1.AppError('You must specify productId, color and size.', 401));
    }
    const { productId, color, size, quantity } = req.body;
    const item = await typeorm_1.createQueryBuilder(Cart_1.Cart, 'cart')
        .insert()
        .values({
        user_id: req.user.id,
        product_id: productId,
        quantity: quantity !== null && quantity !== void 0 ? quantity : 1,
        size,
        color,
    })
        .onConflict(`("user_id", "product_id", "size", "color") DO UPDATE SET quantity = cart.quantity + 1`)
        .returning('*')
        .execute();
    if (!item) {
        return next(new appError_1.AppError('Somthing went worng.', 401));
    }
    res.status(200).json({
        status: 'success',
        data: item.raw,
    });
});
exports.deleteCartItem = catchAsync_1.catchAsync(async (req, res, next) => {
    await typeorm_1.getRepository(Cart_1.Cart).delete({ id: req.params.id });
    res.status(204).json({ status: 'success' });
});
exports.getCart = catchAsync_1.catchAsync(async (req, res, next) => {
    const cartItems = await typeorm_1.createQueryBuilder(Cart_1.Cart, 'cart')
        .select()
        .where('cart.user_id = :userId', { userId: req.user.id })
        .leftJoinAndSelect(Product_1.Product, 'product', 'product.id = cart.product_id')
        .select([
        'cart.id as id',
        'cart.quantity as quantity',
        'cart.size as size',
        'cart.color as color',
        'product.name as name',
        'product.price as price',
        'product.images[1] as image',
        'product.quantity as maxquantity',
    ])
        .execute();
    let total = 0;
    cartItems.forEach((item) => {
        total += item.quantity * +item.price;
    });
    res.status(200).json({
        status: 'success',
        data: { total: total, length: cartItems.length, items: cartItems },
    });
});
exports.updateCartItem = catchAsync_1.catchAsync(async (req, res, next) => {
    if (!req.body.quantity) {
        return next(new appError_1.AppError('You must specify quantity.', 401));
    }
    const updatedItem = await typeorm_1.getRepository(Cart_1.Cart).update({ id: req.params.id }, { quantity: req.body.quantity });
    res.status(200).json({
        status: 'success',
    });
});
exports.deleteCart = catchAsync_1.catchAsync(async (req, res, next) => {
    await typeorm_1.getRepository(Cart_1.Cart).delete({
        user_id: req.user.id,
    });
    res.status(204).json({ status: 'success' });
});
