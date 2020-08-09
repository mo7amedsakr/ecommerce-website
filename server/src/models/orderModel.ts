import { pool } from '../database';
import { queryCart, cartQueries } from './cartModel';
import { IProductTable } from './productModel';

const orderTable = `
  CREATE TABLE IF NOT EXISTS ecommerce.order(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES ecommerce.user,
    total NUMERIC(10,2) NOT NULL,
    inserted_at TIMESTAMP DEFAULT NOW()
  )
`;

const orderItemTable = `
  CREATE TABLE IF NOT EXISTS ecommerce.order_item(
    id UUID DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES ecommerce.order,
    product_id UUID REFERENCES ecommerce.product,
    quantity INT2 NOT NULL CONSTRAINT quantity_check CHECK(quantity>0),
    size VARCHAR(10) NOT NULL,
    color VARCHAR(10) NOT NULL,
    PRIMARY KEY (order_id,product_id,quantity,size,color)
  )
`;

export interface IOrderTable {
  id: string;
  user_id: string;
  total: string;
  inserted_at: Date;
}

export interface IOrderItemTable {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
}

interface OrderQuery {
  name: IProductTable['name'];
  image: string;
  quantity: IOrderItemTable['quantity'];
  size: IOrderItemTable['size'];
  color: IOrderItemTable['color'];
  total: IOrderTable['total'];
  inserted_at: IOrderTable['inserted_at'];
}

export const orderQueries = {
  insert: `
    INSERT INTO
    ecommerce.order(user_id, total)
    VALUES($1,
    (
      SELECT SUM(ecommerce.user_cart.quantity * ecommerce.product.price)
      FROM ecommerce.user_cart, ecommerce.product
      WHERE ecommerce.user_cart.user_id = $1
      AND ecommerce.user_cart.product_id = ecommerce.product.id
    )
    ) RETURNING *
  `,
  select: `SELECT id,total,inserted_at FROM ecommerce.order WHERE user_id = $1`,
};

export const orderItemQueries = {
  insert: `
    INSERT INTO
    ecommerce.order_item(order_id,product_id,quantity,size,color)
    SELECT $1, product_id, quantity, size, color FROM ecommerce.user_cart
    WHERE user_id=$2
    RETURNING *
  `,
  select: `
    SELECT 
      ecommerce.product.name,
      ecommerce.product.images[1] AS image,
      ecommerce.product.price,
      ecommerce.order_item.quantity,
      ecommerce.order_item.size,
      ecommerce.order_item.color
    FROM
      ecommerce.product,
      ecommerce.order_item,
      ecommerce.order
    WHERE 
      ecommerce.product.id = ecommerce.order_item.product_id
    AND
      ecommerce.order.id = ecommerce.order_item.order_id 
  `,
};

export const createOrderTable = () => pool.query(orderTable);
export const createOrderItemTable = () => pool.query(orderItemTable);

export const queryOrder = (query: string, params?: any[]) =>
  pool.query<IOrderTable>(query, params);

export const queryOrderItem = (query: string, params?: any[]) =>
  pool.query<IOrderItemTable>(query, params);

export const createNewOrder = async (userId: IOrderTable['user_id']) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    /**/

    const newOrder = await queryOrder(orderQueries.insert, [userId]);

    const orderItems = await queryOrderItem(orderItemQueries.insert, [
      newOrder.rows[0].id,
      userId,
    ]);

    await queryCart(cartQueries.deleteAll, [userId]);

    /**/
    await client.query('COMMIT');
    return {
      order: { id: newOrder.rows[0].id, total: newOrder.rows[0].total },
      items: orderItems.rows,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const selectOrder = (userId: IOrderTable['user_id']) =>
  pool.query<IOrderTable>(orderQueries.select, [userId]);

export const selectOrderItems = () =>
  pool.query<OrderQuery>(orderItemQueries.select);
