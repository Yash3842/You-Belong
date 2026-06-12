import { useMemo, useState } from "react";
import { Search, Eye, Pencil, Trash, Plus, Calendar, MapPin, Users, Clock } from "lucide-react";

type EventItem = {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  description: string;
  status: "Upcoming" | "Full" | "Completed" | "Draft";
};

const initialEvents: EventItem[] = [
  {
    id: 1,
    name: "Community Drop-In Dinner",
    category: "Social",
    date: "2026-06-14",
    time: "18:00",
    location: "Toronto",
    capacity: 60,
    registered: 42,
    description: "A welcoming dinner where neighbours can drop in, share a meal, and connect with the community centre team.",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Resume Workshop",
    category: "Skills",
    date: "2026-06-18",
    time: "14:00",
    location: "Ottawa",
    capacity: 25,
    registered: 19,
    description: "Hands-on workshop covering resume writing, cover letters, and interview preparation with volunteer coaches.",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Art & Expression Circle",
    category: "Arts",
    date: "2026-06-21",
    time: "10:30",
    location: "Toronto",
    capacity: 20,
    registered: 20,
    description: "A guided art session encouraging creative expression for all ages and skill levels. Materials provided.",
    status: "Completed",
  },
  {
    id: 4,
    name: "Neighbourhood Walk & Talk",
    category: "Outdoors",
    date: "2026-07-03",
    time: "09:00",
    location: "Toronto",
    capacity: 30,
    registered: 30,
    description: "A casual group walk through the neighbourhood followed by coffee and conversation at the centre.",
    status: "Full",
  },
  {
    id: 5,
    name: "Cooking Together",
    category: "Workshop",
    date: "2026-07-08",
    time: "17:30",
    location: "Ottawa",
    capacity: 16,
    registered: 0,
    description: "Learn budget-friendly recipes and cooking techniques in a shared kitchen session. All ingredients supplied.",
    status: "Draft",
  },
];

const categories = ["Social", "Skills", "Arts", "Outdoors", "Workshop", "Wellness", "Other"];
const statuses: EventItem["status"][] = ["Draft", "Upcoming", "Full", "Completed"];

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

type EventFormState = {
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  status: EventItem["status"];
};

const emptyForm: EventFormState = {
  name: "",
  category: "Social",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
  status: "Draft",
};

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

export function EventsAdminPage() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventFormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [viewTarget, setViewTarget] = useState<EventItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        [event.name, event.category, event.date, event.location, event.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query, events]
  );

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(""), 3000);
  };

  const setField = <K extends keyof EventFormState>(field: K, value: EventFormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const openCreate = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setErrors({});
    setIsFormOpen(true);
  };

  const openEdit = (event: EventItem) => {
    setEditingEvent(event);
    setForm({
      name: event.name,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: String(event.capacity),
      description: event.description,
      status: event.status,
    });
    setErrors({});
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Event name is required.";
    if (!form.date) nextErrors.date = "Date is required.";
    if (!form.time) nextErrors.time = "Start time is required.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";
    if (!form.capacity.trim()) nextErrors.capacity = "Capacity is required.";
    else if (Number.isNaN(Number(form.capacity)) || Number(form.capacity) <= 0)
      nextErrors.capacity = "Capacity must be a positive number.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                name: form.name.trim(),
                category: form.category,
                date: form.date,
                time: form.time,
                location: form.location.trim(),
                capacity: Number(form.capacity),
                description: form.description.trim(),
                status: form.status,
              }
            : event
        )
      );
      showSuccess("Event updated successfully.");
    } else {
      const newEvent: EventItem = {
        id: events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1,
        name: form.name.trim(),
        category: form.category,
        date: form.date,
        time: form.time,
        location: form.location.trim(),
        capacity: Number(form.capacity),
        registered: 0,
        description: form.description.trim(),
        status: form.status,
      };
      setEvents((prev) => [newEvent, ...prev]);
      showSuccess("Event created successfully.");
    }

    closeForm();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setEvents((prev) => prev.filter((event) => event.id !== deleteTarget.id));
    setDeleteTarget(null);
    showSuccess("Event deleted.");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events management</h1>
            <p className="text-muted-foreground mt-2">Create and manage community events.</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus size={14} />
            Create Event
          </button>
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
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events"
                className="w-full rounded-full border border-border bg-white pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        {successMessage ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            {successMessage}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Event Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Registered</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{event.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{event.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{event.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{event.location}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {event.registered} / {event.capacity}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setViewTarget(event)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition"
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(event)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(event)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-rose-400 hover:text-rose-600 transition"
                    >
                      <Trash size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-border p-8 shadow-2xl my-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {editingEvent
                  ? "Update the event details below."
                  : "Fill in the details below to add a new community event."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Event Name</label>
              <input
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="e.g. Community Drop-In Dinner"
                className={inputClass}
              />
              {errors.name && <p className="text-rose-600 text-sm mt-2">{errors.name}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => setField("category", event.target.value)}
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(event) => setField("status", event.target.value as EventItem["status"])}
                  className={inputClass}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => setField("date", event.target.value)}
                  className={inputClass}
                />
                {errors.date && <p className="text-rose-600 text-sm mt-2">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(event) => setField("time", event.target.value)}
                  className={inputClass}
                />
                {errors.time && <p className="text-rose-600 text-sm mt-2">{errors.time}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input
                  value={form.location}
                  onChange={(event) => setField("location", event.target.value)}
                  placeholder="e.g. Toronto"
                  className={inputClass}
                />
                {errors.location && <p className="text-rose-600 text-sm mt-2">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
                <input
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={(event) => setField("capacity", event.target.value)}
                  placeholder="e.g. 30"
                  className={inputClass}
                />
                {errors.capacity && <p className="text-rose-600 text-sm mt-2">{errors.capacity}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(event) => setField("description", event.target.value)}
                placeholder="Describe the event for community members…"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition"
              >
                {editingEvent ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-border p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{viewTarget.name}</h2>
                <p className="text-muted-foreground mt-1">{viewTarget.category}</p>
              </div>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(viewTarget.status)}`}>
                {viewTarget.status}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Calendar size={16} className="text-primary" />
                {viewTarget.date}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Clock size={16} className="text-primary" />
                {viewTarget.time}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <MapPin size={16} className="text-primary" />
                {viewTarget.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Users size={16} className="text-primary" />
                {viewTarget.registered} / {viewTarget.capacity} registered
              </div>
            </div>

            {viewTarget.description && (
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{viewTarget.description}</p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setViewTarget(null)}
                className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = viewTarget;
                  setViewTarget(null);
                  openEdit(target);
                }}
                className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition"
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-border p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-foreground">Delete event</h2>
            <p className="text-muted-foreground mt-2">
              Are you sure you want to delete “{deleteTarget.name}”? This cannot be undone.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-2xl bg-rose-600 text-white px-5 py-3 text-sm font-medium hover:bg-rose-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsAdminPage;
