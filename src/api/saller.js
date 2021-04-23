import service from './index';

export default {
  login: (data) => service({
    method: 'post',
    url: '/saller/login',
    data,
  }),
  logout: (data) => service({
    method: 'post',
    url: '/saller/logout',
    data,
  }),
  register: (data) => service({
    url: '/saller/register',
    method: 'post',
    data,
  }),
  getOrder: (data) => service({
    method: 'post',
    url: '/saller/getOrder',
    data,
  }),
  setCourierNumber: (data) => service({
    method: 'post',
    url: '/saller/setCourierNumber',
    data,
  }),
  handleReturnApply: (data) => service({
    method: 'post',
    url: '/saller/handleReturnApply',
    data,
  }),
  getInvitationCode: (params) => service({
    method: 'get',
    url: '/getInvitationCode',
    params,
  }),
};
