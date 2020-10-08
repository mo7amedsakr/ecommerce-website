import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest, ICreateProduct } from './interfaces';
import { slugify } from '../utils/slugify';
import { getRepository } from 'typeorm';
import { Product } from '../entity/Product';

export const getAllProducts: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { collection, price } = req.query;

    const products = await getRepository(Product).find({
      where: { ...(collection ? { collection } : {}) },
      order: {
        price: price === 'low' ? 'ASC' : price === 'high' ? 'DESC' : undefined,
      },
    });

    res.status(200).json({
      status: 'success',
      data: products,
    });
  }
);

export const getProduct: RequestHandler = catchAsync(async (req, res, next) => {
  const product = await getRepository(Product).findOne({
    slug: req.params.slug,
  });

  if (!product) {
    return next(new AppError('No Document.', 404));
  }

  res.status(303).json({
    status: 'success',
    data: product,
  });
});

export const updateProduct: RequestHandler = catchAsync(
  async (req, res, next) => {
    const updatedProduct = getRepository(Product).update(
      { slug: req.params.slug },
      req.body
    );

    if (!updatedProduct) {
      return next(new AppError('No Document.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedProduct,
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

    const newProduct = new Product();

    newProduct.name = name;
    newProduct.sizes = sizes;
    newProduct.colors = colors;
    newProduct.images = images;
    newProduct.price = price;
    newProduct.quantity = quantity;
    newProduct.description = description;
    newProduct.collection = collection;
    newProduct.slug = slugify(name);

    const product = await getRepository(Product).save(newProduct);

    res.status(201).json({
      status: 'success',
      data: product,
    });
  }
);
