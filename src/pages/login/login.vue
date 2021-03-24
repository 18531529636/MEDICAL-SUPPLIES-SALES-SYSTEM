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
  padding-left: 200px;
  background-color: rgb(52, 52, 129);

  // .login-box{
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -70%);
  //   width: 600px;
  //   height: 400px;
  //   // margin:  auto;

  //   border-radius: 10px;
  //   background-color: #eee;

  //   .input-box{
  //     margin: 0 auto;
  //     width: 500px;
  //     background-color: brown;
  //     padding: 10px 20px;
  //     display: flex;

  //     .login-input{
  //       border: none;
  //       outline: none;
  //       width: 300px;
  //       height: 40px;
  //     }
  //   }
  // }
}
</style>
