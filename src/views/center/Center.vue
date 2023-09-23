<template>
  <div>
    <el-page-header content="个人中心" icon="" title="企业门户网站管理系统
" />
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.UserInfo.username }}</h3>
          <h5>{{ store.state.UserInfo.role===1 ? "管理员" : "编辑" }}</h5>
        </el-card>

      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>

            </div>
          </template>
          <!-- UserFormRef校验表单，UserForm表单信息，UserFormRules表单校验规则 -->
          <el-form ref="UserFormRef" :model="UserForm" :rules="UserFormRules" label-width="120px" class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="UserForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="UserForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
              <el-input v-model="UserForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="UserForm.avatar" @chenzeChange="handleChange"></Upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload.vue'
const store = useStore()

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

const { ID, username, gender, avatar, introduction } = store.state.UserInfo
// 表单对象
const UserFormRef = ref()
// 表单校验信息
let UserForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null
})

// 校验规则
const UserFormRules = reactive({
  username: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入你的简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传你的头像', trigger: 'blur' }]
})

// 头像
const avatarUrl = computed(() => (store.state.UserInfo.avatar ? 'http://127.0.0.1:3000' + store.state.UserInfo.avatar : store.state.UserInfo.avatar))

// 每次选完文件后的上传
const handleChange = file => {
  // 把选择的图片显示在上传按钮
  // 生成的是二进制
  // console.log(URL.createObjectURL(file.raw))
  UserForm.avatar = URL.createObjectURL(file)
  UserForm.file = file
}

// 更新按钮
const submitForm = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  UserFormRef.value.validate(async valid => {
    if (valid) {
      // console.log(Object.assign(UserForm, { ID: ID }))
      UserForm = Object.assign(UserForm, { ID: ID })
      // console.log(UserForm)
      // UserForm.push(ID)
      const res = await upload('/adminapi/user/upload', UserForm)
      console.log(res)
      if (res.ActionType === 'ok') {
        store.commit('changeUserInfo', res.data)
        // console.log(UserForm.introduction)
        // location.reload()
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('更新失败')
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>