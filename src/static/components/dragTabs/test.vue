<template>
    <yhTabs v-model="active" :tabList="tabPaneList" modelKey="name" label="label" @changeList="changeList"
       groupName="tabs1" @changeActive="changeActive">
       <template #head="{ data: { index } }">
          <span>第{{ index }}列</span>
       </template>
       <template #="{ item }">
          <div class="yh-tab-pane">
             <div class="myinfo">
                {{ item }}
             </div>
             <div>
                <yh-tabs v-model="chTab" :tabList="item.tabs" modelKey="name" label="label" groupName="tabs2">
                   <template #="{ item }">
                      {{ item }}
                   </template>
                </yh-tabs>
             </div>
          </div>
       </template>
    </yhTabs>
 </template>
   
 <script  setup>
 import { ref } from 'vue'
 import yhTabs from './index.vue'
 const active = ref('1')
 const chTab = ref('1-1')
 const tabPaneList = ref([
    {
       name: '1',
       label: '标签1',
       tabs: [
          {
             name: '1-1',
             label: '标签1-1'
          },
          {
             name: '1-2',
             label: '标签1-2'
          }
       ]
    },
    {
       name: '2',
       label: '标签2',
       tabs: [
          {
             name: '2-1',
             label: '标签2-1'
          },
          {
             name: '2-2',
             label: '标签2-2'
          }
       ]
    },
    {
       name: '3',
       label: '标签3',
       tabs: [
          {
             name: '3-1',
             label: '标签3-1'
          },
          {
             name: '3-2',
             label: '标签3-2'
          }
       ]
    },
    {
       name: '4',
       label: '标签4',
       tabs: [
          {
             name: '4-1',
             label: '标签4-1'
          },
          {
             name: '4-2',
             label: '标签4-2'
          }
       ]
    }
 ])
 
 const changeList = data => tabPaneList.value = data
 const changeActive = active => {
    chTab.value = active.tabs[0].name
 }
 </script>
 
 <style lang="scss" scoped>
 .myinfo{
    margin: 24px;
 }
 .yh-tab-pane{
    margin-top: 24px;
 }
 </style>
   