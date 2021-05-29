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
            <span slot="commodityStatus" slot-scope="commodityStatus, record">
              <a-tag :color="tagColor(commodityStatus)">
                {{ tagName(commodityStatus) }}
                <a-icon
                  v-if="![0].includes(commodityStatus)"
                  :type="iconFront(commodityStatus)"
                ></a-icon>
              </a-tag>
              <a-button
                v-if="commodityStatus === 2"
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
                  commodityStatus === 5 &&
                  courierNumberOrderNumber !== record.orderNumber
                "
                @click="inputCourierNumber(record.orderNumber)"
                >输入订单编号</a-button
              >
              <div
                class="input-courier-number"
                v-if="
                  commodityStatus === 5 &&
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
              <a-button
                v-if="commodityStatus === 1"
                type="link"
                @click="confirmReceive(record)"
              >
                确认收货
              </a-button>
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
    this.columns = [
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
        title: '商品实际单价',
        dataIndex: 'memberValue',
        key: 'memberValue',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'memberValue' },
      },
      {
        title: '商品数量',
        dataIndex: 'commodityCount',
        key: 'commodityCount',
        slots: { title: 'commodityCount' },
        scopedSlots: { customRender: 'commodityCount' },
      },
      {
        title: '实际付款(元)',
        dataIndex: 'commodityTotalValue',
        key: 'commodityTotalValue',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'commodityTotalValue' },
      },
      {
        align: 'left',
        title: '发货快递单号',
        dataIndex: 'goCourierNumber',
        key: 'goCourierNumber',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'goCourierNumber' },
      },
      {
        align: 'left',
        title: '退货快递单号',
        dataIndex: 'backCourierNumber',
        key: 'backCourierNumber',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'backCourierNumber' },
      },
      {
        align: 'left',
        title: '商品状态',
        dataIndex: 'commodityStatus',
        key: 'commodityStatus',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'commodityStatus' },
        width: 300,
      },
    ];
    return {
      courierNumberOrderNumber: '',
      courierNumber: '',
      cardOperations: [
        { label: '未发货订单', key: 'unshippedOrder' },
        { label: '已发货订单', key: 'shippedOrder' },
        { label: '退货订单', key: 'returnOrder' },
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
        const unshippedOrder = orderListData.filter((ele) => ele.commodityStatus === 0);
        const shippedOrder = orderListData.filter((ele) => [1, 2]
          .includes(ele.commodityStatus));
        const returnOrder = this.currentReturnStatus === -1
          ? orderListData.filter((ele) => [3, 4, 5, 6, 7].includes(ele.commodityStatus))
          : orderListData.filter((ele) => this.currentReturnStatus === (ele.commodityStatus));

        unshippedOrder.sort((a, b) => a.updateTime - b.updateTime);
        shippedOrder.sort((a, b) => b.updateTime - a.updateTime);
        returnOrder.sort((a, b) => b.updateTime - a.updateTime);
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
    confirmReceive(record) {
      buyerApi.confirmReceive({ orderNumber: record.orderNumber }).then((response) => {
        if (response.data.code === 0) {
          this.$message.success('确认收货成功');
          this.requestOrderList();
          return;
        }
        this.$message.error('确认收货失败');
      });
    },
    requestReturn(record) {
      buyerApi.requestReturn({ orderNumber: record.orderNumber }).then((response) => {
        this.requestOrderList();
        console.log(response.data);
      });
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
        .setBackCourierNumber({
          buyerId: this.buyerId,
          courierNumber: this.courierNumber,
          orderNumber: record.orderNumber,
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.$message.success(response.data.msg);
            this.requestOrderList();
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
          children: item.commodityList,
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
