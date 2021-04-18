<template>
  <div class="nav-wrapper">
    <ul class="nav">
      <li
        v-for="page in pages" :key="page.key"
        :class="{ 'nav-item': true, active: currentPage === page.key }"
        @click="changePage(page.key)"
      >
        {{ page.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      type: String,
      default: '',
    },
  },
  methods: {
    changePage(page) {
      this.$emit('pageChange', page);
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
  color: #aaa;
  background-color: #fff;

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
        background-color: rgb(63, 194, 194);
        color: rgb(0, 235, 235);
      }

      &:not(.active):hover {
        color: rgb(0, 161, 161);
        background-color: rgb(144, 242, 255);
      }
    }
  }
}
</style>
