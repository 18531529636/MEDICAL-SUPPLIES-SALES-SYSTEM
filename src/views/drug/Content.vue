<template>
  <div class="content-wrapper">
    <div class="pic-loop">
      <a-carousel autoplay>
        <!-- <div class="pic-loop-item" :style="{backgroundIamge: url('')}">1</div> -->
        <div class="pic-loop-item">
          <h1>1</h1>
        </div>
        <div class="pic-loop-item">
          <h1>2</h1>
        </div>
        <div class="pic-loop-item">
          <h1>3</h1>
        </div>
        <div class="pic-loop-item">
          <h1>4</h1>
        </div>
      </a-carousel>
    </div>
    <w-card :cateGoryList="cateGoryList" :infoList="infoList"></w-card>
  </div>
</template>

<script>
import WCard from '@/components/CommodityCard/CommodityCard.vue';
import buyerApi from '@/api/buyer';

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
      type: Array,
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
    getCommodity() {
      buyerApi.getCommodity({ classificationNumber: -1 })
        .then((response) => {
          const data = response.data.content;
          this.infoList = data;
        }).catch((err) => {
          console.log(err);
        });
    },
    getClassification() {
      buyerApi.getClassification()
        .then((response) => {
          const cateGoryList = response.data.content.classification;
          const navMenuList = response.data.content.vagueClassification;
          this.cateGoryList = cateGoryList;
          this.navMenuList = navMenuList;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getClassification();
    this.getCommodity();
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
