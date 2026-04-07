import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { tokenService } from "../services/tokenService";

export type UserRole = "ADMIN" | "PARENT" | string;

interface JwtPayload {
  sub?: string;
  role?: UserRole;
  roles?: UserRole[];
  authorities?: UserRole[];
  exp?: number;
  [key: string]: unknown;
}

interface AuthContextValue {
  token: string | null;
  role: UserRole | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (token: string) => Promise<UserRole | null>;
  signOut: () => Promise<void>;
}

function extractUsername(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (
      (decoded as any).username ||
      (decoded as any).name ||
      decoded.sub ||
      null
    );
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function extractRole(token: string): UserRole | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.role) return normalizeRole(decoded.role);
    if (decoded.roles && decoded.roles.length > 0)
      return normalizeRole(decoded.roles[0]);
    if (decoded.authorities && decoded.authorities.length > 0)
      return normalizeRole(decoded.authorities[0]);
    return null;
  } catch {
    return null;
  }
}

function normalizeRole(role: UserRole): UserRole {
  return role.replace(/^ROLE_/, "").toUpperCase();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await tokenService.get();
      if (stored) {
        setToken(stored);
        setRole(extractRole(stored));
        setUsername(extractUsername(stored));
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (newToken: string) => {
    await tokenService.save(newToken);
    const r = extractRole(newToken);
    setToken(newToken);
    setRole(r);
    setUsername(extractUsername(newToken));
    return r;
  }, []);

  const signOut = useCallback(async () => {
    await tokenService.remove();
    setToken(null);
    setRole(null);
    setUsername(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      role,
      username,
      isAuthenticated: !!token,
      loading,
      signIn,
      signOut,
    }),
    [token, role, username, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
