import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "admin" | "user";

export type AuthUser = {
  name: string;
  email: string;
  role: Role;
  centre: string;
};

// Demo accounts for the prototype — no real backend.
// One admin + one user per community centre partner.
const demoAccounts: Array<AuthUser & { password: string }> = [
  // 360 Kids
  { name: "Tally", email: "tally@360kids.com", password: "tally1234", role: "admin", centre: "360 Kids" },
  { name: "360 Kids User", email: "user1@360kids.com", password: "user1234", role: "user", centre: "360 Kids" },

  // Better Street
  { name: "Robert", email: "robert@betterstreet.com", password: "robert1234", role: "admin", centre: "Better Street" },
  { name: "Better Street User", email: "user1@betterstreet.com", password: "user1234", role: "user", centre: "Better Street" },

  // HICC
  { name: "Victoria", email: "victoria@hicc.com", password: "victoria1234", role: "admin", centre: "HICC" },
  { name: "HICC User", email: "user1@hicc.com", password: "user1234", role: "user", centre: "HICC" },

  // Reena
  { name: "Gary", email: "gary@reena.com", password: "gary1234", role: "admin", centre: "Reena" },
  { name: "Natalie", email: "natalie@reena.com", password: "natalie1234", role: "admin", centre: "Reena" },
  { name: "Reena User", email: "user1@reena.com", password: "user1234", role: "user", centre: "Reena" },

  // Trek for Teens
  { name: "Sai", email: "sai@trekforteens.com", password: "sai1234", role: "admin", centre: "Trek for Teens" },
  { name: "Trek for Teens User", email: "user1@trekforteens.com", password: "user1234", role: "user", centre: "Trek for Teens" },

  // YSB
  { name: "Mike", email: "mike@ysb.com", password: "mike1234", role: "admin", centre: "YSB" },
  { name: "YSB User", email: "user1@ysb.com", password: "user1234", role: "user", centre: "YSB" },

  // York U Community Safety
  { name: "Andrea", email: "andrea@yorku.com", password: "andrea1234", role: "admin", centre: "York U Community Safety" },
  { name: "York U Community Safety User", email: "user1@yorku.com", password: "user1234", role: "user", centre: "York U Community Safety" },
];

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => AuthUser | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "youbelong-auth";

const readStoredUser = (): AuthUser | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const login = (email: string, password: string): AuthUser | null => {
    const account = demoAccounts.find(
      (acc) => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
    );
    if (!account) return null;
    const authUser: AuthUser = {
      name: account.name,
      email: account.email,
      role: account.role,
      centre: account.centre,
    };
    setUser(authUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}