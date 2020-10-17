import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

process.on('uncaughtException', (err: any) => {
  console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

import app from './app';

const main = async () => {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.NODE_ENV === 'development',
    entities: ['./dist/entity/*.js'],
    migrations: ['./dist/migration/*.js'],
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log('DATABASE CONNECTED!!');

  if (process.env.NODE_ENV === 'development') {
    await connection.runMigrations();
    console.log('MIGRATIONS DONE!!');
  }

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
};

main().catch(console.error);
