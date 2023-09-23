<template>
  <div>
    <el-page-header content="添加产品" icon="" title="产品管理
" />
    <el-form ref="productFormRef" :model="productForm" :rules="productRules" label-width="80px" class="demo-ruleForm" status-icon>
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />

      </el-form-item>

      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @chenzeChange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitProduct()">创建产品</el-button>
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
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
// 表单对象
const productFormRef = ref()
// 表单校验信息
const productForm = reactive({
  title: '',
  author: store.state.UserInfo.username,
  introduction: '',
  detail: '',
  cover: '',
  file: null
})

// 校验规则
const productRules = reactive({
  title: [{ required: true, message: '请输入产品标题', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入产品简要', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入详细简要', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传产品头像', trigger: 'blur' }]
})

// 每次选完文件后的上传
const handleChange = file => {
  console.log(file)
  // 把选择的图片显示在上传按钮
  // 生成的是二进制
  // console.log(URL.createObjectURL(file.raw))
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

// 提交用户
const submitProduct = () => {
  // UserFormRef.value.validate校验表单的数据，参数valid为bool值
  productFormRef.value.validate(async valid => {
    if (valid) {
      console.log(productForm)
      const res = await upload('/adminapiu/product/add', productForm)
      console.log(res)
      router.push('/product-manage/productlist')
      ElMessage.success('添加产品成功')
    }
  })
}
</script>

<style lang="scss">
.demo-ruleForm {
  margin-top: 50px;
}
</style>