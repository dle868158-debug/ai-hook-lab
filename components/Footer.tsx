export default function Footer() {
  return (
    <footer className="bg-paper text-ink-600">
      <div className="container-narrow border-t border-ink-100 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-sm font-bold text-amber-300">
                程
              </span>
              <span className="text-lg font-bold text-ink-900">武大数学程老师</span>
            </div>
            <p className="text-sm leading-relaxed">
              面向高中数学同步、专题突破和高考冲刺，帮助学生把薄弱点转化为稳定得分点。
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-ink-900">页面导航</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><a href="#courses" className="hover:text-sage-700">课程体系</a></li>
              <li><a href="#teacher" className="hover:text-sage-700">师资介绍</a></li>
              <li><a href="#advantages" className="hover:text-sage-700">提分路径</a></li>
              <li><a href="#cases" className="hover:text-sage-700">提分案例</a></li>
              <li><a href="#reviews" className="hover:text-sage-700">家长评价</a></li>
              <li><a href="#contact" className="hover:text-sage-700">微信咨询</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-ink-900">咨询信息</h4>
            <ul className="space-y-2 text-sm">
              <li>上课方式：线上直播 / 录播回看 / 一对一</li>
              <li>适合年级：高一、高二、高三</li>
              <li>咨询方式：扫码添加微信</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-ink-100 pt-5 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} 武大数学程老师
        </div>
      </div>
    </footer>
  );
}
