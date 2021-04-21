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
        <component @changHomeContent="changHomeContent" :is="loginComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox/loginBox.vue';
import RegisterBox from '@/components/LoginBox/registerBox.vue';

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
  created() {
  },
  methods: {
    changeloginTypeHandle(type) {
      this.loginType = type;
    },
    changHomeContent() {
      this.$emit('changHomeContent');
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
    height: 450px;
    top: 2%;
    background-color: #f2f5f5;
    border-radius: 3px;
    .operation {
      top: 40%;
      // height: 50%;
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
      height: 75%;
      background-color: #fff;
      position: absolute;
      top: 20%;
      right: 50px;
    }
  }
}
</style>
