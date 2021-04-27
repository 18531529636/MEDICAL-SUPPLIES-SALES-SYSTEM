import service from './index';

export default {
  login: (data) => service({
    method: 'post',
    url: '/buyer/login',
    data,
  }),
  logout: (data) => service({
    method: 'post',
    url: '/buyer/logout',
    data,
  }),
  register: (data) => service({
    url: '/buyer/register',
    method: 'post',
    data,
  }),
  getCart: (data) => service({
    url: '/buyer/getCart',
    method: 'post',
    data,
  }),
  addCart: (data) => service({
    url: '/buyer/addCart',
    method: 'post',
    data,
  }),
  deleteCart: (data) => service({
    url: '/buyer/deleteCart',
    method: 'post',
    data,
  }),
  getOrder: (data) => service({
    method: 'post',
    url: '/buyer/getOrder',
    data,
  }),
  setOrder: (data) => service({
    method: 'post',
    url: '/buyer/setOrder',
    data,
  }),
  getVerificationCode: (params) => service({
    method: 'get',
    url: '/getVerificationCode',
    params,
  }),
  getCommodity: (params) => service({
    method: 'get',
    url: '/buyer/getCommodity',
    params,
  }),
  getClassification: (params) => service({
    method: 'get',
    url: '/buyer/getClassification',
    params,
  }),
};
