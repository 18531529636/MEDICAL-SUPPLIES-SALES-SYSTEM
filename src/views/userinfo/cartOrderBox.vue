<template>
  <div class="cart-order">
    <w-card :cateGoryList="cardOperations" :infoList="cardOperationList">
      <template v-slot:cardContent="cardContent">
        <div class="table-wrapper">
          <div
            class="search-status"
            v-if="cardContent.cateGoryKey === 'returnOrder'"
          >
            <span>订单状态：</span>
            <a-select
              v-model="currentReturnStatus"
              style="width: 160px"
              @change="handleStatusChange"
            >
              <a-select-option
                v-for="returnStatu in returnStatus"
                :key="returnStatu.value"
              >
                {{ returnStatu.label }}
              </a-select-option>
            </a-select>
          </div>
          <a-table
            :columns="columns"
            :data-source="cardOperationList[cardContent.cateGoryKey]"
            :pagination="false"
            :scroll="{ y: 550 }"
          >
            <span slot="orderStatus" slot-scope="orderStatus, record">
              <a-tag :color="tagColor(orderStatus)">
                {{ tagName(orderStatus) }}
                <a-icon
                  v-if="![0].includes(orderStatus)"
                  :type="iconFront(orderStatus)"
                ></a-icon>
              </a-tag>
              <a-button
                v-if="orderStatus === 2"
                type="link"
                shape="circle"
                size="small"
                icon="check"
                @click="requestReturn(record)"
                >申请退货</a-button
              >
              <a-button
                type="primary"
                size="small"
                v-if="
                  orderStatus === 5 &&
                  courierNumberOrderNumber !== record.orderNumber
                "
                @click="inputCourierNumber(record.orderNumber)"
                >输入订单编号</a-button
              >
              <div
                class="input-courier-number"
                v-if="
                  orderStatus === 5 &&
                  courierNumberOrderNumber === record.orderNumber
                "
              >
                <a-input
                  class="order-input"
                  v-model="courierNumber"
                  v-filter-space="courierNumber"
                ></a-input>
                <a-button
                  type="link"
                  shape="circle"
                  size="small"
                  icon="check"
                  @click="sendCourierNumber(record)"
                ></a-button>
                <a-button
                  type="link"
                  shape="circle"
                  size="small"
                  icon="close"
                  @click="closeCourierNumber"
                ></a-button>
              </div>
            </span>
          </a-table>
        </div>
      </template>
    </w-card>
  </div>
</template>

<script>
import buyerApi from '@/api/buyer';
import WCard from '@/components/CommodityCard';

const status = {
  0: { tagName: '未发货', tagColor: 'geekblue' },
  1: { tagName: '已发货', tagColor: 'green', icon: 'reload' },
  2: { tagName: '已签收', tagColor: 'cyan', icon: 'check' },
  3: { tagName: '退货申请中', icon: 'dash', tagColor: 'pink' },
  4: { tagName: '不同意退货', icon: 'close', tagColor: 'red' },
  5: { tagName: '同意退货', icon: 'check', tagColor: 'cyan' },
  6: { tagName: '商品退回中', icon: 'reload', tagColor: 'purple' },
  7: { tagName: '商品退回成功', icon: 'smile', tagColor: 'green' },
};
export default {
  name: 'CartOrder',
  components: {
    WCard,
  },
  data() {
    return {
      courierNumberOrderNumber: '',
      courierNumber: '',
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderNumber',
          key: 'orderNumber',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'orderNumber' },
        },
        {
          title: '商品编号',
          dataIndex: 'commodityNumber',
          key: 'commodityNumber',
          slots: { title: 'customTitle' },
        },
        {
          title: '商品名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'commodityName' },
        },
        {
          title: '商品实际单价',
          dataIndex: 'actualValue',
          key: 'actualValue',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'actualValue' },
        },
        {
          title: '商品数量',
          dataIndex: 'commodityCount',
          key: 'commodityCount',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'commodityCount' },
        },
        {
          title: '实际付款(元)',
          dataIndex: 'actualPayment',
          key: 'actualPayment',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'actualPayment' },
        },
        {
          title: '卖家id',
          dataIndex: 'buyerId',
          key: 'buyerId',
          slots: { title: 'customTitle' },
        },
        {
          title: '卖家名称',
          dataIndex: 'buyerName',
          key: 'buyerName',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'buyerName' },
        },
        {
          align: 'left',
          title: '订单状态',
          dataIndex: 'orderStatus',
          key: 'orderStatus',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'orderStatus' },
          width: 300,
        },
      ],
      cardOperations: [
        { title: '未发货订单', key: 'unshippedOrder' },
        { title: '退货订单', key: 'returnOrder' },
        { title: '已发货订单', key: 'shippedOrder' },
      ],
      orderList: [],
      returnStatus: [
        { value: -1, label: '全部退货状态' },
        { value: 3, label: status[3].tagName },
        { value: 4, label: status[4].tagName },
        { value: 5, label: status[5].tagName },
        { value: 6, label: status[6].tagName },
        { value: 7, label: status[7].tagName },
      ],
      currentReturnStatus: -1,
    };
  },
  computed: {
    cardOperationList: {
      get() {
        const orderListData = Array.from(this.orderList);
        const unshippedOrder = orderListData.filter((ele) => ele.orderStatus === 0);
        const shippedOrder = orderListData.filter((ele) => [1, 2].includes(ele.orderStatus));
        const returnOrder = this.currentReturnStatus === -1
          ? orderListData.filter((ele) => [3, 4, 5, 6, 7].includes(ele.orderStatus))
          : orderListData.filter((ele) => this.currentReturnStatus === ele.orderStatus);

        unshippedOrder.sort((a, b) => a.orderNumber - b.orderNumber);
        shippedOrder.sort((a, b) => b.orderStatus - a.orderStatus);
        returnOrder.sort((a, b) => b.setTime - a.setTime);
        return {
          unshippedOrder, shippedOrder, returnOrder,
        };
      },
    },
    buyerId() {
      return this.$store.state.buyerLogin.userId;
    },
  },
  methods: {
    tagColor(params) {
      return status[params].tagColor;
    },
    tagName(params) {
      return status[params].tagName;
    },
    iconFront(params) {
      return status[params].icon;
    },
    inputCourierNumber(orderNumber) {
      this.courierNumberOrderNumber = orderNumber;
    },
    handleStatusChange(value) {
      this.currentReturnStatus = value;
    },
    closeCourierNumber() {
      this.courierNumber = '';
      this.courierNumberOrderNumber = '';
    },
    changeOrderListItem(orderNumber, key, value) {
      const orderList = Array.from(this.orderList);
      orderList.some((item, i) => {
        if (item.orderNumber === orderNumber) {
          this.orderList[i][key] = value;
          return true;
        }
        return false;
      });
    },
    sendCourierNumber(record) {
      buyerApi
        .setCourierNumber({
          buyerId: this.buyerId,
          courierNumber: this.courierNumber,
          orderNumber: record.orderNumber,
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.$message.success(response.data.msg);
            this.changeOrderListItem(record.orderNumber, 'orderStatus', 1);
            return;
          }
          this.$message.error(response.data.msg);
        }).catch((err) => {
          console.log(err);
        });
      this.closeCourierNumber();
    },
    requestOrderList() {
      buyerApi.getOrder({ buyerId: this.buyerId }).then((response) => {
        if (response.data.code === -1) {
          return;
        }
        const arr = response.data.content;
        const data = arr.map((item) => ({
          ...item,
          key: item.orderNumber,
        }));
        this.orderList = data;
      });
    },
  },
  created() {
    this.requestOrderList();
  },
};
</script>

<style lang="scss" scoped>
.cart-order {
  width: 100%;
  .table-wrapper {
    width: 100%;
    text-align: left;
    .search-status {
      display: inline-block;
      height: 60px;
      line-height: 40px;
      margin-left: 20px;
    }
  }
  .order-input {
    display: inline-block;
    width: 150px;
    height: 24px;
  }
  .input-courier-number {
    display: inline-block;
  }
}
</style>
