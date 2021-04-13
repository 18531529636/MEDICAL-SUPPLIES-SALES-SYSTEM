<template>
  <div class="login-wrapper">
    <login-box />
  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox';

export default {
  components: {
    LoginBox,
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
