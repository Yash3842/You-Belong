import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back to YouBelong</h1>
          <p className="text-muted-foreground mt-2">Choose a role to continue the demo workflow.</p>
        </div>

        <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
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
              placeholder="Enter a demo password"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex justify-center rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
            >
              Login as Community User
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="inline-flex justify-center rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-medium hover:bg-primary/90 transition"
            >
              Login as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
