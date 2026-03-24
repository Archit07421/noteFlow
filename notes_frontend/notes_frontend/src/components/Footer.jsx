export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm font-medium text-zinc-900">NoteFlow</p>
        <div className="flex items-center gap-6 text-sm text-zinc-600">
          <a href="#privacy" className="hover:text-zinc-900">
            Privacy
          </a>
          <a href="#terms" className="hover:text-zinc-900">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}

