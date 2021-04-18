import service from './index';

export default {
  login: (data) => service({
    url: '/buyer/login',
    mothod: 'post',
    data,
  }),
  register: (data) => service({
    url: '/buyer/register',
    mothod: 'post',
    data,
  }),
};
