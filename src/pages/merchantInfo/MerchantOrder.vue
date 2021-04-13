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
            <span slot="orderStatus" slot-scope="orderStatus">
              <a-tag
                :color="
                  orderStatus === '0'
                    ? 'geekblue'
                    : orderStatus === '1'
                    ? 'green'
                    : 'volcano'
                "
              >
                {{ tagName(orderStatus) }}
              </a-tag>
              <a-button
                v-if="orderStatus === '2'"
                type="primary"
                shape="circle"
                size="small"
                icon="check"
                @click="approvalAgree(true)"
              ></a-button>
              <a-button
                v-if="orderStatus === '2'"
                type="danger"
                shape="circle"
                size="small"
                icon="close"
                @click="approvalAgree(false)"
              ></a-button>
            </span>
          </a-table>
        </div>
      </template>
    </w-card>
  </div>
</template>

<script>
import WCard from '@/components/CommodityCard';

export default {
  components: {
    WCard,
  },
  data() {
    return {
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
          align: 'center',
          title: '订单状态',
          dataIndex: 'orderStatus',
          key: 'orderStatus',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'orderStatus' },
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
            key: 8,
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
    tagName(params) {
      const status = {
        0: '未发货',
        1: '已发货',
        2: '退货申请中',
        3: '不同意退货',
        4: '同意退货',
        5: '商品退回中',
        6: '商品退回成功',
      };
      return status[params];
    },
    approvalAgree(agree) {
      if (agree) {
        // eslint-disable-next-line no-alert
        alert('同意退货');
        return;
      }
      // eslint-disable-next-line no-alert
      alert('不同意退货 ');
    },
  },
  created() {
    const unshippedOrderList = [

    ];
    for (let i = 0; i < 100; i += 1) {
      const count = Math.floor(Math.random() * 100);
      unshippedOrderList.push({
        key: i,
        orderNumber: i,
        orderStatus: '0',
        actualPayment: count * 122,
        commodityId: 1,
        buyerId: Math.floor(Math.random() * 100000),
        buyerName: 'test',
        commodityCount: count,
        name: '手术刀',
        operationTitle: '削铁如泥的手术刀手术刀手术刀',
        imgSrc: './statistic/首页-医疗器械1.jpg',
        actualValue: 123,
        marketValue: 123,
        memberValue: 122,
        operationId: 0,
      });
    }
    this.$set(this.cardOperationList, 'unshippedOrder', unshippedOrderList);

    const returnOrderList = [];
    for (let i = 0; i < 100; i += 1) {
      const count = Math.floor(Math.random() * 100);
      returnOrderList.push({
        key: i,
        orderNumber: i,
        orderStatus: Math.floor(Math.random() * 5 + 2),
        actualPayment: count * 122,
        commodityId: 1,
        buyerId: Math.floor(Math.random() * 100000),
        buyerName: 'test',
        commodityCount: count,
        name: '手术刀',
        operationTitle: '削铁如泥的手术刀手术刀手术刀',
        imgSrc: './statistic/首页-医疗器械1.jpg',
        actualValue: 123,
        marketValue: 123,
        memberValue: 122,
        operationId: 0,
      });
    }
    this.$set(this.cardOperationList, 'returnOrder', returnOrderList);
    // this.cardOperationList.unshippedOrder.push()
  },
};
</script>

<style lang="scss" scoped>
.merchant-order {
  width: 100%;
  min-height: 100%;
  background-color: rgb(3, 73, 73);
  .table-wrapper {
    width: 100%;
  }
}
</style>
