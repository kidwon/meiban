const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 使用自定义域名时，publicPath应该设置为根路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // 优化性能
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  // PWA适配设置
  pwa: {
    name: '命盤',
    themeColor: '#d35400',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  }
})