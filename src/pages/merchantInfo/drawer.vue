<template>
  <div>
    <a-drawer
      title="上架商品"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="商品名称">
              <a-input
                v-model="createInfo.commodityName"
                placeholder="请输入商品名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="商品会员价">
              <a-input
                v-model="createInfo.memberValue"
                style="width: 100%"
                placeholder="请输入商品会员价"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="商品原价">
              <a-input
                v-model="createInfo.marketValue"
                placeholder="请输入商品原价"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="商品库存">
              <a-input
                v-model="createInfo.commodityCurrentCount"
                placeholder="请输入商品库存"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="商品类别">
              <a-select
                v-model="createInfo.classificationNumber"
                placeholder="请输入商品类别"
              >
                <a-select-option
                  v-for="classification in classificationList"
                  :key="classification.value"
                  :value="classification.value"
                >
                  {{ classification.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="DateTime">
              <a-date-picker
                style="width: 100%"
                :get-popup-container="trigger => trigger.parentNode"
              />
            </a-form-item>
          </a-col> -->
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="商品简介">
              <a-textarea
                :rows="4"
                v-model="createInfo.introduction"
                placeholder="请输入商品简介"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="onClose"> Submit </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import sallerApi from '@/api/saller';
import classificationList from './classification';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.classificationList = classificationList;
    return {
      createInfo: {
        commodityName: '',
        memberValue: '',
        marketValue: '',
        commodityCurrentCount: '',
        classificationNumber: '',
        introduction: '',
      },
      form: this.$form.createForm(this),
    };
  },
  methods: {
    onClose(event) {
      const buttonType = event.target.children[0].textContent;
      if (buttonType === 'Submit') {
        console.log(this.createInfo);
        const hasEmpty = Object.keys(this.createInfo).some((key) => {
          if (!this.createInfo[key]) {
            return true;
          }
          return false;
        });
        if (hasEmpty) {
          this.$message.warning('信息不能为空');
          return;
        }
        sallerApi
          .createMyCommodity({
            createInfo: this.createInfo,
            userId: this.$store.state.sallerLogin.userId,
          })
          .then((response) => {
            if (response.data.code === 0) {
              this.$emit('close', true);
              this.$message.success('上架成功');
              return;
            }
            this.$message.error('上架失败');
          });
        console.log(this.createInfo);
      } else {
        this.$emit('close');
      }
    },
  },
};
</script>

<style>
</style>
