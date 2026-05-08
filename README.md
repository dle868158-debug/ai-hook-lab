# cheng-math-tutoring-site

武大数学程老师高中数学官网。

面向高中学生和家长的个人授课官网，展示程老师的教学背景、课程体系、教学优势、提分案例和微信咨询入口。

## 功能特性

- 单页锚点导航，覆盖课程、师资、优势、上课模式、评价、案例和联系方式
- 移动端汉堡菜单与响应式布局
- 使用真实教师照片和微信二维码资源
- Framer Motion 滚动入场动画
- SEO metadata 已配置为中文高中数学辅导场景

## 技术栈

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## 本地开发

```bash
npm install
npm run dev
```

## 质量检查

```bash
npm run lint
npm run build
```

## 部署

项目通过 GitHub 推送触发 Vercel 自动部署，并由 Cloudflare Worker 反代到自定义域名。部署链路和历史记录见 `PROJECT_LOG.md`。
