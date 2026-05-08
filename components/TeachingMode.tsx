'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Video, RotateCcw, HelpCircle, Download, BarChart3 } from 'lucide-react';

const MODES = [
  { icon: Monitor, title: '线上直播', desc: '实时互动、板书演示、即时答疑' },
  { icon: Video, title: '高清录播', desc: '每节课高清录制，随时回看重点' },
  { icon: RotateCcw, title: '永久回放', desc: '课程录播永久有效，考前随时复习' },
  { icon: HelpCircle, title: '课后答疑', desc: '微信群+私信，48小时内解答' },
  { icon: Download, title: '专属资料', desc: '配套讲义、练习题、知识总结PDF' },
  { icon: BarChart3, title: '学情分析', desc: '定期反馈学习进度，调整教学策略' },
];

export default function TeachingMode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="teaching" className="section-padding bg-navy-50">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">上课模式</h2>
        <p className="section-subtitle">灵活高效，适合每一位学生</p>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-5 bg-white rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center mb-3">
                <mode.icon size={24} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-navy-800 text-sm mb-1">{mode.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{mode.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
