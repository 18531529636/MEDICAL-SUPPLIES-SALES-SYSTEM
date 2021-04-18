import axios from 'axios';

// https://juejin.cn/post/6844904033782611976 axios封装
const service = axios.create({
  baseURL: '/devServer',
});

// service.interceptors.request.use((config) => {
//   const
// });
export default service;
