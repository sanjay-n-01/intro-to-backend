import { useState } from "react";
import { loginUser, registerUser } from "../services/api.js";
import ThemePicker from "../components/ThemePicker.jsx";

function Login({ theme, onThemeChange, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const isRegistering = mode === "register";

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const result = isRegistering
        ? await registerUser(form)
        : await loginUser({ email: form.email, password: form.password });
      if (isRegistering) {
        setMode("login");
        setForm({ ...form, username: "", password: "" });
        setStatus({ type: "success", message: "Account created. You can log in now." });
      } else {
        onAuthenticated(result.user);
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <div className="brand"><span className="brand-mark">F</span><span>fieldnotes</span></div>
        <div className="intro-copy">
          <p className="eyebrow">A quieter place to think</p>
          <h1>Keep the good<br /><em>stuff</em> close.</h1>
          <p className="intro-description">Capture ideas, observations, and the details worth remembering.</p>
        </div>
        <div className="auth-intro-bottom">
          <p className="intro-foot">EST. 2024 <span>•</span> PERSONAL WORKSPACE</p>
          <ThemePicker theme={theme} onChange={onThemeChange} />
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-form-wrap">
          <p className="eyebrow">{isRegistering ? "Start a workspace" : "Welcome back"}</p>
          <h2>{isRegistering ? "Create your account" : "Sign in to your notes"}</h2>
          <p className="form-lede">{isRegistering ? "A small space for the things on your mind." : "Your ideas are waiting for you."}</p>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <label>
                Username
                <input name="username" value={form.username} onChange={handleChange} placeholder="What should we call you?" required />
              </label>
            )}
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength="6" required />
            </label>
            {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
            <button className="button button-primary button-full" disabled={loading}>
              {loading ? "One moment…" : isRegistering ? "Create account" : "Enter workspace"} <span>↗</span>
            </button>
          </form>
          <p className="switch-copy">
            {isRegistering ? "Already have an account?" : "New to fieldnotes?"}{" "}
            <button className="inline-button" onClick={() => { setMode(isRegistering ? "login" : "register"); setStatus({ type: "", message: "" }); }}>
              {isRegistering ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
