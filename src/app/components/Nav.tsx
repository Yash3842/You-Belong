import { NavLink, useNavigate } from "react-router";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary tracking-tight">
            You<span className="text-accent">Belong</span>
          </span>
        </NavLink>
        <div className="flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/events" className={linkClass}>Events</NavLink>
          <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
          <NavLink to="/help" className={linkClass}>Help</NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-muted-foreground">Hi, {user.name.split(" ")[0]}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              <LogIn size={14} />
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
