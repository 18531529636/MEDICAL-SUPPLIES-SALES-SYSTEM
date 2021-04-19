import service from './index';

export default {
  login: (data) => service({
    method: 'post',
    url: '/saller/login',
    data,
  }),
  register: (data) => service({
    url: '/saller/register',
    method: 'post',
    data,
  }),
};
