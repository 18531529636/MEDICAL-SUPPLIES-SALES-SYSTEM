import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/drug',
    name: 'Drug',
    // route level code-splitting
    // this generates a separate chunk (drug.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "drug" */ '../views/Drug.vue'),
  },
  {
    path: '/detail',
    name: 'DetailPage',
    // route level code-splitting
    // this generates a separate chunk (drug.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "detail" */ '../views/DetailPage.vue'),
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/cart',
    // route level code-splitting
    // this generates a separate chunk (drug.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    children: [
      {
        // 购物车、已发货、未发货等
        name: 'Cart',
        path: '/user/cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/userinfo/Cart.vue'),
      },
      {
        // 个人信息、收货地址
        name: 'Info',
        path: '/user/info',
        component: () => import(/* webpackChunkName: "cart" */ '../views/userinfo/Info.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
