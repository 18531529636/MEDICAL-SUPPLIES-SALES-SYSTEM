<template>
  <div class="user-wrapper">
    <cart-box />
    <div class="bg-circle"></div>
    <div class="sider">
      <nav-info
        :currentPage="currentPage"
        @pageChange="pageChange"
        :pages="pages"
      ></nav-info>
    </div>
    <div class="content">
      <div class="nav-header">
        <span @click="toHomme" class="nav-title">XXX医疗用品</span>
      </div>
      <div class="content-content">
        <div class="content-content-wrapper">
          <component :is="currentPage"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';
import CartBox from '@/components/CartBox';
import Cart from '@/views/userinfo/Cart.vue';
import Info from '@/views/userinfo/Info.vue';

const pages = [
  { key: 'Cart', label: '购物信息' },
  { key: 'Info', label: '个人信息' },
];

export default {
  components: {
    NavInfo,
    CartBox,
    Cart,
    Info,
  },
  data() {
    return {
      pages,
      currentPage: 'Cart',
    };
  },
  methods: {
    toHomme() {
      this.$router.push({ name: 'Home' });
    },
    pageChange(parmas) {
      this.currentPage = parmas;
    },
  },
  // created() {
  //   if (this.$route.query.page) {
  //     this.currentPage = this.$route.query.page;
  //   }
  // },
};
</script>

<style lang="scss" scoped>
$inputBoxBorder: rgb(59, 250, 250);

.user-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(77, 62, 62);
  overflow: hidden;

  .bg-circle {
    position: absolute;
    left: -475px;
    top: 200px;
    width: 3000px;
    height: 3000px;
    background-color: rgb(155, 5, 5, 0.6);
    border-radius: 1500px;
    z-index: 1;
  }

  .sider {
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 3;
  }

  .content {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 200px);
    height: 100%;
    z-index: 3;

    .nav-header {
      position: relative;
      color: #fff;
      left: 0;
      top: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgb(120, 160, 173);
      text-align: left;

      .nav-title {
        cursor: pointer;
        position: relative;
        left: 20px;
        display: inline-block;
        font-size: 16px;
        font-weight: bolder;
      }
    }
    .content-content {
      position: relative;
      width: 100%;
      height: calc(100% - 50px);
      padding: 20px;
      background-color: rgb(241, 241, 241);

      &-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
        border-radius: 6px;
      }
    }
  }
}
</style>
