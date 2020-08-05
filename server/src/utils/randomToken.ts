import { randomBytes, createHash } from 'crypto';

export const randomToken = (length: number = 32) =>
  randomBytes(length).toString('hex');

export const hashedRandomToken = (token: string) =>
  createHash('sha256').update(token).digest('hex');
