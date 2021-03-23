import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 购物车列表
    commodityList: [
      {
        commodityId: 1,
        name: '手术刀1',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 2,
        name: '手术刀2',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 3,
        name: '手术刀3',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 4,
        name: '手术刀4',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 5,
        name: '手术刀5',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 6,
        name: '手术刀6',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 7,
        name: '手术刀7',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 8,
        name: '手术刀8',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
      {
        commodityId: 9,
        name: '手术刀9',
        memberValue: 12,
        marketValue: 15,
        count: 6,
      },
    ],
  },
  mutations: {
    ADD_COMMODITY(state, payload) {
      // {
      // commodityId: 1,
      // name: '手术刀1',
      // memberValue: 12,
      // marketValue: 15,
      // count: 6,
      // },
      //       commodityId: 2
      // imgSrc: "./statistic/首页-医疗器械1.jpg"
      // marketValue: 123
      // memberValue: 122
      // operationId: 0
      // name: '手术刀'
      // operationTitle: "削铁如泥的手术刀手术刀手术刀"
      const newVal = payload.commodity;
      const data = Array.from(state.commodityList);
      const index = data.findIndex((item) => item.commodityId === newVal.commodityId);
      if (index !== -1) {
        data[index].count += 1;
      } else {
        const obj = {
          commodityId: newVal.commodityId,
          name: newVal.name,
          memberValue: newVal.memberValue,
          marketValue: newVal.marketValue,
          count: 1,
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
  },
  actions: {},
  modules: {},
});
