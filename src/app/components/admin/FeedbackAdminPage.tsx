import { useMemo, useState } from "react";
import { Search, Eye, Check } from "lucide-react";

type Feedback = {
  id: number;
  title: string;
  category: string;
  submittedBy: string;
  date: string;
  status: "New" | "In Review" | "Resolved";
};

const mockFeedback: Feedback[] = [
  {
    id: 1,
    title: "More snacks at drop-in dinners",
    category: "Logistics",
    submittedBy: "anonymous",
    date: "2026-06-09",
    status: "New",
  },
  {
    id: 2,
    title: "Workshop time too short",
    category: "Programming",
    submittedBy: "maria@example.com",
    date: "2026-06-07",
    status: "In Review",
  },
  {
    id: 3,
    title: "Loved the art circle",
    category: "Praise",
    submittedBy: "jayden.chen@example.com",
    date: "2026-06-05",
    status: "Resolved",
  },
];

const statusClass = (status: Feedback["status"]) => {
  switch (status) {
    case "New":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "In Review":
      return "bg-primary/10 text-primary border border-primary/20";
    case "Resolved":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    default:
      return "bg-muted text-foreground";
  }
};

export function FeedbackAdminPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      mockFeedback.filter((f) =>
        [f.title, f.category, f.submittedBy, f.status, f.date]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  const [items, setItems] = useState(filtered);

  // Keep items in sync when filtering
  useState(() => setItems(filtered));

  const markResolved = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status: "Resolved" } : it)));
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Feedback management</h1>
          <p className="text-muted-foreground mt-2">Review incoming feedback and mark items resolved.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="sm:flex sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Feedback</h2>
              <p className="text-muted-foreground text-sm mt-1">Search, review, and manage feedback entries.</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search feedback"
                className="w-full rounded-full border border-border bg-white pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Submitted By</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {items.map((f) => (
                <tr key={f.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{f.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{f.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{f.submittedBy}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{f.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(f.status)}`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition">
                      <Eye size={14} />
                      View
                    </button>
                    {f.status !== "Resolved" && (
                      <button onClick={() => markResolved(f.id)} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition">
                        <Check size={14} />
                        Mark resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">No feedback found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedbackAdminPage;
