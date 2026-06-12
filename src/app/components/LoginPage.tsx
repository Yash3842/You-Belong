import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Lock, ChevronDown } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

// Reference list shown to the user — matches accounts in AuthContext.
const partnerCentres = [
  {
    centre: "360 Kids",
    admin: "tally@360kids.com / tally1234",
    users: "user1@360kids.com, user2@360kids.com, user3@360kids.com / user1234",
  },
  {
    centre: "Better Street",
    admin: "robert@betterstreet.com / robert1234",
    users: "user1@betterstreet.com, user2@betterstreet.com, user3@betterstreet.com / user1234",
  },
  {
    centre: "HICC",
    admin: "victoria@hicc.com / victoria1234",
    users: "user1@hicc.com, user2@hicc.com, user3@hicc.com / user1234",
  },
  {
    centre: "Reena",
    admin: "gary@reena.com / gary1234 (or natalie@reena.com / natalie1234)",
    users: "user1@reena.com, user2@reena.com, user3@reena.com / user1234",
  },
  {
    centre: "Trek for Teens",
    admin: "sai@trekforteens.com / sai1234",
    users: "user1@trekforteens.com, user2@trekforteens.com, user3@trekforteens.com / user1234",
  },
  {
    centre: "YSB",
    admin: "mike@ysb.com / mike1234",
    users: "user1@ysb.com, user2@ysb.com, user3@ysb.com / user1234",
  },
  {
    centre: "York U Community Safety",
    admin: "andrea@yorku.com / andrea1234",
    users: "user1@yorku.com, user2@yorku.com, user3@yorku.com / user1234",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);

  const from = (location.state as { from?: string } | null)?.from;

  const handleLogin = (emailValue: string, passwordValue: string) => {
    const account = login(emailValue, passwordValue);
    if (!account) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    setError("");
    if (account.role === "admin") {
      navigate(from && from.startsWith("/admin") ? from : "/admin");
    } else {
      navigate(from && !from.startsWith("/admin") && from !== "/login" ? from : "/");
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
          <h1 className="text-3xl font-bold text-foreground">Welcome to YouBelong</h1>
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
          <button
            type="button"
            onClick={() => setShowAccounts((prev) => !prev)}
            className="flex w-full items-center justify-between text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Partner centre demo accounts
            </p>
            <ChevronDown
              className={`text-muted-foreground transition-transform ${showAccounts ? "rotate-180" : ""}`}
              size={16}
            />
          </button>

          {showAccounts && (
            <div className="mt-4 space-y-3">
              {partnerCentres.map((p) => (
                <div key={p.centre} className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-sm font-semibold text-foreground mb-1">{p.centre}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Admin:</span> {p.admin}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Users:</span> {p.users}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;