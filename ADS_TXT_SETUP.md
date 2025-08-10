# ads.txt文件设置指南

## ✅ ads.txt文件已创建并验证

### 📄 文件位置
- 源文件: `public/ads.txt`
- 构建后: `dist/ads.txt` 
- 部署后访问地址: `https://meiban.info/ads.txt`

### 🔍 文件内容验证

**当前配置**:
```
google.com, pub-8250499267865326, DIRECT, f08c47fec0942fa0
```

**格式验证**:
- ✅ **域名**: `google.com` (正确)
- ✅ **发布商ID**: `pub-8250499267865326` (您的AdSense账户ID)
- ✅ **关系类型**: `DIRECT` (直接关系)
- ✅ **认证机构ID**: `f08c47fec0942fa0` (Google TAG-CP认证ID)

### 📋 IAB ads.txt标准符合性检查

1. **✅ 文件格式**: 纯文本文件，UTF-8编码
2. **✅ 字段数量**: 4个必需字段全部存在
3. **✅ 分隔符**: 逗号分隔，空格正确处理
4. **✅ 关系类型**: DIRECT关系类型正确
5. **✅ Google认证**: 使用官方TAG-CP认证ID

### 🚀 部署步骤

1. **构建项目**:
   ```bash
   npm run build
   ```

2. **验证ads.txt存在**:
   ```bash
   ls dist/ads.txt  # 确认文件已复制到构建目录
   ```

3. **部署到GitHub Pages**:
   ```bash
   npm run deploy
   ```

4. **验证线上访问**:
   ```
   https://meiban.info/ads.txt
   ```

### 🔧 AdSense控制台验证

部署后24-48小时内：

1. 登录 [AdSense控制台](https://www.google.com/adsense/)
2. 导航到 **网站** → **meiban.info**
3. 检查 **ads.txt状态** 是否从"未找到"变为"✅ 正常"

### 📊 常见问题排查

#### 问题1: "ads.txt文件未找到"
- **原因**: 文件未正确部署或URL访问有问题
- **解决**: 确认 `https://meiban.info/ads.txt` 可以直接访问

#### 问题2: "ads.txt格式错误" 
- **原因**: 文件格式不符合IAB标准
- **解决**: 检查逗号分隔、字段数量、编码格式

#### 问题3: "发布商ID不匹配"
- **原因**: ads.txt中的pub-ID与AdSense账户不一致
- **解决**: 确认pub-8250499267865326是您的正确AdSense ID

### 🔍 验证工具

**手动验证**:
```bash
curl -s https://meiban.info/ads.txt | grep -v '^#'
```

**预期输出**:
```
google.com, pub-8250499267865326, DIRECT, f08c47fec0942fa0
```

### 📝 维护说明

- ads.txt文件位于 `public/` 目录中
- 每次构建会自动复制到 `dist/` 目录
- 添加新广告网络时，在相应行添加新条目
- 修改后需要重新构建和部署

### 🎯 下一步

1. 部署更新到生产环境
2. 等待24-48小时让Google验证
3. 在AdSense控制台查看验证状态
4. 确认广告正常显示后，ads.txt配置即完成