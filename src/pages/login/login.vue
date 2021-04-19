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
