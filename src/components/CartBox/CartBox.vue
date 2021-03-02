<template>
  <!-- 实时与vuex交互组件，读取购物车数量等 -->
  <div class="cartbox">
    <div class="cartbox-title">
      <span>购物车</span>
    </div>
    <div class="cartbox-content">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
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
      default: () => [
        {
          oparationId: 1,
          name: '手术刀',
          unitPirce: 12,
          count: 6,
        },
        {
          oparationId: 2,
          name: '手术刀1',
          unitPirce: 6,
          count: 4,
        },
        {
          oparationId: 3,
          name: '手术刀2',
          unitPirce: 19,
          count: 2,
        },
      ],
    },
  },
  data() {
    return {
      selectedRows: [],
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
    // const data = [];
    // this.dataSource.forEach((item) => {
    //   const obj = {
    //     ...item,
    //     totalPrice: item.count * item.memberValue,
    //   };
    //   data.push(obj);
    // });
    // this.dataSource = data;
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
  position: absolute;
  z-index: 9;
  top: 200px;
  // right: 0;
  right: $hideWidth;
  width: $boxWidth;
  // height: 300px;
  height: $boxHeight;
  background-color: rgb(59, 165, 156, 0.8);
  text-align: left;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &-title {
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
