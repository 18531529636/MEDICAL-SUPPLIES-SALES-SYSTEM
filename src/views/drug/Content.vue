<template>
  <div class="content-wrapper">
    <div class="pic-loop">
      <a-carousel autoplay>
        <!-- <div class="pic-loop-item" :style="{backgroundIamge: url('')}">1</div> -->
        <div class="pic-loop-item">2</div>
        <div class="pic-loop-item">3</div>
        <div class="pic-loop-item">4</div>
      </a-carousel>
    </div>
    <w-card></w-card>
  </div>
</template>

<script>
import WCard from '@/components/Card/Card.vue';

export default {
  components: {
    WCard,
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
  height: 100%;

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
