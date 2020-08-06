import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { keyEqualVal } from '../utils/keyEqualVal';
import { CustomRequest } from './interfaces';

import {
  userQueries,
  queryUser,
  insertUser,
  findUser,
  IUserTable,
  filterUserQuery,
} from '../models/userModel';

export const getAllUsers: RequestHandler = catchAsync(
  async (req, res, next) => {
    const users: any = await queryUser(userQueries.selectAll);

    res.status(200).json({
      status: 'success',
      data: users.rows,
    });
  }
);

export const updateUser: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    if (req.body.password) {
      delete req.body.password;
    }

    const updatedUser = await queryUser(
      userQueries.update(keyEqualVal(req.body)),
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: filterUserQuery(updatedUser.rows[0]),
    });
  }
);

export const getUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user = await findUser('id', req.params.id);

  if (user.rowCount < 1) {
    return next(new AppError('No Document.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user.rows[0],
  });
});

export const getMe: RequestHandler = (req: CustomRequest, res, next) => {
  req.params.id = req.user!.id;
  next();
};
