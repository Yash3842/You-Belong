import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Nav } from "./components/Nav";
import { HomePage } from "./components/HomePage";
import { EventsPage } from "./components/EventsPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { HelpPage } from "./components/HelpPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { UsersPage } from "./components/admin/UsersPage";
import { FeedbackAdminPage } from "./components/admin/FeedbackAdminPage";
import { EventsAdminPage } from "./components/admin/EventsAdminPage";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "./auth/AuthContext";
import { RequireAdmin } from "./auth/RequireAdmin";
import "../styles/fonts.css";

export default function App() {
  return (
    <BrowserRouter basename="/You-Belong">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {!location.pathname.startsWith("/admin") && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes — staff only, guarded by RequireAdmin */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="events" element={<EventsAdminPage />} />
          <Route path="feedback" element={<FeedbackAdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}
