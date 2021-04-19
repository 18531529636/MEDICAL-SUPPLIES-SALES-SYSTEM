import service from './index';

export default {
  getInvitationCode: (params) => service({
    method: 'get',
    url: '/getInvitationCode',
    params,
  }),
};
