import { pool } from '../database';
import { createUserTable } from './userModel';
import {
  createProductTable,
  createCollectionEnum,
  insertProduct,
  IProductTable,
} from './productModel';
import { createCartTable } from './cartModel';
import { createOrderTable, createOrderItemTable } from './orderModel';

export const initDB = async () => {
  // pool
  //   .query(
  //     'DROP TABLE ecommerce.order_item;DROP TABLE ecommerce.order;DROP TABLE ecommerce.user_cart;DROP TABLE ecommerce.product;'
  //   )
  //   .then((val) => {
  //     console.log(val);
  //   });

  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await pool.query('CREATE SCHEMA IF NOT EXISTS ecommerce');
    // await createCollectionEnum();
    await createUserTable();
    await createProductTable();
    await createCartTable();
    await createOrderTable();
    await createOrderItemTable();
    console.log('DONE INIT DB');
  } catch (error) {
    console.log(error);
  }
};
