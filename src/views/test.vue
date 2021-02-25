<template>
  <div class="test">
    <div class="moveproject-wrapper">
      <div class="moveproject-top">
        <div class="moveproject-tip">
          <i class="moveproject-tip-icon">i</i>
          <span class="moveproject-tip-text"
            >想了解云协作文件迁移使用方法，请查看</span
          >
          <a class="moveproject-tip-help" href="">使用说明</a>
        </div>
        <div class="moveproject-inputbox">
          <div class="moveproject-inputbox-item">
            <span class="moveproject-inputbox-label">智慧云组织ID：</span>
            <input type="text" />
          </div>
          <div class="moveproject-inputbox-item">
            <span class="moveproject-inputbox-label">智慧云项目编码：</span>
            <input type="text" />
          </div>
          <button>迁移</button>
        </div>
      </div>
      <div class="moveproject-bottom">
        <div class="moveproject-bottom-tipbox">
          <h3 class="moveproject-bottom-title">迁移数据列表</h3>
          <span class="moveproject-bottom-tip"
            >注：迁移失败的文件，请联系售后进行处理</span
          >
        </div>
        <table class="moveproject-bottom-table" border="1">
          <tr class="moveproject-bottom-table-title">
            <th class="moveproject-bottom-table-title-item" width="100px">
              云协作项目组
            </th>
            <th class="moveproject-bottom-table-title-item">项目名称</th>
            <th class="moveproject-bottom-table-title-item">开始迁移时间</th>
            <th class="moveproject-bottom-table-title-item">智慧云组织名称</th>
            <th class="moveproject-bottom-table-title-item">智慧云项目名称</th>
            <th class="moveproject-bottom-table-title-item">文件总数量</th>
            <th class="moveproject-bottom-table-title-item">已经迁移数量</th>
            <th class="moveproject-bottom-table-title-item">失效数量</th>
            <th class="moveproject-bottom-table-title-item">当前状态</th>
            <th class="moveproject-bottom-table-title-item">操作</th>
          </tr>
          <tr class="moveproject-bottom-table-content">
            <td class="moveproject-bottom-table-content-item">
              北京荣大科技股份有限公司
            </td>
            <td class="moveproject-bottom-table-content-item">
              各个产品效果dasfdasdd
            </td>
            <td class="moveproject-bottom-table-content-item">
              2021-01-24 15.33
            </td>
            <td class="moveproject-bottom-table-content-item">
              北京网络科技股份有限公司
            </td>
            <td class="moveproject-bottom-table-content-item">
              荣达科技IPO项目组
            </td>
            <td class="moveproject-bottom-table-content-item">19，239，495</td>
            <td class="moveproject-bottom-table-content-item">19，239，495</td>
            <td class="moveproject-bottom-table-content-item">19，239，495</td>
            <td class="moveproject-bottom-table-content-item">正在迁移中</td>
            <td class="moveproject-bottom-table-content-item">
              <!-- 可能不出现 -->
              <button class="moveproject-bottom-table-content-item-restart">
                重试
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.test {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 800px;
  background-color: #fff;
}
.moveproject-wrapper {
  width: 60%;
  padding: 20px;
  margin: 0 auto;
  /* background-color: cornflowerblue; */
  text-align: left;
}

/* 上半部分 */
.moveproject-wrapper .moveproject-top {
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
}
/* 提示部分 */
.moveproject-wrapper .moveproject-top .moveproject-tip {
  padding: 10px;
}
/* 提示icon */
.moveproject-wrapper .moveproject-top .moveproject-tip .moveproject-tip-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
}
/* 提示文本 */
.moveproject-wrapper .moveproject-top .moveproject-tip .moveproject-tip {
  font-size: 14px;
}
/* 提示help */
.moveproject-wrapper .moveproject-top .moveproject-tip .moveproject-tip-help {
  color: rgb(85, 85, 197);
  display: inline-block;
  width: 80px;
  background-color: pink;
}
/* 输入框部分 */
.moveproject-wrapper .moveproject-top .moveproject-inputbox {
  position: relative;
  width: 100%;
  padding: 10px;
}

/* 单向label+input框组合 */
.moveproject-wrapper
  .moveproject-top
  .moveproject-inputbox
  .moveproject-inputbox-item {
  width: 42%;
  display: inline-block;
  margin-right: 20px;
}

/* 单向label+input框组合中的label */
.moveproject-wrapper
  .moveproject-top
  .moveproject-inputbox
  .moveproject-inputbox-item
  .moveproject-inputbox-label {
  font-size: 16px;
  /* font-weight: bolder; */
}
/* 单向label+input框组合中的input框 */
.moveproject-wrapper
  .moveproject-top
  .moveproject-inputbox
  .moveproject-inputbox-item
  input {
  padding: 2px 10px;
  outline: none;
  border: 1px solid #ddd;
  width: 65%;
  height: 35px;
}
/* 迁移按钮 */
.moveproject-wrapper .moveproject-top .moveproject-inputbox button {
  position: absolute;
  right: 0;
  border: none;
  background-color: rgb(92, 175, 196);
  color: #fff;
  width: 90px;
  height: 35px;
}

/* 下半部分 */
.moveproject-wrapper .moveproject-bottom .moveproject-bottom-tipbox {
  position: relative;
  padding: 10px 10px 0 10px;
}

/* title */
.moveproject-wrapper
  .moveproject-bottom
  .moveproject-bottom-tipbox
  .moveproject-bottom-title {
  font-weight: bolder;
  display: inline-block;
}

/* 提示 */
.moveproject-wrapper
  .moveproject-bottom
  .moveproject-bottom-tipbox
  .moveproject-bottom-tip {
  display: inline-block;
  position: absolute;
  right: 0;
  color: #f40;
}

/* 表格部分 */
.moveproject-wrapper .moveproject-bottom .moveproject-bottom-table {
  /* TODO */
  /* 根据ui的颜色来 */
  border: 3px solid rgb(202, 197, 197);
  width: 100%;
}

.moveproject-wrapper
  .moveproject-bottom
  .moveproject-table
  .moveproject-bottom-table-title {
}
.moveproject-wrapper
  .moveproject-bottom
  .moveproject-bottom-table
  .moveproject-bottom-table-title
  .moveproject-bottom-table-title-item {
  padding: 5px 12px;
  color: #999;
  /* width: 300px; */
  /* height: 30px; */
}

.moveproject-wrapper
  .moveproject-bottom
  .moveproject-bottom-table
  .moveproject-bottom-table-content
  .moveproject-bottom-table-content-item {
  padding: 5px 10px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.moveproject-wrapper
  .moveproject-bottom
  .moveproject-bottom-table
  .moveproject-bottom-table-content
  .moveproject-bottom-table-content-item
  .moveproject-bottom-table-content-item-restart {
  border: 1px solid rgb(60, 181, 236);
  background-color: #fff;
}
</style>
