<template>
    <yhdrag :data="data" :drag-check="dragCheck" :showchilds="showchilds" @dragEnd="dragEnd">
        <template #content="{ scope }">
            <div
                :class="getClass(scope.data)" :style="getStyle(scope.$level)"
                @mouseenter="hoverItem($event, scope.data)" @mousemove="moveItem($event, scope.data)"
                @dblclick="handleDbClick($event, scope.data)" @contextmenu.prevent="onRightClick($event, scope.data)"
                @click.exact="selectItem($event, scope.data)" @click.ctrl="selectItems($event, scope.data)"
                @click.shift="addItems($event, scope.data)">
                <span :style="getIconStyle()">
                    <template v-if="scope.data.children">
                        <CaretRight
                            v-if="!showchilds.includes(scope.data.id)" style="width: 1em; height: 1em;" :color="iconColor"
                            @click.stop="changeshowChild(scope.data)" />
                        <CaretBottom
                            v-else style="width: 1em; height: 1em;" :color="iconColor"
                            @click.stop="changeshowChild(scope.data)" />
                    </template>
                </span>
                <slot name="content" :data="scope.data"></slot>
            </div>
        </template>
    </yhdrag>
</template>

<script setup>
/**
 * ============================================info==================================================>
 * author：yihua                                        
 * date：2022/10/26                                          
 * describe：树形可拖拽组件，单击可选中，shift+单击可选中一片区域，ctrl+单击多选。
 * <=================================================================================================
 * 
 * ===========================================属性================================================>
 * itemStyle：单个item项的样式，更推荐使用类名drag-item去更改基本样式。被选中的会被添加active类名；
 * data：数据，注意需要有id；
 * iconSize：树形节点图标的大小；
 * iconColor：树形节点图标的颜色；
 * select：默认选中的数据；
 * dragCheck：拖拽进入为子组件的触控区域；
 * styleId：悬浮的id,悬浮的item会增加类名self_style；
 * isdbCancel：是否按两下取消选中。
 * <================================================================================================
 * 
 * ===========================================方法================================================>
 * dragEnd：拖拽完成之后的回调，第一个参数是事件对象e，第二个参数是改变后的数据；
 * selectItem：选中的回调，第一个参数是事件对象e，第二个参数是当前选中的数据；
 * selectItems:选中数据改变的回调;
 * hoverItem：悬浮的回调，第一个参数是事件对象e，第二个参数是当前悬浮的数据；
 * moveItem：鼠标离开的回调，第一个参数是事件对象e，第二个参数是当前离开元素的数据；
 * handleDbClick：双击的回调，第一个参数是事件对象e，第二个参数是当前双击元素的数据；
 * onRightClick：右键鼠标的回调，第一个参数是事件对象e，第二个参数是当前右键元素的数据；
 * getSelectedList：组件方法，获取所有选中的数据；
 * setCheckedKeys：设置当前组件哪些元素被选中；
 * setShowChild：设置当前组件哪些元素应该被展开子元素。
 * changeshowChild：改变当前组件某个节点的孩子是否展示。
 * <================================================================================================
 */
import { CaretRight, CaretBottom } from '@element-plus/icons-vue'
import { computed, defineEmits, defineProps, ref, defineExpose } from 'vue'
import yhdrag from './yhdrag.vue';

const props = defineProps({
    itemStyle: {
        type: Object,
        default: () => { }
    },
    data: {
        type: Array,
        default: () => []
    },
    iconSize: {
        type: Number,
        default: () => 14
    },
    iconColor: {
        type: String,
        default: () => '#FFFFFF'
    },
    select: {
        type: Array,
        default: () => []
    },
    dragCheck: {
        type: Number,
        default: () => 20
    },
    styleId: {
        type: String,
        default: () => ''
    },
    isdbCancel: {
        type: Boolean,
        default: () => false
    }
})

// 获取样式
const getStyle = level => ({
    ...props.itemStyle,
    paddingLeft: `${(level + 1) * 20}px`
})

// icon样式
const getIconStyle = () => ({
    display: 'inline-block',
    fontSize: `${props.iconSize}px`,
    width: `${props.iconSize}px`,
    height: '10px',
    marginRight:'5px'
})

const showchilds = ref([])
console.log(props.data);
// 改变子集节点的显隐
const changeshowChild = data => {
    const LEN =showchilds.value.length
    showchilds.value = showchilds.value.filter(item=>item !== data.id)
    if(LEN === showchilds.value.length){
        showchilds.value.push(data.id)
    }
}

// 选中的数组
const selectList = ref([])
// eslint-disable-next-line vue/no-setup-props-destructure
selectList.value = props.select

// 获取已选中的数据
const getSelectedList = () => selectList.value;
// 设置选中
const setCheckedKeys = arr => { selectList.value = arr }
// 设置展开子节点
const setShowChild = data => { showchilds.value = data.map(item=>item.id) }

// 注册事件
const emits = defineEmits(['dragEnd', 'selectItem', 'hoverItem', 'handleDbClick', 'moveItem', 'onRightClick', 'selectItems'])

// 初始化类名
const getClass = computed(() => data => {
    const isHover = data.id === props.styleId ? 'self_style' : ''
    if (selectList.value.findIndex(i => i.id === data.id) > -1) {
        return `drag-item active ${isHover}`
    }
    return `drag-item ${isHover}`

})

/**
 * @param {Array} arr
 * @param {String} id1
 * @param {String} id2
 */
const findtwoIdsData = (arr, id1, id2) => {
    const rst = [];
    const hitId = (id) => id === id1 || id === id2;
    let hitTimes = 0;

    const addItem = (list) => {
        list.forEach((item) => {
            if (hitTimes === 0 && hitId(item.id)) {
                // 命中第一次
                rst.push(item);
                hitTimes++;
                if (item.children && item.children.length) {
                    addItem(item.children, hitTimes);
                }
            } else if (hitTimes === 1 && hitId(item.id)) {
                // 命中第二次
                rst.push(item);
                hitTimes++;
                // eslint-disable-next-line no-useless-return
                return ;
            } else if (hitTimes === 1) {
                // 命中第一次中间的
                rst.push(item);
                if (item.children && item.children.length) {
                    addItem(item.children, hitTimes);
                }
            } else if (item.children && item.children.length) {
                addItem(item.children, hitTimes);
            }
        });
    };
    addItem(arr);
    return rst;
};

const preId = ref('')
// 按住ctrl点击选中
const selectItems = (e, data) => {
    const LEN = selectList.value.length
    selectList.value = selectList.value.filter(item => item.id !== data.id)
    if (selectList.value.length === LEN) {
        preId.value = ''
        selectList.value.push(data)
    }
    preId.value = data.id
    emits('selectItem', e, data)
    emits('selectItems', selectList.value)
}

// 按住shift点击选中
const addItems = (e, data) => {
    if (!preId.value || preId.value === data.id) {
        setCheckedKeys([data])
    } else {
        // 将两次点击中间的数据添加到数组中
        setCheckedKeys(findtwoIdsData(props.data, preId.value, data.id))
    }
    preId.value = data.id
    emits('selectItem', e, data)
    emits('selectItems', selectList.value)
}

// 直接点击选中
const selectItem = (e, data) => {
    preId.value = data.id
    if (props.isdbCancel) {
        const LEN = selectList.value.length
        selectList.value = selectList.value.filter(item => item.id !== data.id)
        if (selectList.value.length === LEN) {
            setCheckedKeys([data])
        } else {
            setCheckedKeys([])
            preId.value = ''
        }
    } else {
        setCheckedKeys([data])
    }
    emits('selectItem', e, data)
    emits('selectItems', selectList.value)
}

// 悬浮
const hoverItem = (e, data) => emits('hoverItem', e, data)
// 拖拽
const dragEnd = (e, data) => emits('dragEnd', e, data)
// 双击
const handleDbClick = (e, data) => emits('handleDbClick', e, data)
// 鼠标离开
const moveItem = (e, data) => emits('moveItem', e, data)
// 右键鼠标
const onRightClick = (e, data) => emits('onRightClick', e, data)

defineExpose({ getSelectedList, setCheckedKeys, changeshowChild , setShowChild})
</script>

<style lang="scss" scoped>
.drag-item {
    display: flex;
    cursor: pointer;
    position: relative;
}
</style>

