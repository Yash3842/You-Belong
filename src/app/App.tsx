import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Nav } from "./components/Nav";
import { HomePage } from "./components/HomePage";
import { EventsPage } from "./components/EventsPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { HelpPage } from "./components/HelpPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import "../styles/fonts.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
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

        {/* Admin routes - Phase 1 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
