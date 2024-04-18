import { createRouter, createWebHashHistory ,createWebHistory} from 'vue-router'
import RoutesConfig from "./config.js"
import store from '@/store/index.js'

const routes = [
{
  path:"/login",
  name:"login",
  component:()=>import("@/views/Login.vue"),
},
{
  path:"/mainbox",
  name:"mainbox",
  component:()=>import("@/views/MainBox.vue"),
},
{
  path:"/dataScreen",
  component:()=>import("@/views/DataScreen/DataScreen.vue"),
},
{
  path:"/map",
  component:()=>import("@/views/DataScreen/chinaMap/Map.vue"),
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 每次路由跳转的时候执行
router.beforeEach((to,from,next)=>{
  if(to.name === "login"){
    next()
  } else{
    // 1.如果登录，则next()
    // 没登录则重定向到login
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    } else{
      // 如果为false表示第一次，不是第一次则直接放行
      // 为false表示第一次，动态添加路由后先跑一边
      if(store.state.isGetterRouter){
        next()
      } else{
        // 1.2添加路由前要先删掉/覆盖前面的路由
        router.removeRoute("mainboox")
        // 因为没跳转一次路由都会添加，所以不是第一次直接跳过
        ConfigRouter()
        next({
          // to.fullPath先全跑一遍
          path:to.fullPath
        })
      }
    }
  }
})

const ConfigRouter = ()=>{
  // 如果没有mainbox，就先加上父路由
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path:"/mainbox",
      name:"mainbox",
      component:MainBox
    })
  }

  RoutesConfig.forEach(item=>{
    // 第一个参数表示父亲路由
    // 1.3应为直接通过路径访问地址，不会刷新vuex，不更改isGetterRouter，所以要重新跑一边路由，为false
    checkPermission(item) && router.addRoute("mainbox",item)
  })

  // 表示第一次过了，则isGetterRouter = ture
  store.commit("changeGetterRouter",true)
}
// 判断是不是管理员权限1.1
const checkPermission = (item)=>{
  if(item.requireAdmin){
      return store.state.UserInfo.role === 1
  }
  return true
}

export default router
