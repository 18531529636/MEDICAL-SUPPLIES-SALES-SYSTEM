<template>
  <div
    class="flex-wrapper"
    v-show="flexContentShow"
    @mouseenter="mouseenterEvent"
    @mouseleave="mouseleaveEvent"
  >
    <div class="flex">
      <div class="flex-item" v-for="(item, index) in hoverNavItem" :key="index">
        <div class="flex-item-header">
          <span class="flex-item-header-title">{{ item.title }}</span>
          <a class="flex-item-header-more" href="">更多 ></a>
        </div>
        <ul class="flex-item-content">
          <li
            v-for="(i, index) in item.label"
            :key="index"
            class="flex-item-content-item"
          >
            <a :href="['#' + i.key]">{{ i.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    hoverNavItem: {
      type: Array,
      default: () => [],
    },
    flexContentShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mouseenterEvent() {
      this.$emit('mouseenterFlexContent');
    },
    mouseleaveEvent() {
      this.$emit('mouseleaveFlexContent');
    },
  },

};
</script>

<style lang="scss" scoped>
@keyframes flexContentShow {
  0% {
    opacity: 0;
    width: 100px;
    height: 115px;
  }
  100% {
    opacity: 1;
    width: 400px;
    height: 450px;
  }
}

.flex-wrapper {
  position: fixed;
  top: 200px;
  left: 198px;
  width: 400px;
  height: 450px;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
  z-index: 3;
  box-shadow: 4px 4px 6px #ddd;
  border-radius: 8px;
  animation: flexContentShow 0.1s forwards;

  .flex {
    position: relative;
    width: 100%;
    height: 100%;

    &-item {
      &-header {
        position: relative;
        width: 100%;
        height: 50px;
        text-align: left;
        padding: 7px 0;
        border-bottom: 1px solid #ddd;

        &-title {
          font-size: 22px;
        }

        &-more {
          font-size: 14px;
          color: #999;
          display: inline-block;
          position: absolute;
          right: 0;
        }
      }
      &-content {
        width: 100%;
        text-align: left;
        padding: 8px 0 0 0;
        display: flex;
        flex-wrap: wrap;

        &-item {
          height: 35px;
          display: inline-block;
          list-style: none;
          cursor: pointer;
          color: #999;
          padding: 5px;

          a {
            color: #999;
            &:hover {
              color: rgb(231, 154, 39);
            }
          }
        }

        &::after {
          display: block;
          content: "";
          clear: both;
        }
      }
    }
  }
}
</style>
