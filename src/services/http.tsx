import axios from 'axios';
import { QueryClient } from 'react-query';

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export const client = new QueryClient();

export default http;
