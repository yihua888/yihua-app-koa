<template>
   <codeMirror :code="code" :height="400" placeholder="hello codeMirror"></codeMirror>
</template>

<script setup>
import { ref } from 'vue'
import codeMirror from './index.vue'

const code = ref('code')
</script>