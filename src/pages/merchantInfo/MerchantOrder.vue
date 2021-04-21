<template>
  <div class="merchant-order">
    <w-card
      cardWidth="400"
      cardHeight="800"
      :cateGoryList="cardOperations"
      :infoList="cardOperationList"
    >
      <template v-slot:cardContent="cardContent">
        <div class="table-wrapper">
          <a-table
            :columns="columns"
            :data-source="cardOperationList[cardContent.cateGoryKey]"
          >
            <span slot="orderStatus" slot-scope="orderStatus, record, index">
              <a-tag :color="tagColor(orderStatus)">
                {{ tagName(orderStatus) }}
                <a-icon
                  v-if="!['0'].includes(orderStatus)"
                  :type="iconFront(orderStatus)"
                ></a-icon>
              </a-tag>
              <a-button
                v-if="orderStatus === 3"
                type="link"
                shape="circle"
                size="small"
                icon="check"
                @click="
                  approvalAgree(true, index, cardContent.cateGoryKey, record)
                "
              ></a-button>
              <a-button
                v-if="orderStatus === 3"
                type="link"
                shape="circle"
                size="small"
                icon="close"
                @click="
                  approvalAgree(false, index, cardContent.cateGoryKey, record)
                "
              ></a-button>
              <a-button
                type="primary"
                size="small"
                v-if="
                  orderStatus === 0 &&
                  courierNumberOrderNumber !== record.orderNumber
                "
                @click="inputCourierNumber(record.orderNumber)"
                >输入订单编号</a-button
              >
              <div
                class="input-courier-number"
                v-if="
                  orderStatus === 0 &&
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
                  @click="sendCourierNumber"
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
import sallerApi from '@/api/saller';
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
          title: '商品id',
          dataIndex: 'commodityId',
          key: 'commodityId',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' },
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
          title: '买家id',
          dataIndex: 'buyerId',
          key: 'buyerId',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '买家名称',
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
      cardOperationList: {
        unshippedOrder: [],
        returnOrder: [],
        shippedOrder: [
          {
            key: 10,
            orderNumber: 8,
            commodityCount: 4,
            actualPayment: 223,
            orderStatus: '1',
            buyerId: 123231,
            buyerName: 'test',
            commodityId: 3,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            actualValue: 123,
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            key: 8,
            orderNumber: 8,
            commodityCount: 4,
            actualPayment: 223,
            orderStatus: '2',
            buyerId: 123231,
            buyerName: 'test',
            commodityId: 3,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            actualValue: 123,
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            key: 9,
            orderNumber: 9,
            commodityCount: 4,
            actualPayment: 223,
            commodityId: 4,
            buyerId: 123231,
            buyerName: 'test',
            orderStatus: '1',
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            actualValue: 123,
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
        ],
      },
    };
  },
  computed: {
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
    sendCourierNumber() {
      // eslint-disable-next-line no-alert
      alert('填写订单编号接口');
      this.courierNumber = '';
      this.courierNumberOrderNumber = '';
    },
    closeCourierNumber() {
      this.courierNumber = '';
      this.courierNumberOrderNumber = '';
    },
    approvalAgree(agree, index, cateGoryKey, record) {
      if (agree) {
        this.cardOperationList[cateGoryKey][index].orderStatus = 5;
        // eslint-disable-next-line no-alert
        alert('同意退货申请接口');
        this.$message.success(`已同意订单 ${record.orderNumber} 的退货申请`);
        return;
      }
      // eslint-disable-next-line no-alert
      alert('拒绝退货申请接口');
      this.cardOperationList[cateGoryKey][index].orderStatus = 4;
      this.$message.warn(`已拒绝订单 ${record.orderNumber} 的退货申请`);
    },
  },
  requestOrderList() {
    const unshippedOrderList = [];
    const returnOrderList = [];
    const shippedOrder = [];
    sallerApi.getOrder({ sallerId: '996c3ac4961fe0d86e2f' }).then((response) => {
      const data = response.data.content;
      data.forEach((item) => {
        const ele = item;
        ele.key = ele.orderNumber;
        if (ele.orderStatus === 0) {
          unshippedOrderList.push(ele);
        } else if ([1, 2].includes(ele.orderStatus)) {
          shippedOrder.push(ele);
        } else if ([3, 4, 5, 6, 7].includes(ele.orderStatus)) {
          returnOrderList.push(ele);
        }
      });

      this.cardOperationList.unshippedOrder = unshippedOrderList;
      this.cardOperationList.returnOrder = returnOrderList;
      this.cardOperationList.shippedOrder = shippedOrder;
      console.log(this.cardOperationList);
    });
  },
  created() {
    this.requestOrderList();
  },
};
</script>

<style lang="scss" scoped>
.merchant-order {
  width: 100%;
  height: 100%;
  .table-wrapper {
    width: 100%;
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
