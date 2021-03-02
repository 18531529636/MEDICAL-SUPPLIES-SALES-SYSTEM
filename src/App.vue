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
