'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, BookOpen, Compass, GraduationCap, Layers, Target } from 'lucide-react';

const COURSES = [
  {
    icon: BookOpen,
    stage: '高一',
    title: '同步拔高班',
    focus: '函数、集合、三角函数、立体几何',
    audience: '适合刚进高中不适应、作业能做但考试不稳的学生',
    result: '把概念、题型、规范同步搭起来',
  },
  {
    icon: Layers,
    stage: '高二',
    title: '重难点专题班',
    focus: '导数、圆锥曲线、数列、概率统计',
    audience: '适合某几个模块长期丢分、越学越碎的学生',
    result: '用专题框架补齐“不会下手”的断点',
  },
  {
    icon: Compass,
    stage: '高三一轮',
    title: '系统复习班',
    focus: '知识网重建、典型题归类、错题复盘',
    audience: '适合基础不差但成绩卡在90-115分的学生',
    result: '从零散刷题转向稳定拿分',
  },
  {
    icon: Target,
    stage: '高三二轮',
    title: '压轴突破班',
    focus: '选填压轴、解析几何、导数综合',
    audience: '适合想冲120+/130+、最后两题拿不满的学生',
    result: '训练识别题眼、步骤分和限时策略',
  },
  {
    icon: GraduationCap,
    stage: '定制',
    title: '一对一诊断课',
    focus: '薄弱点定位、阶段计划、作业批改',
    audience: '适合时间紧、目标明确、需要个性化跟进的学生',
    result: '按当前分数和目标院校倒推学习路径',
  },
];

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="courses" className="section-padding bg-paper">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">按年级和分数段设计课程</h2>
        <p className="section-subtitle">
          家长不需要先判断该报什么班，先做一次学情诊断，再匹配同步、专题、冲刺或一对一方案。
        </p>

        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {COURSES.map((course, i) => (
            <motion.article
              key={course.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group border border-ink-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-sage-50 text-sage-700">
                    <course.icon size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-amber-700">{course.stage}</span>
                    <h3 className="text-lg font-bold text-ink-900">{course.title}</h3>
                  </div>
                </div>
                <ArrowRight size={18} className="mt-2 text-ink-300 transition-colors group-hover:text-sage-700" />
              </div>

              <dl className="space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-semibold text-ink-800">重点模块</dt>
                  <dd className="text-ink-500">{course.focus}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-800">适合学生</dt>
                  <dd className="text-ink-500">{course.audience}</dd>
                </div>
                <div className="border-t border-ink-100 pt-3">
                  <dt className="font-semibold text-sage-800">阶段目标</dt>
                  <dd className="text-ink-700">{course.result}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
