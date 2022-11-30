<template>
  <div class="yh-label-input"
       :style="{ height: `${height}px`, width: `${width}px` }"
       @click="clickInput">
    <div class="yh-tag-box"
         ref="tagBox">
      <el-tag v-for="(tag, index) in tags"
              :key="index"
              closable
              @close="delTag(index)"
              class="yh-tag">{{ tag }}
      </el-tag>
    </div>
    <el-input v-model.trim="inputData"
              ref="testInput"
              @keydown.enter="addTag"
              class="yh-tag-input"
              :maxlength="maxTag"></el-input>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from "element-plus";

const props = defineProps({
    width: {
      default: () => 100,
      type: Number
    },
    height: {
      default: () => 40,
      type: Number
    },
    maxTag: {
      default: () => 50,
      type: Number
    },
    labelName: {
      type: String,
      default: () => ''
    }
  })

const inputData = ref('')
const tags = ref([])
tags.value = props.labelName.split(',')
const testInput = ref(null)
const emit = defineEmits(['saveTag'])

const delTag = (index) => {
  tags.value.splice(index, 1)
  let tagStr = tags.value.toString()
  emit('saveTag', tagStr)
}

const addTag = () => {
  if (tags.value.find(item => item == inputData.value)) {
    return ElMessage.warning('已存在' + inputData.value + '标签')
  }
  if (!inputData.value) return;
  let length = inputData.value.split('/').length
  if (length > 2) {
    return ElMessage.warning('标签格式应为A/B，或者B')
  }
  tags.value.push(inputData.value)
  let tagStr = tags.value.toString()
  emit('saveTag', tagStr)
  inputData.value = ''
}

const clickInput = () => {
  testInput.value.focus()
}
</script>

<style lang="scss" scoped>
.yh-label-input {
  position: relative;
  overflow: auto;
  border: 1px solid #ccc;

  .yh-tag-box {
    display: flex;
    z-index: 999;
    align-items: center;
    flex-wrap: wrap;

    .yh-tag {
      margin-left: 10px;
      margin-top: 10px;
    }
  }

  .yh-tag-input ::v-deep .el-input__inner,
  .yh-tag-input ::v-deep .el-input__wrapper {
    border: 0px;
    display: inline-block;
    box-shadow: 0px 0px 0px 0px #000;
  }
}
</style>
