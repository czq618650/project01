<template>
  <div>
    <el-card>
      <el-page-header content="新闻列表" icon="" title="新闻管理
" />
      <el-table :data="tableData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
        <el-table-column prop="author" label="作者" v-if="store.state.UserInfo.role === 1" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="type" label="新闻类型">
          <template #default="scope">
            <!-- scope.row获取当前行的数据 -->
            {{typeFormat(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            <!-- scope.row获取当前行的数据 -->
            {{formatTime.getTime(scope.row.editTime)}}
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0" @change="handleSwitchChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- confirm-button-text确定按钮，cancel-button-text取消按钮，confirm确定的回调 -->
            <el-button circle :icon="Star" size="small" type="success" @click="handlePreView(scope.row)"></el-button>
            <el-button circle :icon="Edit" size="small" @click="handleEdit(scope.row)"></el-button>
            <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete( scope.row)">
              <template #reference>
                <el-button circle :icon="Delete" size="small" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" :page-size="pageSize4" :page-sizes="[5, 10, 20]" :pager-count="3" :currentPage="currentPage4" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewDate.title }}</h2>
        <div style="font-size: 12px; color: gray;">{{formatTime.getTime(previewDate.editTime)}}</div>
        <!-- 对话框分割线 -->
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewDate.contant" class="contant"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/util/axios.config'
import formatTime from '@/util/formatTime'
import { Delete, Edit, Star, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const tableData = ref([])
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const previewDate = ref({})
// 显示新闻预览
const dialogVisible = ref(false)
onMounted(() => {
  getTableData()
})
// 获取新闻表格数据
const getTableData = async () => {
  // const res = await axios.get('/adminapi/news/list', store.state.UserInfo)
  const res = await axios.get('/adminapi/user/Unlist', store.state.UserInfo)

  console.log(store.state.UserInfo.username)
  // console.log(res.data.data)
  console.log(res.data.data)

  if (store.state.UserInfo.role === 1) {
    console.log('管理员')
    /*//修改后数据*/
    tableData.value = res.data.data
    // 最开始数据！！！！！！！！！！！！！！！！！
    // tableData.value = res.data.data
    // console.log(tableData.value)
  } else {
    console.log('编辑')

    console.log(res.data.data)
    // if(res.data.data[item])
    let x = []
    for (let item in res.data.data) {
      if (res.data.data[item].username === store.state.UserInfo.username) {
        console.log(res.data.data[item])
        x.push(res.data.data[item])
      }
    }
    console.log(x)
    tableData.value = x
  }
}
/* 优化代码
// const getTableData = async () => {
//   const res = await axios.get('/adminapi/user/Unlist', store.state.UserInfo)

//   const tableDataArr = []
//   res.data.data.forEach(userData => {
//     if (store.state.UserInfo.role === 1) {
//       tableDataArr.push(...userData.items)
//     } else {
//       if (userData.username === store.state.UserInfo.username) {
//         tableDataArr.push(...userData.items)
//       }
//     }
//   })

//   tableData.value = tableDataArr
// }
*/
// type初始值为1,2,3，格式化新闻类型处理函数
const typeFormat = type => {
  const arr = ['最新动态', '典型案例', '通知公告']
  return arr[type - 1]
}
// 格式化时间

//开关处理函数
const handleSwitchChange = async item => {
  console.log(item)
  // 更新isPublish值
  await axios.put('/adminapi/news/publish', {
    ID: item.ID,
    isPublish: item.isPublish
  })
  // 更新后重新获取数据
  await getTableData()
}

// 新闻预览
const handlePreView = data => {
  // console.log(data)
  previewDate.value = data
  dialogVisible.value = true
}

// 删除回调
const handleDelete = async data => {
  console.log(data)
  await axios.delete(`/adminapi/news/list/${data.ID}`)
  await getTableData()
}
// 编辑回调
const handleEdit = data => {
  console.log(data)
  // 跳转到/news-manage/editnews/:id
  router.push(`/news-manage/editnews/${data.ID}`)
}

// 每页条数发生改变
const handleSizeChange = val => {
  pageSize4.value = val
  console.log(pageSize4.value)
}
// 页数发生改变
const handleCurrentChange = val => {
  currentPage4.value = val
  console.log(currentPage4.value)
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
::v-deep .contant {
  img {
    max-width: 100%;
  }
}
</style>