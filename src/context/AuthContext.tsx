"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface User {
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (newName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("bazardor_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("bazardor_user");
      }
    }
  }, []);

  const login = (email: string, name?: string) => {
    const userName = name || email.split("@")[0];
    const newUser = { name: userName, email, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email };
    setUser(newUser);
    localStorage.setItem("bazardor_user", JSON.stringify(newUser));
    toast.success("সফলভাবে লগইন হয়েছে!");
  };

  const register = (name: string, email: string) => {
    const newUser = { name, email, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email };
    setUser(newUser);
    localStorage.setItem("bazardor_user", JSON.stringify(newUser));
    toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bazardor_user");
    toast.success("লগআউট করা হয়েছে!");
  };

  const updateProfile = (newName: string) => {
    if (!user) return;
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem("bazardor_user", JSON.stringify(updatedUser));
    toast.success("প্রোফাইল আপডেট করা হয়েছে!");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
