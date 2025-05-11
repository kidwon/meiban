const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 设置publicPath为仓库名，这在GitHub Pages中很重要
  // 将'meiban-app'替换为您的GitHub仓库名称
  publicPath: process.env.NODE_ENV === 'production'
    ? '/meiban-app/'
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