<template>
  <div class="content-wrapper">
    <div class="top-image"></div>
    <component @logOut="logOut" :is="logined"></component>
    <div class="wrapper">
      <div class="drug" @click="toDrug">
        <span>医疗器械 / 用具</span>
      </div>
      <div class="apparatus" @click="toApparatus">
        <span>医疗用药</span>
      </div>
    </div>
  </div>
</template>

<script>
import LoginedContent from '@/views/home/logined/loginedContent.vue';
import LoginContent from '@/views/home/login/loginContent.vue';

export default {
  components: {
    LoginedContent,
    LoginContent,
  },
  data() {
    return {
      haveLogined: true,
    };
  },
  computed: {
    logined: {
      get() {
        // 此处判断cookie或session等 判断是否已登录
        // maybe此属性应该为计算属性 动态获取cookie得知是否为已登录状态
        // const haveLogined = true;
        if (this.haveLogined) {
          return LoginedContent;
        }
        return LoginContent;
      },
      set(val) {
        this.haveLogined = val;
      },
    },
  },
  watch: {
  },
  methods: {
    toDrug() {
      this.$router.push('drug');
    },
    toApparatus() {
      this.$router.push('apparatus');
    },
    logOut() {
      this.logined = false;
    },
  },
};
</script>

<style lang='scss' scoped>
$hoverY: -6px;
$transitionTime: 0.5s;

.content-wrapper {
  position: relative;
  height: 100%;
  background-color: #fff;
  .top-image {
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 200px;
    background-image: url("./image/city.jpg");
    background-position: -200px -140px;
    z-index: 3;
  }
  .wrapper {
    position: relative;
    left: -5%;
    top: 5%;
    width: 110%;
    height: 50%;
    padding: 20px 0;
    .drug,
    .apparatus {
      position: relative;
      width: 40%;
      height: 100%;
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;
    }
    .drug span,
    .apparatus span {
      position: absolute;
      bottom: 50px;
      left: 40px;
      color: #fff;
      font-size: 20px;
      font-weight: bolder;
    }
    .drug {
      background-image: url("./image/首页-医疗器械.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .apparatus {
      background-image: url("./image/首页-医药1.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .drug:hover,
    .apparatus:hover {
      -webkit-transform: translateY($hoverY);
      -ms-transform: translateY($hoverY);
      transform: translateY($hoverY);
      box-shadow: 0 0 10px #999;
      -webkit-box-shadow: 0 0 10px #999;
      transition: all $transitionTime ease-in-out;
      -webkit-transition: all $transitionTime ease-in-out;
      span {
        transition: font-size 0.3s;
        font-size: 30px;
      }
    }
  }
}
</style>
