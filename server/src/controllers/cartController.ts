import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest, ICreateCartItem, IUpdateCartItem } from './interfaces';
import { createQueryBuilder, getConnection, getRepository } from 'typeorm';
import { Cart } from '../entity/Cart';
import { Product } from '../entity/Product';

export const createCartItem: RequestHandler = catchAsync(
  async (req: CustomRequest<ICreateCartItem>, res, next) => {
    if (!req.body.productId || !req.body.color || !req.body.size) {
      return next(
        new AppError('You must specify productId, color and size.', 401)
      );
    }

    const { productId, color, size, quantity } = req.body;

    const newItem = new Cart();

    newItem.user_id = req.user!.id;
    newItem.product_id = productId;
    newItem.color = color;
    newItem.size = size;
    newItem.quantity = quantity ?? 1;

    const item = await getRepository(Cart).save(newItem);

    if (!item) {
      return next(new AppError('Somthing went worng.', 401));
    }

    res.status(200).json({
      status: 'success',
      data: item,
    });
  }
);

export const deleteCartItem: RequestHandler = catchAsync(
  async (req, res, next) => {
    await getRepository(Cart).delete({ id: req.params.id });

    res.status(204).json({ status: 'success' });
  }
);

export const getCart: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const cartItems = await createQueryBuilder(Cart, 'cart')
      .leftJoinAndSelect(Product, 'product', 'product.id = cart.product_id')
      .select([
        'cart.quantity as quantity',
        'cart.size as size',
        'cart.color as color',
        'product.name as name',
        'product.price as price',
        'product.images[1] as image',
      ])
      .execute();

    let total = 0;

    cartItems.forEach((item: any) => {
      total += item.quantity * +item.price;
    });

    res.status(200).json({
      status: 'success',
      data: { total: total, length: cartItems.length, items: cartItems },
    });
  }
);

export const updateCartItem: RequestHandler = catchAsync(
  async (req: CustomRequest<IUpdateCartItem>, res, next) => {
    if (!req.body.quantity) {
      return next(new AppError('You must specify quantity.', 401));
    }

    const updatedItem = await getRepository(Cart).update(
      { id: req.params.id },
      { quantity: req.body.quantity }
    );

    res.status(200).json({
      status: 'success',
      data: updatedItem,
    });
  }
);
