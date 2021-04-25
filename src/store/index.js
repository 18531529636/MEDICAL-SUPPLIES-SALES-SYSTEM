import Vue from 'vue';
import Vuex from 'vuex';
import AES from '@/utils/AES';
import buyerApi from '@/api/buyer';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 购物车列表
    commodityList: [],
    loginData: {},
  },
  mutations: {
    CHANGE_CARTlIST(state, payload) {
      state.commodityList = payload;
    },
    ADD_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.commodityNumber === payload.commodityNumber);
      if (index !== -1) {
        data[index].count += 1;
      } else {
        const obj = {
          ...payload,
          key: payload.cartNumber,
        };
        data.push(obj);
      }
      state.commodityList = data;
    },
    DELETE_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.commodityId === payload.commodity.commodityId);
      data.splice(index, 1);
      state.commodityList = data;
    },
    SET_LOGINCOOKIE(state) {
      const tokenCookie = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (!tokenCookie) {
        state.loginData = {};
        return;
      }
      const loginData = AES.decrypte(unescape(tokenCookie));
      state.loginData = loginData;
    },
  },
  actions: {
    REQUEST_CART(context) {
      buyerApi.getCart({ buyerId: context.state.loginData.userId }).then((response) => {
        const respData = response.data.content.map((item) => ({
          ...item,
          rowKey: item.commodityNumber,
        }));
        context.commit('CHANGE_CARTlIST', respData);
      });
    },
    REQUEST_CARTITEM(context, payload) {
      if (!Object.keys(context.state.loginData).length) {
        this.$message.success('请先登录');
        return;
      }
      buyerApi
        .addCart({
          buyerId: context.state.loginData.userId,
          sallerId: payload.sallerId,
          commodityNumber: payload.commodityNumber,
        })
        .then((response) => {
          console.log(this);
          // Vue.$message[response.data.code === 0 ? 'success' : 'error'](response.data.msg);
          context.commit('ADD_COMMODITY', response.data.content[0]);
          console.log(response.data);
        });
    },
  },
  modules: {},
});
