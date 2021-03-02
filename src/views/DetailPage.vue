<template>
  <div class="detail-wrapper">
    <nav-header />
  </div>
</template>

<script>
import NavHeader from '@/components/Header';

export default {
  components: {
    NavHeader,
  },
  methods: {
    toUser(page) {
      if (page === 'cart') {
        // 跳转页面同时 给页面一个值
        this.$router.push({ name: 'Cart', query: { commodityId: 1 } });
      } else if (page === 'info') {
        this.$router.push({ name: 'Info', query: { commodityId: 1 } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$inputBoxBorder: rgb(59, 250, 250);

.detail-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: forestgreen;

  .header {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: rgb(240, 188, 240);
    text-align: left;

    .nav-header {
      position: relative;
      width: 100%;
      height: 100%;

      .nav-title {
        left: 50px;
        position: relative;
        display: inline-block;
        color: #000;
        font-size: 16px;
        font-weight: bolder;
      }
      .input-box {
        display: inline-block;
        position: absolute;
        right: 500px;
        width: 300px;
        height: 100%;
        input {
          width: 200px;
          height: 60%;
          line-height: 60%;
          outline: none;
          border: 1px solid $inputBoxBorder;
          border-radius: 4px 0 0 4px;
          padding: 3px 6px;
        }
        button {
          height: 60%;
          width: 80px;
          line-height: 60%;
          border: 1px solid $inputBoxBorder;
          outline: none;
          border-radius: 0 4px 4px 0;
          background-color: #fff;
        }
      }
      .user {
        display: inline-block;
        position: absolute;
        right: 100px;
        width: 300px;
        height: 100%;
        &-cart,
        &-info {
          cursor: pointer;
          display: inline-block;
          margin: 0 30px;
          font-size: 14px;
        }
        &-cart:hover,
        &-info:hover {
          color: indianred;
        }
      }
    }
  }
}
</style>
