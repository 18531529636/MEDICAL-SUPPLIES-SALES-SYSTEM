<template>
  <div class="cart-wrapper">
    <div class="cart">
      <div class="cart-cart">
        <div class="cart-cart">
          <div class="cart-cart-title">
            <h3>购物车</h3>
          </div>
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :row-selection="rowSelection"
            :pagination="false"
            :scroll="{ y: 300 }"
          >
            <span class="ss" slot="marketvalue" slot-scope="text">
              {{ text }}
            </span>
            <span slot="handler" slot-scope="text, record, index">
              <a href="javascript:;" @click="deleteOperation(record, index)"
                >删除</a
              >
            </span>
          </a-table>
          <div class="cart-cart-pay">
            <div class="alltotalprice">
              <span class="alltotalprice-label">总价为：</span>
              <span class="alltotalprice-price">{{ allTotalPrice }}</span>
            </div>
            <div class="cart-cart-pay-type">
              <a-radio-group
                v-model="payType"
                default-value="alipay"
                button-style="solid"
              >
                <a-radio-button value="alipay"> 支付宝 </a-radio-button>
                <a-radio-button value="tencentpay"> 微信 </a-radio-button>
              </a-radio-group>
            </div>
            <a-button type="primary" @click.stop="qrShow = true">支付</a-button>
            <div class="QRcode" v-if="qrShow">
              <span class="QRcode-price">总价：{{ allTotalPrice }}</span>
              <span class="close" @click.stop="qrShow = false">关闭</span>
              <div class="qr">
                <img :src="paySrc" alt="微信支付" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

const tencentPay = './statistic/tencentpay.jpg';
const aliPay = './statistic/tencentpay.jpg';

export default {
  data() {
    return {
      qrShow: false,
      selectedRows: [],
      payType: 'alipay',
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '市场价',
          key: 'marketValue',
          dataIndex: 'marketValue',
          scopedSlots: { customRender: 'marketValue' },
        },
        {
          title: '会员价',
          dataIndex: 'memberValue',
          key: 'memberValue',
        },
        {
          title: '数量',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '总价(会员价)',
          dataIndex: 'totalPrice',
          key: 'totalPrice',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'handler' },
          key: 'handler',
        },
      ],
      // dataSource: [],
    };
  },
  computed: {
    dataSource: {
      get() {
        const data = [];
        this.$store.state.commodityList.forEach((item) => {
          const obj = {
            ...item,
            totalPrice: item.count * item.memberValue,
          };
          data.push(obj);
        });
        return data;
      },
      set(val) {
        console.log(val);
      },
    },
    paySrc() {
      if (this.payType === 'alipay') {
        return aliPay;
      }
      if (this.payType === 'tencentpay') {
        return tencentPay;
      }
      return false;
    },
    allTotalPrice() {
      let price = 0;
      this.selectedRows.forEach((item) => {
        price += item.totalPrice;
      });
      return price;
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows;
        },
      };
    },
  },
  methods: {
    deleteOperation(record) {
      const data = Array.from(this.selectedRows);
      // const dataSource = Array.from(this.dataSource);
      const selectIndex = data.findIndex((item) => item.orderNumber === record.orderNumber);
      // const dataIndex = dataSource.findIndex((item) => item.orderNumber === record.orderNumber);

      if (selectIndex !== -1) {
        this.selectedRows.splice(selectIndex, 1);
      }
      this.$store.commit('DELETE_COMMODITY', { commodity: record });
      // this.dataSource.splice(dataIndex, 1);
    },
  },
  created() {
    // this.dataSource = this.$store.state.commodityList;
  },
};
</script>

<style lang="scss" scoped>
.cart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(172, 91, 134, 0.3);

  .cart {
    // position: relative;
    margin: 0 auto;
    width: 80%;
    height: 100%;
    // background-color: deeppink;

    &-cart {
      position: relative;
      width: 100%;
      height: 500px;
      // background-color: deepskyblue;

      &-title {
        display: block;
        width: 100%;
        height: 50px;
        text-align: left;
        padding: 5px 20px;
        border-bottom: 2px solid #999;

        h3 {
          color: #fff;
          font-size: 18px;
        }
      }

      &-pay {
        position: relative;
        margin-top: 10px;
        text-align: left;
        height: 30px;
        .alltotalprice {
          // background-color: cornsilk;
          display: inline-block;
          padding: 0 30px;
          height: 30px;
          line-height: 30px;

          &-label {
            display: inline-block;
            color: #fff;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
          }

          &-price {
            display: inline-block;
            color: crimson;
            font-size: 20px;
            font-weight: bolder;
            height: 30px;
            line-height: 30px;
          }
        }

        &-type {
          display: inline-block;
          position: absolute;
          left: 300px;
          padding: 0 20px;
        }

        button {
          position: absolute;
          right: 0;
        }

        .QRcode {
          display: inline-block;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 400px;
          height: 400px;
          background-color: rgba(100, 100, 148, 0.8);

          &-price {
            display: inline-block;
            padding: 20px;
            font-size: 18px;
            font-weight: bolder;
            color: red;
          }
          .close {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #111;
            cursor: pointer;
          }
          .qr {
            margin: 0 auto;
            width: 270px;
            height: 270px;
            // background-color: blue;

            img {
              width: 270px;
              height: 270px;
            }
          }
        }
      }
    }
  }
}
</style>
