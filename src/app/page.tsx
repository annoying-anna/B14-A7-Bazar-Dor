"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/lib/data";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const risers = products.filter((p) => p.is_rising).slice(0, 6);
  const fallers = products.filter((p) => !p.is_rising).slice(0, 6);

  return (
    <div className="space-y-12">
      {/* 2. Hero Banner Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="max-w-xl space-y-4 z-10 text-center md:text-left">
          <span className="inline-block bg-emerald-500/30 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            সঠিক বাজার দর জানুন
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম এক নজরে
          </h1>
          <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
            প্রতিদিনের বাজার দর, দরদাম উঠানামার হিসাব এবং বিভিন্ন বাজারের নিখুঁত পর্যবেক্ষণ নিয়ে আমাদের প্ল্যাটফর্ম।
          </p>
          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-block bg-white text-emerald-800 font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 transition transform hover:-translate-y-0.5"
            >
              সব পণ্য দেখুন ↓
            </a>
          </div>
        </div>

        {/* Banner Right Image / Illustration */}
        <div className="w-full md:w-80 flex items-center justify-center z-10">
          <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-8xl shadow-inner border border-white/20">
            🛒🌾
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-900/20 rounded-full blur-2xl"></div>
      </section>

      {/* Section A — আজ দাম বেড়েছে ▲ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <span className="text-rose-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <span className="text-xs text-slate-600 font-medium">সর্বশেষ হালনাগাদ তথ্য</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : risers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Section B — আজ দাম কমেছে ▼ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <span className="text-emerald-600">▼</span> আজ দাম কমেছে
          </h2>
          <span className="text-xs text-slate-600 font-medium">সর্বশেষ হালনাগাদ তথ্য</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : fallers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Section C — সব পণ্য */}
      <section id="সব-পণ্য" className="space-y-4 pt-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">সব পণ্য</h2>
            <p className="text-xs text-slate-600">সকল ক্যাটাগরির নিত্যপ্রয়োজনীয় সামগ্রী</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
