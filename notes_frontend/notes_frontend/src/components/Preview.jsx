function SidebarItem({ active, children }) {
  return (
    <div
      className={[
        'flex items-center justify-between rounded-lg px-3 py-2 text-sm',
        active ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50',
      ].join(' ')}
    >
      <span className="truncate">{children}</span>
      {active ? <span className="h-2 w-2 rounded-full bg-white/90" aria-hidden="true" /> : null}
    </div>
  )
}

function NoteCard({ title, preview, meta }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 hover:bg-zinc-50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-950">{title}</p>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{preview}</p>
        </div>
        <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-600">
          {meta}
        </span>
      </div>
    </div>
  )
}

export default function Preview() {
  return (
    <section className="border-t border-zinc-100 bg-zinc-50/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            A calm workspace for your notes
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
            A simple dashboard layout that keeps your writing front and center.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
              <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
              <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
            </div>
            <div className="ml-2 h-8 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500 flex items-center">
              Search notes…
            </div>
            <div className="h-8 w-8 rounded-xl border border-zinc-200 bg-white" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="border-b border-zinc-200 bg-white p-4 lg:col-span-3 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Spaces</p>
              <div className="mt-3 grid gap-1.5">
                <SidebarItem active>All Notes</SidebarItem>
                <SidebarItem>Personal</SidebarItem>
                <SidebarItem>Work</SidebarItem>
                <SidebarItem>Ideas</SidebarItem>
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-950">Quick capture</p>
                <p className="mt-1 text-sm text-zinc-600">Press ⌘K to create a new note.</p>
              </div>
            </aside>

            <div className="bg-white p-4 lg:col-span-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Recent</p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-600">
                    Tag: Focus
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-600">
                    Pinned
                  </span>
                </div>
              </div>
              <div className="mt-3 grid gap-3">
                <NoteCard
                  title="Weekly planning"
                  preview="Outline the three priorities, block time for deep work, and leave room for recovery."
                  meta="Today"
                />
                <NoteCard
                  title="Meeting notes"
                  preview="Decisions, action items, and follow-ups captured in one place for quick review."
                  meta="Yesterday"
                />
                <NoteCard
                  title="Product ideas"
                  preview="A lightweight writing flow with tags, search, and cloud sync—no distractions."
                  meta="2d"
                />
              </div>
            </div>

            <div className="border-t border-zinc-200 bg-zinc-50/40 p-4 lg:col-span-4 lg:border-t-0 lg:border-l">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Editor</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">Weekly planning</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
                  <p>
                    1) Ship the core experience.
                    <br />
                    2) Keep the UI calm and minimal.
                    <br />
                    3) Make notes effortless to find.
                  </p>
                  <p className="text-zinc-500">
                    Tip: Use tags like <span className="font-medium text-zinc-700">#focus</span> and{' '}
                    <span className="font-medium text-zinc-700">#ideas</span>.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Saved · a moment ago</span>
                  <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

