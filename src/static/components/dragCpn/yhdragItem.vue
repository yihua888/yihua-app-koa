<template>
    <div>
        <template v-if="data.children">
            <slot name="content" :scope="{ data, $level: level }"></slot>
            <yhdragVue
                v-show="showchilds.includes(data.id)" :data="data.children" :level="level + 1"
                :showchilds="showchilds" @dragEnd="dragEnd">
                <template #content="{ scope }">
                    <slot name="content" :scope="scope"></slot>
                </template>
            </yhdragVue>
        </template>
        <slot v-else name="content" :scope="{ data, $level: level }"></slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import yhdragVue from './yhdrag.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    level: {
        type: Number,
        default: () => 0
    },
    showchilds: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['dragEnd'])

const dragEnd = (e, data) => emits('dragEnd', e, data)
</script>