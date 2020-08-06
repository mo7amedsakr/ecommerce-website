import { pool } from '../database';
import { slugify } from '../utils/slugify';

const productTable = `
 CREATE TABLE IF NOT EXISTS ecommerce.product (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  sizes VARCHAR(10)[] NOT NULL,
  colors VARCHAR(10)[] NOT NULL,
  images TEXT[] NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  quantity INT NOT NULL,
  description TEXT NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE FOREIGN KEY,
  discount_price NUMERIC(6,2)
 )
`;

export interface IProductTable {
  id: string;
  name: string;
  sizes: string[];
  colors: string[];
  images: string[];
  price: number;
  quantity: number;
  description: string;
  slug: string;
  discount_price: number | null;
}

export const productQueries = {
  selectAll: 'SELECT * FROM ecommerce.product',

  selectOne: 'SELECT * FROM ecommerce.product WHERE slug=$1',

  insert:
    'INSERT INTO ecommerce.product(name,sizes,colors,images,price,quantity,description,slug) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',

  update: (sets: string) =>
    `UPDATE ecommerce.prodcut SET ${sets} WHERE slug = $1 RETURNING *`,
};

export const createProductTable = () => pool.query(productTable);

export const queryProduct = (query: string, params?: string[]) =>
  pool.query<IProductTable>(query, params);

export const insertProduct = (
  name: IProductTable['name'],
  sizes: IProductTable['sizes'],
  colors: IProductTable['colors'],
  images: IProductTable['images'],
  price: IProductTable['price'],
  quantity: IProductTable['quantity'],
  description: IProductTable['description']
) =>
  pool.query<IProductTable>(productQueries.insert, [
    name,
    sizes,
    colors,
    images,
    price,
    quantity,
    description,
    slugify(name),
  ]);
