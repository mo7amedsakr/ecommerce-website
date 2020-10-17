import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

export default instance;
