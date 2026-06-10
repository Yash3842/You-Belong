import { useNavigate } from "react-router";
import { Calendar, MessageSquare, Users, ArrowRight } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Community Platform
            </div>
            <h1 className="text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
              Connecting Community.{" "}
              <span className="text-primary">Finding Home.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              YouBelong helps community organizers bridge youth experiencing
              homelessness to neighbourhood networks.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse Events
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-muted">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=720&h=540&fit=crop&auto=format"
                alt="Community members gathered together at a neighbourhood event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">2,400+ youth</div>
                <div className="text-muted-foreground text-xs">connected to support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-center text-foreground mb-12 text-3xl font-semibold tracking-tight">
          What YouBelong Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Calendar size={24} className="text-primary" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-semibold">Community Events</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Discover drop-in dinners, skill workshops, and neighbourhood gatherings
              designed to help young people connect with their communities.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all"
            >
              View upcoming events <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
              <MessageSquare size={24} className="text-accent" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-semibold">Share Feedback</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your experience matters. Anonymous feedback helps organizers improve
              events so every gathering is more welcoming and impactful.
            </p>
            <button
              onClick={() => navigate("/feedback")}
              className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all"
            >
              Share your thoughts <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-border mt-8 py-8 text-center text-muted-foreground text-sm">
        © 2026 YouBelong · Built with care for communities across Canada
      </footer>
    </div>
  );
}
