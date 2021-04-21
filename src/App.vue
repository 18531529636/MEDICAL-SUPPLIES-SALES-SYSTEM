<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  components: {
  },
  methods: {
    initLoginData() {
      const tokenCookie = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (tokenCookie) {
        this.$store.commit('SET_LOGINCOOKIE');
      }
    },
  },
  created() {
    // 刷新导致用户信息丢失
    this.initLoginData();
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
