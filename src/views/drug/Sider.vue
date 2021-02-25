<template>
  <div class="sider-wrapper">
    <nav-menu></nav-menu>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu/NavMenu.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    NavMenu,
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped>
.sider-wrapper {
  position: absolute;
  height: 50%;
  top: 20%;
  width: 100%;
  z-index: 3;
}
</style>
