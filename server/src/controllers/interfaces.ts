import { Request } from 'express';
import { IUserTable } from '../models/userModel';
import { IProductTable } from '../models/productModel';
import { ICartTable } from '../models/cartModel';

export interface CustomRequest<T = Request['body']> extends Request {
  body: T;
  user?: IUserTable;
}

export interface ISingup {
  name: IUserTable['name'];
  email: IUserTable['email'];
  password: IUserTable['password'];
  passwordConfirm: string;
}

export interface ILogin {
  email: IUserTable['email'];
  password: IUserTable['password'];
}

export interface ICreateProduct {
  name: IProductTable['name'];
  sizes: IProductTable['sizes'];
  colors: IProductTable['colors'];
  images: IProductTable['images'];
  price: IProductTable['price'];
  quantity: IProductTable['quantity'];
  description: IProductTable['description'];
  collection: IProductTable['collection'];
}

export interface ICreateCartItem {
  productId: ICartTable['product_id'];
  quantity: ICartTable['quantity'];
  color: ICartTable['color'];
  size: ICartTable['size'];
}

export interface IUpdateCartItem {
  quantity: ICartTable['quantity'];
}
