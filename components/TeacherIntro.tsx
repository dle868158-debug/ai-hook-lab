'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Building2, CheckCircle2, GraduationCap, PenLine } from 'lucide-react';
import TeacherPhoto from './TeacherPhoto';

const CREDENTIALS = [
  { icon: GraduationCap, label: '武汉大学数学专业本科' },
  { icon: Building2, label: '曾任武汉学而思、十二方程仕高中数学教师' },
  { icon: Award, label: '高考数学系统复习与压轴题专项训练' },
  { icon: PenLine, label: '课后答疑、作业批改、阶段反馈' },
];

const PRINCIPLES = [
  '先定位失分原因，再安排训练内容',
  '每类题沉淀解题入口，不让学生死背套路',
  '重视答题规范和限时训练，把会做转化为拿分',
];

export default function TeacherIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="teacher" className="section-padding bg-white">
      <div className="container-narrow">
        <div ref={ref} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden bg-ink-900">
              <TeacherPhoto alt="程老师" className="relative aspect-[4/5] w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 via-ink-900/65 to-transparent p-6 pt-24">
                <p className="text-sm font-semibold text-amber-200">武大数学程老师</p>
                <p className="mt-1 text-2xl font-bold text-white">把复杂题讲成可执行步骤</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-3">关于老师</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
              家长看重靠谱，学生需要听得懂。
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-ink-600">
              <p>
                程老师毕业于武汉大学数学专业，深耕高中数学教学10余年，曾任职于武汉学而思、十二方程仕等机构。
                课程重点不是把题讲完，而是让学生知道每一步为什么这么想、考试时怎么快速落笔。
              </p>
              <p>
                对基础薄弱学生，先补概念和计算；对中等学生，重点训练题型识别和步骤分；对冲高分学生，
                聚焦选填压轴、导数和解析几何的稳定突破。
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CREDENTIALS.map((item) => (
                <div key={item.label} className="flex items-center gap-3 border border-ink-100 bg-ink-50/70 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-sage-700">
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-ink-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 border-l-4 border-amber-300 bg-amber-50 p-5">
              <h3 className="mb-3 font-bold text-ink-900">课堂原则</h3>
              <ul className="space-y-2">
                {PRINCIPLES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-sage-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
