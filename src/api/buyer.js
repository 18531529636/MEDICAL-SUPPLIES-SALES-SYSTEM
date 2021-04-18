import service from './index';

export default {
  login: (data) => service({
    method: 'post',
    url: '/buyer/login',
    data,
  }),
  register: (data) => service({
    method: 'post',
    url: '/buyer/register',
    data,
  }),
};
