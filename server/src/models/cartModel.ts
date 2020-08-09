import { pool } from '../database';
import { IProductTable } from './productModel';

const cartTable = `
  CREATE TABLE IF NOT EXISTS ecommerce.user_cart (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES ecommerce.user,
    product_id UUID REFERENCES ecommerce.product,
    quantity INT2 NOT NULL CONSTRAINT quantity_check CHECK(quantity>0),
    size VARCHAR(10) NOT NULL,
    color VARCHAR(10) NOT NULL,
    PRIMARY KEY (user_id, product_id, size, color)
  )
`;

`
CREATE TABLE cart (
  id UUID DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user,
  total NUMERIC(10,2)
)
`;

`
CREATE TABLE cart_item(
  cart_id UUID REFERENCES cart,
  product_id UUID REFERENCES product,
  quantity INT2 NOT NULL CONSTRAINT quantity_check CHECK(quantity>0),
  size VARCHAR(10) NOT NULL,
  color VARCHAR(10) NOT NULL,
  PRIMARY KEY (cart_id, product_id, size, color)
)
`;

export interface ICartTable {
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
}

interface SelectCartQuery {
  quantity: ICartTable['quantity'];
  size: ICartTable['size'];
  color: ICartTable['color'];
  price: IProductTable['price'];
  image: string;
}

export const cartQueries = {
  insert: `
    INSERT INTO ecommerce.user_cart(user_id, product_id,size,color,quantity) 
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id, product_id, size, color) DO UPDATE 
    SET quantity=ecommerce.user_cart.quantity + 1
    RETURNING *
  `,

  selectAll: `
    SELECT
    ecommerce.user_cart.quantity, 
    ecommerce.user_cart.size,
    ecommerce.user_cart.color,
    ecommerce.product.name,
    (ecommerce.product.price * ecommerce.user_cart.quantity) AS price,
    ecommerce.product.images[1] AS image
    FROM ecommerce.user_cart, ecommerce.product
    WHERE ecommerce.user_cart.user_id=$1
    AND ecommerce.user_cart.product_id = ecommerce.product.id
  `,

  delete: 'DELETE FROM ecommerce.user_cart WHERE id=$1',

  deleteAll: 'DELETE FROM ecommerce.user_cart WHERE user_id=$1 RETURNING *',

  update: 'UPDATE ecommerce.user_cart SET quantity=$2 WHERE id=$1 RETURNING *',
};

export const createCartTable = () => pool.query(cartTable);

export const queryCart = (query: string, params?: any[]) =>
  pool.query<ICartTable>(query, params);

export const selectCart = (userId: ICartTable['user_id']) =>
  pool.query<SelectCartQuery>(cartQueries.selectAll, [userId]);

export const insertCartItem = (
  userId: ICartTable['user_id'],
  productId: ICartTable['product_id'],
  size: ICartTable['size'],
  color: ICartTable['color'],
  quantity: ICartTable['quantity']
) =>
  pool.query<ICartTable>(cartQueries.insert, [
    userId,
    productId,
    size,
    color,
    quantity,
  ]);
