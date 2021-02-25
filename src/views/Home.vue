<template>
  <div class="home" id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider>
        <layout-sider></layout-sider>
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <a-layout-content>
            <layout-content></layout-content>
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
import LayoutSider from '@/views/home/Sider.vue';
import LayoutContent from '@/views/home/Content.vue';

export default {
  name: 'Home',
  components: {
    LayoutSider,
    LayoutContent,
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
}
#components-layout-demo-basic > .ant-layout {
  height: 100%;
  width: 100%;
}
#components-layout-demo-basic > .ant-layout > .ant-layout {
  background-color: $layoutbg;
}
#components-layout-demo-basic > .ant-layout > .ant-layout > .ant-layout {
  position: absolute;
  right: 0px;
  height: 100%;
  width: 90%;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  z-index: 2;
  background: #fff;
  width: 100%;
}

#components-layout-demo-basic .ant-layout-footer {
  padding: 0;
  height: 50px;
  line-height: 50px;
}
#components-layout-demo-basic > .ant-layout > .ant-layout-sider {
  background: #fff;
  z-index: 3;
  box-shadow: 0 0 6px #ddd;
}
#components-layout-demo-basic .ant-layout-content {
  z-index: 2;
  background: $layoutbg;
  // padding: 10px 0;
  // padding-bottom: 2px;
}
#components-layout-demo-basic > .ant-layout:last-child {
}
</style>
