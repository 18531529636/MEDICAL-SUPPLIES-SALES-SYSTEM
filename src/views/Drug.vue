<template>
  <div class="drug-wrapper" id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider>
        <nav-menu></nav-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <a-layout-header>
            <nav-header />
          </a-layout-header>
          <a-layout-content>
            <layout-content></layout-content>
            <!-- <my-test></my-test> -->
          </a-layout-content>
          <a-layout-footer>
            © 2018 版权所有：常州安康医疗器械有限公司
            备案号：苏ICP备15000383号-1 证书编号：（苏）-非经营性-2016-0033
            全程策划：恒硕设计
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import LayoutContent from '@/views/drug/Content.vue';
import NavMenu from '@/components/NavMenu';
import NavHeader from '@/components/Header';
// import MyTest from './test.vue';

export default {
  name: 'Home',
  components: {
    LayoutContent,
    NavHeader,
    NavMenu,
    // MyTest,
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

<style lang='scss' scoped>
$layoutbg: #ddd;
$inputBoxBorder: rgb(59, 250, 250);

#components-layout-demo-basic {
  position: relative;
  text-align: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  & > .ant-layout {
    height: 100%;
    width: 100%;

    & > .ant-layout-sider {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      box-shadow: 0 0 6px #ddd;
    }

    & > .ant-layout {
      background-color: $layoutbg;

      & > .ant-layout {
        position: absolute;
        right: 0px;
        height: 100%;
        width: 90%;
      }
    }
  }

  & .ant-layout-header,
  & .ant-layout-footer {
    z-index: 2;
    background: #fff;
    width: 100%;
  }

  & .ant-layout-header {
    text-align: left;
    position: relative;
    height: 50px;
    padding: 0;
    // .nav-header {
    //   position: relative;
    //   // background-color: #aaa;
    //   width: 100%;
    //   height: 100%;

    //   .nav-title {
    //     position: relative;
    //     display: inline-block;
    //     color: #000;
    //     font-size: 16px;
    //     font-weight: bolder;
    //   }
    //   .input-box {
    //     display: inline-block;
    //     position: absolute;
    //     right: 500px;
    //     width: 300px;
    //     height: 100%;
    //     input {
    //       width: 200px;
    //       height: 60%;
    //       line-height: 60%;
    //       outline: none;
    //       border: 1px solid $inputBoxBorder;
    //       border-radius: 4px 0 0 4px;
    //       padding: 3px 6px;
    //     }
    //     button {
    //       height: 60%;
    //       width: 80px;
    //       line-height: 60%;
    //       border: 1px solid $inputBoxBorder;
    //       outline: none;
    //       border-radius: 0 4px 4px 0;
    //       background-color: #fff;
    //     }
    //   }
    //   .user {
    //     display: inline-block;
    //     position: absolute;
    //     right: 100px;
    //     width: 300px;
    //     height: 100%;
    //     &-cart,
    //     &-info {
    //       cursor: pointer;
    //       display: inline-block;
    //       margin: 0 30px;
    //       font-size: 14px;
    //     }
    //     &-cart:hover,
    //     &-info:hover {
    //       color: indianred;
    //     }
    //   }
    // }
  }

  & .ant-layout-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 0;
    height: 50px;
    line-height: 50px;
  }
  & .ant-layout-content {
    z-index: 2;
    background: $layoutbg;
  }
}
</style>
