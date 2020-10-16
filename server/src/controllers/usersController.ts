import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { CustomRequest } from './interfaces';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const getAllUsers: RequestHandler = catchAsync(
  async (req, res, next) => {
    const users = await getRepository(User).find();

    res.status(200).json({
      status: 'success',
      data: users,
    });
  }
);

export const updateUser: RequestHandler = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    delete req.body.password;
  }
  const updatedUser = await getRepository(User).update(
    { id: req.params.id },
    req.body
  );

  console.log(updateUser);

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

export const getUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user = await getRepository(User).findOne({ id: req.params.id });

  if (!user) {
    return next(new AppError('No Document.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const getMe: RequestHandler = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
