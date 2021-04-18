<template>
  <div class="merchantinfo-wrapper">
    <div class="myCommodity">
      <!-- <div class="myCommodity-title">
        <h2 class="myCommodity-title-h">我的商品</h2>
      </div> -->
      <div class="mycommodity-content">
        <w-card @cardClick="cardClick" cardWidth="600" cardHeight="600">
          <template v-slot:cardItemIntroduction="cardItemIntroduction">
            <div class="card-item-info" @click.stop="">
              <div class="card-item-info-title">
                <label for="">标题:</label>
                <input
                  v-if="isEdit"
                  type="text"
                  placeholder="请输入标题"
                  v-model="cardItemIntroduction.info.operationTitle"
                />
                <span v-else>{{ cardItemIntroduction.info.operationTitle }}</span>
              </div>
            </div>
          </template>
        </w-card>
      </div>
    </div>
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
      isEdit: true,
    };
  },
  methods: {
    cardClick(operation) {
      const { commodityId } = operation;
      this.$router.push({ name: 'DetailPage', query: { commodityId } });
    },
  },
};
</script>

<style lang="scss" scoped>
.merchantinfo-wrapper {
  width: 100%;

  .mycommodity {
    &-title {
      &-h {
        color: #fff;
      }
    }
    &-content {
      width: 100%;

      .card-item-info {
        text-align: left;
        width: 500px;
        height: 40px;
        background-color: blue;
      }
    }
  }
}
</style>
