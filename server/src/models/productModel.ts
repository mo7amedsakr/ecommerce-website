import { pool } from '../database';
import { slugify } from '../utils/slugify';

const collectionEnum =
  "CREATE TYPE collection_type AS ENUM ('accessories', 'footwear', 'tshirts','pants')";

const productTable = `
 CREATE TABLE IF NOT EXISTS ecommerce.product (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  sizes TEXT[] NOT NULL,
  colors TEXT[] NOT NULL,
  images TEXT[] NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  quantity INT NOT NULL,
  description TEXT NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  discount_price NUMERIC(6,2),
  collection collection_type
 )
`;

export interface IProductTable {
  id: string;
  name: string;
  sizes: string[];
  colors: string[];
  images: string[];
  price: string;
  quantity: number;
  description: string;
  slug: string;
  discount_price: string | null;
  collection: 'accessories' | 'footwear' | 'tshirts' | 'pants';
}

export const productQueries = {
  selectAll: 'SELECT * FROM ecommerce.product',

  selectOne: 'SELECT * FROM ecommerce.product WHERE slug=$1',

  insert: `
    INSERT INTO ecommerce.product(name,sizes,colors,images,price,quantity,description,collection,slug) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT(slug) DO NOTHING
    RETURNING *
  `,

  update: (sets: string) =>
    `UPDATE ecommerce.prodcut SET ${sets} WHERE slug = $1 RETURNING *`,
};

export const createProductTable = () => pool.query(productTable);

export const createCollectionEnum = () => pool.query(collectionEnum);

export const queryProduct = (query: string, params?: string[]) =>
  pool.query<IProductTable>(query, params);

export const insertProduct = (
  name: IProductTable['name'],
  sizes: IProductTable['sizes'],
  colors: IProductTable['colors'],
  images: IProductTable['images'],
  price: IProductTable['price'],
  quantity: IProductTable['quantity'],
  description: IProductTable['description'],
  collection: IProductTable['collection']
) =>
  pool.query<IProductTable>(productQueries.insert, [
    name,
    sizes,
    colors,
    images,
    price,
    quantity,
    description,
    collection,
    slugify(name),
  ]);
