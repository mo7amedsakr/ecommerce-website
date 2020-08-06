import dotenv from 'dotenv';

process.on('uncaughtException', (err: any) => {
  console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
import app from './app';
import { initDB } from './models/index';

import { pool } from './database';

pool.on('error', () => console.log('LOST DATABASE CONNECTION'));

initDB();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on http://127.0.0.1:${port}`);
});

process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});