'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Clock, Users, Trophy, Target } from 'lucide-react';

const CREDENTIALS = [
  { icon: GraduationCap, text: '武汉大学数学专业本科' },
  { icon: Clock, text: '10年+高中数学教学经验' },
  { icon: Users, text: '累计辅导学生500+人，进步率95%' },
  { icon: Trophy, text: '多名学生考入985/211名校' },
  { icon: Target, text: '学生平均提分20-60分' },
];

export default function TeacherIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="teacher" className="section-padding bg-navy-50">
      <div className="container-narrow">
        <div className="accent-bar" />
        <h2 className="section-title">关于程老师</h2>
        <p className="section-subtitle">专业、耐心、有方法，让数学不再是难题</p>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {CREDENTIALS.map((c) => (
                <div key={c.text} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <c.icon size={20} className="text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-navy-700">{c.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                程老师毕业于武汉大学数学专业，深耕高中数学教学10余年。
                先后任职于武汉学而思、十二方程仕等知名机构，
                擅长高考数学系统复习、选填压轴题专项突破、答题规范与速度训练。
              </p>
              <p>
                教学理念：理解本质 {'>'} 刷题套路 {'>'} 机械记忆。
                注重引导学生构建完整的数学知识体系，帮助学生做到"做一题，通一类"。
                历年高考数学平均提分20-60分，选填正确率提升至90%+，大题得分稳定在50+。
              </p>
              <p>
                程老师教学风格严谨而不失幽默，擅长用生动的例子将抽象的数学概念具体化。
                对学生有耐心、有责任心，课后全程答疑，作业逐题批改。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              <img
                src="/teacher-photo.jpg"
                alt="程老师"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
