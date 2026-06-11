import { useMemo, useState } from "react";
import { Search, Eye, Pencil, Trash, Plus } from "lucide-react";

type EventItem = {
  id: number;
  name: string;
  category: string;
  date: string;
  location: string;
  status: "Upcoming" | "Full" | "Completed" | "Draft";
};

const mockEvents: EventItem[] = [
  { id: 1, name: "Community Drop-In Dinner", category: "Social", date: "2026-06-14", location: "Toronto", status: "Upcoming" },
  { id: 2, name: "Resume Workshop", category: "Skills", date: "2026-06-18", location: "Ottawa", status: "Upcoming" },
  { id: 3, name: "Art & Expression Circle", category: "Arts", date: "2026-06-21", location: "Toronto", status: "Completed" },
  { id: 4, name: "Neighbourhood Walk & Talk", category: "Outdoors", date: "2026-07-03", location: "Toronto", status: "Full" },
  { id: 5, name: "Cooking Together", category: "Workshop", date: "2026-07-08", location: "Ottawa", status: "Draft" },
];

const statusClass = (status: EventItem["status"]) => {
  switch (status) {
    case "Upcoming":
      return "bg-primary/10 text-primary border border-primary/20";
    case "Full":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Completed":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "Draft":
      return "bg-muted text-foreground border border-border";
    default:
      return "bg-muted text-foreground";
  }
};

export function EventsAdminPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      mockEvents.filter((e) => [e.name, e.category, e.date, e.location, e.status].join(" ").toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const [items, setItems] = useState(filtered);

  // keep items synced when filter changes
  useState(() => setItems(filtered));

  const deleteEvent = (id: number) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events management</h1>
            <p className="text-muted-foreground mt-2">Create and manage community events.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              <Plus size={14} />
              Create event
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="sm:flex sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Events</h2>
              <p className="text-muted-foreground text-sm mt-1">Search, edit, and manage event listings.</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
                className="w-full rounded-full border border-border bg-white pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Event Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {items.map((e) => (
                <tr key={e.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{e.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{e.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{e.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{e.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(e.status)}`}>{e.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition">
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button onClick={() => deleteEvent(e.id)} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-rose-400 hover:text-rose-600 transition">
                      <Trash size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EventsAdminPage;
