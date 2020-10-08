import { promisify } from 'util';
import bcrypt from 'bcryptjs';
import { RequestHandler, Request, Response } from 'express';
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { isEmail } from '../utils/isEmail';
import { CustomRequest, ISingup, ILogin } from './interfaces';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

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

    const currentUser = await getRepository(User).findOne({ id: decoded.id });

    if (!currentUser) {
      return next(new AppError('User No longer exists', 401));
    }

    req.user = currentUser;

    next();
  }
);

export const restrictToAdmin: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
  if (req.user!.role !== 'admin') {
    return next(new AppError("You don't have permission.", 401));
  }
  next();
};

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

    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email.toLowerCase();
    newUser.password = await hashPassword(req.body.password);

    const user = await getRepository(User).save(newUser);

    const token = createToken(req, res, user.id);

    const { password, ..._user } = user;

    res.status(201).json({
      status: 'success',
      token,
      data: _user,
    });
  }
);

export const login: RequestHandler = catchAsync(
  async (req: CustomRequest<ILogin>, res, next) => {
    if (!isEmail(req.body.email) || req.body.password.length < 8) {
      return next(new AppError('Incorrect email or password', 400));
    }

    const user = await getRepository(User).findOne(
      { email: req.body.email },
      { select: ['password', 'email', 'name'] }
    );

    if (!user || !(await correctPassword(req.body.password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = createToken(req, res, user.id);

    const { password, ..._user } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: _user,
    });
  }
);
