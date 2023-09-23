<template>
  <div id="myeditor">

  </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import E from 'wangeditor'
const emit = defineEmits(['event'])

const props = defineProps({
  contant: String
})

// 因为setup函数调用的时机比较早，dom元素还有没有渲染到页面上，所以在onMounted回调函数中，我们才能获取dom元素
onMounted(() => {
  const editor = new E('#myeditor')
  editor.create()
  // 初始化props.contant的值！！！重点
  props.contant && editor.txt.html(props.contant)
  // 配置 onchange 回调函数
  editor.config.onchange = function (newHtml) {
    // console.log('change 之后最新的 html', newHtml)
    emit('event', newHtml)
  }
})
</script>

<style>
</style>