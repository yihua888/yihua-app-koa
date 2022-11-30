<template>
  <div v-for="icon in svgList" :key="icon" class="mt24 ml24">
    <svg-icon :name="icon.name" :size="24" :color="icon.color" />
  </div>
</template>

<script setup>
import svgIcon from "./index.vue";
const svgList = [
  {
    name: "icon-left",
    color: "#1890FF",
  },
  {
    name: "circular",
    color: "#FF00FF",
  },
  {
    name: "decline",
    color: "#F0F0F0",
  },
  {
    name: "icon-left",
    color: "#FF00FF",
  },
  {
    name: "icon-right",
    color: "#FF1810",
  },
  {
    name: "lowerTriangle",
    color: "#18FF90",
  },
  {
    name: "square",
    color: "#1FFF67",
  },
  {
    name: "upperTriangle",
    color: "#1908FF",
  },
];
</script>
