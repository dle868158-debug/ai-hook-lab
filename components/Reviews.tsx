'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const REVIEWS = [
  { text: '孩子上高中后数学从优势科目变成短板，跟了一个学期，从85分提到112分。最明显的是他知道错在哪里了。', author: '张同学妈妈', grade: '高一' },
  { text: '程老师讲函数的方法很清楚，以前觉得抽象函数没法下手，现在能先判断题型再做。', author: '赵同学', grade: '高一' },
  { text: '圆锥曲线一直是孩子的噩梦，专题课后期末这部分拿到了满分，孩子信心回来很多。', author: '刘同学爸爸', grade: '高二' },
  { text: '高三一轮复习跟着系统过了一遍，数学从98提到127。不是押题，是每一类题都更稳了。', author: '王同学妈妈', grade: '高三' },
  { text: '录播可以反复看，课后问题也有人管，比之前只上大班课踏实很多。', author: '孙同学妈妈', grade: '高一' },
  { text: '高考数学131分，比一模高了28分，最后两个月的限时训练帮助很大。', author: '周同学', grade: '高三' },
];

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="reviews" className="section-padding bg-paper">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">学生和家长更在意真实改变</h2>
        <p className="section-subtitle">课堂听得懂、作业有人看、考试能拿分，这是评价里反复出现的关键词。</p>

        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <motion.article
              key={`${review.author}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.38, delay: i * 0.06 }}
              className="border border-ink-100 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <Quote size={22} className="text-sage-600" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-300 text-amber-300" />
                  ))}
                </div>
              </div>
              <p className="mb-5 min-h-[96px] text-sm leading-relaxed text-ink-700">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between border-t border-ink-100 pt-4">
                <span className="text-sm font-semibold text-ink-900">{review.author}</span>
                <span className="bg-sage-50 px-2 py-1 text-xs font-medium text-sage-700">{review.grade}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
