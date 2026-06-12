import { Outlet, useNavigate } from "react-router";
import { LogOut, UserRound } from "lucide-react";
import { AdminNav } from "./AdminNav";
import { useAuth } from "../../auth/AuthContext";

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary tracking-tight">You<span className="text-accent">Belong</span> Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground">
              <UserRound size={16} className="text-primary" />
              {user?.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
        <AdminNav />
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
