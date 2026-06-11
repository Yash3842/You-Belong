import { NavLink } from "react-router";

export function AdminNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
    }`;

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/events" className={linkClass}>
          Events
        </NavLink>
        <NavLink to="/admin/feedback" className={linkClass}>
          Feedback
        </NavLink>
      </div>
    </div>
  );
}

export default AdminNav;
