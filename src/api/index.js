import axios from 'axios';

const service = axios.create({
  baseURL: '/api',
});

service.interceptors.request.use((config) => {
  const cfg = config;

  cfg.headers = {
    ...cfg.headers,
    token: '21312412311111111111',
  };
  return cfg;
});
export default service;
