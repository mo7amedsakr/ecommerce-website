import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest } from './interfaces';
import {
  createNewOrder,
  selectOrderItems,
  selectOrder,
} from '../models/orderModel';

export const createOrder: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const newOrder = await createNewOrder(req.user!.id);

    if (!newOrder) {
      return next(new AppError('Could not create new order.', 500));
    }

    res.status(200).json({
      status: 'success',
      data: newOrder,
    });
  }
);

export const getAllOrders: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const order = await selectOrder(req.user!.id);
    const orderItems = await selectOrderItems();

    res.status(200).json({
      status: 'success',
      data: {
        order: order.rows[0],
        items: orderItems.rows,
      },
    });
  }
);
