<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Syndicate Pitch Pro - 银团贷款 Pitch Book 生成器

使用 AI 自动生成专业的银团贷款 Pitch Book，支持多种布局和可视化图表。

## 功能特点

- 🤖 基于 Gemini 2.0 AI 模型自动生成专业内容
- 📊 支持多种幻灯片布局（封面、表格、甘特图、分销图表等）
- 📄 支持上传参考文件（PDF、Word、Excel、图片）
- 🎨 专业的投行级设计风格
- 🖨️ 支持打印和导出

## 本地运行

**前置要求：** Node.js 16+

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   - 复制 `.env.example` 为 `.env.local`
   - 在 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取 API Key
   - 在 `.env.local` 中设置 `VITE_GEMINI_API_KEY`

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 `http://localhost:3000`

## 部署到 Zeabur

详细的部署步骤请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI

## 注意事项

⚠️ **重要**：不要将包含真实 API Key 的 `.env.local` 文件提交到 Git 仓库！

