import { Request } from 'express';
import { IUserTable } from '../models/userModel';
import { IProductTable } from '../models/productModel';

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
}
