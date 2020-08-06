import { pool } from '../database';
import { createUserTable } from './userModel';

export const initDB = async () => {
  // pool.query('DROP SCHEMA ecommerce').then((val) => {
  //   console.log(val);
  // });
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await pool.query('CREATE SCHEMA IF NOT EXISTS ecommerce');
    await createUserTable();
    console.log('DONE INIT DB');
  } catch (error) {
    console.log(error);
  }
};
