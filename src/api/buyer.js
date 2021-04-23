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
