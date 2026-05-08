'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, FileText, MessageCircle, SearchCheck, Target, TimerReset } from 'lucide-react';

const STEPS = [
  {
    icon: SearchCheck,
    title: '诊断',
    desc: '先看试卷和作业，判断是概念断层、题型不会，还是计算和规范问题。',
  },
  {
    icon: Target,
    title: '定线',
    desc: '根据当前分数和目标分数，确定每周该攻克的模块和题量。',
  },
  {
    icon: FileText,
    title: '讲透',
    desc: '每类题保留核心入口、常见变形和得分步骤，减少无效刷题。',
  },
  {
    icon: TimerReset,
    title: '限时',
    desc: '用考试节奏训练选填速度、计算稳定性和大题取舍。',
  },
  {
    icon: MessageCircle,
    title: '答疑',
    desc: '课后问题及时反馈，避免小问题拖成下一阶段的失分点。',
  },
  {
    icon: BarChart3,
    title: '复盘',
    desc: '阶段性整理错因，调整课程节奏，让进步可观察。',
  },
];

export default function Advantages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advantages" className="section-padding soft-band">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">不是多刷题，而是按失分点提分</h2>
        <p className="section-subtitle">
          一套课从诊断开始，持续跟踪错因和得分变化，适合需要稳定提升的高中生。
        </p>

        <div ref={ref} className="grid grid-cols-1 gap-px overflow-hidden border border-ink-100 bg-ink-100 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-sage-50 text-sage-700">
                  <item.icon size={23} />
                </div>
                <span className="text-sm font-bold text-ink-200">0{i + 1}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
