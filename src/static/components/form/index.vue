<template>
  <div class="yh-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item v-if="!item.isHidden" :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" v-bind="item.otherOptions"
                  :show-password="item.type === 'password'" :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)" />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]" @update:modelValue="handleValueChange($event, item.field)"
                  style="width: 100%">
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value"
                    :label="option.title"></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]" @update:modelValue="handleValueChange($event, item.field)">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
const prop = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array,
    default: () => []
  },
  labelWidth: {
    default: '100px',
    type: String
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})
const emit = defineEmits(['update:modelValue'])
const handleValueChange = (value, field) => {
  emit('update:modelValue', { ...prop.modelValue, [field]: value })
}
</script>

<style scoped>
.yh-form {
  padding-top: 22px;
}
</style>
