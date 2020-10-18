"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const slugify_1 = require("../utils/slugify");
const typeorm_1 = require("typeorm");
const Product_1 = require("../entity/Product");
exports.getAllProducts = catchAsync_1.catchAsync(async (req, res, next) => {
    const { collection, price, page: _page, limit: _limit } = req.query;
    const page = _page ? +_page : 1;
    const limit = _limit ? +_limit : 10;
    const skip = (page - 1) * limit;
    const products = await typeorm_1.getRepository(Product_1.Product).find({
        where: { ...(collection ? { collection } : {}) },
        order: {
            price: price === 'low' ? 'ASC' : price === 'high' ? 'DESC' : undefined,
        },
        skip,
        take: limit,
    });
    res.status(200).json({
        status: 'success',
        data: products,
    });
});
exports.getProduct = catchAsync_1.catchAsync(async (req, res, next) => {
    const product = await typeorm_1.getRepository(Product_1.Product).findOne({
        slug: req.params.slug,
    });
    if (!product) {
        return next(new appError_1.AppError('No Document.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: product,
    });
});
exports.updateProduct = catchAsync_1.catchAsync(async (req, res, next) => {
    const updatedProduct = typeorm_1.getRepository(Product_1.Product).update({ slug: req.params.slug }, req.body);
    if (!updatedProduct) {
        return next(new appError_1.AppError('No Document.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: updatedProduct,
    });
});
exports.createProduct = catchAsync_1.catchAsync(async (req, res, next) => {
    const { name, sizes, colors, images, price, quantity, description, collection, } = req.body;
    const newProduct = new Product_1.Product();
    newProduct.name = name;
    newProduct.sizes = sizes;
    newProduct.colors = colors;
    newProduct.images = images;
    newProduct.price = price;
    newProduct.quantity = quantity;
    newProduct.description = description;
    newProduct.collection = collection;
    newProduct.slug = slugify_1.slugify(name);
    const product = await typeorm_1.getRepository(Product_1.Product).save(newProduct);
    res.status(201).json({
        status: 'success',
        data: product,
    });
});
