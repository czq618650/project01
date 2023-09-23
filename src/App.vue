<template>
  <router-view></router-view>
</template>

<script>
export default {}
</script>

<style lang="scss">
// 滚动条样式
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
// 滚动条存在时
::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}
// 滚动条不存在时
::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>
