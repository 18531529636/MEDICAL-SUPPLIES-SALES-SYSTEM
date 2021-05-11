import service from './index';

export default {
  getInvitationCode: (params) => service({
    method: 'get',
    url: '/getInvitationCode',
    params,
  }),
  search: (data) => service({
    url: '/buyer/search',
    method: 'post',
    data,
  }),
};
