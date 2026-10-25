export default function Authintro() {
  return (
    <>
      <div className="max-w-4xl w-full">
        {/* العنوان الرئيسي والوصف */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#233287] tracking-tight mb-4">
            Route Posts
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
            Connect with friends and the world around you on Route Posts.
          </p>
        </div>
        {/* الكارد (البطاقة) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
          {/* عنوان البطاقة */}
          <h2 className="text-sm font-bold text-[#233287] tracking-widest uppercase mb-2">
            ABOUT ROUTE ACADEMY
          </h2>
          {/* العنوان الفرعي */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Egypt's Leading IT Training Center Since 2012
          </h3>
          {/* الفقرة النصية */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.
          </p>
          {/* شبكة الإحصائيات (Stats Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
              <p className="text-[#233287] text-xl font-bold mb-1">2012</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">FOUNDED</p>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
              <p className="text-[#233287] text-xl font-bold mb-1">40K+</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GRADUATES</p>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
              <p className="text-[#233287] text-xl font-bold mb-1">50+</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">PARTNER COMPANIES</p>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
              <p className="text-[#233287] text-xl font-bold mb-1">5</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">BRANCHES</p>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
              <p className="text-[#233287] text-xl font-bold mb-1">20</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">DIPLOMAS AVAILABLE</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
