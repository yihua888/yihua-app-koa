<template>
  <div class="content">
    <div class="upload-box left" @click="importFile">
      <upload-filled style="width: 10em; height: 10em; margin-right: 8px" />
      <div>点击即可导入</div>
      <input type="file" style="display: none" ref="inputFile" @change="changeFile" />
    </div>
    <div class="center right">
      <div class="json-box">{{ jsonData }}</div>
      <el-button type="primary" @click="copyJson" class="mt20">复制JSON</el-button>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from 'vue'
import { ElMessage } from "element-plus";
import * as XLSX from "xlsx";

const inputFile = ref<HTMLInputElement | null>(null);
const importFile = () => {
  if (inputFile.value) {
    inputFile.value.click();
  }
};

const jsonData = ref<string | null>(null);

const changeFile = (e: any) => {
  const file = e.target.files[0];
  const type = file.name.split(".");
  if (
    type[type.length - 1] !== "xlsx" &&
    type[type.length - 1] !== "xls"
  ) {
    ElMessage.error("只能选择excel文件导入");
    return false;
  }
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (ev: any) => {
    const data = ev.currentTarget.result;
    let xlsxs = XLSX.read(data, { type: "binary" });
    const j_data: Array<{ [key: string]: unknown }> = XLSX.utils.sheet_to_json(
      xlsxs.Sheets[xlsxs.SheetNames[0]]
    );
    jsonData.value = JSON.stringify(j_data);
  };
};

const clipboard = (data: string) => {
  let inputElement = document.createElement("input");
  inputElement.value = data;
  document.body.appendChild(inputElement);
  inputElement.select(); //选中文本
  document.execCommand("copy"); //执行浏览器复制命令
  inputElement.remove();
  ElMessage.success("复制成功");
};


const copyJson = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  clipboard(jsonData.value!);
};
</script>
  
<style lang="scss" scoped>
.content {
  display: flex;

  .upload-box {
    height: 500px;
    text-align: center;
    font-size: 20px;
    margin: 24px;
    color: #1890ff;
    border: 1px #1890ff dotted;
    width: 50%;
    align-items: center;
    padding: 120px;
    box-sizing: border-box;
  }

  .right {
    width: 50%;
    .json-box {
      margin-bottom: 24px;
      height: 500px;
      border: 1px #CCC dotted;
    }

    .pd24 {
      padding: 24px;
    }
  }
}

.center {
  text-align: center;
  margin: 20px;
}
</style>