<template>
  <div class="header-wrapper">
    <div class="nav-header">
      <span @click="toHome" class="nav-title">XXX医疗用品</span>
      <div class="input-box">
        <!-- <input placeholder="请输入搜索信息" type="text"  />
        <button>搜索</button> -->
        <a-input-search
          placeholder="input search text"
          style="width: 200px"
          v-model="searchData"
          @search="searchHandle"
        />
      </div>
      <div class="user">
        <div class="user-cart" @click="toUser('cart')">
          <span>购物信息</span>
        </div>
        <div class="user-info" @click="toUser('info')">
          <span>我的信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: '',
    };
  },
  methods: {
    searchHandle() {
      this.$emit('searchHandle', this.searchData);
    },
    toUser() {
      this.$router.push({ name: 'User' });
    },
    toHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
$inputBoxBorder: rgb(59, 250, 250);

.header-wrapper {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(255, 255, 255);
  text-align: left;

  .nav-header {
    position: relative;
    width: 100%;
    height: 100%;

    .nav-title {
      cursor: pointer;
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
</style>
