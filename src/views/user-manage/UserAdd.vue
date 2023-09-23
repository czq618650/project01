<template>
  <div>
    <el-page-header content="添加用户" icon="" title="用户管理
" />
    <el-form ref="UserFormRef" :model="UserForm" :rules="UserFormRules" label-width="80px" class="demo-ruleForm" status-icon>
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="UserForm.username" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="UserForm.password" />
      </el-form-item>
      <!-- 权限 -->
      <el-form-item label="权限" prop="role">
        <el-select v-model="UserForm.role" class="m-2" placeholder="Select" style="width: 100%;">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别" prop="gender">
        <el-select v-model="UserForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
      <!-- 简介 -->
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="UserForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="UserForm.avatar" @chenzeChange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUser()">提交用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import axios from '@/util/axios.config'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 表单对象
const UserFormRef = ref()
// 表单校验信息
const UserForm = reactive({
  username: '',
  password: '',
  role: 2, //1表示管理员，编辑
  gender: 1,
  city: 1,
  address: '',
  introduction: '',
  avatar: '',
  file: null
})

// 校验规则
const UserFormRules = reactive({
  username: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入你的密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
  address: [{ required: true, message: '请选择地区', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入你的简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传你的头像', trigger: 'blur' }]
})

const options = reactive([
  {
    label: '保密',
    value: 0
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
])

// 地址
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
    label: '江西省',
    value: 15
  },
  {
    label: '山东省',
    value: 16
  },
  {
    label: '河南省',
    value: 17
  },
  {
    label: '湖北省',
    value: 18
  },
  {
    label: '湖南省',
    value: 19
  },
  {
    label: '广东省',
    value: 20
  },
  {
    label: '广西壮族自治区',
    value: 21
  },
  {
    label: '海南省',
    value: 22
  },
  {
    label: '重庆市',
    value: 23
  },
  {
    label: '四川省',
    value: 24
  },
  {
    label: '贵州省',
    value: 25
  },
  {
    label: '云南省',
    value: 26
  },
  {
    label: '西藏自治区',
    value: 27
  },
  {
    label: '陕西省',
    value: 28
  },
  {
    label: '甘肃省',
    value: 29
  },
  {
    label: '青海省',
    value: 30
  },
  {
    label: '宁夏回族自治区',
    value: 31
  },
  {
    label: '新疆维吾尔自治区',
    value: 32
  }
])

const options2 = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 2 }
]

// 每次选完文件后的上传
const handleChange = file => {
  console.log(file)
  // 把选择的图片显示在上传按钮
  // 生成的是二进制
  // console.log(URL.createObjectURL(file.raw))
  UserForm.avatar = URL.createObjectURL(file)
  UserForm.file = file
}

// 提交用户
const submitUser = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  UserFormRef.value.validate(async valid => {
    if (valid) {
      // 判断用户是否存在
      const x = await upload('/adminapi/user/finduser', UserForm)
      console.log(x)
      if (x.ActionType === '不可以用') {
        ElMessage.error('用户名重复')
      } else {
        // 添加用户
        await upload('/adminapi/user/adduser', UserForm)
        ElMessage.success('添加用户成功')
        router.push('/user-manage/userlist')
      }
    }
  })
}
</script>

<style lang="scss">
.demo-ruleForm {
  margin-top: 50px;
}
</style>