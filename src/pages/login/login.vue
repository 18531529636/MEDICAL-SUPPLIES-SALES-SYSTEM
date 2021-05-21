<template>
  <div class="login-wrapper">
    <login-box />
  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox';
import sallerApi from '@/api/saller';

export default {
  components: {
    LoginBox,
  },
  provide: {
    loginFn(loginNumber, passWord) {
      return new Promise((resolve, rejcet) => {
        sallerApi.login({ loginNumber, passWord }).then((response) => {
          resolve(response);
        }).catch((err) => {
          rejcet(err);
        });
      });
    },
    registerFn(obj) {
      return new Promise((resolve, rejcet) => {
        sallerApi.register(obj).then((response) => {
          resolve(response);
        }).catch((err) => {
          rejcet(err);
        });
      });
    },
    sendVerification(data) {
      return new Promise((resolve, reject) => {
        sallerApi.getInvitationCode(data).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    userType() {
      return 'saller';
    },
  },
};
</script>

<style lang='scss' scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgb(52, 52, 129);

}
</style>
