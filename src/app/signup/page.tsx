"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("সবগুলো ঘর সঠিকভাবে পূরণ করুন!");
      return;
    }
    register(name, email);
    router.push("/signin");
  };

  const handleSocialLogin = (provider: string) => {
    login(`user@${provider.toLowerCase()}.com`, `${provider} User`);
    toast.success(`${provider} দিয়ে নতুন একাউন্ট তৈরি করা হয়েছে!`);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900">নতুন একাউন্ট তৈরি করুন</h1>
          <p className="text-xs text-slate-500">আপনার সঠিক তথ্য দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন</p>
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

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: মোঃ রহিম উদ্দিন"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

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
            সাইন আপ সম্পন্ন করুন
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-600">
            ইতিমধ্যে একাউন্ট আছে?{" "}
            <Link href="/signin" className="text-emerald-700 font-bold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
