import Vue from 'vue';
import MyDirective from '@/directive';
import publicApi from '@/api/public';
import App from './App.vue';
import router from './router';
import store from './store';
import utils from './utils';
import '@/plugins/ant';
import '@/plugins/ant-design-style';

Vue.config.productionTip = false;

Vue.use(MyDirective);

Vue.prototype.$checkBuyerLoginStatus = function () {
  if (Object.keys(this.$store.state.buyerLogin).length) {
    return true;
  }
  return false;
};

Vue.prototype.$checkSallerLoginStatus = function () {
  if (Object.keys(this.$store.state.sallerLogin).length) {
    return true;
  }
  return false;
};

Vue.prototype.$initLoginData = function () {
  this.$store.commit('SET_LOGINCOOKIE');
};

Vue.prototype.$utils = utils;
Vue.prototype.$publicApi = publicApi;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
