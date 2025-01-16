const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': { // 需要对应后端配置的网关前缀
        target: 'http://localhost:8031/', // 目标服务器服务端口地址
        changeOrigin: true, // 改变请求源
        pathRewrite: { '^/api': '' } // 到达服务器服务端口后，去掉网关前缀
      }
    }
  }
})
