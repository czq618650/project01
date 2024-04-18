<template>
  <div class="content">
    <!-- 全屏容器 -->
    <dv-full-screen-container>
      <!-- 第一行 -->
      <ModelOne></ModelOne>
      <!-- 第二行 -->
      <ModelTwo></ModelTwo>
      <!-- 第三行 -->
      <ModelThree></ModelThree>
    </dv-full-screen-container>
  </div>
</template>
 
<script setup>
import { defineAsyncComponent } from 'vue'
// import ModelOne from './ModelOne.vue'
// import ModelTwo from './ModelTwo.vue'
// import ModelThree from './ModelThree.vue'
const ModelOne = defineAsyncComponent(() => import('./ModelOne.vue'))
const ModelTwo = defineAsyncComponent(() => import('./ModelTwo.vue'))
const ModelThree = defineAsyncComponent(() => import('./ModelThree.vue'))

const components = {
  ModelOne,
  ModelTwo,
  ModelThree
}
</script>
<style>
</style>