<template>
  <div>
    <Particles id="tsparticles" :options="options" />

    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="admin" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="text" autocomplete="off" placeholder="123456" />
        </el-form-item>
        <!-- //@keyup="login()" -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/util/axios.config'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()

// 创建路由实例
const router = useRouter()
// 表单绑定的响应式对象
const loginForm = reactive({
  username: '',
  password: ''
})
// console.log();
// 表单绑定的引用对象
const loginFormRef = ref()
// 表单验证规则
const loginRules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    { min: 3, max: 9, message: 'Length should be 3 to 9', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    { min: 3, max: 9, message: 'Length should be 3 to 9', trigger: 'blur' }
  ]
})
// 按回车实现登录
document.addEventListener('keyup', e => {
  var key = window.events ? e.keyCode : e.which
  if (key === 13) {
    submitForm()
  }
})

// 提交表单函数
const submitForm = () => {
  // 1.校验表单
  // form事件
  loginFormRef.value.validate(data => {
    if (data) {
      axios.post('/adminapi/user/login', loginForm).then(res => {
        console.log(res.data,"我是登录数据")
        if (res.data.ActionType === 'ok') {
          localStorage.setItem('token', res.data.data.token)
          console.log(res.data.data,"登录数据2")
          // 把用户信息存到vuex中方便通信
          store.commit('changeUserInfo', res.data.data)
          // 再走一遍路由配置
          store.commit('changeGetterRouter', false)
          router.push('/home')
        } else {
          console.log(res.data)
          ElMessage.error('用户名密码不匹配')
        }
      })
    }
  })
  // 2.拿到表单内容,提交到后台
  // 3.设置token
}

// 配置particles,粒子库
const options = {
  background: {
    color: {
      value: '#2d3a4b'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
}
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }
  .loginForm {
    margin-top: 20px;
  }
}

::v-deep .el-form-item__label {
  color: white;
}
</style>