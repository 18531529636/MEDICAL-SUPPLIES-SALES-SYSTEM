<template>
  <div class="merchant">
    <div class="sider">
      <nav-info :pages="navData" :currentPage="currentPage" @pageChange="pageChange"></nav-info>
    </div>
    <div class="merchant-content">
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';
import MerchantInfo from '@/pages/merchantInfo/MerchantInfo.vue';
import MerchantCommodity from '@/pages/merchantInfo/MerchantCommodity.vue';

const navData = [
  { key: 'MerchantInfo', label: '商品' },
  { key: 'MerchantCommodity', label: '商家信息' },
];
export default {

  components: {
    // MerchantMenu,
    NavInfo,
    MerchantInfo,
    MerchantCommodity,
  },
  data() {
    return {
      navData,
      currentPage: navData[0].key,
    };
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
  background-color: black;
  .merchant-content {
    // display: inline-block;
    margin-left: 200px;
    width: calc(100% - 200px);
    height: 100%;
  }
  .sider{
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 3;
  }
}
</style>
