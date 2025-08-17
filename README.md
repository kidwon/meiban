# 命盤 (Meiban) - 占星命理分析应用

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-Live-green?style=flat-square&logo=github)](https://meiban.info)

一个现代化的命理分析应用，提供八字命盘计算、西洋占星分析和行运分析功能。支持三种语言（日语、中文、英语），具有响应式设计和直观的用户界面。

## 🌟 主要功能

### 📊 八字命盘分析
- **生辰八字计算** - 精确的天干地支计算系统
- **五行分析** - 完整的五行相生相克分析
- **大运流年** - 详细的运势分析和时间节点预测
- **性格特质** - 基于八字的个性分析

### 🌌 西洋占星分析
- **星盘计算** - 高精度的天体位置计算
- **交互式星盘图** - 可视化的星盘展示和行星详情
- **十二星座解读** - 太阳、月亮、上升星座的详细分析
- **事业分析** - 职业优势和适合职业推荐
- **感情分析** - 爱情表达和人际关系特质
- **运势预测** - 综合运势评估

### 🔄 行运分析
- **未来趋势预测** - 基于天体运行的时间分析
- **行运行星影响** - 详细的行星过境分析
- **时机诊断** - 重要决策的最佳时机建议

### 🌍 多语言支持
- **日语** (主要语言)
- **中文** (简体/繁体)
- **英语**

## 🚀 快速开始

### 环境要求
- Node.js 14.0+ 
- npm 6.0+

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/kidwon/meiban.git
cd meiban

# 安装依赖
npm install

# 启动开发服务器
npm run serve
```

应用将在 `http://localhost:8081` 启动

### 构建和部署

```bash
# 生产构建
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 🛠️ 技术栈

### 前端框架
- **Vue.js 3.2.13** - 渐进式JavaScript框架
- **Vue Router 4.0.3** - 官方路由管理器
- **Vuex 4.0.0** - 状态管理模式

### 核心依赖
- **Day.js 1.11.9** - 轻量级日期处理库
- **Core-js 3.8.3** - JavaScript标准库

### 开发工具
- **Vue CLI 5.0** - Vue.js开发工具链
- **ESLint** - 代码质量检查
- **Babel** - JavaScript编译器
- **gh-pages** - GitHub Pages部署工具

## 📁 项目结构

```
src/
├── components/           # 可复用组件
│   ├── StarChart/       # 星盘图组件
│   ├── LanguageSwitcher.vue
│   └── BirthDataForm.vue
├── views/               # 页面组件
│   ├── HomePage.vue     # 首页
│   ├── BaziResultsPage.vue      # 八字结果页
│   ├── AstrologyResultsPage.vue # 占星结果页
│   └── TransitAnalysisPage.vue  # 行运分析页
├── services/            # 业务逻辑服务
│   ├── astrologyDataService.js  # 占星数据服务
│   └── calculationEngine.js     # 计算引擎
├── utils/               # 工具函数
│   ├── calculator.js    # 天文计算
│   ├── cityCoordinates.js # 城市坐标数据
│   └── chartCalculator.js # 星盘计算
├── i18n/               # 国际化配置
│   └── locales/        # 语言文件
├── store/              # Vuex状态管理
├── router/             # 路由配置
└── assets/             # 静态资源
```

## 🔧 核心算法

### 天文计算引擎
- **儒略日计算** - 高精度时间转换
- **太阳位置计算** - VSOP87简化算法
- **月亮位置计算** - 精确的月球轨道计算
- **上升星座计算** - 针对中国地区优化的算法

### 八字计算系统
- **干支历法转换** - 准确的农历计算
- **节气计算** - 24节气精确时间
- **五行分析** - 完整的相生相克逻辑

## 🌐 国际化支持

应用支持完整的多语言切换，包括：
- 界面文本本地化
- 星座名称适配不同语言习惯
- 文化敏感内容的本地化处理
- 动态语言切换和状态保持

## 📱 响应式设计

- **移动端优化** - 完整的手机端适配
- **平板电脑支持** - 中等屏幕尺寸优化
- **桌面端体验** - 大屏幕友好设计
- **触摸友好** - 支持触摸操作和手势

## 🚀 部署

应用部署在自定义域名：
**访问地址**: [https://meiban.info](https://meiban.info)

### 自动部署
每次推送到 `main` 分支时，会自动触发 GitHub Actions 部署流程。

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 Vue.js 官方风格指南
- 保持代码注释的准确性和完整性

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 出色的前端框架
- [Day.js](https://day.js.org/) - 优秀的日期处理库
- 天文算法参考资料和开源社区的贡献

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 [Issue](https://github.com/kidwon/meiban/issues)
- 发送邮件至项目维护者

---

**命盤 (Meiban)** - 让古老的智慧与现代技术完美融合 ✨