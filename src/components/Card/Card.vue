<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="card-title" id="operation">
        <span class="card-title-title">手术用品</span>
      </div>

      <div class="card-item">
        <div class="card-item-imgbox">
          <img class="card-item-imgbox-img" src="./首页-医疗器械1.jpg" alt="" />
        </div>
        <div class="card-item-introduction">
          <h4 class="card-item-introduction-title">
            削铁如泥的手术刀手术刀手术刀
          </h4>
          <span class="card-item-introduction-mmarketvalue">市场价：123</span>
          <span class="card-item-introduction-membervalue"
            >会员指导价：122</span
          >
          <button class="card-item-introduction-add">加入购物车</button>
        </div>
      </div>
    </div>

    <div
      class="card"
      v-for="(operationList, operationListIndex) in operations"
      :key="operationListIndex"
    >
      <div class="card-title" id="operation">
        <span class="card-title-title">{{ operationList.title }}</span>
      </div>

      <div
        class="card-item"
        v-for="(operation, operationIndex) in operationList.operationList"
        :key="operationIndex"
      >
        <div class="card-item-imgbox">
          <img class="card-item-imgbox-img" :src="operation.imgSrc" alt="" />
        </div>
        <div class="card-item-introduction">
          <h4 class="card-item-introduction-title">
            {{ operation.operationTitle }}
          </h4>
          <span class="card-item-introduction-mmarketvalue"
            >市场价：{{ operation.marketValue }}</span
          >
          <span class="card-item-introduction-membervalue"
            >会员指导价：{{ operation.memberValue }}</span
          >
          <button class="card-item-introduction-add">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operations: {
      type: Array,
      default: () => [
        {
          title: '手术用品',
          operationList: [
            {
              operationTitle: '削铁如泥的手术刀手术刀手术刀',
              imgSrc: import('./首页-医疗器械1.jpg'),
              marketValue: 123,
              memberValue: 122,
              operationId: 0,
            },
          ],
        },
      ],
    },
  },
  methods: {

  },
  created() {
    console.log(this.operations);
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #eee;
  padding: 0 100px;
  overflow: scroll;

  .card {
    position: relative;
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
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
      border: 2px solid #eee;
      background-color: #fff;
      position: relative;
      width: 200px;
      height: 310px;
      // background-color: cadetblue;
      padding: 10px;
      box-shadow: 0 0 10px #ccc;
      transition: box-shadow 0.3s ease-in-out;

      &-imgbox {
        position: relative;
        width: 160px;
        height: 180px;
        margin: 0 auto;
        // background-color: chartreuse;

        &-img {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 160px;
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
          background-color: #eee;

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
</style>
