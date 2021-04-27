<template>
  <!-- 实时与vuex交互组件，读取购物车数量等 -->
  <div
    class="cartbox"
    @mouseenter="tableShow = true"
    @mouseleave="tableShow = false"
  >
    <div class="allCount">
      <span>{{ allCount }}</span>
    </div>
    <div class="cartbox-title">
      <span>购物车</span>
    </div>
    <div class="cartbox-content" v-show="tableShow">
      <div v-if="!logined" class="no-data">
        <span class="no-data-title">请先登录</span>
      </div>
      <a-table
        v-else
        :rowKey="(record) => record.commodityId"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :scroll="{ y: 150 }"
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
    </div>
  </div>
</template>

<script>

export default {
  props: {
    cartList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableShow: false,
      selectedRows: [],
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
      allCount: 0,
    };
  },
  computed: {
    dataSource: {
      get() {
        return this.$store.state.commodityList;
      },
      set(val) {
        console.log(val);
      },
    },
    logined() {
      return this.$checkBuyerLoginStatus();
    },
  },
  watch: {
    dataSource: {
      handler(val) {
        let count = 0;
        val.forEach((item) => {
          count += item.commodityCount;
        });
        this.allCount = count;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    deleteOperation(record) {
      this.$store.dispatch('DELETE_CARTITEM', { commodity: record, deleteCount: -1 });
    },
  },
  created() {
    this.$store.dispatch('REQUEST_CART');
  },
};
</script>

<style lang="scss" scoped>
$boxHeight: 50px;
$titleWidth: 80px;
$boxWidth: 700px;
$hideWidth: -620px;

li {
  list-style: none;
}

.cartbox {
  position: fixed;
  z-index: 9;
  top: 200px;
  right: $hideWidth;
  width: $boxWidth;
  height: $boxHeight;
  background-color: rgb(59, 165, 156, 0.8);
  text-align: left;
  border-radius: 10px 0 0 10px;
  transition: all 0.3s ease-in-out;

  .allCount {
    display: inline-block;
    position: absolute;
    border-radius: 15px;
    top: -20px;
    left: 10px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgb(255, 51, 0);
    color: #fff;
    font-size: 18px;
  }

  &-title {
    border-radius: 10px 0 0 10px;
    color: #000;
    font-weight: bolder;
    font-size: 14px;
    width: $titleWidth;
    height: $boxHeight;
    line-height: $boxHeight;
    text-align: center;
    background-color: rgb(26, 223, 196);
  }

  &-content {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 255, 255, 0.7);
    text-align: left;

    &-title {
      width: 90%;
      height: 30px;
      margin: 0 auto;
      border-bottom: 1px solid #999;

      &-item {
        padding: 5px;
        display: inline-block;
        width: 20%;
        text-align: center;
      }
    }
    .no-data {
      width: 100%;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      &-title {
        color: #aaa;
        font-size: 20px;
      }
    }

    &-wrapper {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      // overflow-y: scroll;

      .cartbox-content-item {
        width: 100%;
        padding: 0;
        border-bottom: 1px solid #999;

        &-item {
          text-align: center;
          display: inline-block;
          padding: 5px;
          width: 20%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          a {
            font-size: 14px;
            color: chocolate;

            &:hover {
              color: cornflowerblue;
            }
          }
        }
      }
    }
  }

  &:hover {
    right: 0;
    height: 300px;

    .cartbox-title {
      border-radius: 10px 10px 0 0;
    }
  }
}
</style>
