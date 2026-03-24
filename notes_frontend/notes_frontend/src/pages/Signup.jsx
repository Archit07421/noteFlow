import { handleSignup } from "../services/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";







function Field({ label, children, hint }) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </span>
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

export default function Signup() {
  const navigate = useNavigate(); 

  const [name , setName] = useState("");
  const [email,setEmail]=useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  const [errors, setErrors] = useState({});

  const signup = async (e) => {

    
    e.preventDefault();

    let newErrors = {};

    let passwordErrors = [];

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    

    if (password.length < 8) {
      passwordErrors.push("At least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("One uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      passwordErrors.push("One lowercase letter");
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      passwordErrors.push("One special character");
    }

    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(", ");
    }
  
    if (password !== confirmPassword) {
      newErrors.confirmPassword="Passwords do not match";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    console.log("Data:",{name , email , password , confirmPassword});
  
    const data = {
      name,
      email,
      password,
      confirmPassword
    };
  
    try {
      
      const res = await handleSignup(data);
      console.log("RESPONSE:", res);

      if (!res.ok) {
        const serverError =
          res.data?.error ||
          res.data?.message ||
          (Array.isArray(res.data?.errors) ? res.data.errors.join(", ") : "");
        setErrors({ form: serverError || "Signup failed. Please try again." });
        return;
      }
      

      navigate("/login")
    } catch (err) {
      setErrors({ form: "Signup failed. Please try again." });
    }
  };
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div className="lg:col-span-5">
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Start writing with a calm, distraction-free workspace.
              </p>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={signup}>
              {Object.entries(errors).filter(([, message]) => typeof message === "string" && message.trim()).length > 0 ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-950">Please fix the highlighted requirements</p>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                    {Object.entries(errors)
                      .filter(([, message]) => typeof message === "string" && message.trim())
                      .map(([key, message]) => (
                      <li key={key} className="flex gap-2">
                        <span className="min-w-20 font-medium capitalize text-zinc-900/90">
                          {key === "confirmPassword" ? "Confirm password" : key === "form" ? "Notice" : key}
                        </span>
                        <span>{message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Field label="Full name">
                <Input
                  type="text"
                  name="name"
                  placeholder="Alex Morgan"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.name
                      return next
                    })
                  }}
                  required
                />
                {errors.name ? <p className="mt-1 text-xs text-zinc-700">{errors.name}</p> : null}
              </Field>

              <Field label="Email">
                <Input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.email
                      return next
                    })
                  }}
                  required
                />
                {errors.email ? <p className="mt-1 text-xs text-zinc-700">{errors.email}</p> : null}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Password" hint="8+ characters">
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => {
                        const next = { ...prev }
                        delete next.password
                        delete next.confirmPassword
                        return next
                      })
                    }}
                    required
                  />
                  <p className="mt-1 min-h-[1.25rem] text-xs text-zinc-700" aria-live="polite">
                    {errors.password ? errors.password : ""}
                  </p>
                </Field>
                <Field label="Confirm password">
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => {
                        const next = { ...prev }
                        delete next.confirmPassword
                        return next
                      })
                    }}
                    required
                  />
                  <p className="mt-1 min-h-[1.25rem] text-xs text-zinc-700" aria-live="polite">
                    {errors.confirmPassword ? errors.confirmPassword : ""}
                  </p>
                </Field>
              </div>

              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/10"
                  required
                />
                <span className="leading-relaxed">
                  I agree to the <a href="#terms" className="font-medium text-zinc-900 underline underline-offset-2">Terms</a>{' '}
                  and <a href="#privacy" className="font-medium text-zinc-900 underline underline-offset-2">Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-900"
              >
                Create account
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Sign up with Google
              </button>

              <p className="mt-2 text-center text-sm text-zinc-600">
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-zinc-900 hover:text-zinc-700">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>

        <div className="mt-10 hidden lg:col-span-7 lg:mt-0 lg:block">
          <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 p-10 text-white">
            <div className="absolute left-[-140px] top-[-140px] h-[520px] w-[520px] rounded-full border border-white/15" />
            <div className="absolute left-[-190px] top-[-190px] h-[680px] w-[680px] rounded-full border border-white/10" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">NoteFlow</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
                Write more. Search less.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/75">
                Keep everything in one place with tags, pinning, and fast search—designed to stay out of your way.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-sm font-semibold">Capture anywhere</p>
                  <p className="mt-1 text-sm text-white/75">Lightweight notes across all devices.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-sm font-semibold">Secure by default</p>
                  <p className="mt-1 text-sm text-white/75">Your writing stays private and protected.</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Today</p>
                <p className="mt-3 text-lg font-semibold">“Your thoughts deserve a clear home.”</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Create a space for planning, ideas, and daily notes—then find anything instantly.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950">
                  Start in under a minute
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" aria-hidden="true" />
                  No setup required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}