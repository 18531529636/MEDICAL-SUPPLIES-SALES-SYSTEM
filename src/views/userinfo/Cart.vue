<template>
  <div class="cart-wrapper">
    <div class="cart">
      <div class="cart-cart">
        <div class="cart-cart-title">
          <h3>购物车</h3>
        </div>
        <div class="cart-cart-table" :key="cartKey">
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

            <div slot="commodityCount" slot-scope="commodityCount, record">
              <a-button
                v-if="record.cartNumber !== setCountNumber"
                @click="showSerContentBox(record)"
              >
                X {{ commodityCount }}
              </a-button>
              <div v-if="record.cartNumber === setCountNumber">
                <a-button type="circle" @click="reduceCount">-</a-button>
                <a-input style="width: 40px" v-model="count"></a-input>
                <a-button type="circle" @click="count++">+</a-button>
                <a-button type="link" @click="confirmSetCount">确认</a-button>
                <a-button type="link" @click="cancelSetCount">取消</a-button>
              </div>
            </div>
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
import buyerApi from '@/api/buyer';
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
      cartKey: 0,
      // qrShow: false,
      selectedRows: [],
      payType: 'alipay',
      count: 0,
      setCountNumber: '',
      showSetCount: false,
      columns: [
        {
          title: '名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
        },
        {
          title: '买家id',
          dataIndex: 'sallerId',
          key: 'sallerId',
          slots: { title: 'customTitle' },
        },
        {
          title: '卖家名称',
          dataIndex: 'sallerName',
          key: 'sallerName',
        },
        {
          title: '卖家电话',
          dataIndex: 'sallerPhone',
          key: 'sallerPhone',
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
          width: 300,
          scopedSlots: { customRender: 'commodityCount' },
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
    refresh: {
      handler(newValue) {
        if (newValue) {
          // this.$store.commit('REFRESHED');
          // this.$router.go(0);
        }
      },
      deep: true,
    },
  },
  computed: {
    commodityList() {
      return this.$store.state.commodityList;
    },
    refresh() {
      return this.$store.state.refresh;
    },
    buyerId() {
      return this.$store.state.buyerLogin.userId;
    },
    dataSource: {
      get() {
        const data = [];
        if (!this.commodityList.length) return [];
        this.commodityList.forEach((item) => {
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
    reduceCount() {
      if (this.count === 1) {
        this.$message.warning('购物车商品数量不可为0，如需删除请点击删除按钮');
        return;
      }
      this.count -= 1;
    },
    cancelSetCount() {
      this.count = 0;
      this.setCountNumber = '';
    },
    confirmSetCount() {
      buyerApi.setCartCommodityCount({
        cartNumber: this.setCountNumber, commodityCount: this.count,
      })
        .then((reponse) => {
          if (reponse.data.code === 0) {
            this.$message.success('修改成功');
            this.$store.dispatch('REQUEST_CART');
            this.cartKey = Math.random();
            this.count = 0;
            this.setCountNumber = '';
            return;
          }
          this.$message.error('修改失败');
        });
    },
    showSerContentBox(record) {
      this.setCountNumber = record.cartNumber;
      this.count = record.commodityCount;
    },
    sendTemporaryOrder() {
      // 创建临时订单
      if (!this.selectedRows.length) {
        this.$message.warning('请选择想要结账的商品');
        return;
      }
      const selectRows = Array.from(this.selectedRows);
      // const cartList = selectRows.map((item) => ({
      //   commodityNumber: item.commodityNumber,
      //   cartNumber: item.cartNumber,
      //   commodityCount: item.commodityCount,
      // }));
      const cartNumberList = selectRows.map((item) => item.cartNumber);
      // buyerApi.checkCommodityCount({ cartList }).then((response) => {
      //   if (response.data.code === 0) {
      //     this.$message.error('商品数量查询成功 ');

      //     return;
      //   }
      //   this.$message.error('商品数量查询失败');
      // });
      const queryData = this.$utils.crypto.encrypte(cartNumberList);
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
    if (!this.dataSource.length) {
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
