import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "admin" | "user";

export type AuthUser = {
  name: string;
  email: string;
  role: Role;
};

// Demo accounts for the prototype — no real backend.
const demoAccounts: Array<AuthUser & { password: string }> = [
  { name: "Centre Admin", email: "admin@youbelong.ca", password: "admin123", role: "admin" },
  { name: "Community Member", email: "user@youbelong.ca", password: "user123", role: "user" },
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
    const authUser: AuthUser = { name: account.name, email: account.email, role: account.role };
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
