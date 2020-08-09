import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest, ICreateCartItem, IUpdateCartItem } from './interfaces';
import {
  cartQueries,
  insertCartItem,
  queryCart,
  selectCart,
} from '../models/cartModel';

export const createCartItem: RequestHandler = catchAsync(
  async (req: CustomRequest<ICreateCartItem>, res, next) => {
    if (!req.body.productId || !req.body.color || !req.body.size) {
      return next(
        new AppError('You must specify productId, color and size.', 401)
      );
    }

    const addedItem = await insertCartItem(
      req.user!.id,
      req.body.productId,
      req.body.color,
      req.body.size,
      req.body.quantity || 1
    );

    if (addedItem.rowCount < 1) {
      return next(new AppError('Somthing went worng.', 401));
    }

    res.status(200).json({
      status: 'success',
      data: addedItem.rows[0],
    });
  }
);

export const deleteCartItem: RequestHandler = catchAsync(
  async (req, res, next) => {
    await queryCart(cartQueries.delete, [req.params.id]);

    res.status(204).json({ status: 'success' });
  }
);

export const getCart: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const cart = await selectCart(req.user!.id);

    let total = 0;

    cart.rows.forEach((item) => (total += item.quantity * +item.price));

    res.status(200).json({
      status: 'success',
      data: { total: total, length: cart.rowCount, items: cart.rows },
    });
  }
);

export const updateCartItem: RequestHandler = catchAsync(
  async (req: CustomRequest<IUpdateCartItem>, res, next) => {
    if (!req.body.quantity) {
      return next(new AppError('You must specify quantity.', 401));
    }

    const updatedItem = await queryCart(cartQueries.update, [
      req.params.id,
      req.body.quantity,
    ]);

    res.status(200).json({
      status: 'success',
      data: updatedItem.rows[0],
    });
  }
);
