<template>
  <div class="card-wrapper">
    <div class="card" v-for="cateGory in cateGoryList" :key="cateGory.key">
      <div class="card-title" :id="cateGory.title">
        <span class="card-title-title">{{ cateGory.title }}</span>
      </div>

      <div
        class="card-item"
        :style="{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
        }"
        v-for="info in infoList[cateGory.key]"
        :key="info.commodityId"
        @click.stop="buttonClick(info)"
      >
        <div
          class="card-item-imgbox"
          :style="{
            width: `${(cardWidth / 10) * 9}px`,
            height: `${cardHeight / 2}px`,
          }"
        >
          <img class="card-item-imgbox-img" alt="" />
          <!-- :src="operation.imgSrc"  -->
        </div>
        <slot name="introduction">
          <div class="card-item-introduction">
            <div>
              <h4 class="card-item-introduction-title">
                {{ info.operationTitle }}
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
                @click.stop="divClick(info)"
              >
                加入购物车
              </button>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardWidth: {
      type: Number,
      default: 200,
    },
    cardHeight: {
      type: Number,
      default: 310,
    },
    display: {
      type: String,
      default: 'flex',
    },
    cateGoryList: {
      type: Array,
      default: () => [
        {
          title: '手术用品',
          key: 'operation',
        },
        {
          title: '检测器械',
          key: 'testApparatus',
        },
      ],
    },
    infoList: {
      type: Object,
      default: () => ({
        operation: [
          {
            commodityId: 1,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 2,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 3,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 4,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
        ],
        testApparatus: [
          {
            cataGoryKey: '',
            commodityId: 1,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 2,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 3,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
          {
            commodityId: 4,
            name: '手术刀',
            operationTitle: '削铁如泥的手术刀手术刀手术刀',
            imgSrc: './statistic/首页-医疗器械1.jpg',
            marketValue: 123,
            memberValue: 122,
            operationId: 0,
          },
        ],
      }),
    },

  },
  methods: {
    divClick(operation) {
      // 请求接口 接口返回 是否加入成功， 如果库存不够 则 返回不成功
      // this.$store.commit('ADD_COMMODITY', { commodity: operation });
      this.$emit('divClick', operation);
    },
    buttonClick(operation) {
      // 跳转路由到 DetailPage
      // this.$router.push({ name: 'DetailPage', query: { commodityId } });
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
  width: 1411px;
  // height: 500px;
  padding-bottom: 50px;
  // overflow: scroll;

  .card {
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #fff;

    &-title {
      display: block;
      width: 100%;
      height: 50px;
      text-align: left;
      background-color: #eee;
      padding: 0 10px;
      margin-bottom: 20px;

      &-title {
        line-height: 50px;
        font-size: 20px;
        font-weight: bolder;
      }
    }

    &-item {
      cursor: pointer;
      background-color: rgb(248, 248, 248);
      position: relative;
      padding: 10px;
      margin: 10px 10px;
      // box-shadow: 0 0 10px #ccc;
      transition: box-shadow 0.3s ease-in-out;

      &-imgbox {
        position: relative;
        width: 160px;
        height: 180px;
        margin: 0 auto;
        // background-color: chartreuse;
        background-color: chartreuse;

        &-img {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 160px;
          background-color: chartreuse;
        }
      }

      &-introduction {
        margin: 0 auto;
        padding: 2px 0 0 0;
        width: 160px;
        overflow: hidden;
        // text-align: left;
        // display: flex;
        // flex-wrap: wrap;

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

.flex-father {
}
</style>
