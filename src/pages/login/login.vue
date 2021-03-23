<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="input-box">
        <input class="login-input" type="text" />
        <input class="login-input" type="password" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss' scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgb(52, 52, 129);

  .login-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    width: 600px;
    height: 400px;
    // margin:  auto;

    border-radius: 10px;
    background-color: #eee;

    .input-box{
      margin: 0 auto;
      width: 500px;
      background-color: brown;
      padding: 10px 20px;
      display: flex;

      .login-input{
        border: none;
        outline: none;
        width: 300px;
        height: 40px;
      }
    }
  }
}
</style>
