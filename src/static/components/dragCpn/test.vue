<template>
    <div class="content">
        <drag ref="dragRef" :itemStyle="itemStyle" :data="cpnList" @dragEnd="dragEnd" @selectItems="selectItem"
            @hoverItem="hoverItem" :select="[{ id: 1 }]">
            <template #content="{ data }">
                <div> id:{{ data.id }} ----------- name:{{ data.name }}</div>
            </template>
        </drag>
    </div>
</template>
    
<script setup>
import drag from './index.vue'
import { ref } from 'vue';

const itemStyle = {
    height: '50px',
    background: '#1890FF',
    width: '400px',
    lineHeight: '50px',
    marginBottom: '10px',
    boxSizing: 'border-box'
}

const cpnList = ref([
    { id: 1, name: '组件A', children: [] },
    { id: 2, name: '组件B', children: [] },
    {
        id: 3, name: '组件C', children: [
            { id: 4, name: '组件A', children: [] },
            {
                id: 5, name: '组件C', children: [
                    { id: 6, name: '组件B', children: [] }
                ]
            },
        ]
    },
    {
        id:7,
        name:'组件A'
    }
])
const dragRef = ref(null)

const selectJson = ref('')

const getSelect = () => selectJson.value = JSON.stringify(dragRef.value.getSelectedList());

const dragEnd = (e, v) => {}

const selectItems = (v) => console.log(v);

const hoverItem = (e, v) => {}

</script>

<style lang="scss" scoped>
.content ::v-deep .drag-item:hover {
    background-color: aqua !important;
}

.content ::v-deep .drag-item.active {
    background-color: rgb(255, 68, 0) !important;
}

</style>

