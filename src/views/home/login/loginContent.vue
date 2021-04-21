<template>
  <div class="login-content">
    <div class="login">
      <div class="operation">
        <h3>登录或创建一个新账号</h3>
        <div class="loginA">
          <span
            :class="{ active: loginType === 1 }"
            @click="changeloginTypeHandle(1)"
            >登录</span
          >
        </div>
        <div class="register">
          <span
            :class="{ active: loginType === 2 }"
            @click="changeloginTypeHandle(2)"
            >注册</span
          >
        </div>
      </div>
      <div class="operation-box">
        <component @loginRequest="loginRequest" :is="loginComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBox from '@/views/home/login/loginBox.vue';
import RegisterBox from '@/views/home/login/registerBox.vue';

export default {
  components: {
    LoginBox,
    RegisterBox,
  },
  data() {
    return {
      loginType: 1,
    };
  },
  computed: {
    loginComponent() {
      return this.loginType === 1 ? LoginBox : RegisterBox;
    },
  },
  watch: {
  },
  methods: {
    changeloginTypeHandle(type) {
      this.loginType = type;
    },
    toDrug() {
      this.$router.push('drug');
    },
    toApparatus() {
      this.$router.push('apparatus');
    },
    loginRequest(params) {
      console.log(params);
    },
  },
};
</script>

<style lang='scss' scoped>
$hoverY: -6px;
$transitionTime: 0.5s;

.login-content {
  z-index: 2;
  position: relative;
  width: 90%;
  height: calc(100% - 520px);
  margin: 0 auto;
  padding-top: 5%;

  .login {
    position: relative;
    width: 100%;
    height: 340px;
    top: 2%;
    background-color: #f2f5f5;
    border-radius: 3px;
    .operation {
      top: 40%;
      // height: 100%;
      width: 30%;
      position: relative;
      text-align: left;
      padding-left: 60px;
      h3 {
        text-align: left;
        font-size: 24px;
        font-weight: bolder;
      }
      .loginA,
      .register {
        text-align: left;
        margin-top: 10px;
      }
      .loginA span,
      .register span {
        cursor: pointer;
        display: inline-block;
        color: rgb(72, 67, 109);
        font-weight: bolder;
        font-size: 16px;
        border-bottom: 5px solid transparent;
      }

      .loginA .active,
      .register .active {
        color: rgb(65, 192, 165);
        transition: border 0.4s ease-in-out;
        border-bottom: 5px solid #ddd;
      }
    }
    .operation-box {
      width: 60%;
      height: 80%;
      background-color: #fff;
      position: absolute;
      top: 15%;
      right: 50px;
    }
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
      background-image: url("../image/首页-医疗器械.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .apparatus {
      background-image: url("../image/首页-医药1.jpg");
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
