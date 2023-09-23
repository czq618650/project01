<template>
  <div>
    <el-page-header content="首页" icon="" title="企业门户网站管理系统
" />
    <el-card class="box-card">
      <!-- 栅格模式，24份 -->
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px;">欢迎 {{store.state.UserInfo.username}} 回来,{{ welcomeText }}</h3>
        </el-col>
      </el-row>

    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
          <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in loopList" :key="item.ID">
              <div :style="{ backgroundImage:`url(http:127.0.0.1:3000${item.cover})`,backgroundSize:'cover' }">
                <h3 text="2xl" justify="center">{{ item.title }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
    </el-card>

  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import axios from '@/util/axios.config'
// import axios from 'axios'
const store = useStore()
const loopList = ref([])
onMounted(() => {
  getData()
})
// 获取产品数据数据
const getData = async () => {
  const res = await axios.get('/adminapi/user/Uplist')
  console.log(res.data.data)
  // console.log(store.state.UserInfo.username)
  if (store.state.UserInfo.role === 1) {
    console.log('管理员')
    loopList.value = res.data.data
    console.log(loopList.value)
  } else {
    console.log('编辑')
    let x = []
    for (let item in res.data.data) {
      console.log(res.data.data[item])
      // if(res.data.data[item])
      if (res.data.data[item].username === store.state.UserInfo.username) {
        console.log(res.data.data[item].items)
        x = res.data.data[item]
      }
    }
    loopList.value = x
    console.log(loopList.value)
  }
}

const avatarUrl = 'http://127.0.0.1:3000' + store.state.UserInfo.avatar

const welcomeText = computed(() => (new Date().getHours() < 12 ? '要开心每一天' : '适当休息一下吧'))

console.log(store.state)
</script>

<style lang="scss">
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: black;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>