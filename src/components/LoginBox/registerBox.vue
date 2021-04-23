<template>
  <div class="input-box">
    <input
      v-model="loginNumber"
      placeholder="请输入账号"
      class="user-id"
      type="text"
    />
    <input
      v-model="passWord"
      type="password"
      placeholder="请输入密码"
      class="user-pwd"
    />
    <a-button
      class="mail-send"
      type="link"
      size="small"
      @click="sendMail"
      v-if="userType() === 'buyer'"
      >发送邮箱验证码</a-button
    >
    <input
      v-model="userName"
      placeholder="请输入姓名"
      class="user-name"
      type="text"
    />
    <input
      v-model="mailBox"
      placeholder="请输入邮箱"
      class="user-mailbox"
      type="text"
    />
    <a-cascader
      :options="options"
      :show-search="{ filter }"
      placeholder="请选择地址"
      class="user-address"
      expand-trigger="hover"
      @change="select"
      v-if="userType() === 'buyer'"
    />
    <input
      v-model="userDetailedAddress"
      placeholder="请输入具体地址"
      class="user-detailed-address"
      type="text"
      v-if="userType() === 'buyer'"
    />
    <input
      v-model="verificationCode"
      placeholder="请输入邀请码"
      class="user-verificationCode"
      type="text"
    />
    <div class="user-login">
      <a-button type="default" @click="registerClick">注册</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginNumber: '',
      passWord: '',
      userName: '',
      mailBox: '',
      verificationCode: '',
      userAddress: '',
      userDetailedAddress: '',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
                {
                  value: 'xiasha',
                  label: 'Xia Sha',
                  disabled: true,
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua men',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  inject: [
    'registerFn',
    'userType',
    'sendVerification',
  ],
  methods: {
    select(val) {
      this.userAddress = val;
      console.log(this.userAddress);
    },
    filter(inputValue, path) {
      return path.some(
        (option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      );
    },
    sendMail() {
      this.sendVerification({ mailBox: this.mailBox }).then((response) => {
        const { code, msg } = response.data;
        if (code === 0) {
          this.$message.success(msg);
          return;
        }
        this.$message.error(msg);
      }).catch((err) => {
        this.$message.error('请求错误');
        console.log(err);
      });
    },
    registerClick() {
      const {
        loginNumber, passWord, userName,
        userAddress, userDetailedAddress, mailBox, verificationCode,
      } = this;
      const obj = {
        saller: {
          loginNumber,
          passWord,
          sallerName: userName,
          userAddress,
          userDetailedAddress,
          mailBox,
          verificationCode,
        },
        buyer: {
          loginNumber,
          passWord,
          buyerName: userName,
          userAddress,
          userDetailedAddress,
          mailBox,
          verificationCode,
        },
      }[this.userType()];
      this.registerFn(obj).then((response) => {
        const { code, msg } = response.data;
        if (code === 0) {
          this.$message.success('注册成功');
          this.$store.commit('SET_LOGINCOOKIE');
          if (this.userType() === 'saller') {
            this.$router.push({ name: 'Merchantinfo' });
          }
          console.log('捕捉注册');
          this.$emit('changHomeContent');
          return;
        }
        this.$message.error(msg);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 80%;
  height: 100%;
  padding-top: 10px;
  text-align: left;

  .user-id,
  .user-pwd,
  .user-name,
  .user-detailed-address,
  .user-mailbox,
  .user-verificationCode {
    display: inline-block;
    position: relative;
    margin: 20px 20px 0 0;
    width: 40%;
    height: 40px;
    left: 10%;
    outline-style: none;
    border: none;
    border-bottom: 1.5px solid #eee;
    font-size: 14px;
    padding: 5px 20px;
  }

  .user-address {
    position: relative;
    display: inline-block;
    margin: 20px 20px 0 0;
    width: 40%;
    height: 40px;
    left: 10%;

    ::v-deep .ant-input.ant-cascader-input {
      outline-style: none;
      border: none;
      border-bottom: 1.5px solid #eee;
      font-size: 14px;
      padding: 5px 20px;
      color: rgb(112, 110, 112);
    }
  }
  .mail-send {
    position: absolute;
    right: -50px;
    top: 120px;
  }
  .user-id:focus,
  .user-pwd:focus,
  .user-name:focus,
  .user-mailbox:focus,
  .user-detailed-address:focus,
  .user-verificationCode:focus {
    transition: border 0.3s ease-in-out;
    border-bottom: 1.5px solid #40a9ff;
  }
  .user-login {
    position: absolute;
    display: inline-block;
    // width: 40%;
    text-align: left;
    top: 80%;
    right: 50px;
    button {
      // left: 15%;
      width: 100px;
    }
  }
}
</style>
