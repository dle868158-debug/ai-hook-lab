'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Crosshair, Lightbulb, MessageCircle, Target, FileText, Clock } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: Crosshair,
    title: '考点精准',
    desc: '深研近10年高考真题，精准把握命题趋势和高频考点',
  },
  {
    icon: Lightbulb,
    title: '方法实用',
    desc: '每个题型总结通用解法模板，举一反三，不做题海战术',
  },
  {
    icon: MessageCircle,
    title: '通俗易懂',
    desc: '复杂概念用生活化语言讲解，数学不再是天书',
  },
  {
    icon: Target,
    title: '针对性提分',
    desc: '根据每位学生薄弱点制定专属学习计划，精准突破',
  },
  {
    icon: FileText,
    title: '资料齐全',
    desc: '独家整理的知识点手册、错题本模板、高考冲刺资料包',
  },
  {
    icon: Clock,
    title: '随时答疑',
    desc: '课后微信随时提问，作业难题拍照即可获得详细解答',
  },
];

export default function Advantages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advantages" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">为什么选择程老师</h2>
        <p className="section-subtitle">六大核心优势，让提分更高效</p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-2xl hover:bg-navy-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <item.icon size={22} className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-navy-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
