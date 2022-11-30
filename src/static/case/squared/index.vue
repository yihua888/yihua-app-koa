<template>
  <p>九宫格图片指的是将照片四条线切成9份，保持1、3、7、9不变，2,8水平拉伸，4,6垂直拉伸，5水平垂直拉伸。</p>
  <div>
    <span>原图：</span>
    <img src="@/assets/img/squared.png">
  </div>
  <div class="mt24">
    <span>对应九宫格：</span>
    <canvas ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import squared from './index';
const squaredUrl = ref('')
const myCanvas = ref(null)
nextTick(()=>{
  const s = new squared(myCanvas.value,500,100)
  s.drawSquaredImg('/src/assets/img/squared.png',500, 100, 10, 10, 10, 10)
})
</script>
