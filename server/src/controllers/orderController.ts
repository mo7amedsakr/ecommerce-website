import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest } from './interfaces';
import { createQueryBuilder, getConnection, getRepository } from 'typeorm';
import { Order, OrderItem } from '../entity/Order';
import { Cart } from '../entity/Cart';
import { Product } from '../entity/Product';

export const createOrder: RequestHandler = catchAsync(
  async (req, res, next) => {
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

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const total = (
        await queryRunner.manager.query(
          `
          SELECT SUM(cart.quantity * product.price)
          FROM cart, product
          WHERE cart.user_id = $1 AND cart.product_id = product.id
        `,
          [req.user.id]
        )
      )[0].sum;

      const newOrder = await queryRunner.manager
        .createQueryBuilder(Order, 'order')
        .useTransaction(true)
        .insert()
        .values({
          user_id: req.user.id,
          total: total,
        })
        .execute();

      const newOrderItems = await queryRunner.manager.query(
        `
        INSERT INTO order_item(order_id,product_id,quantity,size,color)
        SELECT $1, product_id, quantity, size, color
        FROM cart
        WHERE cart.user_id = $2
        RETURNING *
        `,
        [newOrder.identifiers[0].id, req.user.id]
      );

      await queryRunner.manager
        .createQueryBuilder(Cart, 'cart')
        .useTransaction(true)
        .delete()
        .where('cart.user_id = :userId', { userId: req.user.id })
        .execute();

      await queryRunner.commitTransaction();
      res.status(200).json({
        status: 'success',
        data: { order: { total, ...newOrder.raw[0] }, items: newOrderItems },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
);

export const getAllOrders: RequestHandler = catchAsync(
  async (req, res, next) => {
    const orders = await getRepository(Order).find({ user_id: req.user.id });

    res.status(200).json({
      status: 'success',
      data: orders,
    });
  }
);

export const getOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const orderItems = await createQueryBuilder(OrderItem, 'order_item')
    .select()
    .where('order_item.order_id = :orderId', { orderId: req.params.orderId })
    .leftJoinAndSelect(Product, 'product', 'product.id = cart.product_id')
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
