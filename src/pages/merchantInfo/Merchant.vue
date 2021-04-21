<template>
  <div class="merchant">
    <div class="sider">
      <nav-info
        :pages="navData"
        :currentPage="currentPage"
        @pageChange="pageChange"
      ></nav-info>
    </div>
    <div class="merchant-header">
      <h2 class="merchant-header-title">医疗用品销售系统卖家后台管理系统</h2>
      <div class="merchant-header-welcome">
        <span class="merchant-header-welcome-title"
          >商家——{{ merchantName }}</span
        >
      </div>
    </div>
    <div class="merchant-content">
      <div class="merchant-content-wrapper">
        <component :is="currentPage"></component>
      </div>
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';
import MerchantInfo from '@/pages/merchantInfo/MerchantInfo.vue';
import MerchantCommodity from '@/pages/merchantInfo/MerchantCommodity.vue';
import MerchantOrder from '@/pages/merchantInfo/MerchantOrder.vue';

const navData = [
  { key: 'MerchantOrder', label: '订单' },
  { key: 'MerchantCommodity', label: '商品' },
  { key: 'MerchantInfo', label: '卖家信息' },
];
export default {
  components: {
    NavInfo,
    MerchantInfo,
    MerchantCommodity,
    MerchantOrder,
  },
  data() {
    return {
      navData,
      currentPage: navData[0].key,
    };
  },
  computed: {
    merchantName() {
      return this.$store.state.loginData.userName;
    },
  },
  methods: {
    pageChange(parmas) {
      this.currentPage = parmas;
    },
  },
};
</script>

<style lang="scss" scoped>
.merchant {
  width: 100%;
  height: 100%;
  .sider {
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 3;
  }
  .merchant-header {
    text-align: left;
    height: 100px;
    margin-left: 200px;
    position: relative;
    width: calc(100% - 200px);
    padding: 30px;
    &-title {
      display: inline-block;
      position: absolute;
      font-weight: bolder;
      font-size: 28px;
      top: 50%;
      transform: translateY(-50%);
    }
    &-welcome {
      display: inline-block;
      width: calc(100% - 300px);
      margin-left: 300px;
      text-align: right;
      padding-right: 100px;
      &-title {
        font-size: 20px;
        display: inline-block;
      }
    }
  }
  .merchant-content {
    margin-left: 200px;
    width: calc(100% - 200px);
    height: calc(100% - 100px);
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
</style>
