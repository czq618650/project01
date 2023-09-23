<template>
  <!-- :show-file-list是否显示已上传文件列表,:auto-upload书否自动上传 -->
  <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false" :auto-upload="false" :on-change="handleChange">
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  avatar: String
})

const emit = defineEmits(['chenzeChange'])

const uploadAvatar = computed(() => (props.avatar.includes('blob') ? props.avatar : 'http://127.0.0.1:3000' + props.avatar))

// 每次选完文件后的上传
const handleChange = file => {
  // file表示选中文件的属性
  console.log(file)
  emit('chenzeChange', file.raw)
}
</script>  

<style lang="scss" scoped>
::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>