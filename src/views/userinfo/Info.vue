<template>
  <div class="user-info">
    <a-descriptions title="买家信息" bordered>
      <a-descriptions-item label="买家名称">
        <span v-if="!editInfo">
          {{ infoData.merchantName }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家ID">
        <span v-if="!editInfo">
          {{ infoData.merchantId }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="账号">
        <span v-if="!editInfo">
          {{ infoData.merchantNumber }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家邀请码">
        <span v-if="!editInfo">
          {{ infoData.invitationCode }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家商品数量">
        <span v-if="!editInfo">
          {{ infoData.commodiityCount }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家已成交订单总数量">
        <span v-if="!editInfo">
          {{ infoData.successAllOrderCount }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家当月成交订单数量" :span="5">
        <span v-if="!editInfo">
          {{ infoData.successCurMonthOrderCount }}
        </span>
        <a-input v-else></a-input>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData: {},
      editData: {},
      editInfo: false,
    };
  },
  created() {
    // alert('商家信息接口');
    this.infoData = {
      merchantName: 'test-wu',
      merchantId: '666666',
      merchantNumber: '1370099717',
      invitationCode: '102988',
      commodiityCount: 666,
      successAllOrderCount: 6666,
      successCurMonthOrderCount: 666,
    };
    this.editData = this.infoData;
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: left;
  padding: 20px;
  .ant-input{
    height: 21px;
  }
}
</style>
