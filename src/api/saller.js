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
  createMyCommodity: (data) => service({
    method: 'post',
    url: '/saller/createMyCommodity',
    data,
  }),
  getMyCommodity: (data) => service({
    method: 'post',
    url: '/saller/getMyCommodity',
    data,
  }),
  confirmReceive: (data) => service({
    method: 'post',
    url: '/saller/confirmReceive',
    data,
  }),
  updateCommodity: (data) => service({
    method: 'post',
    url: '/saller/updateCommodity',
    data,
  }),
  deleteCommodity: (data) => service({
    method: 'post',
    url: '/saller/deleteCommodity',
    data,
  }),
  setGoCourierNumber: (data) => service({
    method: 'post',
    url: '/saller/setGoCourierNumber',
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
