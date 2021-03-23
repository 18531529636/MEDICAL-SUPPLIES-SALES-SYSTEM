<template>
  <div class="merchant-wrapper">
    <merchant-menu />
    <div class="merchant-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MerchantMenu from './pageComponents/MerchantMenu.vue';

export default {
  components: {
    MerchantMenu,
  },
};
</script>

<style lang="scss" scoped>
.merchant-wrapper {
  width: 100%;
  height: 100%;
  background-color: black;
  .merchant-content {
    padding-left: 200px;
    width: 100%;
    height: 100%;
  }
}
</style>
