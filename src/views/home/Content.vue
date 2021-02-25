<template>
  <div class="content-wrapper">
    <div class="top-image"></div>
    <component :is="logined"></component>
  </div>
</template>

<script>
import LoginedContent from '@/views/home/logined/loginedContent.vue';
import LoginContent from '@/views/home/login/loginContent.vue';

export default {
  components: {
    LoginedContent,
    LoginContent,
  },
  data() {
    return {
    };
  },
  computed: {
    logined() {
      // 此处判断cookie或session等 判断是否已登录
      // maybe此属性应该为计算属性 动态获取cookie得知是否为已登录状态
      const haveLogined = true;
      if (haveLogined) {
        return LoginedContent;
      }
      return LoginContent;
    },
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped>
$hoverY: -6px;
$transitionTime: 0.5s;

.content-wrapper {
  position: relative;
  height: 100%;
  background-color: #fff;
  .top-image {
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 200px;
    background-image: url("./image/city.jpg");
    background-position: -200px -140px;
    z-index: 3;
  }
}
</style>
