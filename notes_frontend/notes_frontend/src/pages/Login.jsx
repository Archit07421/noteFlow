import { handleLogin } from "../services/authServices"
import {useState } from "react"
import {useNavigate} from "react-router-dom"






function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-zinc-900">{label}</span>
      {children}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className={[
        'h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900',
        'placeholder:text-zinc-400',
        'focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300',
      ].join(' ')}
    />
  )
}

function Divider() {
  return (
    <div className="relative my-6">
      <div className="h-px w-full bg-zinc-200" />
      <div className="absolute inset-0 -top-3 flex justify-center">
        <span className="bg-white px-3 text-xs font-medium text-zinc-500">or</span>
      </div>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate();
  const [email , setEmail]=useState("");
  const [password,setPassword]=useState(""); 
  const [formError, setFormError] = useState("");

  const login = async (e) => {
    
    e.preventDefault();
    setFormError("");

    console.log("DATA:",{email , password});
  
    const data = {
      
      email,
      password
      
    };
  
    try {
      const res = await handleLogin(data);

      if (!res.ok) {
        setFormError(res.data?.message || res.data?.error || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", res.data?.token || "");
      localStorage.setItem("user", JSON.stringify(res.data?.user || {}));
      navigate("/notes");
      console.log("RESPONSE", res);
    } catch (err) {
      setFormError("Login failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div className="lg:col-span-5">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white">
              <span className="h-4 w-4 rounded-sm bg-zinc-900" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">NoteFlow</span>
          </a>

          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950">Welcome back</h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Sign in to continue where you left off.
              </p>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={login}>
              {formError ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                  <span className="font-semibold text-zinc-900">Notice:</span> {formError}
                </div>
              ) : null}
              <Field label="Email">
                <Input type="email" name="email" placeholder="you@company.com" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </Field>

              <Field label="Password">
                <Input type="password" name="password" placeholder="••••••••" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)}  required />
              </Field>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/10"
                  />
                  Remember me
                </label>
                <a href="#" className="text-sm font-medium text-zinc-900 hover:text-zinc-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-900"
              >
                Login
              </button>

              <Divider />

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Continue with Google
              </button>

              <p className="mt-2 text-center text-sm text-zinc-600">
                New to NoteFlow?{' '}
                <a href="/signup" className="font-semibold text-zinc-900 hover:text-zinc-700">
                  Create an account
                </a>
              </p>
            </form>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            By continuing, you agree to our <a href="#terms" className="underline underline-offset-2">Terms</a> and{' '}
            <a href="#privacy" className="underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>

        <div className="mt-10 hidden lg:col-span-7 lg:mt-0 lg:block">
          <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/40 p-10">
            <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full border border-zinc-200" />
            <div className="absolute right-[-160px] top-[-160px] h-[560px] w-[560px] rounded-full border border-zinc-100" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Stay organized</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-950">
                A calmer place for your thinking
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-zinc-600">
                Capture ideas, sort with tags, and pick up on any device. NoteFlow keeps your notes simple and searchable.
              </p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-semibold text-zinc-950">Quick capture</p>
                  <p className="mt-1 text-sm text-zinc-600">Write, pin, and tag in seconds—no clutter.</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-semibold text-zinc-950">Secure sync</p>
                  <p className="mt-1 text-sm text-zinc-600">Your notes stay protected and available everywhere.</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
                    <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
                    <span className="h-2.5 w-2.5 rounded-full border border-zinc-200 bg-zinc-50" />
                  </div>
                  <div className="ml-2 h-8 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500 flex items-center">
                    Search notes…
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-zinc-200 p-4">
                    <div className="space-y-2">
                      <div className="h-9 rounded-lg bg-zinc-950" />
                      <div className="h-9 rounded-lg bg-zinc-100" />
                      <div className="h-9 rounded-lg bg-zinc-100" />
                    </div>
                  </div>
                  <div className="col-span-8 p-4">
                    <div className="space-y-3">
                      <div className="h-4 w-1/3 rounded bg-zinc-200" />
                      <div className="h-3 w-full rounded bg-zinc-100" />
                      <div className="h-3 w-5/6 rounded bg-zinc-100" />
                      <div className="mt-4 h-9 w-28 rounded-xl bg-zinc-950" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}