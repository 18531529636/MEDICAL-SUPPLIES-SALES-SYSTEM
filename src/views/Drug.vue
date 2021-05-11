<template>
  <div class="drug-wrapper" id="components-layout-demo-basic">
    <cart-box />
    <a-layout>
      <a-layout-sider>
        <nav-menu :navMenuList="navMenuList"></nav-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <a-layout-header>
            <nav-header @searchHandle="searchHandle" />
          </a-layout-header>
          <a-layout-content>
            <layout-content :cateGoryList="cateGoryList" :infoList="infoList" />
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
import CartBox from '@/components/CartBox';
import buyerApi from '@/api/buyer';

export default {
  name: 'Home',
  components: {
    LayoutContent,
    NavHeader,
    CartBox,
    NavMenu,
  },
  data() {
    return {
      cateGoryList: [],
      navMenuList: [],
      infoList: {},
    };
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
    searchHandle(searchData) {
      if (!searchData) {
        this.getCommodity();
        return;
      }
      this.$publicApi.search({ keyword: searchData })
        .then((response) => {
          const respData = response.data.content;
          this.infoList = respData;
          const classificationNumber = [];
          Object.keys(respData).froEach((key) => {
            if (respData[key]) {
              classificationNumber.push(key);
            }
          });
          buyerApi.getClassification(classificationNumber);
        });
    },
    getCommodity() {
      buyerApi.getCommodity({ classificationNumber: -1 })
        .then((response) => {
          const data = response.data.content;
          this.infoList = data;
        }).catch((err) => {
          console.log(err);
        });
    },
    getClassification() {
      buyerApi.getClassification()
        .then((response) => {
          const cateGoryList = response.data.content.classification;
          const navMenuList = response.data.content.vagueClassification;
          this.cateGoryList = cateGoryList;
          this.navMenuList = navMenuList;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getClassification();
    this.getCommodity();
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
      // background-color: $layoutbg;

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
    // background: $layoutbg;
    // background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs9.rr.itc.cn%2Fg%2FwapChange%2F20155_26_12%2Fa8hkgx2418540943477.JPEG&refer=http%3A%2F%2Fs9.rr.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617261665&t=db6d45a0c24ee537c81ce58c0b0d12fb);
    // background-color: rgba(240, 229, 229, 0) ;
    // opacity: 0;
  }
}
</style>
