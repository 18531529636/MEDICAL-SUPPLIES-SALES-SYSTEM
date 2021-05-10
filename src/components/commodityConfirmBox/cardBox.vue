<template>
  <div
    class="card-box-wrapper"
    :style="{
      width: cardWidth === -1 ? '100%' : `${cardWidth}px`,
      height: `${cardHeight}px`,
    }"
  >
    <div class="card-content">
      <img
        src="/statistic/首页-医疗器械1.jpg"
        class="commodity-img"
        :style="{
          height: '70px',
          display: 'inline-block',
        }"
        alt=""
      />
      <div class="title">
        <span class="title-title">商品名称：</span>
        <span class="title-content">{{ commodityInfo.commodityName }}</span>
        <span class="title-title">商品编号：</span>
        <span class="title-content">{{ commodityInfo.commodityNumber }}</span>
      </div>
      <div class="introduction">
        <span class="introduction-title">商品简介：</span>
        <span class="introduction-content">{{
          commodityInfo.introduction
        }}</span>
      </div>
      <div class="content">
        <span class="content-title">商品实际单价：</span>
        <span class="content-content">{{ commodityInfo.memberValue }}</span>
        <span class="content-title">商品数量：</span>
        <span class="content-content">{{ commodityInfo.commodityCount }}</span>
        <span class="content-title">商品总价：</span>
        <span class="content-content">{{
          commodityInfo.commodityTotalValue
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardWidth: {
      type: Number,
      default: -1,
    },
    cardHeight: {
      type: Number,
      default: 140,
    },
    commodityInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },
  created() {
    console.log(this.commodityInfo);
  },
  methods: {
    imgSize() {
      return ((this.cardWidth / 10) * 6) < (this.cardHeight / 2) ? `width :${(this.cardWidth / 10) * 9}px` : `height: ${this.cardHeight / 2}px`;
    },
  },
};
</script>

<style scpoed lang="scss">
.card-box-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px 10px 10px 0;
  text-align: left;
  background-color: rgb(181, 211, 211);
  padding: 5px 10px;

  .card-content {
    display: grid;
    grid-template-columns: 120px 1fr 1fr 1fr;

    .title {
      height: 100%;
      margin: 0 10px;
      &-title {
        display: inline-block;
        color: #f40;
      }
      &-content {
        display: block;
        color: rgb(97, 97, 97);
      }
    }
    .introduction {
      height: 100%;
      width: 300px;
      &-title {
        display: inline-block;
        color: #f40;
      }
      &-content {
        display: block;
        color: rgb(97, 97, 97);
      }
    }

    .content {
      height: 100%;
      margin: 0 10px;

      &-title {
        display: inline-block;
        color: #f40;
      }
      &-content {
        display: block;
        color: rgb(97, 97, 97);
      }
    }
  }
}
</style>
