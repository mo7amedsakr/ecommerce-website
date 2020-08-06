import bcrypt from 'bcryptjs';

import { pool } from '../database';

const userTable = `
  CREATE TABLE IF NOT EXISTS ecommerce.user (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    inserted_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`;

export const userQueries = {
  selectAll: 'SELECT * FROM ecommerce.user',

  insert:
    'INSERT INTO ecommerce.user(name, email, password) VALUES($1,$2,$3) RETURNING *',

  selectOne: (column: string) =>
    `SELECT * FROM ecommerce.user WHERE ${column} = $1`,
};

export interface IUserTable {
  id: string;
  name: string;
  email: string;
  password: string;
  inserted_at: Date;
  updated_at: Date;
}

export const createUserTable = () => pool.query(userTable);

export const queryUser = (query: string, params?: any[]) =>
  pool.query<IUserTable>(query, params);

export const findUser = (column: string, value: string) =>
  pool.query<IUserTable>(userQueries.selectOne(column), [value]);

export const insertUser = (name: string, email: string, password: string) =>
  pool.query<IUserTable>(userQueries.insert, [name, email, password]);

export const updateUser = () => pool.query('', []);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
