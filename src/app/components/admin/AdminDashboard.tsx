import { ArrowRight, Users, CalendarDays, MessageCircle, Activity } from "lucide-react";
import { useState } from "react";

const mock = {
  totalEvents: 42,
  upcomingEvents: 6,
  feedbackReceived: 128,
  communityMembers: 2400,
  recent: [
    { id: 1, text: "New feedback submitted for 'Art & Expression Circle'", time: "2h ago" },
    { id: 2, text: "Event 'Know Your Rights' marked as updated", time: "1d ago" },
    { id: 3, text: "New user joined: maria@example.com", time: "2d ago" },
  ],
};

export function AdminDashboard() {
  const [recent] = useState(mock.recent);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of platform activity and quick actions.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Total Events</div>
              <div className="text-2xl font-semibold text-foreground">{mock.totalEvents}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarDays size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Upcoming Events</div>
              <div className="text-2xl font-semibold text-foreground">{mock.upcomingEvents}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
              <ArrowRight size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Feedback Received</div>
              <div className="text-2xl font-semibold text-foreground">{mock.feedbackReceived}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
              <MessageCircle size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Community Members</div>
              <div className="text-2xl font-semibold text-foreground">{mock.communityMembers.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left inline-flex items-center justify-between gap-3 bg-white border border-border rounded-lg px-4 py-3 hover:border-primary hover:text-primary transition-colors">
              Create event
              <ArrowRight size={14} />
            </button>
            <button className="w-full text-left inline-flex items-center justify-between gap-3 bg-white border border-border rounded-lg px-4 py-3 hover:border-primary hover:text-primary transition-colors">
              Review feedback
              <ArrowRight size={14} />
            </button>
            <button className="w-full text-left inline-flex items-center justify-between gap-3 bg-white border border-border rounded-lg px-4 py-3 hover:border-primary hover:text-primary transition-colors">
              Invite member
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            {recent.map((r) => (
              <li key={r.id} className="flex items-start justify-between bg-white border border-border rounded-lg p-3">
                <div>
                  <div className="text-sm text-foreground">{r.text}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.time}</div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Activity size={16} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
