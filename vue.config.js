const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer:{
    // 反向代理
    // port:8003,
    proxy:{
      // 如果访问以下接口则需要代理
      "/adminapi":{
        target:"http://127.0.0.1:3000", //需要代理访问的api地址
        changeOrigin:true,  //允许跨域请求
        // pathPewrite:{
        //   '^adminapi':'' //填写需要跨域的地址
        // }
      }
    }
  }
})
