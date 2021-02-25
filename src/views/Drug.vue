<template>
  <div class="drug-wrapper" id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider>
        <nav-menu></nav-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <a-layout-header>
            <span>XXX医疗用品</span>
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
import NavMenu from '@/components/NavMenu/NavMenu.vue';
// import MyTest from './test.vue';

export default {
  name: 'Home',
  components: {
    LayoutContent,
    NavMenu,
    // MyTest,
  },
};
</script>

<style lang='scss'>
$layoutbg: #ddd;

#components-layout-demo-basic {
  position: relative;
  text-align: center;
  height: 100%;
  width: 100%;

  & > .ant-layout {
    height: 100%;
    width: 100%;

    & > .ant-layout-sider {
      background: #fff;
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

  & .ant-layout-header{
    text-align: left;
    position: relative;
    span{
      display: inline-block;
      position: relative;
      left: 40%;
      font-size: 30px;
      font-weight: bolder;
    }
  }

  & .ant-layout-footer {
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
