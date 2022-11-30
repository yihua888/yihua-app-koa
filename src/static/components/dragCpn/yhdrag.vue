<template>
    <div class="drag-box" :style="getStyle">
        <draggable :list="data" group="tree_drag" animation="300" item-key="id" @end="dragEnd">
            <template #item="{ element }">
                <yhdragItemVue :data="element" :level="level" :showchilds="showchilds" @dragEnd="dragEnd">
                    <template #content="{ scope }">
                        <slot name="content" :scope="scope"></slot>
                    </template>
                </yhdragItemVue>
            </template>
        </draggable>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import { defineProps, defineEmits } from 'vue';
import yhdragItemVue from './yhdragItem.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    level: {
        type: Number,
        default: () => 0
    },
    dragCheck: {
        type: Number,
        default: () => 20
    },
    showchilds: {
        type: Array,
        default: () => []
    }
})

const emits = defineEmits(['dragEnd'])
const dragEnd = e => emits('dragEnd', e, props.data)

const getStyle = () => {
    if (!props.data.length) {
        return {
            height: `${props.dragCheck}px`,
            top: `-${props.dragCheck}px`,
            display: 'inline-block'
        }
    }
    return {}
}
</script>

<style lang="scss" scoped>
.drag-box {
    position: relative;
}
</style>