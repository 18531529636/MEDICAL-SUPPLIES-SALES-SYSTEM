import axios from 'axios';

const service = axios.create({
  // baseURL: 'localhost:3000',
  baseURL: '/api',
});

// service.interceptors.request.use((config) => {
//   const
// });
export default service;
