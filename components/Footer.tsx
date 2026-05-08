export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-narrow py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-6 bg-orange-500 rounded-full" />
              <span className="text-white font-bold text-lg">武大数学程老师</span>
            </div>
            <p className="text-sm leading-relaxed">
              专注高中数学提分，帮助每一位学生找到适合自己的学习方法，实现数学成绩的突破。
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#courses" className="hover:text-orange-400 transition-colors">课程体系</a></li>
              <li><a href="#teacher" className="hover:text-orange-400 transition-colors">师资介绍</a></li>
              <li><a href="#advantages" className="hover:text-orange-400 transition-colors">提分优势</a></li>
              <li><a href="#reviews" className="hover:text-orange-400 transition-colors">学员好评</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">报名咨询</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li>上课方式：线上直播 / 录播 / 一对一</li>
              <li>咨询方式：微信扫码添加</li>
              <li>服务时间：每天 9:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} 武大数学程老师 版权所有
        </div>
      </div>
    </footer>
  );
}
