'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookMarked, ClipboardList, Headphones, MonitorPlay, Repeat2 } from 'lucide-react';

const MODES = [
  { icon: MonitorPlay, title: '直播上课', desc: '实时板书推导，学生当场反馈卡点。' },
  { icon: Repeat2, title: '录播回看', desc: '重难点反复看，考前按模块复习。' },
  { icon: ClipboardList, title: '课后作业', desc: '每节课配套训练，题量控制在有效范围。' },
  { icon: Headphones, title: '微信答疑', desc: '不会的题及时处理，不让问题堆积。' },
  { icon: BookMarked, title: '资料沉淀', desc: '讲义、错题、方法模板按阶段整理。' },
];

export default function TeachingMode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="teaching" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">上课方式</p>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
              线上课也要有线下班的跟进感。
            </h2>
            <p className="leading-relaxed text-ink-500">
              直播负责互动和当堂纠偏，录播负责复盘，作业和答疑负责把听懂变成做对。
            </p>
          </div>

          <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {MODES.map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, x: 18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.38, delay: i * 0.07 }}
                className="flex gap-4 border border-ink-100 bg-paper p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink-900 text-amber-300">
                  <mode.icon size={21} />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-ink-900">{mode.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{mode.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
