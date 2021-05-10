<template>
  <div class="merchantcommodity-wrapper">
    <div class="mycommodity">
      <div class="add-commodity">
        <button class="addcommodity-button" @click="createCommodity">
          上架商品
        </button>
      </div>
      <div class="mycommodity-content">
        <w-card
          :cateGoryList="cateGoryList"
          :infoList="infoList"
          @cardClick="cardClick"
          cardWidth="300"
          cardHeight="500"
        >
          <template v-slot:cardItemIntroduction="cardItemIntroduction">
            <div class="card-item-info" @click.stop="">
              <div class="card-item-info-number">
                <span class="commodity-number">商品编号：</span>
                <span>{{ cardItemIntroduction.info.commodityNumber }}</span>
              </div>
              <div class="card-item-info-title">
                <span class="commodity-name">商品名称：</span>
                <input
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                  type="text"
                  placeholder="请输入标题"
                  v-model="editCommodity.commodityName"
                />
                <span v-else>{{
                  cardItemIntroduction.info.commodityName
                }}</span>
              </div>
              <div class="card-item-info-membervalue">
                <span class="commodity-membervalue">商品会员价（单价）：</span>
                <input
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                  type="text"
                  placeholder="请输入商品会员价（单价）"
                  v-model="editCommodity.memberValue"
                />
                <span v-else>{{ cardItemIntroduction.info.memberValue }}</span>
              </div>
              <div class="card-item-info-marketvalue">
                <span class="commodity-marketvalue">商品原价：</span>
                <input
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                  type="text"
                  placeholder="请输入商品原价"
                  v-model="editCommodity.marketValue"
                />
                <span v-else>{{ cardItemIntroduction.info.marketValue }}</span>
              </div>
              <div class="card-item-info-count">
                <span class="commodity-count">商品库存：</span>
                <input
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                  type="text"
                  placeholder="请输入商品当前库存"
                  v-model="editCommodity.commodityCurrentCount"
                />
                <span v-else>{{
                  cardItemIntroduction.info.commodityCurrentCount
                }}</span>
              </div>
              <div class="card-item-info-classification">
                <span class="commodity-count">商品类别：</span>
                <span>{{ cardItemIntroduction.info.classificationName }}</span>
              </div>
              <div class="card-item-info-introduction">
                <span class="commodity-introduction">商品简介：</span>
                <input
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                  type="text"
                  placeholder="请输入商品商品简介"
                  v-model="editCommodity.introduction"
                />
                <span v-else>{{ cardItemIntroduction.info.introduction }}</span>
              </div>
              <div class="handle">
                <button
                  class="delete-button"
                  @click="
                    deleteCommodity(cardItemIntroduction.info.commodityNumber)
                  "
                  v-if="
                    editCommodity.commodityNumber !==
                    cardItemIntroduction.info.commodityNumber
                  "
                >
                  删除
                </button>
                <button
                  class="update-button"
                  @click="updateCommodity(cardItemIntroduction.info)"
                  v-if="
                    editCommodity.commodityNumber !==
                    cardItemIntroduction.info.commodityNumber
                  "
                >
                  修改
                </button>
                <button
                  class="update-button"
                  @click="confirmUpdateCommodity"
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                >
                  确认
                </button>
                <button
                  class="update-button"
                  @click="concelUpdateCommodity"
                  v-if="
                    editCommodity.commodityNumber ===
                    cardItemIntroduction.info.commodityNumber
                  "
                >
                  取消
                </button>
              </div>
            </div>
          </template>
        </w-card>
      </div>
    </div>
    <drawer-box @close="drawerClose" :visible="drawerVisible"/>
  </div>
</template>

<script>
import WCard from '@/components/CommodityCard';
import sallerApi from '@/api/saller';
import DrawerBox from './drawer.vue';

export default {
  components: {
    WCard,
    DrawerBox,
  },
  computed: {
    userId() {
      return this.$store.state.sallerLogin.userId;
    },
  },
  data() {
    this.cateGoryList = [
      { label: '我的商品', key: 'mycommodity' },
    ];
    return {
      drawerVisible: false,
      editCommodity: '',
      infoList: {},
    };
  },

  created() {
    this.getCommodityList();
  },
  methods: {
    drawerClose(createSuccess = false) {
      if (createSuccess) {
        this.getCommodityList();
      }
      this.drawerVisible = false;
    },
    createCommodity() {
      this.drawerVisible = true;
    },
    deleteCommodity(commodityNumber) {
      sallerApi.deleteCommodity({ commodityNumber })
        .then((response) => {
          if (response.data.code === 0) {
            this.$message.success('删除成功');
            this.getCommodityList();
            return;
          }
          this.$message.success('删除失败');
          this.getCommodityList();
        });
    },
    updateCommodity(commodity) {
      this.editCommodity = commodity;
    },
    confirmUpdateCommodity() {
      sallerApi.updateCommodity({ updateCommodity: this.editCommodity })
        .then((response) => {
          console.log(response);
          this.editCommodity = '';
          this.getCommodityList();
        });
    },
    concelUpdateCommodity() {
      this.editCommodity = '';
    },
    cardClick(operation) {
      const { commodityId } = operation;
      this.$router.push({ name: 'DetailPage', query: { commodityId } });
    },
    getCommodityList() {
      sallerApi.getMyCommodity({ userId: this.userId })
        .then((response) => {
          this.infoList = {
            mycommodity: response.data.content,
          };
          console.log(response.data.content);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.merchantcommodity-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .mycommodity {
    .add-commodity {
      text-align: right;
      width: 100%;
      height: 80px;
      padding: 10px 20px;

      .addcommodity-button {
        border: none;
        width: 90px;
        height: 50px;
        background-color: rgb(167, 211, 211);
      }
      .addcommodity-button:active {
        background-color: rgb(90, 196, 196);
      }
    }
    &-title {
      &-h {
        color: #fff;
      }
    }
    &-content {
      width: 100%;

      .card-item-info {
        position: relative;
        text-align: left;
        width: 100%;
        // height: 40px;
        background-color: rgb(218, 218, 218);
        .handle {
          text-align: right;
          position: relative;

          .delete-button {
            margin: 0 5px;
            font-size: 18px;
            font-weight: 600;
            transform: translateX(-50%);
            border: none;
            width: 80px;
            height: 40px;
            background-color: rgb(176, 226, 226);
          }
          .delete-button:active {
            background-color: rgb(68, 202, 202);
          }
          .update-button {
            margin: 0 5px;
            font-size: 18px;
            font-weight: 600;
            transform: translateX(-50%);
            border: none;
            width: 80px;
            height: 40px;
            background-color: rgb(176, 226, 226);
          }
          .update-button:active {
            background-color: rgb(68, 202, 202);
          }
        }
      }
    }
  }
}
</style>
