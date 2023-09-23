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
import ModelOne from './ModelOne.vue'
import ModelTwo from './ModelTwo.vue'
import ModelThree from './ModelThree.vue'
</script>
<style>
</style>