import Vue from 'vue';
import Vuex from 'vuex';
import AES from '@/utils/AES';
import buyerApi from '@/api/buyer';
import { message } from 'ant-design-vue';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 购物车列表
    commodityList: [],
    buyerLogin: {},
    sallerLogin: {},
  },
  mutations: {
    CHANGE_CARTlIST(state, payload) {
      state.commodityList = payload;
    },
    ADD_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.commodityNumber === payload.commodityNumber);
      if (index !== -1) {
        data[index].commodityCount += 1;
      } else {
        const obj = {
          ...payload,
          key: payload.cartNumber,
        };
        data.unshift(obj);
      }
      state.commodityList = data;
    },
    DELETE_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.cartNumber === payload.cartNumber);
      if (payload.deleteCount === -1) {
        data.splice(index, 1);
        state.commodityList = data;
        return;
      }
      const count = state.commodityList[index].commodityCount - payload.deleteCount;
      state.commodityList[index].commodityCount = count;
    },
    SET_LOGINCOOKIE(state) {
      const buyerTokenCookie = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)buyerToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      const sallerTokenCookie = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)sallerToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (!buyerTokenCookie) {
        state.buyerLogin = {};
      } else {
        const buyerLogin = AES.decrypte(unescape(buyerTokenCookie));
        state.buyerLogin = buyerLogin;
      }
      if (!sallerTokenCookie) {
        state.sallerLogin = {};
      } else {
        const sallerLogin = AES.decrypte(unescape(sallerTokenCookie));
        state.sallerLogin = sallerLogin;
      }
    },
  },
  actions: {
    REQUEST_CART(context) {
      if (!Object.keys(context.state.buyerLogin).length) {
        return;
      }
      buyerApi.getCart({ buyerId: context.state.buyerLogin.userId }).then((response) => {
        const respData = response.data.content.map((item) => ({
          ...item,
          key: item.commodityNumber,
        }));
        context.commit('CHANGE_CARTlIST', respData);
      });
    },
    ADD_CARTITEM(context, payload) {
      if (!Object.keys(context.state.buyerLogin).length) {
        message.error('请先登录');
        return;
      }
      buyerApi
        .addCart({
          buyerId: context.state.buyerLogin.userId,
          sallerId: payload.sallerId,
          commodityNumber: payload.commodityNumber,
        })
        .then((response) => {
          console.log(response.data.content);
          message[response.data.code === 0 ? 'success' : 'error'](response.data.msg);
          context.commit('ADD_COMMODITY', response.data.content);
        });
    },
    DELETE_CARTITEM(context, payload) {
      console.log(payload);
      buyerApi
        .deleteCart({ cartNumber: payload.commodity.cartNumber, deleteCount: payload.deleteCount })
        .then(() => {
          context.commit('DELETE_COMMODITY', {
            cartNumber: payload.commodity.cartNumber,
            deleteCount: payload.deleteCount,
          });
        });
    },
  },
  modules: {},
});
