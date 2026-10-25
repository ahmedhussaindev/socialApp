export default function Loading() {
  return (
    <div className="mx-auto my-6 w-full px-4 lg:my-8 lg:w-[95%]">
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">

        {/* Left Sidebar Skeleton */}
        <aside className="hidden space-y-4 lg:col-span-3 lg:block">
          <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="h-20 bg-slate-200 dark:bg-slate-700" />
            <div className="px-5 pb-5">
              <div className="-mt-8 h-16 w-16 rounded-2xl border-4 border-white bg-slate-300 dark:border-slate-800 dark:bg-slate-600" />
              <div className="mt-4 h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mt-3 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
              <div className="mt-2 h-3 w-3/4 rounded-full bg-slate-100 dark:bg-slate-700" />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-700" />
                <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-700" />
              </div>
            </div>
          </div>

          <div className="animate-pulse space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-slate-700" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Feed Skeleton */}
        <main className="min-w-0 space-y-5 lg:col-span-6">

          {/* Create Post Skeleton */}
          <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-11 flex-1 rounded-full bg-slate-100 dark:bg-slate-700" />
            </div>
            <div className="mt-4 flex justify-between">
              <div className="h-9 w-24 rounded-xl bg-slate-100 dark:bg-slate-700" />
              <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          {/* Post Cards Skeleton */}
          {[1, 2].map((post) => (
            <div key={post} className="animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded-full bg-slate-100 dark:bg-slate-700" />
                </div>
                <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-700" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="h-3 w-2/3 rounded-full bg-slate-100 dark:bg-slate-700" />
              </div>

              {post === 1 && (
                <div className="h-56 w-full rounded-xl bg-slate-200 dark:bg-slate-700" />
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-700" />
                <div className="h-8 w-24 rounded-lg bg-slate-100 dark:bg-slate-700" />
                <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar Skeleton */}
        <aside className="hidden space-y-4 lg:col-span-3 lg:block">
          <div className="animate-pulse space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
              </div>
            ))}
          </div>
          <div className="animate-pulse h-36 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </aside>

      </div>
    </div>
  );
}