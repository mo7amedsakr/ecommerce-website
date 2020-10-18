"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getAllOrders = exports.createOrder = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const typeorm_1 = require("typeorm");
const Order_1 = require("../entity/Order");
const Cart_1 = require("../entity/Cart");
const Product_1 = require("../entity/Product");
exports.createOrder = catchAsync_1.catchAsync(async (req, res, next) => {
    // insert order sql
    // INSERT INTO
    // order(user_id, total)
    // VALUES($1,
    // (
    //   SELECT SUM(cart.quantity * product.price)
    //   FROM cart, product
    //   WHERE cart.user_id = $1
    //   AND cart.product_id = product.id
    // )
    // ) RETURNING *
    //////////////////////////////
    // insert order items sql
    // INSERT INTO
    // order_item(order_id,product_id,quantity,size,color)
    // SELECT $1, product_id, quantity, size, color FROM cart
    // WHERE user_id=$2
    // RETURNING *
    const connection = typeorm_1.getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const total = (await queryRunner.manager.query(`
          SELECT SUM(cart.quantity * product.price)
          FROM cart, product
          WHERE cart.user_id = $1 AND cart.product_id = product.id
        `, [req.user.id]))[0].sum;
        const newOrder = await queryRunner.manager
            .createQueryBuilder(Order_1.Order, 'order')
            .useTransaction(true)
            .insert()
            .values({
            user_id: req.user.id,
            total: total,
        })
            .execute();
        const newOrderItems = await queryRunner.manager.query(`
        INSERT INTO order_item(order_id,product_id,quantity,size,color)
        SELECT $1, product_id, quantity, size, color
        FROM cart
        WHERE cart.user_id = $2
        RETURNING *
        `, [newOrder.identifiers[0].id, req.user.id]);
        await queryRunner.manager
            .createQueryBuilder(Cart_1.Cart, 'cart')
            .useTransaction(true)
            .delete()
            .where('cart.user_id = :userId', { userId: req.user.id })
            .execute();
        await queryRunner.commitTransaction();
        res.status(200).json({
            status: 'success',
            data: { order: { total, ...newOrder.raw[0] }, items: newOrderItems },
        });
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error(error);
    }
    finally {
        await queryRunner.release();
    }
});
exports.getAllOrders = catchAsync_1.catchAsync(async (req, res, next) => {
    const orders = await typeorm_1.getRepository(Order_1.Order).find({ user_id: req.user.id });
    res.status(200).json({
        status: 'success',
        data: orders,
    });
});
exports.getOrder = catchAsync_1.catchAsync(async (req, res, next) => {
    const orderItems = await typeorm_1.createQueryBuilder(Order_1.OrderItem, 'order_item')
        .select()
        .where('order_item.order_id = :orderId', { orderId: req.params.orderId })
        .leftJoinAndSelect(Product_1.Product, 'product', 'product.id = cart.product_id')
        .select([
        'order.quantity as quantity',
        'order.size as size',
        'order.color as color',
        'product.name as name',
        'product.price as price',
        'product.images[1] as image',
    ])
        .execute();
    res.status(200).json({
        status: 'success',
        date: orderItems,
    });
});
