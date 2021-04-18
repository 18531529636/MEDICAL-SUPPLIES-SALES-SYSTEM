<template>
  <div class="sider-wrapper">
    <div class="content">
      <h2>XXX医疗用品</h2>
      <span>
        XXX医疗网各类客户首营要求 · XXX医疗供应商首营资料和流程 ·
        XXX医疗—专业医疗器械B2B平台 · XXX医疗网供货价格的说明
      </span>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss' scoped>
.sider-wrapper {
  // position: absolute;
  position: fixed;
  height: 50%;
  top: 20%;
  width: 10%;

  .content {
    width: 100%;
    h2 {
      font-weight: bolder;
    }

    span {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 30%;
      padding: 10px;
    }
  }
}
</style>
