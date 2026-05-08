'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { text: '孩子上高中后数学从初中的优势科目变成了短板，报了程老师的同步课，一个学期从85分提到了112分，方法真的很重要！', author: '张同学妈妈', grade: '高一' },
  { text: '程老师讲函数的方法特别清楚，以前完全听不懂的抽象函数现在觉得很简单。', author: '赵同学', grade: '高一' },
  { text: '圆锥曲线一直是孩子的噩梦，跟了程老师的专题课后，期末考这部分居然拿了满分！', author: '刘同学爸爸', grade: '高二' },
  { text: '导数大题以前完全不敢做，现在有了程老师教的框架，基本能拿8-10分了。', author: '陈同学', grade: '高二' },
  { text: '高三一轮复习跟着程老师系统过了一遍，数学从98提到了127，真的非常感谢！', author: '王同学妈妈', grade: '高三' },
  { text: '二轮的压轴题专项太有用了，程老师总结的方法比学校老师讲得清楚太多。', author: '李同学', grade: '高三' },
  { text: '本来想给孩子报线下班，朋友推荐了程老师的线上课，效果居然比线下还好，录播可以反复看。', author: '孙同学妈妈', grade: '高一' },
  { text: '高考数学131分，比一模整整高了28分，最感谢程老师最后两个月的冲刺课。', author: '周同学', grade: '高三' },
  { text: '程老师每次课后都会在群里解答问题，比很多机构的老师负责多了。', author: '吴同学妈妈', grade: '高二' },
  { text: '一对一的效果真的好，程老师直接针对我的薄弱环节讲，效率特别高。', author: '杨同学', grade: '高三' },
];

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="reviews" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">学员与家长评价</h2>
        <p className="section-subtitle">真实反馈，口碑见证实力</p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-5 rounded-2xl bg-navy-50 border border-navy-100"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-navy-700">—— {review.author}</span>
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{review.grade}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
