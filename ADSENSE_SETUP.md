# AdSense集成设置指南

## 已完成的集成工作

✅ **基础设置完成**
1. AdSense脚本已添加到 `public/index.html`
2. 创建了可复用的 `AdSenseAd.vue` 组件
3. 在主要页面添加了广告位：
   - HomePage (首页) - banner广告
   - AstrologyResultsPage (占星结果页) - rectangle广告
   - BaziResultsPage (八字结果页) - rectangle广告

## 需要您完成的配置

### 1. 获取实际的广告位ID

登录您的Google AdSense账户，创建广告单元并获取广告位ID，然后更新以下文件：

**更新 `.env` 文件：**
```bash
# 将这些占位符替换为您实际的广告位ID
VUE_APP_AD_SLOT_BANNER=您的横幅广告位ID
VUE_APP_AD_SLOT_RECTANGLE=您的矩形广告位ID  
VUE_APP_AD_SLOT_RESPONSIVE=您的响应式广告位ID
```

**更新 `.env.production` 文件：**
```bash
# 同样替换为实际的广告位ID
VUE_APP_AD_SLOT_BANNER=您的横幅广告位ID
VUE_APP_AD_SLOT_RECTANGLE=您的矩形广告位ID
VUE_APP_AD_SLOT_RESPONSIVE=您的响应式广告位ID
```

### 2. AdSense账户验证

确保您的AdSense账户已经：
- ✅ 通过审核
- ✅ 网站 `meiban.info` 已添加到允许的网站列表
- ✅ 广告代码正常工作

### 3. 测试广告显示

#### 开发环境测试：
```bash
npm run serve
```
- 广告默认在开发环境中启用
- 如需禁用开发环境广告，在 `.env` 中设置：`VUE_APP_ADSENSE_ENABLED=false`

#### 生产环境测试：
```bash
npm run build
npm run deploy
```

## 广告位置说明

### 首页 (HomePage)
- **位置**: 分析选择按钮下方，footer上方
- **类型**: Banner广告 (728x90 或响应式)
- **样式**: 居中显示，最大宽度728px

### 结果页面 (AstrologyResultsPage & BaziResultsPage)  
- **位置**: 主要内容下方，footer上方
- **类型**: Rectangle广告 (300x250)
- **样式**: 居中显示，最大宽度300px

## 组件使用方法

如需在其他页面添加广告，使用以下代码：

```vue
<template>
  <!-- 其他内容 -->
  
  <!-- 横幅广告 -->
  <AdSenseAd 
    :ad-slot="$options.AD_SLOTS.BANNER"
    container-class="banner"
  />
  
  <!-- 矩形广告 -->
  <AdSenseAd 
    :ad-slot="$options.AD_SLOTS.RECTANGLE"
    container-class="rectangle"
  />
  
  <!-- 响应式广告 -->
  <AdSenseAd 
    :ad-slot="$options.AD_SLOTS.RESPONSIVE"
    container-class="responsive"
  />
</template>

<script>
import AdSenseAd from '../components/AdSenseAd.vue'

export default {
  AD_SLOTS: {
    BANNER: process.env.VUE_APP_AD_SLOT_BANNER || 'fallback_id',
    RECTANGLE: process.env.VUE_APP_AD_SLOT_RECTANGLE || 'fallback_id',
    RESPONSIVE: process.env.VUE_APP_AD_SLOT_RESPONSIVE || 'fallback_id'
  },
  
  components: {
    AdSenseAd
  }
}
</script>
```

## 故障排除

### 广告不显示的常见原因：
1. **广告位ID错误** - 检查环境变量中的ID是否正确
2. **网站未通过AdSense审核** - 等待审核通过
3. **广告被浏览器拦截** - 测试时暂时禁用广告拦截器
4. **网络连接问题** - 检查控制台是否有网络错误

### 调试提示：
- 打开浏览器开发者工具查看控制台错误
- 检查网络标签页确认AdSense脚本是否成功加载
- 在生产环境测试，某些广告只在生产环境显示

## 下一步

1. 替换环境变量中的占位符广告位ID
2. 部署到生产环境测试
3. 监控AdSense控制台的收益和展示数据
4. 根据数据优化广告位置和类型