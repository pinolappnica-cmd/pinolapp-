"use client";
import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, action: "login" }),
    });
    const data = await res.json();
    if (res.ok) setUser(data.user);
    return data;
  };

  const register = async (email: string, password: string, role: string = "customer") => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, role, action: "register" }),
    });
    return await res.json();
  };

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setUser(null);
  };

  return { user, login, register, logout };
}
