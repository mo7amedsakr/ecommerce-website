import { AppError } from '../utils/appError';
import { Request, Response, NextFunction } from 'express';

const sendErrorDev = (err: any, req: any, res: any) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, req: any, res: any) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Something went very worng!',
  });
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }

  next();
};
