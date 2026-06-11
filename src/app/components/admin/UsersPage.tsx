import { useMemo, useState } from "react";
import { Search, Eye, Pencil, Trash } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Organizer" | "Volunteer" | "Member";
  status: "Active" | "Pending" | "Suspended";
};

const initialUsers: User[] = [
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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("Member");
  const [status, setStatus] = useState<User["status"]>("Active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        [user.name, user.email, user.role, user.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query, users]
  );

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("Member");
    setStatus("Active");
    setErrors({});
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCreate = () => {
    const nextErrors: Record<string, string> = {};

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!email.includes("@")) nextErrors.email = "Enter a valid email.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      role,
      status,
    };

    setUsers((prev) => [newUser, ...prev]);
    setIsModalOpen(false);
    resetForm();
    showSuccess("User created successfully.");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((user) => user.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Users</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Search and review user status, role, and contact details.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              + Create User
            </button>
          </div>

          <div className="mt-6 relative w-full sm:w-80">
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

        {successMessage ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            {successMessage}
          </div>
        ) : null}

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
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(user)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground hover:border-rose-400 hover:text-rose-600 transition"
                    >
                      <Trash size={14} />
                      Delete
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-border p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Create New User</h2>
              <p className="text-muted-foreground mt-2">Fill in the details below to add a new platform user.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
                {errors.firstName && <p className="text-rose-600 text-sm mt-2">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
                {errors.lastName && <p className="text-rose-600 text-sm mt-2">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
              {errors.email && <p className="text-rose-600 text-sm mt-2">{errors.email}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as User["role"])}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                >
                  <option>Member</option>
                  <option>Volunteer</option>
                  <option>Organizer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as User["status"])}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                >
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-border p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-foreground">Delete user</h2>
            <p className="text-muted-foreground mt-2">Are you sure you want to remove {deleteTarget.name}?</p>
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

export default UsersPage;
