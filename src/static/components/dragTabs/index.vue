<template>
    <div class="yh-tabs">
        <draggable :list="tabList" :group="groupName" animation="300" item-key="id" @end="dragEnd">
            <template #item="{ element, index }">
                <span :class="['yh-tabs-item', attrs.modelValue === element[modelKey] ? 'active' : '']"
                    @click="changeActive(element)">
                    <slot name="head" :data="{ element, index }">
                        <span>
                            {{ element[label] }}
                        </span>
                    </slot>
                </span>
            </template>
        </draggable>
    </div>
    <div class="tab-pane">
        <slot :item="curTab"></slot>
    </div>
</template>

<script setup>
import { defineProps, useAttrs, defineEmits, computed } from 'vue'
import draggable from 'vuedraggable';
const attrs = useAttrs()
const props = defineProps({
    tabList: {
        type: Array,
        required: true
    },
    modelKey: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['update:modelValue', 'changeList', 'changeActive'])

const curTab = computed(() => props.tabList.find(item => item[props.modelKey] === attrs.modelValue))

const changeActive = (element) => {
    curTab.value = element
    emits('update:modelValue', element[props.modelKey])
    emits('changeActive', element)
}
const dragEnd = () => emits('changeList', props.tabList)
</script>

<style lang="scss" scoped>
.yh-tabs {
    position: relative;
    box-sizing: border-box;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #CCC;
        position: absolute;
        bottom: -7px;
        left: 0;
        z-index: -1;
    }

    .yh-tabs-item {
        padding: 5px 10px;
        cursor: pointer;
    }

    .yh-tabs-item.active {
        color: #1890FF;
        border-bottom: 2px solid #1890FF;
    }

}

.tab-pane {
    margin-top: 24px;
}
</style>