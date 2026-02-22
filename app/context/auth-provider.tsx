"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext, User } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔵 Indica si ya determinamos si existe sesión
  const [initialized, setInitialized] = useState(false);

  // 🟡 Indica si estamos ejecutando una acción auth (login/logout/refresh)
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 🔁 Obtener usuario actual
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 Inicialización al montar la app
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, []);

  // 🔐 Login
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLoading(false);
        throw new Error(data?.detail || "Credenciales inválidas");
      }

      await refreshUser();

      if (!pathname?.startsWith("/dashboard")) {
        router.push("/dashboard");
      }

      setLoading(false);
    },
    [refreshUser, router, pathname]
  );

  // 🚪 Logout
  const logout = useCallback(async () => {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

    if (pathname !== "/login") {
      router.push("/login");
    }

    setLoading(false);
  }, [router, pathname]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      initialized,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, initialized, login, logout, refreshUser]
  );

  // 🔒 Mientras no sabemos si hay sesión, podemos mostrar un loader global
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
