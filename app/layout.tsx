import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Hook Lab - 爆款标题生成器',
  description: '输入主题，AI一键生成10个不同风格的爆款Hook',
  icons: {
    icon: '/favicon.ico',
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}