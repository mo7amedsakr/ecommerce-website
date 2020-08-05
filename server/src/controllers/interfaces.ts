import { Request } from 'express';
import { IUserTable } from '../models/userModel';

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
