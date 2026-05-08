'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';
import TeacherPhoto from './TeacherPhoto';

const STATS = [
  { value: '10年+', label: '高中数学教学' },
  { value: '500+', label: '累计辅导学生' },
  { value: '20-60', label: '常见提分区间' },
];

const PAIN_POINTS = ['函数听不懂', '圆锥曲线丢分', '导数大题空着', '选填速度慢'];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-ink-900 pt-[68px]">
      <TeacherPhoto
        alt="程老师"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover object-[58%_18%] opacity-45 md:object-[72%_18%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,35,55,.96)_0%,rgba(23,35,55,.84)_42%,rgba(23,35,55,.48)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />

      <div className="container-narrow relative z-10 flex min-h-[calc(92vh-68px)] items-center py-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur-sm">
            <ClipboardCheck size={16} />
            武汉大学数学专业 · 原知名机构高中数学教师
          </div>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            高中数学提分，
            <span className="text-amber-300">先把失分原因讲明白</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-ink-100 md:text-xl">
            面向高一到高三学生，围绕函数、导数、解析几何、概率统计等核心模块做诊断式教学。
            不靠题海堆量，重点解决“会听不会做、会做拿不全分”的问题。
          </p>

          <div className="mb-9 flex flex-wrap gap-3">
            {PAIN_POINTS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white ring-1 ring-white/10"
              >
                <CheckCircle2 size={15} className="text-amber-300" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-4 text-base font-bold text-ink-900 shadow-lg shadow-black/20 transition-colors hover:bg-amber-200"
            >
              预约免费学情诊断
              <ArrowRight size={19} />
            </motion.a>
            <a
              href="#cases"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              看提分案例
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/15 border-y border-white/12 py-5">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0">
                <div className="text-2xl font-bold text-amber-200 md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-ink-200 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
