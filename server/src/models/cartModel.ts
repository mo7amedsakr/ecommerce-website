import { pool } from '../database';

const cartTable = `
 CREATE TABLE IF NOT EXISTS ecommerce.user_cart (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  user_id UUID FOREIGN KEY REFERENCES ecommerce.user,
  cart_items UUID[] REFERENCES ecommerce.product
 )
`;
