<template>
  <div class="card-wrapper">
    <div class="card" v-for="cateGory in cateGoryList" :key="cateGory.key">
      <div class="card-title" :id="cateGory.key">
        <span class="card-title-title">{{ cateGory.label }}</span>
      </div>

      <slot :cateGoryKey="cateGory.key" name="cardContent">
        <div
          class="card-item"
          :style="{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          }"
          v-for="info in infoList[cateGory.key]"
          :key="info.commodityNumber"
          @click.stop="cardClick(info)"
        >
          <div
            class="card-item-imgbox"
            :style="{
              width: `${(cardWidth / 10) * 9}px`,
              height: `${cardHeight / 2}px`,
            }"
          >
            <img
              :style="imgSize"
              class="card-item-imgbox-img"
              alt=""
              src="/statistic/首页-医疗器械1.jpg"
            />
            <!-- :src="operation.imgSrc"  -->
          </div>
          <slot
            :info="info"
            :cateGoryKey="cateGory.key"
            name="cardItemIntroduction"
          >
            <div
              class="card-item-introduction"
              :style="{ width: `${(cardWidth / 10) * 9}px` }"
            >
              <div>
                <h4 class="card-item-introduction-title">
                  {{ info.commodityName }}
                </h4>
              </div>
              <div>
                <span class="card-item-introduction-mmarketvalue"
                  >市场价：{{ info.marketValue }}</span
                >
              </div>
              <div class="">
                <span class="card-item-introduction-membervalue"
                  >会员指导价：{{ info.memberValue }}</span
                >
              </div>
              <div>
                <button
                  class="card-item-introduction-add"
                  @click.stop="buttonClick(info)"
                >
                  加入购物车
                </button>
              </div>
            </div>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardWidth: {
      type: String,
      default: '200',
    },
    cardHeight: {
      type: String,
      default: '310',
    },
    display: {
      type: String,
      default: 'flex',
    },
    cateGoryList: {
      type: Array,
      default: () => [],
    },
    infoList: {
      type: Object,
      default: () => ({
        operation: [
        ],
        testApparatus: [
        ],
      }),
    },

  },
  computed: {
    imgSize() {
      return ((this.cardWidth / 10) * 6) < (this.cardHeight / 2) ? `width :${(this.cardWidth / 10) * 9}px` : `height: ${this.cardHeight / 2}px`;
    },
  },
  methods: {
    cardClick(operation) {
      // 请求接口 接口返回 是否加入成功， 如果库存不够 则 返回不成功
      // this.$router.push({ name: 'DetailPage', query: { commodityId } });
      this.$emit('cardClick', operation);
    },
    buttonClick(operation) {
      // 跳转路由到 DetailPage
      // this.$store.commit('ADD_COMMODITY', { commodity: operation });
      this.$emit('buttonClick', operation);
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  margin: 0 auto;
  width: 100%;

  .card {
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #fff;

    &-title {
      display: block;
      width: 100%;
      height: 50px;
      text-align: left;
      background-color: #fff;
      padding: 0 10px;
      margin-bottom: 20px;

      &-title {
        height: 50px;
        line-height: 50px;
        display: inline-block;
        font-size: 20px;
        font-weight: bolder;
        border-bottom: 3px solid rgb(101, 190, 231);
      }
    }

    &-item {
      cursor: pointer;
      background-color: rgb(248, 248, 248);
      border: 1px solid #eee;
      border-radius: 10px;
      position: relative;
      padding: 10px;
      margin: 10px 10px;
      transition: box-shadow 0.3s ease-in-out;

      &-imgbox {
        position: relative;
        width: 160px;
        height: 180px;
        margin: 0 auto;

        &-img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &-introduction {
        margin: 0 auto;
        padding: 2px 0 0 0;
        width: 160px;
        overflow: hidden;

        &-title {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &-mmarketvalue {
          color: #d71617;
          text-decoration: line-through;
          display: block;
        }

        &-membervalue {
          color: #d71617;
          display: block;
        }

        &-add {
          margin-top: 8px;
          outline: none;
          border: none;
          background-color: #fff;

          &:hover {
            background-color: #bbb;
          }
        }
      }

      &:hover {
        box-shadow: 0 0 16px rgb(243, 167, 167);
      }
    }

    &::after {
      display: block;
      content: "";
      clear: both;
    }
  }
}

// .flex-father {
// }
</style>
