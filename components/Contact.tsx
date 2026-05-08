'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, ClipboardCheck, MessageCircle } from 'lucide-react';

const BENEFITS = ['判断当前主要失分点', '给出阶段提分建议', '匹配合适课程形式', '领取高中数学资料包'];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-narrow">
        <div ref={ref} className="grid grid-cols-1 overflow-hidden border border-ink-100 bg-ink-900 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="p-7 text-white md:p-10 lg:col-span-7"
          >
            <p className="mb-3 text-sm font-semibold text-amber-200">免费学情诊断</p>
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              先发年级和最近一次试卷，再决定怎么学。
            </h2>
            <p className="mb-7 max-w-2xl leading-relaxed text-ink-100">
              扫码添加程老师微信，发送“年级 + 当前分数 + 目标分数”。如果方便，也可以发一张最近试卷或错题照片，
              便于判断是基础、题型、计算还是规范问题。
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BENEFITS.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white/[0.06] p-4">
                  <CheckCircle2 size={18} className="shrink-0 text-amber-300" />
                  <span className="text-sm text-ink-50">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {['扫码添加微信', '发送学情信息', '预约试听诊断'].map((step, index) => (
                <div key={step} className="border border-white/10 p-4">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-amber-300 text-sm font-bold text-ink-900">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-paper p-7 md:p-10 lg:col-span-5"
          >
            <div className="mx-auto max-w-sm bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-sage-700">
                <MessageCircle size={18} />
                微信咨询
              </div>
              <img
                src="/wechat-qr.jpg"
                alt="添加程老师微信"
                className="mx-auto h-56 w-56 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden mx-auto flex h-56 w-56 items-center justify-center border-2 border-dashed border-ink-200 text-sm text-ink-400">
                微信二维码
              </div>
              <p className="mt-5 text-lg font-bold text-ink-900">添加程老师微信</p>
              <p className="mt-1 text-sm text-ink-500">备注“试听”优先安排</p>
            </div>

            <div className="mx-auto mt-5 flex max-w-sm items-start gap-3 bg-amber-50 p-4 text-sm leading-relaxed text-ink-700">
              <ClipboardCheck size={18} className="mt-0.5 shrink-0 text-amber-600" />
              发送最近一次考试分数和薄弱模块，可以更快判断适合同步班、专题课还是一对一。
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
