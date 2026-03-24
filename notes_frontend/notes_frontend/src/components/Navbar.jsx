import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white">
            <span
              className="h-4 w-4 rounded-sm bg-zinc-900"
              aria-hidden="true"
            />
          </span>

          <span className="text-sm font-semibold tracking-tight">NoteFlow</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-zinc-600 sm:flex">
          <Link to="/login" className="hover:text-zinc-900">
            Login
          </Link>
          <Link to="/signup" className="hover:text-zinc-900">
            Sign Up
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <Link
            to="/signup"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

