<template>
  <div class="upload" :style="{ display: fileType === 'image' ? 'flex' : 'block' }">
    <span class="upload-box" :style="boxStyle" @click="uploadFile"
      v-show="!(maxCount === 1 && modelValue.length === 1 && fileType === 'image')">
      <Plus v-if="fileType === 'image'" :style="{ width: iconSize + 'px' }" />
      <UploadFilled v-else :style="{ width: iconSize + 'px' }" />
      <div class="text-box">{{ text }}</div>
    </span>
    <template v-if="showFileList">
      <!-- 图片列表 -->
      <div v-if="fileType === 'image'">
        <div class="img-box" v-for="(item, index) in fileList" :key="index" :style="boxStyle">
          <DeleteFilled class="delete-img" @click="deleteFile(index)" />
          <img :src="item.url" :style="boxStyle">
        </div>
      </div>
      <!-- 文件列表 -->
      <div v-else>
        <div class="filelist">
          <div v-for="(item, index) in fileList" :key="index">
            <DeleteFilled class="delete-file" @click="deleteFile(index)" />
            <span>{{ item.filename }}</span>
          </div>
        </div>
      </div>
    </template>
    <input ref="inputFile" type="file" class="input-file" :multiple="maxCount > 1" :max="maxCount" @change="changeFile">
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { UploadFilled, Plus, DeleteFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { fileToBase64 } from '@/utils/getFile'

const props = defineProps({
  modelValue: {
    required: true,
    type: Array
  },
  width: {
    default: 200,
    type: Number
  },
  height: {
    default: 200,
    type: Number
  },
  color: {
    default: '#1890FF',
    type: String
  },
  text: {
    default: '上传头像',
    type: String
  },
  maxCount: {
    type: Number,
    default: 1
  },
  fileType: {
    type: String,
    default: 'image'
  },
  iconSize: {
    type: Number,
    default: 100
  },
  showFileList: {
    type: Boolean,
    default: true
  }
})

const inputFile = ref(null)
const boxStyle = computed(() => ({
  borderColor: props.color,
  color: props.color,
  width: props.width + 'px',
  height: props.height + 'px'
}))

const uploadFile = () => inputFile.value.click()
const emit = defineEmits(['update:modelValue'])

const changeFile = e => {
  const files = Array.from(e.target.files)
  if (props.maxCount === 1) {
    emit('update:modelValue', files)
  } else {
    let rst = [...props.modelValue, ...files]
    if (rst.length > props.maxCount)
      ElMessage.warning('超过最大上传文件个数')
    emit('update:modelValue', rst.slice(0, props.maxCount))
  }
}

const fileList = ref([])

watch(
  () => props.modelValue,
  async () => {
    const rst = []
    const flag = props.fileType === 'image'
    for (let i = 0; i < props.modelValue.length; i++) {
      const item = props.modelValue[i]
      if (flag) {
        rst.push({
          filename: item.filename ?? item.name,
          url: item.url ?? await fileToBase64(item)
        })
      } else {
        rst.push({
          filename: item.filename ?? item.name
        })
      }
    }
    fileList.value = rst
    console.log(rst);
  },
  {
    deep: true,
    immediate: true
  }
)

const deleteFile = (index) => {
  emit('update:modelValue', [...props.modelValue.slice(0, index), ...props.modelValue.slice(index + 1)])
}
</script>

<style lang="scss" scoped>
.upload {
  .upload-box {
    border: 1px dashed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 24px;

    .text-box {
      margin-top: 24px;
    }
  }

  .input-file {
    display: none;
  }

  .img-box {
    margin: 24px;
    display: inline-block;
    position: relative;
    vertical-align: middle;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover .delete-img{
      display: inline-block;
    }

    .delete-img {
      position: absolute;
      top: 5px;
      right: 5px;
      color: rgba(255, 255, 255, .7);
      cursor: pointer;
      width: 16px;
      display: none;
    }
  }

  .filelist {
    margin-top: 24px;

    div {
      height: 24px;
      line-height: 24px;
      position: relative;

      &:hover {
        background: #CCC;
        .delete-file{
          position: absolute;
          top: 5px;
          right: 5px;
          color: rgba(255, 255, 255, .7);
          cursor: pointer;
          width: 16px;
          display: inline-block;
        }
      }
    }
    .delete-file{
      display: none;
    }
  }
}
</style>