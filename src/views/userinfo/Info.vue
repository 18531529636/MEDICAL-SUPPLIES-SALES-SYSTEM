<template>
  <div class="user-info">
    <a-descriptions title="买家信息" bordered>
      <a-descriptions-item label="买家名称">
        <span v-if="!editInfo">
          {{ infoData.buyerName }}
        </span>
        <a-input v-model="infoData.buyerName" v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家ID">
        <span v-if="!editInfo">
          {{ infoData.buyerId }}
        </span>
        <a-input v-model="infoData.buyerId" v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="账号">
        <span v-if="!editInfo">
          {{ infoData.buyerNumber }}
        </span>
        <a-input v-model="infoData.buyerNumber" v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="买家邀请码">
        <span v-if="!editInfo">
          {{ infoData.invitationCode }}
        </span>
        <a-input v-model="infoData.invitationCode" v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item :span="5" label="买家已成交订单总数量">
        <span v-if="!editInfo">
          {{ infoData.successAllOrderCount }}
        </span>
        <a-input v-model="infoData.successAllOrderCount" v-else></a-input>
      </a-descriptions-item>
      <a-descriptions-item :span="8" label="收货地址">
        <a-radio-group v-model="addressKey" @change="changeDefaultAddress">
          <a-card
            title=""
            :hoverable="true"
            :bordered="defaultAddressKey === buyerAddress.addressNumber"
            v-for="buyerAddress in buyerAddressList"
            :key="buyerAddress.key"
          >
            <p>
              {{ buyerAddress.province }}
              {{ buyerAddress.city }}
              {{ buyerAddress.country }}
              {{ buyerAddress.town }}
              {{ buyerAddress.detailedAddress }}
              ({{ buyerAddress.receivePeople }} 收)
              {{ buyerAddress.receivePhone }}
            </p>
            <span @click="deleteAddress(buyerAddress.addressNumber)">
              <a-icon type="delete" theme="outlined" />删除
            </span>
            <a-radio-button :value="buyerAddress.addressNumber"
              >默认地址</a-radio-button
            >
          </a-card>
        </a-radio-group>
        <div style="textalign: right">
          <a-popconfirm
            ok-text="创建"
            cancel-text="取消"
            @confirm="confirmCreateAddress"
            @cancel="cancelCreateAddress"
          >
            <template slot="title">
              <div class="edit-address">
                <a-cascader
                  v-model="selectAddressValue"
                  :options="statisticAddressList"
                  :show-search="{ filter }"
                  placeholder="请选择地址"
                  class="user-address"
                  expand-trigger="hover"
                  @change="selectAddress"
                />
                <a-input
                  class="edit-input"
                  placeholder="请输入具体地址"
                  v-model="createAddressObj.detailedAddress"
                ></a-input>
                <a-input
                  class="edit-input"
                  placeholder="请输入收货人"
                  v-model="createAddressObj.receivePeople"
                ></a-input>
                <a-input
                  class="edit-input"
                  placeholder="请输入收货人电话"
                  v-model="createAddressObj.receivePhone"
                ></a-input>
              </div>
            </template>
            <a-icon slot="icon" type="edit" style="color: green" />
            <a-button type="link" size="large">新增地址</a-button>
          </a-popconfirm>
        </div>
      </a-descriptions-item>
      <a-descriptions-item :span="5" label="修改信息">
        <a-button type="link" @click="changePassword">修改密码</a-button>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import statisticData from '@/Data';
import buyerApi from '@/api/buyer';

export default {
  data() {
    this.statisticAddressList = statisticData.statisticAddressList;
    return {
      selectAddressValue: [],
      addressKey: '',
      defaultAddressKey: '',
      defaultEditAddress: [],
      infoData: {},
      createAddressObj: {},
      editInfo: false,
      buyerAddressList: [],
      changePasswod: {
        oldPasswod: '',
        newPasswod: '',
      },
    };
  },
  created() {
    this.getAddress();
    this.infoData = {
      buyerName: 'test-wu',
      buyerId: '666666',
      buyerNumber: '1370099717',
      invitationCode: '102988',
      cartCount: 666,
      successAllOrderCount: 6666,
      successCurMonthOrderCount: 666,
    };
  },
  methods: {
    getAddress() {
      buyerApi.getAddress({ loginNumber: this.$store.state.buyerLogin.loginNumber })
        .then((response) => {
          if (response.data.code === 0) {
            this.buyerAddressList = response.data.content;
            const data = Array.from(this.buyerAddressList);
            data.some((item) => {
              if (item.defaultChoose) {
                this.defaultAddressKey = item.addressNumber;
                this.addressKey = item.addressNumber;
                return true;
              }
              return false;
            });
          }
        });
    },
    changePassword() {

    },
    selectAddress(selects) {
      this.$set(this.createAddressObj, 'province', selects[0]);
      this.$set(this.createAddressObj, 'city', selects[1]);
      this.$set(this.createAddressObj, 'country', selects[2]);
      this.$set(this.createAddressObj, 'town', selects[3]);
      console.log(this.createAddressObj);
    },
    changeDefaultAddress() {
      buyerApi.setDefaultAddress({
        loginNumber: this.$store.state.buyerLogin.loginNumber,
        addressNumber: this.addressKey,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 0) {
            this.$message.success('修改默认地址成功');
            this.getAddress();
            return;
          }
          this.$message.error('修改默认地址失败');
        });
    },
    filter(inputValue, path) {
      return path.some(
        (option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      );
    },
    deleteAddress(addressNumber) {
      buyerApi.deleteAddress(
        { loginNumber: this.$store.state.buyerLogin.loginNumber, addressNumber },
      )
        .then((response) => {
          if (response.data.code === 0) {
            this.$message.success('删除成功');
            this.getAddress();
            return;
          }
          this.$message.success('删除失败');
        });
    },
    cancelCreateAddress() {
      this.createAddressObj = '';
    },
    confirmCreateAddress() {
      console.log(this.createAddressObj);
      const hasEmpty = Object.keys(this.createAddressObj).some((key) => {
        if (!this.createAddressObj[key]) return true;
        return false;
      });
      if (hasEmpty) {
        this.$message.error('填入数据不能为空');
        this.$set(this, 'createAddressObj', {});
        this.selectAddressValue = [];
        return;
      }
      const requestObj = {
        loginNumber: this.$store.state.buyerLogin.loginNumber,
        province: this.createAddressObj.province,
        city: this.createAddressObj.city,
        country: this.createAddressObj.country,
        town: this.createAddressObj.town,
        detailedAddress: this.createAddressObj.detailedAddress,
        receivePeople: this.createAddressObj.receivePeople,
        receivePhone: this.createAddressObj.receivePhone,
      };

      buyerApi.setAddress(requestObj).then((response) => {
        this.getAddress();
        this.$set(this, 'createAddressObj', {});
        this.selectAddressValue = [];
        console.log(response.data);
      });
    },
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
  .ant-input {
    height: 21px;
  }
}
.edit-address {
  margin-bottom: 10px;
  text-align: right;
}
.edit-input {
  margin-bottom: 10px;
}
.user-address {
  position: relative;
  // margin: 20px 20px 0 0;
  width: 100%;
  height: 40px;
  // left: 10%;
  text-align: left;
}
::v-deep .ant-card {
  display: inline-block;
  margin: 10px;
  border: 4px solid rgba(255, 255, 255, 1);
}
::v-deep .ant-card-bordered {
  border: 4px ridge #caf0e7;
}
</style>
