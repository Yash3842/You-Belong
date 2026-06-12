import { Navigate, useLocation, Link } from "react-router";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  // Not signed in — send to login and remember where they were headed.
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Signed in, but not an admin — show an access barrier.
  if (user.role !== "admin") {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
            <ShieldAlert className="text-rose-600" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Access restricted</h1>
          <p className="text-muted-foreground mt-3">
            This area is for community centre staff only. You are signed in as a community member, so the
            admin portal isn’t available on your account.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
            >
              Switch account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default RequireAdmin;
