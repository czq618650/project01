<template>
  <!-- 侧边栏模块 -->
  <el-aside width="$store.state.isCollapsed ? '64px' : '240px'">
    <!-- collapse是否水平折叠 collapse-transition是否开启折叠动画，router开启路由跳转 default-active激活页面高亮-->
    <!-- route.fullPath表示当前路径 -->
    <el-menu :collapse="$store.state.isCollapsed" :collapse-transition="false" :router="true" :default-active="route.fullPath">
      <!-- 单独的下拉 -->
      <el-menu-item index="/home">
        <el-icon>
          <home-filled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <!-- 折叠下拉 -->
      <!-- 数据大屏 -->
      <el-menu-item index="/dataScreen">
        <el-icon>
          <Monitor />
        </el-icon>
        <span>数据大屏</span>
      </el-menu-item>

      <!-- 用户管理 -->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon>
            <user-filled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!-- 新闻管理 -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <MessageBox />
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <!-- 产品管理 -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <Reading />
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer, Monitor } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// useRoute显示当前匹配到的路由对象
const route = useRoute()
const store = useStore()
// vAdmin相当于v-admin
const vAdmin = {
  mounted(el) {
    console.log(el)
    if (store.state.UserInfo.role !== 1) {
      // parentNode父节点
      el.parentNode.removeChild(el)
    }
  }
}

// console.log(route.fullPath)
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>