# AI Hook Lab

## 功能特性

- 输入主题，选择平台和内容类型
- AI 一键生成 10 个不同风格的爆款 Hook
- 每个 Hook 包含类型、文案、风格标签、点击欲评分、推荐理由
- 支持复制、收藏、查看历史
- 无 API Key 时显示清晰错误提示

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Anthropic Claude API

## 配置

1. 复制 `.env.local.example` 为 `.env.local`
2. 填入你的 API Key：
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## 开发

```bash
npm install
npm run dev
```

## 部署到 Vercel

1. 在 Vercel 导入项目
2. 在 Vercel 控制台添加环境变量 `ANTHROPIC_API_KEY`
3. 部署