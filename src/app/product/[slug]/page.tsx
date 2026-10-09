"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchSingleProduct } from "@/lib/api";
import { Product, toBengaliNumber } from "@/lib/data";
import toast from "react-hot-toast";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error("পণ্য বিবরণী দেখতে অনুগ্রহ করে প্রথমে লগইন করুন!");
      router.push("/signin");
      return;
    }

    async function loadProduct() {
      setLoading(true);
      const data = await fetchSingleProduct(slug);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [user, slug, router]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/3"></div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16 space-y-4">
        <span className="text-6xl">🔍</span>
        <h2 className="text-2xl font-bold text-slate-800">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-slate-600">আপনার অনুসন্ধাকৃত পণ্যটির কোনো তথ্য মেলেনি।</p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-200 transition"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      {/* Top — Summary Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            {product.emoji}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {product.category_name}
              </span>
              <span className="text-xs text-slate-500 font-medium">{product.unit}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600">
              {product.description || "নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দরদাম ও বিশ্লেষণ।"}
            </p>
          </div>
        </div>

        {/* Current Price Badge */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[160px] w-full md:w-auto">
          <span className="text-xs text-slate-400 block mb-1">আজকের নির্ধারিত দাম</span>
          <span className="text-3xl font-extrabold text-emerald-400">
            {toBengaliNumber(product.price)} <span className="text-sm font-normal text-white">টাকা</span>
          </span>
        </div>
      </div>

      {/* Price Summary Cards (Min, Max, Avg) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-emerald-700 block mb-1">সর্বনিম্ন দাম</span>
          <span className="text-2xl font-extrabold text-emerald-900">
            {toBengaliNumber(product.min_price)} টাকা
          </span>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-rose-700 block mb-1">সর্বোচ্চ দাম</span>
          <span className="text-2xl font-extrabold text-rose-900">
            {toBengaliNumber(product.max_price)} টাকা
          </span>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-sky-700 block mb-1">গড় দাম</span>
          <span className="text-2xl font-extrabold text-sky-900">
            {toBengaliNumber(product.avg_price)} টাকা
          </span>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <span>🏪</span> বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">পণ্যের নাম</th>
                <th className="py-3 px-4">একক</th>
                <th className="py-3 px-4 text-right">আজকের দর (টাকা)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {product.bazars && product.bazars.length > 0 ? (
                product.bazars.map((bazar, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                      <span className="text-emerald-600">📍</span> {bazar.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.name}</td>
                    <td className="py-3 px-4 text-slate-500">{product.unit}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {toBengaliNumber(bazar.price)} ৳
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-400">
                    বাজার তথ্য উপলব্ধ নয়
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
