<template>
  <div class="nav-wrapper">
    <ul class="nav">
      <li
        :class="{ 'nav-item': true, active: this.$route.name === 'Cart' }"
        @click="toUser('Cart')"
      >
        购物信息
      </li>
      <li
        :class="{ 'nav-item': true, active: this.$route.name === 'Info' }"
        @click="toUser('Info')"
      >
        个人信息
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toUser(page) {
      if (page === 'Cart' && this.$route.name !== 'Cart') {
        this.$router.push({ name: 'Cart', query: { commodityId: this.$route.query.commodityId } });
      } else if (page === 'Info' && this.$route.name !== 'Info') {
        this.$router.push({ name: 'Info', query: { commodityId: this.$route.query.commodityId } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 6px #ddd;
  color: #eee;

  .nav {
    width: 100%;
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    padding: 20px 10px;

    &-item {
      cursor: pointer;
      list-style: none;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: bolder;
      border-radius: 8px;
      margin-bottom: 20px;
      &.active {
        background-color: deeppink;
      }

      &:not(.active):hover {
        color: rgb(5, 187, 187);
        background-color: rgb(241, 222, 198);
      }
    }
  }
}
</style>
