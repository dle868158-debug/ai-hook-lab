'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Target, TrendingUp, Award, Users } from 'lucide-react';

const COURSES = [
  {
    icon: BookOpen,
    title: '高一数学同步课',
    grade: '高一',
    highlights: ['紧跟教材进度，夯实基础', '函数、集合、三角函数重点突破', '预习+同步+复习三位一体'],
  },
  {
    icon: Target,
    title: '高二重难点专题课',
    grade: '高二',
    highlights: ['圆锥曲线、导数专题精讲', '概率统计难点模块突破', '专题式教学，各个击破'],
  },
  {
    icon: TrendingUp,
    title: '高三一轮复习课',
    grade: '高三上',
    highlights: ['系统梳理知识体系', '构建解题框架，查漏补缺', '夯实基础，冲刺120+'],
  },
  {
    icon: Award,
    title: '高三二轮压轴题专项',
    grade: '高三下',
    highlights: ['选填压轴题秒杀技巧', '大题最后两题攻克策略', '冲刺130+ / 140+'],
  },
  {
    icon: Users,
    title: '一对一私教课',
    grade: '高一至高三',
    highlights: ['个性化学情诊断', '定制专属提分方案', '灵活时间，针对性极强'],
  },
];

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">课程体系</h2>
        <p className="section-subtitle">覆盖高中三年，每个阶段都有针对性解决方案</p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4 group-hover:bg-orange-50 transition-colors">
                <course.icon size={24} className="text-navy-600 group-hover:text-orange-500 transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-navy-800 mb-1">{course.title}</h3>
              <span className="inline-block text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded mb-4">
                适合年级：{course.grade}
              </span>

              <ul className="space-y-2 mb-6">
                {course.highlights.map((h) => (
                  <li key={h} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-block text-sm font-medium text-navy-700 border border-navy-200 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
              >
                咨询了解
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
