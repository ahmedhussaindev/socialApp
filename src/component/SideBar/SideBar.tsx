export default function Sidebar() {
  return (
    <aside className="hidden w-full max-w-xs space-y-4 lg:block">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
        <div className="h-20 bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600" />
        <div className="px-5 pb-5">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-2xl font-bold text-sky-600 shadow-sm dark:border-slate-800 dark:bg-slate-700">
            <span>👋</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Welcome back!</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">Your space to share ideas, connect, and discover something new.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/60">
              <p className="text-xs text-slate-500 dark:text-slate-400">Your community</p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Stay connected</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-950/40">
              <p className="text-xs text-sky-600 dark:text-sky-400">Your next step</p>
              <p className="mt-1 text-sm font-bold text-sky-700 dark:text-sky-300">Share a post</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Quick inspiration</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg dark:bg-amber-950/40">💡</span>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Share an idea</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">A small thought might inspire someone.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg dark:bg-emerald-950/40">🌱</span>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Keep learning</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Every conversation is a chance to grow.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg dark:bg-violet-950/40">🤝</span>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Stay connected</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Discover different perspectives.</p>
            </div>
          </div>
        </div>
      </div>

      <p className="px-2 text-xs leading-5 text-slate-400">
        About · Community · Privacy · Terms
        <span className="mt-1 block">© 2026 Your Social Space</span>
      </p>
    </aside>
  )
}