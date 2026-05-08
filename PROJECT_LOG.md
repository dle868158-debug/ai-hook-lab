# 项目记录 - 武大数学程老师高中数学官网

> 记录时间：2026-05-08
> 项目路径：`C:\Users\Administrator\Desktop\5\ai-hook-lab`

---

## 一、项目背景

原项目 "AI Hook Lab"（爆款标题生成器）部署于 Vercel，通过 Cloudflare Worker 反代至国内可访问域名 `wecomcloud.top`。2026-05-08 应老师要求，将网站内容完全改造为**高中数学个人授课官网**。

### 核心改造目标
- 彻底替换 AI 工具内容为数学授课服务展示
- 国内可直接访问（Cloudflare 反代绕过 Vercel 访问限制）
- 专业、简洁的视觉风格，适合家长和学生

---

## 二、技术架构

### 部署链路
```
GitHub (dle868158-debug/ai-hook-lab)
    → Vercel (自动部署)
    → https://ai-hook-lab-psi.vercel.app
    → Cloudflare Worker 反代
    → https://wecomcloud.top (国内直接访问)
```

### 技术栈
- **框架**：Next.js 14.2.5 (App Router)
- **样式**：Tailwind CSS 3.4.7 + 自定义 navy/orange 配色
- **动画**：Framer Motion 11（滚动入场动画）
- **图标**：Lucide React
- **字体**：Noto Sans SC（Google Fonts）
- **部署**：Vercel + GitHub 自动部署

### 域名与DNS
- 自定义域名：`wecomcloud.top`
- DNS：NS 指向 Cloudflare → A 记录 + CNAME
- Worker 反代：部署于 `ai-hook-lab-cf-worker/`（wrangler.toml 配置）

---

## 三、设计系统

### 配色方案
| 名称 | 色值 | 用途 |
|------|------|------|
| navy-800 | `#1B2A4A` | 主色/标题/深色背景 |
| navy-900 | 渐变深色背景 | Hero/Contact 区域 |
| orange-500 | `#F5A623` | 强调色/CTA/点缀 |
| orange-50 | `#fff8f0` | 浅色背景/标签 |
| white | `#ffffff` | 卡片/正文背景 |
| navy-50 | `#f0f4f8` | 浅色区块背景 |

### 组件结构（单页面锚点导航）
1. **Header** — 固定顶部导航，移动端汉堡菜单
2. **Hero** — 全屏深色 Banner，数学符号装饰，CTA按钮
3. **Courses** — 5类课程卡片（高一/高二/高三/压轴/一对一）
4. **TeacherIntro** — 师资介绍，双栏布局（凭证+头像）
5. **Advantages** — 六大核心优势，图标网格
6. **TeachingMode** — 上课模式（直播/录播/答疑/资料/分析）
7. **Reviews** — 10条学员/家长好评，5星评分
8. **Cases** — 3个提分案例，分数对比（98→131等）
9. **Contact** — 微信二维码区，预约步骤，3大好处
10. **Footer** — 三栏信息（品牌/导航/联系）

### 动画策略
- 使用 `framer-motion` 的 `useInView` 监听元素进入视口
- `once: true` 确保动画只触发一次
- `margin: '-100px'` 提前触发
- 各组件 stagger 延迟 0.08-0.15s 依次入场

---

## 四、文件操作记录

### 删除的旧文件
```
components/HookCard.tsx
components/HookGrid.tsx
components/HookInput.tsx
components/HistoryDrawer.tsx
components/SettingsModal.tsx
components/Toast.tsx
lib/types.ts
lib/storage.ts
lib/prompt.ts
app/api/generate/route.ts
.env.local.example
```

### 重写的文件
```
tailwind.config.js — navy/orange配色，移除darkMode
app/globals.css — 新主题（section-padding, accent-bar, container-narrow）
app/layout.tsx — 中文metadata，Noto Sans SC字体
app/page.tsx — 组合10个section组件
package.json — 移除nanoid, @radix-ui/react-tooltip
```

### 新建组件（10个）
```
components/Header.tsx
components/Hero.tsx
components/Courses.tsx
components/TeacherIntro.tsx
components/Advantages.tsx
components/TeachingMode.tsx
components/Reviews.tsx
components/Cases.tsx
components/Contact.tsx
components/Footer.tsx
```

---

## 五、内容来源

### 教师背景（来自简历 PDF）
- **姓名**：程老师
- **学历**：武汉大学数学专业本科
- **任职经历**：武汉学而思、十二方程仕
- **教学方向**：高考数学系统复习、选填压轴题专项突破、答题规范与速度训练

### 关键数据点
- 教学年限：10年+
- 累计学生：500+人
- 进步率：95%
- 平均提分：20-60分
- 选填正确率提升：至90%+
- 大题得分稳定：50+

### 教学理念
- 理解本质 > 刷题套路 > 机械记忆
- "做一题，通一类" — 构建完整知识体系
- 严谨而不失幽默，课后全程答疑，作业逐题批改

### 简历文件路径
`C:\Users\Administrator\Desktop\5\12方程仕教育--程老师教学简历.pdf`

---

## 六、部署记录

### Git 提交历史
| 时间 | 提交信息 | 说明 |
|------|----------|------|
| 2026-05-08 | redesign: convert to high school math tutoring website | 完整改造 |
| 2026-05-08 | chore: sync package-lock.json after removing unused deps | 清理锁文件 |
| 2026-05-08 | enrich: update teacher bio and course content with real resume | 内容丰富 |

### Vercel 部署记录
- 初始部署通过 `npx vercel --prod --yes` 直接部署（绕过 GitHub 自动部署延迟）
- 后续更新通过 GitHub push 触发自动部署

### 资产文件
- **微信二维码**：`public/wechat-qr.png`（来源：`C:\Users\Administrator\Desktop\5\微信图片_20260508175831_68_144.png`）

---

## 七、待办 & 迭代计划

### 已完成
- [x] 微信二维码上传
- [x] 教师简介内容更新（含真实工作经历）
- [x] 课程体系描述更新
- [x] 优势板块内容丰富

### 迭代计划（Hook 检查）
- [ ] 响应式测试：375px / 768px / 1440px 各宽度下表现
- [ ] 移动端汉堡菜单点击测试
- [ ] 锚点导航滚动平滑度
- [ ] 微信二维码是否正常显示
- [ ] 各 section 动画是否正常触发
- [ ] Hero CTA 按钮点击跳转测试
- [ ] Contact 区"咨询了解"按钮是否跳转正确
- [ ] Footer 链接完整性
- [ ] SEO meta 标签检查
- [ ] 页面加载性能检查

### 未来可增强
- [ ] 添加真实教师照片（非占位符）
- [ ] 添加更多提分案例（目前3个，目标10+）
- [ ] 添加课程价格页面（目前只显示"咨询了解"）
- [ ] 添加学生成绩截图展示
- [ ] SEO 优化：添加 sitemap.xml, robots.txt
- [ ] 分析工具集成（百度统计/GA）

---

## 八、关键决策记录

1. **定价策略**：不显示具体价格，统一"咨询了解"，避免价格竞争
2. **配色选择**：藏青+白+浅橘，稳重专业，区别于娱乐类网站
3. **单页面设计**：锚点导航，避免多页面跳转，用户体验流畅
4. **内容真实化**：用真实工作经历和数据替代泛化的"10年经验"描述
5. **部署策略**：Vercel 直接部署绕过 GitHub 自动部署延迟，确保内容立即更新

---

*最后更新：2026-05-08*