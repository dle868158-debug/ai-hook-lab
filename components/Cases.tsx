'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CASES = [
  {
    name: '王同学',
    grade: '高三',
    before: 98,
    after: 131,
    duration: '3个月',
    problem: '基础不扎实，计算错误多，大题经常空着',
    solution: '一轮系统补基础 + 计算专项训练 + 限时练习',
    highlights: ['选填正确率从60%提升到90%', '大题得分从30分提升到55分'],
  },
  {
    name: '李同学',
    grade: '高二',
    before: 76,
    after: 118,
    duration: '5个月',
    problem: '圆锥曲线和导数完全不会，考试直接放弃',
    solution: '专题突破 + 方法模板 + 反复训练典型题',
    highlights: ['圆锥曲线从0分到满分', '导数大题稳定拿8分以上'],
  },
  {
    name: '赵同学',
    grade: '高一',
    before: 105,
    after: 138,
    duration: '4个月',
    problem: '函数理解浅，大题不会规范书写，丢步骤分',
    solution: '深度理解函数本质 + 答题规范训练 + 拔高训练',
    highlights: ['函数大题满分', '期末年级排名前20'],
  },
];

export default function Cases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" className="section-padding bg-navy-50">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">提分案例</h2>
        <p className="section-subtitle">真实学员成绩提升记录</p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-navy-800">{c.name}</span>
                <span className="text-xs font-medium text-navy-500 bg-navy-50 px-2 py-1 rounded">{c.grade} · {c.duration}</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-5 py-4 bg-navy-50 rounded-xl">
                <span className="text-3xl font-bold text-gray-400">{c.before}</span>
                <ArrowRight size={24} className="text-orange-500" />
                <span className="text-3xl font-bold text-navy-800">{c.after}</span>
                <span className="text-sm font-bold text-white bg-orange-500 px-2 py-1 rounded-full">
                  +{c.after - c.before}分
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-navy-700">问题诊断：</span>
                  <span className="text-gray-600">{c.problem}</span>
                </div>
                <div>
                  <span className="font-medium text-navy-700">解决方案：</span>
                  <span className="text-gray-600">{c.solution}</span>
                </div>
                <div>
                  <span className="font-medium text-navy-700">进步亮点：</span>
                  <ul className="mt-1 space-y-1">
                    {c.highlights.map((h) => (
                      <li key={h} className="text-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
