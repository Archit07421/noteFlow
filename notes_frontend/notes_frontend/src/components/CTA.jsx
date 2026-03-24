export default function CTA() {
  return (
    <section className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-950 px-6 py-12 text-center text-white sm:px-10">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to clear your mind?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
            Start a fresh page, capture what matters, and let NoteFlow handle the organization.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              id="signup"
              href="#"
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 sm:w-auto"
            >
              Start Writing Now
            </a>
            <a
              id="login"
              href="#"
              className="w-full rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

