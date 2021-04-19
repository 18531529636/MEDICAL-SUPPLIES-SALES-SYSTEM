import service from './index';

export default {
  login: (data) => service({
    method: 'post',
    url: '/buyer/login',
    data,
  }),
  register: (data) => service({
    url: '/buyer/register',
    method: 'post',
    data,
  }),
};
