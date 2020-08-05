import { promisify } from 'util';
import { RequestHandler, Request, Response } from 'express';
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { isEmail } from '../utils/isEmail';
import { CustomRequest, ISingup, ILogin } from './interfaces';
import {
  queryUser,
  insertUser,
  updateUser,
  findUser,
  hashPassword,
  correctPassword,
  IUserTable,
} from '../models/userModel';

export const protect: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    let token: string;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return next(
        new AppError('you are not logged in ! please log in first', 403)
      );
    }

    const decoded: any = await promisify(verifyJWT)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await findUser('id', decoded.id);

    if (currentUser.rowCount < 1) {
      return next(new AppError('User No longer exists', 401));
    }

    req.user = currentUser.rows[0];

    next();
  }
);

const signToken = (id: string) => {
  return signJWT({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createToken = (req: Request, res: Response, userID: string) => {
  const token = signToken(userID);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'none',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  return token;
};

export const signup: RequestHandler = catchAsync(
  async (req: CustomRequest<ISingup>, res, next) => {
    if (req.body.password !== req.body.passwordConfirm) {
      return next(new AppError("Passwords doesn't match!", 400));
    }

    if (req.body.password.length < 8) {
      return next(
        new AppError('Password must be at least 8 characters long.', 400)
      );
    }

    if (!isEmail(req.body.email)) {
      return next(new AppError('Invalid email address.', 400));
    }

    const newUser = await insertUser(
      req.body.name,
      req.body.email.toLowerCase(),
      await hashPassword(req.body.password)
    );

    const token = createToken(req, res, newUser.rows[0].id);

    console.log(token);

    res.status(201).json({
      status: 'success',
      token,
      user: { name: newUser.rows[0].name, email: newUser.rows[0].email },
    });
  }
);

export const login: RequestHandler = catchAsync(
  async (req: CustomRequest<ILogin>, res, next) => {
    if (!isEmail(req.body.email) || req.body.password.length < 8) {
      return next(new AppError('Incorrect email or password', 400));
    }

    const user = await findUser('email', req.body.email);

    if (
      user.rowCount < 1 ||
      !(await correctPassword(req.body.password, user.rows[0].password))
    ) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = createToken(req, res, user.rows[0].id);

    res.status(200).json({
      status: 'success',
      token,
      user: { name: user.rows[0].name, email: user.rows[0].email },
    });
  }
);
