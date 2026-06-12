import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Lock, UserRound, ShieldCheck } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string } | null)?.from;

  const handleLogin = (emailValue: string, passwordValue: string) => {
    const account = login(emailValue, passwordValue);
    if (!account) {
      setError("Incorrect email or password. Please try again.");
      return;
    }
    setError("");
    if (account.role === "admin") {
      navigate(from && from.startsWith("/admin") ? from : "/admin");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    handleLogin(email, password);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="text-primary" size={26} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back to YouBelong</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue to your portal.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary text-primary-foreground px-4 py-3.5 text-sm font-semibold hover:bg-primary/90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-border bg-background p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Demo accounts
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleLogin("admin@youbelong.ca", "admin123")}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-left hover:border-primary transition"
            >
              <ShieldCheck className="text-primary shrink-0" size={20} />
              <span>
                <span className="block text-sm font-medium text-foreground">Centre Admin</span>
                <span className="block text-xs text-muted-foreground">admin@youbelong.ca · admin123</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleLogin("user@youbelong.ca", "user123")}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-left hover:border-primary transition"
            >
              <UserRound className="text-primary shrink-0" size={20} />
              <span>
                <span className="block text-sm font-medium text-foreground">Community Member</span>
                <span className="block text-xs text-muted-foreground">user@youbelong.ca · user123</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
