"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("সবগুলো তথ্য সঠিকভাবে পূরণ করুন!");
      return;
    }
    login(email);
    router.push("/");
  };

  const handleSocialLogin = (provider: string) => {
    login(`user@${provider.toLowerCase()}.com`, `${provider} User`);
    toast.success(`${provider} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900">সাইন ইন করুন</h1>
          <p className="text-xs text-slate-500">আপনার একাউন্টে প্রবেশ করতে তথ্য দিন</p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin("Google")}
            type="button"
            className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 transition"
          >
            <span>🌐</span> Google
          </button>
          <button
            onClick={() => handleSocialLogin("GitHub")}
            type="button"
            className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 transition"
          >
            <span>🐙</span> GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-slate-400 absolute">অথবা</span>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm"
          >
            সাইন ইন করুন
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-600">
            একাউন্ট নেই?{" "}
            <Link href="/signup" className="text-emerald-700 font-bold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
