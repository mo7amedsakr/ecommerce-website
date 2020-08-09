import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest, ICreateProduct } from './interfaces';
import { keyEqualVal } from '../utils/keyEqualVal';

import {
  productQueries,
  queryProduct,
  insertProduct,
} from '../models/productModel';

export const getAllProducts: RequestHandler = catchAsync(
  async (req, res, next) => {
    const products = await queryProduct(productQueries.selectAll);

    res.status(200).json({
      status: 'success',
      data: products.rows,
    });
  }
);

export const getProduct: RequestHandler = catchAsync(async (req, res, next) => {
  const product = await queryProduct(productQueries.selectOne, [
    req.params.slug,
  ]);

  if (product.rowCount < 1) {
    return next(new AppError('No Document.', 404));
  }

  res.status(303).json({
    status: 'success',
    data: product.rows[0],
  });
});

export const updateProduct: RequestHandler = catchAsync(
  async (req, res, next) => {
    const updatedProduct = await queryProduct(
      productQueries.update(keyEqualVal(req.body)),
      [req.params.slug]
    );

    if (updatedProduct.rowCount < 1) {
      return next(new AppError('No Document.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedProduct.rows[0],
    });
  }
);

export const createProduct: RequestHandler = catchAsync(
  async (req: CustomRequest<ICreateProduct>, res, next) => {
    const {
      name,
      sizes,
      colors,
      images,
      price,
      quantity,
      description,
      collection,
    } = req.body;

    console.log(req.body);

    const newProduct = await insertProduct(
      name,
      sizes,
      colors,
      images,
      price,
      quantity,
      description,
      collection
    );

    res.status(201).json({
      status: 'success',
      data: newProduct.rows[0],
    });
  }
);
