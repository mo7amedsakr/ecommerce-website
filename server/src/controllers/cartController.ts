import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest, ICreateCartItem, IUpdateCartItem } from './interfaces';
import { createQueryBuilder, getRepository } from 'typeorm';
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

    const item = await createQueryBuilder(Cart, 'cart')
      .insert()
      .values({
        user_id: req.user.id,
        product_id: productId,
        quantity: quantity ?? 1,
        size,
        color,
      })
      .onConflict(
        `("user_id", "product_id", "size", "color") DO UPDATE SET quantity = cart.quantity + 1`
      )
      .returning('*')
      .execute();

    if (!item) {
      return next(new AppError('Somthing went worng.', 401));
    }

    res.status(200).json({
      status: 'success',
      data: item.raw,
    });
  }
);

export const deleteCartItem: RequestHandler = catchAsync(
  async (req, res, next) => {
    await getRepository(Cart).delete({ id: req.params.id });

    res.status(204).json({ status: 'success' });
  }
);

export const getCart: RequestHandler = catchAsync(async (req, res, next) => {
  const cartItems = await createQueryBuilder(Cart, 'cart')
    .select()
    .where('cart.user_id = :userId', { userId: req.user.id })
    .leftJoinAndSelect(Product, 'product', 'product.id = cart.product_id')
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

  cartItems.forEach((item: any) => {
    total += item.quantity * +item.price;
  });

  res.status(200).json({
    status: 'success',
    data: { total: total, length: cartItems.length, items: cartItems },
  });
});

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
    });
  }
);

export const deleteCart = catchAsync(async (req, res, next) => {
  await getRepository(Cart).delete({
    user_id: req.user.id,
  });

  res.status(204).json({ status: 'success' });
});
