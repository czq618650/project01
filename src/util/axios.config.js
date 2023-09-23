import axios from "axios"


const http =  axios.create({
  baseURL:"http://localhost:8080",
  timeout:120000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 登录成功后存取的token，在请求接口前带上token
    // 请求的请求头要加上"Bearer " 
    // console.log('请求前');
    const token = localStorage.getItem("token")

    config.headers.Authorization = "Bearer " + token
console.log(config.headers.Authorization);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    console.log(response.headers);

    const {authorization} = response.headers

    authorization && localStorage.setItem("token",authorization)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error);
    // const {status} = error.response 
    // if(status === 401){
    //   // 如果token过期则跳转到登录界面
    //   localStorage.removeItem("token")
    //   window.location.href = "#/login"
    //   console.log(error);
    // }
    return Promise.reject(error);
  });

  export default http  