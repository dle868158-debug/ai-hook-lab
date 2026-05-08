'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-[120px] font-bold text-white/20 select-none">∫</div>
        <div className="absolute top-40 right-20 text-[80px] font-bold text-white/15 select-none">Σ</div>
        <div className="absolute bottom-32 left-1/4 text-[100px] font-bold text-white/10 select-none">π</div>
        <div className="absolute bottom-20 right-1/3 text-[60px] font-bold text-white/15 select-none">∞</div>
        <div className="absolute top-1/3 left-1/2 text-[70px] font-bold text-white/10 select-none">Δ</div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-narrow relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-orange-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-400 rounded-full" />
            10年+教学经验 · 500+学生提分
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            专注高中数学
            <span className="text-orange-400">提分</span>
          </h1>

          <p className="text-xl md:text-2xl text-navy-200 mb-4 font-medium">
            高一同步拔高 · 高二重难点突破 · 高三高考冲刺
          </p>

          <p className="text-navy-300 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            武大数学系出身，擅长梳理知识体系、总结秒杀解题技巧，
            专治数学偏科、基础薄弱、压轴题不会做。
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
            >
              免费预约试听课
              <ChevronRight size={20} />
            </motion.a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-1 px-8 py-4 text-white/80 font-medium hover:text-orange-300 transition-colors text-lg"
            >
              了解课程体系
              <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
