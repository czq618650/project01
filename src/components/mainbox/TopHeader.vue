<template>
  <el-header>
    <!-- 左边样式 -->
    <div class="left">
      <el-icon @click="handleCollspaed">
        <Menu></Menu>
      </el-icon>
      <span style="margin-left: 10px;">企业门户网站管理系统</span>
    </div>
    <!-- 右边样式 -->
    <div class="right">
      <span style="margin-right: 10px;">欢迎 {{store.state.UserInfo.username}} 回来</span>
      <!-- 右上角消息提示组件 -->
      <el-badge :value="datalist.length" :max="99" class="item" v-if="store.state.UserInfo.role === 1">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon :size="30" color="white">
              <User />
            </el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
              <el-badge :value="datalist.length" :max="99" class="item" v-if="store.state.UserInfo.role === 1">
                <el-dropdown-item @click="handleMessage" v-if="store.state.UserInfo.role === 1">消息管理</el-dropdown-item>
              </el-badge>
              <el-dropdown-item @click="callAdmin" v-else>联系管理员</el-dropdown-item>
              <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-badge>
      <el-dropdown v-else>
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white">
            <User />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-badge :value="datalist.length" :max="99" class="item" v-if="store.state.UserInfo.role === 1">
              <el-dropdown-item @click="handleMessage" v-if="store.state.UserInfo.role === 1">消息管理</el-dropdown-item>
            </el-badge>
            <el-dropdown-item @click="callAdmin" v-else>联系管理员</el-dropdown-item>
            <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { Menu, User } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import axios from '@/util/axios.config'
const store = useStore()
const router = useRouter()

const datalist = ref('[]')

onMounted(async () => {
  const res = await axios.get('/adminapi/message/list')
  console.log('我在这里啊', res.data)
  datalist.value = res.data
})

// watch(
//   () => datalist.value.length,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal)
//     oldVal = newVal
//   }
// )

// 点击改变侧边栏折叠状态
const handleCollspaed = () => {
  store.commit('changeCollapsed')
}
// 跳转个人中心
const handleCenter = () => {
  router.push('/center')
}
// 消息管理
const handleMessage = () => {
  router.push('/message/messagelist')
  datalist.value = ''
}

const callAdmin = () => {
  router.push('/message/usmessage')
}

// 退出函数
const handleLogOut = () => {
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #2d3a4b;
  color: white;
  display: flex;
  // 横向排列
  justify-content: space-between;
  // 纵向排列
  align-content: center;

  .left,
  .right {
    display: flex;
  }
  .left {
    i {
      margin: auto;
      cursor: pointer;
    }
  }
  .right {
    .el-dropdown {
      cursor: pointer;
      margin: auto;
    }
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>