import { Request } from 'express';
import { User } from '../entity/User';
import { Product } from '../entity/Product';
import { Cart } from '../entity/Cart';

export interface CustomRequest<T = Request['body']> extends Request {
  body: T;
  user?: User;
}

export interface ISingup {
  name: User['name'];
  email: User['email'];
  password: User['password'];
  passwordConfirm: string;
}

export interface ILogin {
  email: User['email'];
  password: User['password'];
}

export interface ICreateProduct {
  name: Product['name'];
  sizes: Product['sizes'];
  colors: Product['colors'];
  images: Product['images'];
  price: Product['price'];
  quantity: Product['quantity'];
  description: Product['description'];
  collection: Product['collection'];
}

export interface ICreateCartItem {
  userId: Cart['user_id'];
  productId: Cart['product_id'];
  quantity: Cart['quantity'];
  color: Cart['color'];
  size: Cart['size'];
}

export interface IUpdateCartItem {
  quantity: Cart['quantity'];
}
