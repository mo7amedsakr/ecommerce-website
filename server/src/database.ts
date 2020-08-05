import { Pool } from 'pg';

export const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE,
});
