import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 购物车列表
    commodityList: [
      {
        orderNumber: 1,
        name: '手术刀1',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 2,
        name: '手术刀2',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 3,
        name: '手术刀3',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 4,
        name: '手术刀4',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 5,
        name: '手术刀5',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 6,
        name: '手术刀6',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 7,
        name: '手术刀7',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 8,
        name: '手术刀8',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        orderNumber: 9,
        name: '手术刀9',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
    ],
  },
  mutations: {
    ADD_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      data.push(payload.commodity);
      state.commodityList = data;
    },
    DELETE_COMMODITY(state, payload) {
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.commodityId === payload.commodity.commodityId);
      data.splice(index, 1);
      state.commodityList = data;
    },
  },
  actions: {},
  modules: {},
});
