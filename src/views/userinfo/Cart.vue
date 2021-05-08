<template>
  <div class="cart-wrapper">
    <div class="cart">
      <div class="cart-cart">
        <div class="cart-cart-title">
          <h3>购物车</h3>
        </div>
        <div class="cart-cart-table">
          <a-table
            :rowKey="(record) => record.commodityId"
            :columns="columns"
            :data-source="dataSource"
            :row-selection="rowSelection"
            :pagination="false"
            :scroll="{ y: 350 }"
            class="table-wrapper"
          >
            <span slot="marketvalue" slot-scope="text">
              {{ text }}
            </span>
            <span slot="handler" slot-scope="text, record, index">
              <a href="javascript:;" @click="deleteOperation(record, index)"
                >删除</a
              >
            </span>
          </a-table>
        </div>
        <div class="cart-cart-pay">
          <div class="alltotalprice">
            <span class="alltotalprice-label">总价为：</span>
            <span class="alltotalprice-price">{{ allTotalPrice }}</span>
          </div>
          <a-button type="primary" @click.stop="sendTemporaryOrder"
            >提交订单</a-button
          >
          <!-- <div class="cart-cart-pay-type">
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
          <div class="QRcode" v-show="qrShow">
            <span class="QRcode-price">总价：{{ allTotalPrice }}</span>
            <span class="close" @click.stop="qrShow = false">关闭</span>
            <div class="qr">
              <img :src="paySrc.src" :alt="paySrc.alt" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="cart-commodity-status"></div>
    </div>
    <div class="cart-order-wrapper">
      <cart-order />
    </div>
  </div>
</template>

<script>
// import buyerApi from '@/api/buyer';
import CartOrder from './cartOrderBox.vue';

// const tencentPay = {
//   src: './statistic/tencentpay.jpg',
//   alt: '微信支付',
// };
// const aliPay = {
//   src: './statistic/tencentpay.jpg',
//   alt: '支付宝支付',
// };

export default {
  name: 'Cart',
  components: {
    CartOrder,
  },
  data() {
    return {
      // qrShow: false,
      selectedRows: [],
      payType: 'alipay',
      columns: [
        {
          title: '名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
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
          dataIndex: 'commodityCount',
          key: 'commodityCount',
        },
        {
          title: '总价(会员价)',
          dataIndex: 'commodityTotalValue',
          key: 'commodityTotalValue',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'handler' },
          key: 'handler',
        },
      ],
    };
  },
  watch: {
    dataSource: {
      handler(val) {
        const data = Array.from(this.selectedRows);
        const stateData = Array.from(val);
        this.selectedRows = data
          .filter((item) => stateData.findIndex((i) => i.commodityId === item.commodityId) !== -1);
      },
      deep: true,
    },
  },
  computed: {
    buyerId() {
      return this.$store.state.buyerLogin.userId;
    },
    dataSource: {
      get() {
        const data = [];
        if (!this.$store.state.commodityList.length) return [];
        this.$store.state.commodityList.forEach((item) => {
          const obj = {
            ...item,
            totalPrice: item.commodityCount * item.memberValue,
          };
          data.push(obj);
        });
        return data;
      },
      set(val) {
        console.log(val);
      },
    },
    // paySrc() {
    //   if (this.payType === 'alipay') {
    //     return aliPay;
    //   }
    //   if (this.payType === 'tencentpay') {
    //     return tencentPay;
    //   }
    //   return false;
    // },
    allTotalPrice() {
      let price = 0;
      this.selectedRows.forEach((item) => {
        price += item.commodityTotalValue;
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
    sendTemporaryOrder() {
      // 创建临时订单
      if (!this.selectedRows.length) {
        this.$message.warning('请选择想要结账的商品');
        return;
      }
      const selectRows = Array.from(this.selectedRows);
      const cartNumberList = selectRows.map((item) => item.cartNumber);
      console.log(cartNumberList);
      // const receivingAddress = {
      //   province: '北京',
      //   city: '北京市',
      //   area: '大兴区',
      //   town: '西红门镇',
      //   detailAddress: '蜂窝公寓',
      // };
      // buyerApi.setOrder({ cartNumberList, receivingAddress, buyerId: this.buyerId })
      //   .then((response) => {
      //     console.log(response.data);
      //     if (response.data.code === 0 || !response.data.orderList.length) {
      //     }
      //   });
      const queryData = this.$utils.crypto.encrypte(cartNumberList);
      console.log(queryData);
      const routeData = this.$router.resolve({
        name: 'PayPage',
        query: { num: queryData },
      });
      window.open(routeData.href, '_blank');
    },
    deleteOperation(record) {
      this.$store.dispatch('DELETE_CARTITEM', { commodity: record, deleteCount: -1 });
    },
  },
  created() {
  },
  mounted() {
    const tableContent = document.getElementsByClassName('ant-table-body')[0];
    console.log('this.dataSource');
    console.log(this.dataSource);
    if (!this.dataSource.length) {
      console.log(tableContent);
      console.log(tableContent.className);
      if (tableContent.className !== 'ant-table-body no-data') {
        // tableContent.classList.add('no-data');
        tableContent.style.height = '0px';
        // console.log(tableContent.className);
      }
      return;
    }
    if (tableContent.className === 'ant-table-body no-data') {
      tableContent.classList.remove('no-data');
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-wrapper {
  position: relative;
  width: 100%;

  .cart-order-wrapper {
    position: relative;
    width: 100%;
  }

  .cart {
    margin: 0 auto;
    width: 80%;

    &-cart {
      position: relative;
      width: 100%;
      height: 500px;

      &-title {
        display: block;
        width: 100%;
        height: 50px;
        text-align: left;
        padding: 5px 20px;
        border-bottom: 2px solid #999;

        h3 {
          color: #111;
          font-size: 18px;
        }
      }

      &-table {
        height: 400px;
      }

      &-pay {
        position: relative;
        background-color: #ddd;
        margin-top: 10px;
        text-align: left;
        height: 30px;

        .alltotalprice {
          position: relative;
          display: inline-block;
          padding: 0 30px;
          height: 30px;
          line-height: 30px;

          &-label {
            position: relative;
            display: inline-block;
            color: #fff;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
          }

          &-price {
            position: relative;
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

          &-price {
            position: relative;
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
            position: relative;
            margin: 0 auto;
            width: 270px;
            height: 270px;

            img {
              position: relative;
              width: 270px;
              height: 270px;
            }
          }
        }
      }
    }
  }
}
// ::v-deep .table-wrapper .ant-table-body.no-data {
//   height: 0 !important;
// }

// ::v-deep .ant-table-body {
//   height: 500px;
// }

::v-deep .ant-table-placeholder {
  height: 338px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
