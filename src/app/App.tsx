import { BrowserRouter, Routes, Route } from "react-router";
import { Nav } from "./components/Nav";
import { HomePage } from "./components/HomePage";
import { EventsPage } from "./components/EventsPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { HelpPage } from "./components/HelpPage";
import "../styles/fonts.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
