'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CASES = [
  {
    name: '王同学',
    grade: '高三',
    before: 98,
    after: 131,
    duration: '3个月',
    problem: '基础不扎实，计算错误多，大题经常空着',
    method: '一轮补基础 + 计算专项 + 限时训练',
  },
  {
    name: '李同学',
    grade: '高二',
    before: 76,
    after: 118,
    duration: '5个月',
    problem: '圆锥曲线和导数没有入口，考试直接放弃',
    method: '专题突破 + 方法模板 + 典型题复盘',
  },
  {
    name: '赵同学',
    grade: '高一',
    before: 105,
    after: 138,
    duration: '4个月',
    problem: '函数理解浅，大题书写不规范，步骤分丢失',
    method: '函数本质讲解 + 规范训练 + 拔高题组',
  },
];

export default function Cases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" className="section-padding bg-ink-900 text-white">
      <div className="container-narrow">
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-amber-300" />
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">提分案例看路径，不只看数字</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-ink-200 md:text-lg">
          分数提升背后通常不是单一技巧，而是薄弱点定位、模块训练和考试节奏共同变化。
        </p>

        <div ref={ref} className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CASES.map((c, i) => {
            const delta = c.after - c.before;
            return (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{c.name}</h3>
                    <p className="text-sm text-ink-200">{c.grade} · {c.duration}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-ink-900">
                    +{delta}
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="mb-6 flex items-end gap-4">
                  <div className="flex-1">
                    <div className="mb-2 text-sm text-ink-300">入课前</div>
                    <div className="h-24 bg-white/10">
                      <div className="h-full w-full bg-ink-500/60" style={{ transform: `scaleY(${c.before / 150})`, transformOrigin: 'bottom' }} />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-ink-200">{c.before}</div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 text-sm text-amber-200">阶段后</div>
                    <div className="h-24 bg-white/10">
                      <div className="h-full w-full bg-amber-300" style={{ transform: `scaleY(${c.after / 150})`, transformOrigin: 'bottom' }} />
                    </div>
                    <div className="mt-2 text-2xl font-bold text-amber-200">{c.after}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <span className="font-semibold text-amber-200">问题：</span>
                    <span className="text-ink-100">{c.problem}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-amber-200">方法：</span>
                    <span className="text-ink-100">{c.method}</span>
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
