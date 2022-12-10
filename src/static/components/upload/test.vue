<template>
  <upload v-model="fileList" :maxCount="5" :fileType="'image'" />
</template>

<script setup>
import { ref } from 'vue'
import upload from './index.vue'

const fileList = ref([])
</script>