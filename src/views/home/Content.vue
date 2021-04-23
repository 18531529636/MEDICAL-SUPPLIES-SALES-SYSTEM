<template>
  <div class="content-wrapper">
    <div class="to-merchant">
      <a-button type="link" @click="$router.push({ name: 'MerChant' })"
        >卖家登录</a-button
      >
    </div>
    <div class="top-image"></div>
    <component
      @changHomeContent="changHomeContent"
      @logOut="logout"
      :is="logined"
    ></component>
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
import LoginContent from '@/components/LoginBox';
import buyerApi from '@/api/buyer';

export default {
  components: {
    LoginedContent,
    LoginContent,
  },
  data() {
    return {
      haveLogined: false,
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
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      if (Object.keys(this.$store.state.loginData).length) {
        this.logined = true;
        return;
      }
      this.logined = false;
    },
    changHomeContent() {
      this.logined = true;
    },
    toDrug() {
      this.$router.push('drug');
    },
    toApparatus() {
      this.$router.push('apparatus');
    },
    logout() {
      console.log('logout');
      const { loginNumber } = this.$store.state.loginData;
      buyerApi.logout({ loginNumber }).then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          this.$message.success(response.data.msg);
          return;
        }
        this.$message.error(response.data.msg);
      });
      this.logined = false;
    },
  },
  provide: {
    loginFn(loginNumber, passWord) {
      return new Promise((resolve, rejcet) => {
        buyerApi.login({ loginNumber, passWord }).then((response) => {
          resolve(response);
        }).catch((err) => {
          rejcet(err);
        });
      });
    },
    registerFn(obj) {
      return new Promise((resolve, rejcet) => {
        buyerApi.register(obj).then((response) => {
          resolve(response);
        }).catch((err) => {
          rejcet(err);
        });
      });
    },
    userType() {
      return 'buyer';
    },
    sendVerification(mailBox) {
      return new Promise((resolve, reject) => {
        buyerApi.getVerificationCode(mailBox).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  watch: {
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
  .to-merchant {
    display: inline-block;
    position: absolute;
    z-index: 4;
    right: 100px;
  }
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
    position: absolute;
    left: -5%;
    bottom: 50px;
    width: 110%;
    height: calc(100% - 600px);
    padding: 20px 0;
    z-index: 5;
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
