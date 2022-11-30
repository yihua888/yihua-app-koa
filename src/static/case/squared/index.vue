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
  <div>
    <canvas ref="mycanvas1"></canvas>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import squared from './index';
const squaredUrl = ref('')
const myCanvas = ref(null)
const mycanvas1 = ref(null)
nextTick(() => {
  const canvasInstance = new squared(myCanvas.value, 500, 100)
  canvasInstance.drawSquaredImg('/src/assets/img/squared.png', 500, 100, 10, 10, 10, 10)
  const canvasInstance1 = new squared(mycanvas1.value, 500, 200)
  canvasInstance1.drawAnnularProgress(
    300,
    100,
    80,
    0.65 * Math.PI,
    2.35 * Math.PI,
    5,
    "#FFF",
    "#0FF",
    0.3,
    [
      {
        font: "16px Verdana",
        text: "总体进度",
        colors: [
          {
            offset: "0",
            color: "#FFF",
          },
          {
            offset: "1",
            color: "#0FF",
          },
        ],
        startX: 270,
        startY: 100,
        endX: 350,
        endY: 100,
      },
      {
        font: "16px Verdana",
        text: "30%",
        colors: [
          {
            offset: "0",
            color: "#FFFFFF",
          },
          {
            offset: "1",
            color: "#0FF",
          },
        ],
        startX: 290,
        startY: 120,
        endX: 330,
        endY: 120,
      },
    ]
  );

  canvasInstance1.drawProgress(
    500,
    80,
    680,
    80,
    10,
    "#CCC",
    [
      {
        offset: "0",
        color: "#FFF",
      },
      {
        offset: "1",
        color: "#0FF",
      },
    ],
    0.6,
    [
      {
        font: "16px Verdana",
        text: "总体进度",
        colors: [
          {
            offset: "0",
            color: "#FFF",
          },
          {
            offset: "1",
            color: "#0FF",
          },
        ],
        startX: 570,
        startY: 110,
        endX: 650,
        endY: 110,
      },
      {
        font: "16px Verdana",
        text: "60%",
        colors: [
          {
            offset: "0",
            color: "#FFFFFF",
          },
          {
            offset: "1",
            color: "#0FF",
          },
        ],
        startX: 590,
        startY: 140,
        endX: 630,
        endY: 140,
      },
    ]
  );
})
</script>
