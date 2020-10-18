import path from 'path';
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
const xss = require('xss-clean');
import { globalErrorHandler } from './controllers/errorController';
import usersRouter from './routes/usersRouter';
import productsRouter from './routes/productsRouter';

const app = express();

app.enable('trust proxy');

// 1) Global Middlewares

// Implement CORS
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, '../', 'build')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });
  app.use('/api', limiter);
}

// Body parser, [req.body]
app.use(express.json());
app.use(cookieParser());

// Data sanitization against noSQL query injection

// Data sanitization against XSS
app.use(xss());

// Prevent paramter pollution
app.use(compression());

// Test middleware
// app.use((req, res, next) => {
//   next();
// });

// Routes

app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/products/', productsRouter);

app.all('*', (req, res, next) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.use(globalErrorHandler);

export default app;
