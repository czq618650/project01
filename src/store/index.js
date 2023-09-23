import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouter:false,//表示是否第一次加载子路由,t表示不是第一次，f表示第一次
    isCollapsed:true,//是否折叠
    UserInfo:{}//存取用户信息
  },
  getters: {
  },
  mutations: {
    // 改变是否第一次访问路由
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    // 改变属狗折叠
    changeCollapsed(state){
      state.isCollapsed = !state.isCollapsed
    },
    //存取用户信息 
    changeUserInfo(state,value){
      state.UserInfo = {
        ...state.UserInfo,
        ...value
      }
    },
    // 退出后清楚用户信息
    clearUserInfo(state,value){
      state.UserInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 控制数据持久化，刷新不会消失
  plugins: [createPersistedState({
    paths:["isCollapsed","UserInfo"]//控制只让数组中的数据持久化持久化
  })]
})
