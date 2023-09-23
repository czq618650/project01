<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理
" />
      <el-table :data="tableData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
        <el-table-column prop="author" label="作者" v-if="store.state.UserInfo.role === 1" />
        <el-table-column prop="title" label="产品名称" />
        <el-table-column prop="introduction" label="简要描述">
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            <!-- scope.row获取当前行的数据 -->
            {{formatTime.getTime(scope.row.editTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- confirm-button-text确定按钮，cancel-button-text取消按钮，confirm确定的回调 -->
            <!-- <el-button circle :icon="Star" size="small" type="success" @click="handlePreView(scope.row)"></el-button> -->
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
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" :page-size="pageSize4" :pager-count="3" :page-sizes="[5, 10, 20]" :currentPage="currentPage4" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
// 显示新闻预览
const dialogVisible = ref(false)
onMounted(() => {
  getTableData()
})
// 获取新闻表格数据
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/Uplist')
  console.log(store.state.UserInfo.username)
  if (store.state.UserInfo.role === 1) {
    console.log('管理员')
    tableData.value = res.data.data
    /*
    //原始数据
    tableData.value = res.data.data
    console.log(tableData.value)
    */
  } else {
    console.log('编辑')
    const x = []
    console.log(res.data.data)
    for (let item in res.data.data) {
      // if(res.data.data[item])
      if (res.data.data[item].username === store.state.UserInfo.username) {
        console.log(res.data.data)
        x.push(res.data.data[item])
      }

      /*
      //修改前的数据

      if (res.data.data[item].author === store.state.UserInfo.username) {
        x.push(res.data.data[item])
      }
      */
    }
    console.log(x)
    tableData.value = x
  }
}
// 格式化时间

// 删除回调
const handleDelete = async data => {
  console.log(data)
  await axios.delete(`/adminapi/product/list/${data.ID}`)
  await getTableData()
}
// 编辑回调
const handleEdit = data => {
  console.log(data)
  // 跳转到/news-manage/editnews/:id
  router.push(`/product-manage/editproduct/${data.ID}`)
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