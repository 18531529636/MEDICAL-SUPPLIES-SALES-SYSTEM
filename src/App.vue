<template>
  <div id="app">
    <cart-box />
    <router-view />
  </div>
</template>

<script>
import CartBox from '@/components/CartBox';

export default {
  components: {
    CartBox,
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  min-width: 1280px;
  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs9.rr.itc.cn%2Fg%2FwapChange%2F20155_26_12%2Fa8hkgx2418540943477.JPEG&refer=http%3A%2F%2Fs9.rr.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617261665&t=db6d45a0c24ee537c81ce58c0b0d12fb);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
</style>
