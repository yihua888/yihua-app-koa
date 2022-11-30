<template>
  <codemirror v-model="code"
              :placeholder="placeholder"
              :style="{ height: `${height}px`, width:'100%' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tabSize="2"
              :extensions="extensions"
              @ready="ready"
              @change="change"
              @focus="focus"
              @blur="blur" />
</template>
  
<script setup>
import { defineProps, defineEmits } from "vue";

import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const prop = defineProps({
  code: {
    type: String,
    default: () => ''
  },
  height: {
    type: Number,
    default: () => 400
  },
  placeholder:{
    type:String,
    default:() => ''
  }
})

const emit = defineEmits(['ready', 'focus', 'change', 'blur'])

const extensions = [javascript(), oneDark];

const ready = (e) => emit('ready', e, prop.code)
const change = (e) => emit('change', e, prop.code)
const focus = (e) => emit('focus', e, prop.code)
const blur = (e) => emit('blur', e, prop.code)
</script>
  