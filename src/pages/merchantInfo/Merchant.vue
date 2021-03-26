<template>
  <div class="merchantinfo-wrapper">
    <div class="myCommodity">
      <div class="myCommodity-title">
        <h2 class="myCommodity-title-h">我的商品</h2>
      </div>
      <div class="myCommodity-content">
        <w-card cardWidth="300" cardHeight="200" />
      </div>
    </div>
    <div class="myOrder">
      <div class="myOrder-title">
        <h2 class="myOrder-title-h">我的订单</h2>
      </div>
      <div class="myOrder-content">
        <w-card />
      </div>
    </div>
  </div>
</template>

<script>
import WCard from '@/components/CommodityCard';

export default {
  components: {
    WCard,
  },
};
</script>

<style lang="scss" scoped>
.merchantinfo-wrapper {
  width: 100%;
  // height: 100%;
  padding-left: 200px;
  background-color: rgb(52, 52, 129);

  .mycommodity {
    &-title {
      &-h {
        color: #fff;
      }
    }
  }
  .myOrder {
    &-title {
      &-h {
        color: #fff;
      }
    }
  }
}
</style>
