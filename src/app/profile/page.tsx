"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error("প্রোফাইল দেখতে প্রথমে লগইন করুন!");
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-md">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-500 font-medium">{user.email}</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full mt-2">
              নিয়মিত ব্যবহারকারী
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">একাউন্ট তথ্য</h2>
          <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100 text-sm">
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500">নাম:</span>
              <span className="font-semibold text-slate-800">{user.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500">ইমেইল:</span>
              <span className="font-semibold text-slate-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">স্ট্যাটাস:</span>
              <span className="font-bold text-emerald-600">Active / Verified</span>
            </div>
          </div>
        </div>

        {/* C3. Challenge Action — Update Button */}
        <div className="pt-2 flex justify-end">
          <Link
            href="/profile/edit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-sm transition"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
