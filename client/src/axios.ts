import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://localhost:5001/api'
      : '/api',
  withCredentials: true,
});

export default instance;
