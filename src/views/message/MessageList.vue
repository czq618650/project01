<template >
  <div class="warp">
    <el-card class="box-card" v-for="(item,index) in datalist" :key="item.ID">
      <div class="big_box">
        <el-avatar :src="adminurl+item.avatar" />
      <h5>{{item.author}}</h5>
      <el-divider />
      <div class="text" v-html="item.introduction"></div>
      <div class="icon">
        <el-button type="info" :icon="ChatDotRound" circle @click="comment(item)" />
        <el-button type="danger" :icon="Delete" circle @click="DlCmt(item)" v-if="(store.state.UserInfo.role == 1)  || (store.state.UserInfo.username == x.author)"/>
      </div>
      </div>
      <div v-if ="plqu">
        <div class="small_box" v-for="(items,index) in plqu">
        <el-divider />
        <div class="other_box">
          <div class="other_name">{{items.username}}&nbsp;对&nbsp;{{ item.author }}说：</div>
          <div class="other_txt">{{ items.msg }}</div>
          <div class="icon1">
        <el-button type="info" :icon="ChatDotRound" circle @click="comment(items)" />
        <el-button type="danger" :icon="Delete" circle @click="DlCmt1({index:index,ID:items.id})" v-if="(store.state.UserInfo.role == 1) || (store.state.UserInfo.username == items.username)" />
      </div>
        </div>

      </div>
      </div>
    </el-card>
  </div>
  <div class="dialog" v-show="isShow">
    <div class="box">
      <input class="shuru" placeholder="请输入内容" v-model.trim="data.msg">
      
      <div class="tijiao" @click="tijiao()">提交评论</div>
      <div class="clone" @click="clone()">X</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick} from 'vue'
import axios from '@/util/axios.config'
import { Check, Delete, Edit, Message, Search, Star, ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminurl } from '@/util/adminUrl'
import store from '@/store'
let datalist = ref([])
let plqu = ref([])
let txt_list = ref({
  ID:'',
  author:'',
  avatar:'',
  content:[],
  introduction:'',
})
const data = ref({
  id:'',
  username:store.state.UserInfo.username,
  msg:''
})
let isShow = ref(false)
onMounted( () => {
  getMeList()
})
// 回复评论
const comment = async x => {
  data.value.id = x.ID
  console.log(x);
  
isShow.value = !isShow.value
}
const clone = async data => {
isShow.value = !isShow.value
}
// 提交评论
const tijiao = async () => {
  let arr = []
  isShow.value = !isShow.value
  datalist.value.forEach(item => {
    console.log(data.value);
    console.log(item,"vvv");
    if(item.ID == data.value.id){
      console.log(item,'我是数据');
      item.content = JSON.parse(item.content)
      item.content.push(data.value)
      item.content = JSON.stringify(item.content)
      // item.content.push(JSON.stringify(data))
      txt_list.value = item
    }
  });
  console.log(txt_list,"我是items");
const res = await axios.put(`/adminapi/message/pushList`,txt_list.value)
console.log(res);
getMeList( )

}

// 获取评论
const getMeList = async () => {
  let res = await axios.get('/adminapi/message/list')
  console.log("sadas",res.data)
  datalist.value = res.data
  console.log(datalist.value[0],"我是数据");
  plqu.value = JSON.parse(datalist.value[0].content)
  console.log(plqu,"评论区");
}
console.log(datalist,"asdasdddddddddddd");
// 删除评论
const DlCmt = async data => {
  console.log(data)
    await axios.delete(`/adminapi/message/list/${data.ID}`).then(()=>{
    ElMessage.success('不好的评论我会删哦！')
    getMeList()
  })

  
  // console.log(data);
}
// 删除评论
const DlCmt1 = async x => {

  console.log(x)
  console.log(datalist);
  datalist.value.forEach(item => {
    console.log(item,'item');
    if(item.ID == x.ID){
      item.content = JSON.stringify([])
      txt_list = item
    }
  });
  console.log(txt_list);
  let res =  await axios.put(`/adminapi/message/Dlist`,txt_list)
  console.log(res.data);
  // plqu.value[0].splice(0,1)
  ElMessage.success('删除成功！')
  getMeList()
  // console.log(data);
  // console.log(data);
}

</script>

<style lang="scss" scoped >
.warp{
  position: relative;
  width: 100%;
  height: 100%;
}
.el-card {
  width: 98%;
  margin-bottom: 10px;
  position: relative;
  .icon {
  position: absolute;
  right: 0;
  top: 30px;
  width: 100px;
  height: 50px;
  float: right;
}
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

.other_box{
  display: flex;
  flex: 1;
}
.other_txt{
  margin: auto;
}
.dialog{
z-index: 999;
position: absolute;
top: 0;
left: 0;
background-color: rgba($color: #CCC, $alpha: .5);
width: 100vw;
height:100vh;
.box{
  position: absolute;
  top: 43%;
  left: 39%;
  transform: translate(-50% -50%);
  background-color: #fff;
  width: 300px;
  height: 150px;
  text-align: center;
  .shuru{
    margin-top: 50px;
    width: 90%;
    border-radius: 10px;
  }
  .tijiao{
    margin-top: 10px;
    margin-left: 110px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    background-color: #CCC;
    color: #000;

  }
  .clone{
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
// .small_box{
//   position: relative;
//   .icon1{
//     // position: absolute;
//     right: 0;
//   }
// }

}
</style>