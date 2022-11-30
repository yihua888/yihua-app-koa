<template>
  <div class="page-content">
    <yh-table :listData="listData"
              :listCount="2"
              :propList="tableCol">
      <template #headerHandler>
        <div class="info">
          此为演示组件，不产生交互效果。
        </div>
      </template>
      <template #handler="scope">
        <el-button size="mini"
                   type="text"
                   @click="handleClick(scope.row)">查看</el-button>
      </template>
    </yh-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import YhTable from './index.vue'

const listData = ref([
  { name: 'yihua', age: 19 },
  { name: 'liuyifei', age: 18 }
])

const tableCol = ref([
  { prop: 'name', label: '姓名', minWidth: '100' },
  { prop: 'age', label: '年龄', minWidth: '100' },
  {
    label: '操作',
    minWidth: '200',
    slotName: 'handler'
  }
])

const handleClick = (row) => {}
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  .info{
    color: $blue;
  }
}
</style>
