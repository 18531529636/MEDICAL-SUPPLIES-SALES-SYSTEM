<template>
  <div class="content-wrapper">
    <div class="pic-loop">
      <a-carousel autoplay>
        <div class="pic-loop-item">
          <img
            class="pic-loop-item-img"
            alt=""
            src="/statistic/首页-医疗器械1.jpg"
          />
        </div>
        <div class="pic-loop-item">
          <img
            class="pic-loop-item-img"
            alt=""
            src="/statistic/首页-医疗器械1.jpg"
          />
        </div>
        <div class="pic-loop-item">
          <img
            class="pic-loop-item-img"
            alt=""
            src="/statistic/首页-医疗器械1.jpg"
          />
        </div>
        <div class="pic-loop-item">
          <img
            class="pic-loop-item-img"
            alt=""
            src="/statistic/首页-医疗器械1.jpg"
          />
        </div>
      </a-carousel>
    </div>
    <w-card :cateGoryList="cateGoryList" :infoList="infoList" @buttonClick="addToCart"></w-card>
  </div>
</template>

<script>
import WCard from '@/components/CommodityCard/CommodityCard.vue';

export default {
  components: {
    WCard,
  },
  props: {
    cateGoryList: {
      type: Array,
      default: () => [],
    },
    infoList: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loginType: 1,
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    addToCart(card) {
      this.$store.dispatch('REQUEST_CARTITEM', card);
    },
  },
  created() {
  },
  mounted() {

  },
};
</script>

<style lang='scss' scoped>
$hoverY: -6px;
$transitionTime: 0.5s;

.content-wrapper {
  position: relative;
  // height:%;
  background-color: #eee;

  .pic-loop {
    margin: 0 auto;
    width: 60%;
    height: 350px;

    &-item {
      width: 100%;
      height: 350px;
      line-height: 350px;
      background-color: coral;

      &-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
::v-deep .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

::v-deep .ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
