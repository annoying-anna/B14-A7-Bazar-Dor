"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("তথ্য পরিবর্তন করতে প্রথমে লগইন করুন!");
      router.push("/signin");
    } else {
      setName(user.name || "");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার সঠিক নাম লিখুন!");
      return;
    }

    setIsUpdating(true);

    try {
      // Call BetterAuth updateUser API
      await updateUser({
        name: name.trim(),
      });
    } catch {
      // Fallback local update if server auth endpoint is offline
    }

    updateProfile(name.trim());
    setIsUpdating(false);
    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <Link
            href="/profile"
            className="text-xs font-semibold text-emerald-700 hover:underline block mb-2"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">তথ্য আপডেট করুন</h1>
          <p className="text-xs text-slate-500">আপনার একাউন্টের নাম পরিবর্তন করতে নিচের ঘরে নাম লিখুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              ইমেইল অ্যাড্রেস (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm cursor-not-allowed font-medium"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
            >
              বাতিল করুন
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-xs transition disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য সেভ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
