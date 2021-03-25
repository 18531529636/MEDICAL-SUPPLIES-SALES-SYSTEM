<template>
  <div class="logined-content">
    <div class="user">
      <div class="user-wrapper">
        <div class="user-info">
          <span> 个人信息 </span>
        </div>
        <div class="user-shopping-cart">
          <span> 购物车 </span>
        </div>
        <div class="user-all-order">
          <span> 全部订单 </span>
        </div>
        <div class="user-have-send">
          <span> 已发货 </span>
        </div>
        <div class="user-havend-send">
          <span> 未发货 </span>
        </div>
        <div class="user-send-back">
          <span> 退货订单 </span>
        </div>
        <div @click="logOut" class="user-send-back">
          <span> 退出登录 </span>
        </div>
      </div>
    </div>
    <!-- <div class="wrapper">
      <div class="drug" @click="toDrug">
        <span>医疗器械 / 用具</span>
      </div>
      <div class="apparatus" @click="toApparatus">
        <span>医疗用药</span>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    toDrug() {
      this.$router.push('drug');
    },
    toApparatus() {
      this.$router.push('apparatus');
    },
    logOut() {
      this.$emit('logOut');
    },
  },
};
</script>

<style lang='scss' scoped>
$hoverY: -6px;
$userHoverY: -3px;
$transitionTime: 0.5s;
$userTransitionTime: 0.3s;

.logined-content {
  z-index: 2;
  position: relative;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding-top: 5%;

  .user {
    position: relative;
    width: 100%;
    height: 40%;
    top: 2%;
    background-color: #f2f5f5;
    border-radius: 3px;

    &-wrapper {
      position: absolute;
      width: 100%;
      height: 60%;
      background-color: blanchedalmond;
      top: 110px;
      padding: 10px 50px;
      display: flex;
      justify-content: space-between;

      .user-info,
      .user-shopping-cart,
      .user-all-order,
      .user-have-send,
      .user-havend-send,
      .user-send-back {
        cursor: pointer;
        position: relative;
        display: inline-block;
        width: 200px;
        height: 80px;
        background-image: url("../image/首页-医疗器械.jpg");
        text-align: left;

        span {
          cursor: pointer;
          display: inline-block;
          position: relative;
          top: 35px;
          left: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: bolder;
        }
      }

      .user-info:hover,
      .user-shopping-cart:hover,
      .user-all-order:hover,
      .user-have-send:hover,
      .user-havend-send:hover,
      .user-send-back:hover {
        box-shadow: 0 0 10px #999;
        -webkit-box-shadow: 0 0 10px #777;
        transition: all $userTransitionTime ease-in-out;
        -webkit-transition: all $userTransitionTime ease-in-out;
        span {
          color: #f60;
          transition: font-size 0.3s;
          font-size: 22px;
        }
      }
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
