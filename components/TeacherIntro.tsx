'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Clock, Users, Trophy } from 'lucide-react';

const CREDENTIALS = [
  { icon: GraduationCap, text: '武汉大学数学专业毕业' },
  { icon: Clock, text: '10年+高中数学教学经验' },
  { icon: Users, text: '累计辅导学生500+人' },
  { icon: Trophy, text: '多名学生考入985/211名校' },
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
                程老师毕业于武汉大学数学系，拥有扎实的数学功底和丰富的教学经验。
                从教10年来，始终坚持"授人以渔"的教学理念——不是让学生死记硬背公式，
                而是帮助学生理解数学思维的底层逻辑，掌握举一反三的能力。
              </p>
              <p>
                擅长将复杂的数学概念用通俗易懂的语言讲解，善于用生活中的案例解释抽象概念。
                教学风格耐心细致、深入浅出，深受学生和家长的信赖。
                针对不同基础的学生，制定个性化的学习方案，帮助每一位学生找到最适合自己的提分路径。
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
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2 opacity-30">∑</div>
                  <div className="text-lg font-bold">武大数学</div>
                  <div className="text-2xl font-bold text-orange-400">程老师</div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-64 h-64 rounded-2xl border-2 border-orange-300 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
