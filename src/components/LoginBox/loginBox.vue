<template>
  <div class="input-box">
    <input
      placeholder="请输入账号"
      v-model="loginNumber"
      v-filter-space="loginNumber"
      class="user-id"
      type="text"
    />
    <input
      placeholder="请输入密码"
      v-model="passWord"
      v-filter-space="passWord"
      type="password"
      class="user-pwd"
    />
    <div class="user-login">
      <a-button type="default" @click="checkLogin(loginNumber,passWord)">登录</a-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginNumber: '',
      passWord: '',
    };
  },
  props: {
    login: {
      type: Object,
      default: () => { },
    },
  },
  inject: [
    'loginFn',
    'userType',
  ],
  methods: {
    checkLogin(loginNumber, passWord) {
      this.loginFn(loginNumber, passWord).then((response) => {
        const { code, msg } = response.data;
        if (code === 0) {
          this.$message.success('登陆成功');
          this.$store.commit('SET_LOGINCOOKIE');
          if (this.userType() === 'saller') {
            this.$router.push({ name: 'Merchantinfo' });
          }
          this.$emit('changHomeContent');
        } else {
          this.$message.error(msg);
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error('登录失败');
      });
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
