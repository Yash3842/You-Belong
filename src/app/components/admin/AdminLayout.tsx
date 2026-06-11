import { Outlet } from "react-router";
import { AdminNav } from "./AdminNav";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary tracking-tight">You<span className="text-accent">Belong</span> Admin</span>
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
