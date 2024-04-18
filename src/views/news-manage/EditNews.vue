<template>
  <div>
    <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理
" />
    <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm" status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="contant">
        <!-- 富文本组件 -->
        <!-- 组件刚被创建的时候初始值为空，所有要v-if -->
        <editor @event="handleContant" :contant="newsForm.contant" v-if="newsForm.contant"></editor>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="newsForm.type" class="m-2" placeholder="Select" style="width: 100%;">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <Upload :avatar="newsForm.cover" @chenzeChange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitNews()">更新新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
// import editor from '@/components/editor/Editor.vue'
// import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
// import router from '@/router'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/util/axios.config'
import { ElMessage } from 'element-plus'
const editor = defineAsyncComponent(() => import('@/components/editor/Editor.vue'))
const Upload = defineAsyncComponent(() => import('@/components/upload/Upload.vue'))
const components = {
  editor,
  Upload
}
const router = useRouter()
// 获取当前路由信息
const route = useRoute()
// 表单对象
const newsFormRef = ref()
// 表单元素
const newsForm = reactive({
  title: '',
  contant: '',
  type: 1, //1.最新动态，2.典型案例，3.通知公告
  cover: '', //封面图片
  file: null,
  isPublist: 0 //0表示未发布，1表示已经发布
})

// 校验规则
const newsFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  contant: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }]
})

const options2 = [
  { label: '最新动态', value: 1 },
  { label: '典型案例', value: 2 },
  { label: '通知公告', value: 3 }
]

onMounted(async () => {
  console.log(route.params.id)
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
  console.log(res.data.data[0])
  // 用于覆盖
  Object.assign(newsForm, res.data.data[0])
})

// 获得editor组件内容
const handleContant = data => {
  // console.log(data)
  newsForm.contant = data
}
// 返回上一页
const handleBack = () => {
  router.back()
}

const handleChange = file => {
  // 把选择的图片显示在上传按钮
  // 因为生成的不带路径
  // 生成的是二进制
  // console.log(URL.createObjectURL(file.raw))
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = file
  console.log(newsForm.file)
}

const submitNews = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  newsFormRef.value.validate(async valid => {
    if (valid) {
      const res = await upload('/adminapi/news/updatelist', newsForm)
      console.log(newsForm)
      console.log(res)
      ElMessage.success('更新新闻成功')
      // router.back()
    }
  })
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>