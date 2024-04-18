import axios from "axios"


const http =  axios.create({
  // baseURL:"http://localhost:8080",
  // baseURL:"http://www.chenze518.top:3333",
  timeout:120000
})

// // 添加请求拦截器
// http.interceptors.request.use(function (config) {
//   config.headers.Authorization =  "Bearer " + localStorage.getItem("token")
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// http.interceptors.response.use(function (response) {

//     return response;
//   }, function (error) {

//     return Promise.reject(error);
//   });

  export default http  