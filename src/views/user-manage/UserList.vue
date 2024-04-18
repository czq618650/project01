<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理
" />
      <el-table :data="tableData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="头像">
          <!-- table支持插槽 -->
          <template #default="scope">
            <!-- scope.row表示当前行 -->
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="adminurl + scope.row.avatar"></el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag class="ml-2" type="danger" v-if="scope.row.role===1">管理员</el-tag>
            <el-tag class="ml-2" type="success" v-else>编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- confirm-button-text确定按钮，cancel-button-text取消按钮，confirm确定的回调 -->
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete( scope.row)">
              <template #reference>
                <el-button v-if="scope.row.username !== 'admin'" size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" :page-size="pageSize4" :page-sizes="[5, 10, 20]" :pager-count="3" :currentPage="currentPage4" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
      <!-- <span>This is a message</span> -->
      <el-form ref="UserFormRef" :model="UserForm" :rules="UserFormRules" label-width="80px" class="demo-ruleForm" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="UserForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="UserForm.password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="UserForm.role" class="m-2" placeholder="Select" style="width: 100%;">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 住址 -->
        <el-form-item label="住址" prop="city">
          <el-select v-model="UserForm.city" class="m-2" placeholder="Select" @change="city">
            <el-option v-for="item in addressDz" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="UserForm.address" type="textarea" />
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="UserForm.introduction" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from '@/util/axios.config'
import { ElMessage } from 'element-plus'
import { adminurl } from '@/util/adminUrl'
const tableData = ref([])
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 表单对象
const UserFormRef = ref()
// 表单校验信息
const UserForm = reactive({
  username: '',
  password: '',
  role: 2, //1表示管理员，编辑
  introduction: '',
  city: 1,
  address: ''
})

// 校验规则
const UserFormRules = reactive({
  username: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入你的密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入你的简介', trigger: 'blur' }],
  city: [{ required: true, message: '请输入你所在省', trigger: 'blur' }],
  address: [{ required: true, message: '请输入你的详细地址', trigger: 'blur' }]
})

const options2 = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 2 }
]

const addressDz = reactive([
  {
    label: '江西省',
    city: ['南昌市', '赣州市', '上饶市', '九江市', '宜春市', '抚州市', '吉安市', '景德镇市', '萍乡市', '新余市', '鹰潭市'],
    value: 1
  },
  {
    label: '北京市',
    value: 2
  },
  {
    label: '天津市',
    value: 3
  },
  {
    label: '河北省',
    value: 4
  },
  {
    label: '山西省',
    value: 5
  },
  {
    label: '内蒙古自治区',
    value: 6
  },
  {
    label: '辽宁省',
    value: 7
  },
  {
    label: '吉林省',
    value: 8
  },
  {
    label: '黑龙江省',
    value: 9
  },
  {
    label: '上海市',
    value: 10
  },
  {
    label: '江苏省',
    value: 11
  },
  {
    label: '浙江省',
    value: 12
  },
  {
    label: '安徽省',
    value: 13
  },
  {
    label: '福建省',
    value: 14
  },
  {
    label: '山东省',
    value: 15
  },
  {
    label: '河南省',
    value: 16
  },
  {
    label: '湖北省',
    value: 17
  },
  {
    label: '湖南省',
    value: 18
  },
  {
    label: '广东省',
    value: 19
  },
  {
    label: '广西壮族自治区',
    value: 20
  },
  {
    label: '海南省',
    value: 21
  },
  {
    label: '重庆市',
    value: 22
  },
  {
    label: '四川省',
    value: 23
  },
  {
    label: '贵州省',
    value: 24
  },
  {
    label: '云南省',
    value: 25
  },
  {
    label: '西藏自治区',
    value: 26
  },
  {
    label: '陕西省',
    value: 27
  },
  {
    label: '甘肃省',
    value: 28
  },
  {
    label: '青海省',
    value: 29
  },
  {
    label: '宁夏回族自治区',
    value: 30
  },
  {
    label: '新疆维吾尔自治区',
    value: 31
  }
])

onMounted(() => {
  // 获取用户列表数据
  getTableDate()
})
// 获取用户列表数据
const getTableDate = async () => {
  const res = await axios.get('/adminapi/user/list')
  console.log(res.data.data)
  tableData.value = res.data.data
  console.log(tableData.value.length)
}
// 控制对话框是否弹出
const dialogVisible = ref(false)

// 编辑
const handleEdit = async data => {
  console.log(data.ID)
  const res = await axios.get(`/adminapi/user/edlist/${data.ID}`)
  console.log(res.data.data[0])
  // 将第二个参数中的数据复制到第一个参数中，如果有相同的属性名则会覆盖一地个参数中的
  Object.assign(UserForm, res.data.data[0])
  dialogVisible.value = true
}

// 编辑确定用户
const handleEditConfirm = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  UserFormRef.value.validate(async valid => {
    if (valid) {
      console.log(UserForm)
      // 1.更新后端
      await axios.put(`/adminapi/user/uplist/${UserForm.ID}`, UserForm)
      // 2.diaload隐藏
      dialogVisible.value = false
      ElMessage.success('更新用户成功')
      // 3.重新获取table数据
      getTableDate()
    }
  })
}

// 删除
const handleDelete = async data => {
  // console.log(data)
  await axios.delete(`/adminapi/user/list/${data.ID}`)
  getTableDate()
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
.el-pagination {
  margin-left: 25%;
}
</style>