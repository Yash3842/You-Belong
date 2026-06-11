import { useMemo, useState } from "react";
import { Search, Eye, Pencil } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Organizer" | "Volunteer" | "Member";
  status: "Active" | "Pending" | "Suspended";
};

const users: User[] = [
  {
    id: 1,
    name: "Aisha Singh",
    email: "aisha.singh@example.com",
    role: "Organizer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jayden Chen",
    email: "jayden.chen@example.com",
    role: "Volunteer",
    status: "Pending",
  },
  {
    id: 3,
    name: "Maya Thompson",
    email: "maya.thompson@example.com",
    role: "Member",
    status: "Active",
  },
  {
    id: 4,
    name: "Noah Patel",
    email: "noah.patel@example.com",
    role: "Organizer",
    status: "Suspended",
  },
  {
    id: 5,
    name: "Zara Williams",
    email: "zara.williams@example.com",
    role: "Member",
    status: "Active",
  },
];

const statusClass = (status: User["status"]) => {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "Pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Suspended":
      return "bg-rose-100 text-rose-700 border border-rose-200";
    default:
      return "bg-muted text-foreground";
  }
};

export function UsersPage() {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        [user.name, user.email, user.role, user.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">User management</h1>
          <p className="text-muted-foreground mt-2">
            Manage the platform’s community members, organizers, and volunteers.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="sm:flex sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Users</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Search and review user status, role, and contact details.
              </p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search users"
                className="w-full rounded-full border border-border bg-white pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass(user.status)}`}>
                      {user.status}
                    </span>
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
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No users match that search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
