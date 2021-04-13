<template>
  <div class="input-box">
    <input
      v-model="userId"
      placeholder="请输入账号"
      class="user-id"
      type="text"
    />
    <input
      v-model="userPwd"
      placeholder="请输入密码"
      class="user-pwd"
      type="text"
    />
    <input
      v-model="userName"
      placeholder="请输入姓名"
      class="user-name"
      type="text"
    />
    <!-- <input v-model="userAddress" placeholder="请选择地址" class="user-address" type="text" /> -->
    <a-cascader
      :options="options"
      :show-search="{ filter }"
      placeholder="请选择地址"
      class="user-address"
      expand-trigger="hover"
      @change="select"
    />
    <input
      v-model="userDetailedAddress"
      placeholder="请输入具体地址"
      class="user-detailed-address"
      type="text"
    />
    <div class="user-login">
      <a-button type="default">注册</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      userPwd: '',
      userName: '',
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
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  width: 80%;
  height: 100%;
  padding-top: 40px;
  text-align: left;
  .user-id,
  .user-pwd,
  .user-name,
  .user-detailed-address {
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

  .user-id:focus,
  .user-pwd:focus,
  .user-name:focus,
  .user-detailed-address:focus {
    transition: border 0.3s ease-in-out;
    border-bottom: 1.5px solid #40a9ff;
  }
  .user-login {
    position: absolute;
    display: inline-block;
    width: 100%;
    text-align: left;
    top: 73%;
    button {
      left: 15%;
    }
  }
}
</style>
