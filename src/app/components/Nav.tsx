import { NavLink } from "react-router";

export function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
    }`;

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
        </div>
      </div>
    </nav>
  );
}
