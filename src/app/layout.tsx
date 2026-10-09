"use client";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Suspense fallback={<div className="h-16 bg-white border-b border-emerald-100"></div>}>
            <Navbar />
          </Suspense>
          <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
            <Suspense fallback={<div className="py-12 text-center text-slate-500 font-medium">লোড হচ্ছে...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
