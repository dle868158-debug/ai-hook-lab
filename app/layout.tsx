import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '武大数学程老师 | 专注高中数学提分',
  description: '武大数学系出身，10年+高中数学教学经验。高一同步拔高、高二重难点突破、高三高考冲刺，线上直播+录播+一对一辅导，帮助500+学生数学提分20-60分。',
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
        className="font-sans antialiased bg-white text-navy-800 min-h-screen"
        style={{ fontFamily: "'Noto Sans SC', 'Inter', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
