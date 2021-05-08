<template>
  <div class="pay-wrapper">
    <div class="bg-circle"></div>
    <div class="sider">
      <nav-info :currentPage="currentPage" :pages="pages" />
    </div>
    <div class="content">
      <div class="nav-header">
        <span @click="toHome" class="nav-title">XXX医疗用品</span>
      </div>
      <div class="content-content">
        <div class="content-content-wrapper">
          <div class="chooose-address">
            <h2 class="title">选择地址</h2>
            <div class="chooose-address-content">
              <a-radio-group
                v-model="addressKey"
                @change="changeDefaultAddress"
              >
                <a-card
                  title=""
                  :hoverable="true"
                  :bordered="defaultAddressKey === buyerAddress.addressNumber"
                  v-for="buyerAddress in buyerAddressList"
                  :key="buyerAddress.key"
                  :class="{
                    'choosed-address':
                      chooseedAddress.addressNumber ===
                      buyerAddress.addressNumber,
                  }"
                  @click="chooseAddress(buyerAddress)"
                >
                  <span
                    :class="[
                      {
                        'default-address':
                          defaultAddressKey === buyerAddress.addressNumber,
                      },
                      'address-label',
                    ]"
                  >
                    {{ buyerAddress.province }}
                    {{ buyerAddress.city }}
                    {{ buyerAddress.country }}
                    {{ buyerAddress.town }}
                    {{ buyerAddress.detailedAddress }}
                    ({{ buyerAddress.receivePeople }} 收)
                    {{ buyerAddress.receivePhone }}
                  </span>
                  <a-radio-button :value="buyerAddress.addressNumber"
                    >默认地址</a-radio-button
                  >
                </a-card>
              </a-radio-group>
            </div>
            <h2 class="title">已选地址</h2>
            <div class="show-chooseaddress">
              {{ chooseedAddress.province }}
              {{ chooseedAddress.city }}
              {{ chooseedAddress.country }}
              {{ chooseedAddress.town }}
              {{ chooseedAddress.detailedAddress }}
              ({{ chooseedAddress.receivePeople }} 收)
              {{ chooseedAddress.receivePhone }}
            </div>
          </div>
          <div class="confirm-orderinfo">
            <h2 class="title">确认订单信息</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';
import buyerApi from '@/api/buyer';

const pages = [
  { key: 'pay', label: '支付页面' },
];

export default {
  components: {
    NavInfo,
  },
  data() {
    this.pages = pages;
    return {
      addressKey: '',
      defaultAddressKey: '',
      buyerAddressList: [],
      currentPage: 'pay',
      chooseedAddress: {},
    };
  },
  computed: {
    cartList() {
      return this.$route.query.num;
    },
    buyerId() {
      return this.$store.state.buyerLogin.userId;
    },
  },
  created() {
    this.getCardItem();
    this.getAddress();
    const data = [];
    this.buyerAddressList = data;
    this.$utils.toArray(this.buyerAddressList).some((item) => {
      if (item.defaultChoose) {
        this.defaultAddressKey = item.addressNumber;
        this.addressKey = this.defaultAddressKey;
        return true;
      }
      return false;
    });
  },
  methods: {
    toHome() {
      this.$router.push({ name: 'Home' });
    },
    chooseAddress(buyerAddress) {
      this.chooseedAddress = buyerAddress;
    },
    getCardItem() {
      const queryData = this.$utils.crypto.decrypte(this.$route.query.num);

      buyerApi.getCartDetail({ buyerId: this.buyerId, cartNumberList: queryData })
        .then((response) => {
          console.log(response.data);
        });
    },
    getAddress() {
      buyerApi.getAddress({ loginNumber: this.$store.state.buyerLogin.loginNumber })
        .then((response) => {
          if (response.data.code === 0) {
            this.buyerAddressList = response.data.content;
            const data = Array.from(this.buyerAddressList);
            data.some((item) => {
              if (item.defaultChoose) {
                this.defaultAddressKey = item.addressNumber;
                this.addressKey = item.addressNumber;
                this.chooseedAddress = item;
                return true;
              }
              return false;
            });
          }
        });
    },
    changeDefaultAddress() {
      buyerApi.setDefaultAddress({
        loginNumber: this.$store.state.buyerLogin.loginNumber,
        addressNumber: this.addressKey,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 0) {
            this.$message.success('修改默认地址成功');
            this.getAddress();
            return;
          }
          this.$message.error('修改默认地址失败');
        });
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-weight: 800;
  display: block;
  margin: 20px 0;
}
.title::after {
  content: "";
  display: block;
  width: calc(100% - 20px);
  height: 1px;
  position: relative;
  left: 10px;
  top: 10px;
  border-bottom: 1px solid rgb(172, 172, 172);
}
.pay-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(77, 62, 62);
  overflow: hidden;

  .bg-circle {
    position: absolute;
    left: -475px;
    top: 200px;
    width: 3000px;
    height: 3000px;
    background-color: rgb(155, 5, 5, 0.6);
    border-radius: 1500px;
    z-index: 1;
  }

  .sider {
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 3;
  }

  .content {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 200px);
    height: 100%;
    z-index: 3;

    .nav-header {
      position: relative;
      color: #fff;
      left: 0;
      top: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgb(120, 160, 173);
      text-align: left;

      .nav-title {
        cursor: pointer;
        position: relative;
        left: 20px;
        display: inline-block;
        font-size: 16px;
        font-weight: bolder;
      }
    }
    .content-content {
      position: relative;
      width: 100%;
      height: calc(100% - 50px);
      padding: 20px;
      background-color: rgb(241, 241, 241);
      overflow: hidden;
      text-align: left;

      &-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
        border-radius: 6px;
        background-color: #fff;

        .chooose-address {
          width: 100%;
          padding: 20px 80px;

          &-content {
            width: 100%;
            height: 300px;
            overflow: auto;
          }

          .show-chooseaddress {
            display: inline-block;
            padding: 10px 20px;
            border: 4px solid rgb(10, 198, 223);
          }
        }
        .confirm-orderinfo {
          width: 100%;
          padding: 20px 80px;
        }
      }
    }
  }
}
.default-address {
  font-weight: 700;
  color: #333;
}
.address-label {
  margin-right: 10px;
}
::v-deep .ant-card {
  display: inline-block;
  margin: 5px;
  border: 4px solid rgba(255, 255, 255, 1);
}
::v-deep .ant-card-bordered {
  border: 4px dashed #1fe9bd;
}
.choosed-address {
  border: 4px ridge #1fe9bd;
}
::v-deep .ant-card-bordered.choosed-address {
  border: 4px ridge #1fe9bd;
}
</style>
