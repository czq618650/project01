<template>
  <div>
    <el-card class="box-card" v-for="item in datalist" :key="item._id">
      <el-avatar :src="'http://8.130.106.91:3000'+item.avatar" />
      <h5>{{item.author}}</h5>
      <el-divider />
      <div class="text" v-html="item.introduction"></div>
      <div class="icon">
        <el-button type="info" :icon="ChatDotRound" circle @click="comment()" />
        <el-button type="danger" :icon="Delete" circle @click="DlCmt(item)" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/util/axios.config'
import { Check, Delete, Edit, Message, Search, Star, ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const datalist = ref([])

onMounted(async () => {
  getMeList()
})
// 回复评论
const comment = async data => {
  console.log(data)
  ElMessage.success('你干嘛！！')
}
// 获取评论
const getMeList = async () => {
  const res = await axios.get('/adminapi/message/list')
  console.log(res.data)
  datalist.value = res.data
}
// 删除评论
const DlCmt = async data => {
  console.log(data)
  await axios.delete(`/adminapi/message/list/${data.ID}`)

  ElMessage.success('不好的评论我会删哦！')
  // console.log(data);
}
</script>

<style lang="scss" scoped >
.el-card {
  width: 98%;
  margin-bottom: 10px;
  position: relative;
  h5 {
    width: 50px;
    position: absolute;
    top: 30px;
    left: 80px;
    font-size: 10px;
  }
  .text {
    width: 98%;
    word-wrap: break-word;
  }
}
.box-card {
  margin-top: 0;
}
.icon {
  width: 100px;
  height: 50px;
  float: right;
}
</style>