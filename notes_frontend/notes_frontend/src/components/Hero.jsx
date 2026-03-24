export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-zinc-200" />
        <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full border border-zinc-100" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
            Minimal notes for busy minds
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Your Thoughts, Organized.
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
            NoteFlow helps you capture ideas instantly, organize them effortlessly, and find what you need in seconds—across
            every device.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#signup"
              className="w-full rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#about"
              className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 sm:w-auto"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left">
              <p className="text-xs font-medium text-zinc-500">Fast capture</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">From thought to note in seconds</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left">
              <p className="text-xs font-medium text-zinc-500">Simple structure</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Tags, pinning, and clean lists</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left">
              <p className="text-xs font-medium text-zinc-500">Searchable</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">Find anything instantly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

