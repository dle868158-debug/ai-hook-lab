'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  '免费诊断当前学习问题',
  '制定专属提分方案',
  '体验程老师教学风格',
  '无任何隐形消费',
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container-narrow relative z-10">
        <div className="accent-bar" />
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">立即预约免费试听课</h2>
        <p className="text-navy-300 text-center text-lg mb-12 max-w-2xl mx-auto">
          留下年级 + 当前分数，即可预约一节免费诊断课
        </p>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ul className="space-y-4 mb-8">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 size={20} className="text-orange-400 shrink-0" />
                  <span className="text-lg">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold text-lg mb-3">预约步骤</h3>
              <ol className="space-y-2 text-navy-200 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  扫码添加程老师微信
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  发送「年级 + 当前分数」
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  预约免费试听课 + 获取学情分析
                </li>
              </ol>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white rounded-2xl p-6 text-center">
              <img
                src="/wechat-qr.png"
                alt="添加程老师微信"
                className="w-48 h-48 md:w-56 md:h-56 object-contain mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-48 h-48 md:w-56 md:h-56 mx-auto rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                微信二维码
              </div>
              <p className="mt-4 text-navy-800 font-medium">扫码添加程老师微信</p>
              <p className="text-sm text-gray-500 mt-1">备注「试听」优先安排</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-orange-300 text-sm font-medium">
                🎁 添加即送：高中数学必考知识点 + 解题模板
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
