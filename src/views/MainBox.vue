<template>
  <div>
    <el-container>
      <SideMenu />
      <el-container direction="vertical">
        <TopHeader />
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const TopHeader = defineAsyncComponent(() => import('@/components/mainbox/TopHeader.vue'))
const SideMenu = defineAsyncComponent(() => import('@/components/mainbox/SideMenu.vue'))
const components = {
  TopHeader,
  SideMenu
}
</script>

<style lang="scss" scoped>
// .el-main {
//   overflow: auto;
//   height: calc(100vh - 60px);
// }
</style>