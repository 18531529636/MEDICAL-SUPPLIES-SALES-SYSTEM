<template>
  <div class="user-wrapper">
    <div class="bg-circle"></div>
    <div class="sider">
      <nav-info></nav-info>
    </div>
    <div class="content">
      <div class="nav-header">
        <span class="nav-title">XXX医疗用品</span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';

export default {
  components: {
    NavInfo,
  },
};
</script>

<style lang="scss" scoped>
$inputBoxBorder: rgb(59, 250, 250);

.user-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(77, 62, 62);
  overflow: hidden;

  .bg-circle {
    position: absolute;
    left: -475px;
    top: 200px;
    width: 3000px;
    height: 3000px;
    background-color: rgb(155, 5, 5, 0.6);
    border-radius: 1500px;
    z-index: 1;
  }

  .sider {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 10%;
    height: 100%;
    z-index: 3;
  }

  .content {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 3;

    .nav-header {
      position: relative;
      color: #fff;
      left: 0;
      top: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgb(120, 160, 173);
      text-align: left;

      .nav-title {
        position: relative;
        left: 20px;
        display: inline-block;
        font-size: 16px;
        font-weight: bolder;
      }

    }
  }
}
</style>
