# 部署到 Zeabur 指南

## 部署前准备

### 1. 获取 Gemini API Key
1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 创建一个新的 API Key
3. 复制 API Key 备用

### 2. 更新环境变量
在 `.env.local` 文件中，将 `PLACEHOLDER_API_KEY` 替换为你的真实 API Key：
```
VITE_GEMINI_API_KEY=你的真实API_KEY
```

**重要提示**：不要将包含真实 API Key 的 `.env.local` 文件提交到 Git！

## 部署到 Zeabur

### 方法一：通过 GitHub 部署（推荐）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **在 Zeabur 上部署**
   - 访问 [Zeabur](https://zeabur.com)
   - 登录并创建新项目
   - 选择 "Deploy from GitHub"
   - 选择你的仓库
   - Zeabur 会自动检测到这是一个 Vite 项目

3. **配置环境变量**
   - 在 Zeabur 项目设置中，找到 "Environment Variables"
   - 添加环境变量：
     - Key: `VITE_GEMINI_API_KEY`
     - Value: 你的 Gemini API Key
   - 保存并重新部署

### 方法二：使用 Zeabur CLI

1. **安装 Zeabur CLI**
   ```bash
   npm install -g @zeabur/cli
   ```

2. **登录 Zeabur**
   ```bash
   zeabur login
   ```

3. **部署项目**
   ```bash
   zeabur deploy
   ```

4. **设置环境变量**
   在 Zeabur 控制台中添加 `VITE_GEMINI_API_KEY` 环境变量

## 验证部署

部署完成后：
1. 访问 Zeabur 提供的 URL
2. 测试输入项目描述
3. 点击"立即生成 Pitch Book"
4. 确认 AI 能够正常生成内容

## 分享给他人

部署成功后，你可以：
1. 直接分享 Zeabur 提供的 URL（例如：`https://your-app.zeabur.app`）
2. 可选：在 Zeabur 中配置自定义域名

## 故障排查

### 如果遇到 API 错误：
- 检查环境变量 `VITE_GEMINI_API_KEY` 是否正确设置
- 确认 API Key 有效且有足够的配额
- 查看浏览器控制台的错误信息

### 如果页面无法加载：
- 检查构建日志是否有错误
- 确认所有依赖都已正确安装
- 尝试重新部署

## 本地测试

在部署前，建议先在本地测试：
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 注意事项

1. **API Key 安全**：永远不要将 API Key 提交到公开的 Git 仓库
2. **环境变量**：确保在 Zeabur 中正确配置了所有必需的环境变量
3. **配额管理**：注意 Gemini API 的使用配额，避免超额使用
4. **CORS 问题**：如果遇到 CORS 错误，可能需要配置后端代理
