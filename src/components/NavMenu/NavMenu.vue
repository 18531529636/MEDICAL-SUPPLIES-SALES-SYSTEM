<template>
  <div class="nav-wrapper">
    <ul class="nav">
      <li
        class="nav-item"
        v-for="(itemList, itemListIndex) in navMenuList"
        :key="itemListIndex"
        @mouseenter="mouseenterEvent(itemList)"
        @mouseleave="mouseleaveEvent()"
      >
        <div
          class="nav-item-titleList"
          v-for="(item, itemIndex) in itemList"
          :key="itemIndex"
        >
          <span class="nav-item-title">{{ item.title }}</span>
          <span
            class="nav-item-division"
            v-if="!(itemIndex === itemList.length - 1)"
            >/
          </span>
        </div>
        <span class="nav-item-right"> > </span>
      </li>
      <slot></slot>
    </ul>
    <flex-content
      @mouseenterFlexContent="clearFlexContentTimer"
      @mouseleaveFlexContent="mouseleaveEvent"
      :hoverNavItem="hoverNavItem"
      :flexContentShow="flexContentShow"
    />
  </div>
</template>

<script>
import FlexContent from '@/components/NavMenu/FlexContent.vue';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      hoverNavItem: null,
      flexContentShow: false,
      flexContentTimer: null,
    };
  },
  components: {
    FlexContent,
  },
  props: {
    navMenuList: {
      type: Array,
      default: () => [
        [
          {
            title: '手术1',
            detailClasification: [
              {
                title: '手术用品',
              }, {
                title: '手术用品',
              }, {
                title: '手术用品',
              }, {
                title: '手术用品',
              }, {
                title: '手术用品',
              },
            ],
          },
          {
            title: '手术2',
            detailClasification: [{
              title: '手术用品',
            }, {
              title: '手术用品',
            }, {
              title: '手术用品3',
            }, {
              title: '手术用品1',
            },
            ],
          },
        ],
        [
          {
            title: '手术3',
            detailClasification: [{
              title: '手术用品',
            }, {
              title: '手术用品',
            }, {
              title: '手术用品',
            }, {
              title: '手术用品',
            }, {
              title: '手术用品',
            }, {
              title: '手术用品',
            },
            ],
          },
        ],
      ],
    },
  },
  computed: {
  },
  methods: {
    mouseenterEvent: debounce(function test(item) {
      this.flexContentShow = true;
      this.hoverNavItem = item;
    }, 300),
    mouseleaveEvent() {
      this.clearFlexContentTimer();
      this.flexContentTimer = setTimeout(() => {
        this.flexContentShow = false;
      }, 300);
    },
    clearFlexContentTimer() {
      clearInterval(this.flexContentTimer);
      this.flexContentTimer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
$nav-item-titleRight: #fff;

.nav-wrapper {
  border: 2px solid #aaa;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #3576aa;

  .nav {
    position: absolute;
    height: 50%;
    top: 20%;
    width: 100%;
    z-index: 3;
    padding: 20px 10px;

    &-item {
      list-style: none;
      position: relative;
      margin: 12px 0;
      width: 100%;
      height: 30px;
      text-align: left;
      padding: 2px 5px;

      &:hover {
        background-color: rgba(255, 150, 0, 0.08);
        border-radius: 10px;
      }

      &-titleList {
        display: inline-block;

        .nav-item-title,
        .nav-item-division {
          color: $nav-item-titleRight;
          font-size: 16px;
          display: inline-block;
        }
        .nav-item-title {
          font-size: 16px;
          cursor: pointer;
          font-weight: bolder;
        }

        .nav-item-division {
          font-weight: bolder;
          margin: 0 5px;
        }
      }
      .nav-item-right {
        display: inline-block;
        position: absolute;
        color: $nav-item-titleRight;
        right: 5px;
        font-weight: bolder;
      }
    }
  }
}
</style>
