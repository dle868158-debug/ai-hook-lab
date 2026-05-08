import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '武大数学程老师 | 高中数学诊断式提分',
  description: '武汉大学数学专业出身，10年+高中数学教学经验。面向高一同步、高二专题、高三冲刺和一对一诊断，帮助学生定位失分点、建立解题路径、稳定提升数学成绩。',
  keywords: '高中数学,数学辅导,高考数学,数学提分,一对一辅导,高中数学网课',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-paper font-sans text-ink-900 antialiased"
        style={{ fontFamily: "'Noto Sans SC', 'Inter', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
