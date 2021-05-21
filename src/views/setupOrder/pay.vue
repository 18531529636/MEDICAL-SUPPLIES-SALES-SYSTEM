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
        <div v-if="!paying" class="content-content-wrapper">
          <div class="choose-address" v-if="!buyerAddressList.length">
            <h2 class="title">选择地址</h2>
            <div class="choose-address-content">
              <span>暂无数据</span>
            </div>
            <h2 class="title">已选地址</h2>
            <div class="show-chooseaddress">暂无数据</div>
          </div>
          <div class="choose-address" v-else>
            <h2 class="title">选择地址</h2>
            <div class="choose-address-content">
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
            <div class="confirm-orderinfo-content">
              <commodity-confirm
                v-for="commodity in commodityList"
                :commodityInfo="commodity"
                :key="commodity.cartNumber"
              />
            </div>
            <div class="confirm-info-wrapper">
              <div class="confirm-content">
                <div class="total-pay">
                  <h2 class="total-pay-title">实际付款：</h2>
                  <span class="total-pay-symbol">￥</span>
                  <span class="total-pay-value"> {{ totalValue }}</span>
                </div>
                <div class="receive-content">
                  <p class="receive-content-address">
                    <span class="receive-title">寄送至：</span>
                    <span class="receive-content">
                      {{ chooseedAddress.province }}
                      {{ chooseedAddress.city }}
                      {{ chooseedAddress.country }}
                      {{ chooseedAddress.town }}
                      {{ chooseedAddress.detailedAddress }}
                    </span>
                  </p>
                  <p class="receive-content-person">
                    <span class="receive-title">收货人：</span>
                    <span class="receive-content"
                      >{{ chooseedAddress.receivePeople }}
                      {{ chooseedAddress.receivePhone }}
                    </span>
                  </p>
                </div>
                <button class="send-confirm" @click="sendConfirmInfo">
                  提交订单
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="content-content-wrapper">
          <div class="count-down">
            <a-statistic-countdown
              title="请在30十分钟内支付"
              :value="deadline"
              format="D 天 H 时 m 分 s 秒"
            />
          </div>
          <div class="payimg">
            <img :src="paySrc.src" :alt="paySrc.alt" />
          </div>
          <div class="check-pay">
            <a-button @click="checkPay">支付完成</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavInfo from '@/components/NavMyInfo';
import CommodityConfirm from '@/components/commodityConfirmBox';
import buyerApi from '@/api/buyer';

const tencentPay = {
  src: './statistic/tencentpay.jpg',
  alt: '微信支付',
};
const aliPay = {
  src: './statistic/tencentpay.jpg',
  alt: '支付宝支付',
};
const pages = [
  { key: 'pay', label: '支付页面' },
];

export default {
  components: {
    NavInfo,
    CommodityConfirm,
  },
  data() {
    this.pages = pages;
    return {
      orderNumberList: [],
      paying: false,
      deadline: 0,
      payType: 'alipay',
      addressKey: '',
      defaultAddressKey: '',
      buyerAddressList: [],
      currentPage: 'pay',
      chooseedAddress: {},
      commodityList: [],
    };
  },
  computed: {
    paySrc() {
      if (this.payType === 'alipay') {
        return aliPay;
      }
      if (this.payType === 'tencentpay') {
        return tencentPay;
      }
      return false;
    },
    totalValue() {
      console.log(this.commodityList);
      if (!this.commodityList.length || !this.commodityList) {
        return 0;
      }
      let total = this.$utils.toArray(this.commodityList)
        .reduce((sum, item, index) => (index === 1 ? sum.commodityTotalValue
          + item.commodityTotalValue : sum
        + item.commodityTotalValue));
      total = this.commodityList.length === 1 ? total.commodityTotalValue : total;
      return total.toFixed(2);
    },
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
    checkPay() {
      buyerApi.checkOrderPay({ orderNumberList: this.orderNumberList })
        .then((response) => {
          if (response.data.code === 0) {
            this.$store.commit('REFRESH');
            window.opener = null;
            window.open('about:blank', '_top').close();
            return;
          }
          this.$message.error('支付失败');
        });
    },
    sendConfirmInfo() {
      const cartNumberList = this.$utils.toArray(this.commodityList).map((item) => item.cartNumber);
      const requestObj = {
        receivingAddress: this.chooseedAddress,
        buyerId: this.$store.state.buyerLogin.userId,
        commodityList: cartNumberList,
      };
      buyerApi.setOrder(requestObj).then((response) => {
        this.$message.success('提交成功');
        this.paying = true;
        this.deadline = response.data.orderList[0].updateTime + 1000 * 60 * 30;
        this.orderNumberList = this.$utils.toArray(response.data.orderList)
          .map((item) => item.orderNumber);
      });
    },
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
          this.commodityList = response.data.content;
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
    .count-down {
      padding: 20px;
    }

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

        .payimg {
          margin: 0 auto;
          width: 400px;
          height: 500px;
          img {
            width: 400px;
            height: 500px;
          }
        }
        .check-pay {
          position: relative;

          button {
            position: absolute;
            right: 30%;
          }
        }
        .choose-address {
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
          margin-bottom: 200px;
          padding: 20px 80px;

          .confirm-info-wrapper {
            width: 100%;
            text-align: right;

            .confirm-content {
              border: 3px solid rgb(250, 152, 117);
              padding: 10px 20px;
              display: inline-block;
              min-width: 400px;
              position: relative;

              .total-pay {
                &-title {
                  font-weight: 800;
                  font-size: 20px;
                  display: inline-block;
                }

                &-symbol {
                  font-size: 30px;
                  color: #aaa;
                }
                &-value {
                  font-size: 30px;
                  font-weight: 600;
                  color: #f40;
                }
              }
              .receive-content {
                &-address {
                  .receive-title {
                    font-weight: 800;
                    color: #333;
                  }
                  .receive-content {
                  }
                }
                &-person {
                  .receive-title {
                    font-weight: 800;
                    color: #333;
                  }
                  .receive-content {
                  }
                }
              }

              .send-confirm {
                cursor: pointer;
                width: 100px;
                height: 50px;
                position: absolute;
                background-color: #f40;
                color: #fff;
                border: none;
                bottom: -50px;
                right: 0;
              }
              .send-confirm:active {
                background-color: rgb(202, 72, 25);
              }
            }
          }
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
