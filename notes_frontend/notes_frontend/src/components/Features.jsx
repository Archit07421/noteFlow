function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-950">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5 17.5 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 3 19 6v7c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export default function Features() {
  return (
    <section id="about" className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Everything you need to stay focused
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
            Capture quickly, organize naturally, and sync securely—without the clutter.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<IconPencil />}
            title="Capture Anywhere"
            description="Jot down ideas the moment they appear—on desktop, tablet, or mobile."
          />
          <FeatureCard
            icon={<IconGrid />}
            title="Smart Organization"
            description="Use tags, pin important notes, and keep a clean, searchable workspace."
          />
          <FeatureCard
            icon={<IconShield />}
            title="Secure Cloud Sync"
            description="Your notes stay safe with secure sync and reliable access across devices."
          />
        </div>
      </div>
    </section>
  )
}

