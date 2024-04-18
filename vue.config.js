const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // 分包
  // packageOptions:{
  //   // 分包
  //   splitChunks:{
  //     chunks:'all',
  //     // 指定要提取的包的名称
  //     name:'vendor',
  //     // 指定要提取的包的大小
  //     maxSize:200000
  //   }
  // },
  devServer:{
    // 反向代理
    // port:8003,
    proxy:{
      // 如果访问以下接口则需要代理
      "/adminapi":{
        // target:"http://www.chenze518.top:3000", //需要代理访问的api地址
        target:"http://localhost:3000",
        changeOrigin:true,  //允许跨域请求
      }
    }
  }
})
