<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>联系管理员</span>

        </div>
      </template>
      <!-- UserFormRef校验表单，UserForm表单信息，UserFormRules表单校验规则 -->
      <el-form ref="UsMeFormRef" :model="UsMeForm" :rules="UsMeFormRules" label-width="120px" class="demo-ruleForm" status-icon>

        <el-form-item label="评论" prop="introduction">
          <!-- 富文本组件 -->
          <editor @event="handleContant"></editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交建议</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import editor from '@/components/editor/Editor.vue'
import { useStore } from 'vuex'
import axios from '@/util/axios.config'
import { ElMessage } from 'element-plus'

const store = useStore()
const UsMeFormRef = ref()
// 表单校验信息
const UsMeForm = reactive({
  author: store.state.UserInfo.username,
  avatar: store.state.UserInfo.avatar,
  content:JSON.stringify([]),
  introduction: ''
})

// 校验规则
const UsMeFormRules = reactive({
  introduction: [{ required: true, message: '请输入你的简介', trigger: 'blur' }]
})

const submitForm = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  UsMeFormRef.value.validate(async valid => {
    if (valid) {
      const res = await axios.post('/adminapi/message/addmess', UsMeForm)
      //   console.log(UsMeForm)
      console.log(res)
      ElMessage.success('感谢评论')
    }
  })
}
// 获得editor组件内容
const handleContant = data => {
  // console.log(data)
  UsMeForm.introduction = data
}
</script>

<style lang="scss" scoped>
.box-card {
  text-align: center;
}
</style>