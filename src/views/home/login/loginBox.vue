<template>
  <div class="input-box">
    <input placeholder="请输入账号" v-model="loginData.accoutNum" class="user-id" type="text" />
    <input placeholder="请输入密码" v-model="loginData.password" class="user-pwd" type="text" />
    <div class="user-login">
      <a-button @click="login" type="default">登录</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        accoutNum: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$emit('loginRequest', this.loginData);
    },
  },
};
</script>

<style lang='scss' scoped>
.input-box {
  position: relative;
  width: 80%;
  height: 100%;
  padding-top: 30px;
  text-align: left;
  .user-id,
  .user-pwd {
    position: relative;
    margin-top: 30px;
    width: 60%;
    height: 40px;
    left: 20%;
    outline-style: none;
    border: none;
    border-bottom: 1.5px solid #eee;
    font-size: 14px;
    padding: 5px 20px;
  }
  .user-id:focus,
  .user-pwd:focus {
    transition: border 0.3s ease-in-out;
    border-bottom: 1.5px solid #40a9ff;
  }
  .user-id {
  }
  .user-pwd {
  }
  .user-login {
    margin-top: 30px;
    width: 100%;
    text-align: left;
    button {
      left: 20%;
    }
  }
}
</style>
