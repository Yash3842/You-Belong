import { useState } from "react";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    name: "Community Drop-In Dinner",
    date: "June 14, 2026",
    location: "Toronto",
    venue: "Parkdale Community Hub",
    description:
      "A warm, welcoming dinner open to all youth. Share a meal, make connections, and learn about local support services.",
  },
  {
    id: 2,
    name: "Resume & Job Skills Workshop",
    date: "June 18, 2026",
    location: "Ottawa",
    venue: "Centretown Neighbourhood Centre",
    description:
      "Learn resume writing, interview prep, and how to navigate the local job market with guidance from volunteer mentors.",
  },
  {
    id: 3,
    name: "Art & Expression Circle",
    date: "June 21, 2026",
    location: "Toronto",
    venue: "Regent Park Arts Centre",
    description:
      "A safe creative space for youth to express themselves through painting, collage, and mixed media. No experience needed.",
  },
  {
    id: 4,
    name: "Know Your Rights Info Session",
    date: "June 25, 2026",
    location: "Ottawa",
    venue: "Ottawa Public Library – Main Branch",
    description:
      "Legal aid volunteers share accessible information about tenant rights, ID documents, and navigating social services.",
  },
  {
    id: 5,
    name: "Neighbourhood Walk & Talk",
    date: "July 3, 2026",
    location: "Toronto",
    venue: "High Park – East Entrance",
    description:
      "An informal guided walk connecting youth to green space and each other. Light snacks provided. All paces welcome.",
  },
  {
    id: 6,
    name: "Cooking Together: Budget Meals",
    date: "July 8, 2026",
    location: "Ottawa",
    venue: "Lowertown Community Kitchen",
    description:
      "Hands-on cooking session focusing on nutritious, affordable meals. Take home recipes and leftover ingredients.",
  },
];

type Filter = "All" | "Toronto" | "Ottawa";

export function EventsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? events : events.filter((e) => e.location === filter);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
            Upcoming Events
          </h1>
          <p className="text-muted-foreground text-lg">
            Find gatherings near you and show up — you're always welcome.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10">
          {(["All", "Toronto", "Ottawa"] as Filter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === tab
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                {event.location}
              </div>
              <h3 className="text-foreground mb-3 text-lg font-semibold leading-snug">
                {event.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                <CalendarDays size={14} className="text-primary" />
                {event.date}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <MapPin size={14} className="text-primary" />
                {event.venue}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                {event.description}
              </p>
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium self-start">
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
