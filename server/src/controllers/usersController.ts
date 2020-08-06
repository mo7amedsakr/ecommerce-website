import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { isEmail } from '../utils/isEmail';
import {
  userQueries,
  queryUser,
  insertUser,
  updateUser,
  findUser,
  IUserTable,
} from '../models/userModel';

export const getAllUsers: RequestHandler = catchAsync(
  async (req, res, next) => {
    const users = await queryUser(userQueries.selectAll);

    res.status(200).json({
      status: 'success',
      users: users.rows,
    });
  }
);

export const getUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user = await findUser('id', req.params.id);

  delete user.rows[0].password;

  res.status(200).json({
    status: 'success',
    users: user.rows[0],
  });
});
