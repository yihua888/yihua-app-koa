<template>
  <div class="page-search">
    <yh-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            :icon="Search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </yh-form>
  </div>
</template>

<script  setup>
import {ref } from 'vue'
import YhForm from './index.vue'

const searchFormConfig = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
const formItems = searchFormConfig?.formItems ?? []
const formOriginData = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)
// 重置
const handleResetClick = () => {
  formData.value = formOriginData
}
// 搜索
const handleQueryClick = () => {}

</script>

<style scoped>
.header {
  color: rgb(12, 11, 11);
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
