# 🛒 বাজার দর (BazarDor) — Price Tracking Web Application

![Bazar Dor Banner](./bazar-hero.png)

> **B14-A7-Bazar-Dor** — বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর, দৈনিক দরদামের পরিবর্তন এবং বাজারভিত্তিক পর্যালোচনার একটি পূর্ণাঙ্গ Next.js অ্যাপ্লিকেশন।

---

## 🌟 Key Features (মূল বৈশিষ্ট্যসমূহ)

1. **📊 Real-time Price Ticker & Live Date**: 
   - টপ নভবরে বাংলা তারিখ প্রদর্শন এবং লাইভ প্রাইস ট্র্যাকিং অ্যানিমেটেড মার্কি (Marquee Strip)।
2. **⚖️ Price Riser & Faller Breakdown**: 
   - হোম পেজে “আজ দাম বেড়েছে ▲” এবং “আজ দাম কমেছে ▼” সেকশনে টপ প্রডাক্টের লাইভ তালিকা।
3. **🔒 BetterAuth Protected Routes**: 
   - প্রোডাক্ট ডিটেইলস পেজ (`/product/[slug]`) এবং প্রোফাইল পেজ সুরক্ষিত (লগইন ছাড়া অ্যাক্সেস করলে সরাসরি রিডাইরেক্ট ও টোস্ট নোটিফিকেশন)।
4. **🏷️ Category Filtering & Bengali Numerical Sorting (Challenge C1)**: 
   - ক্যাটাগরি অনুযায়ী প্রডাক্ট ফিল্টার এবং ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম অপশন দিয়ে সঠিক সংখ্যাবাচক সর্টিং।
5. **👤 Profile Update Feature (Challenge C3)**: 
   - ইউজার প্রোফাইল দেখা এবং `/profile/edit` রুটের মাধ্যমে নাম আপডেট করার সুবিধা।
6. **📱 Fully Responsive & Custom 404 Page**: 
   - মোবাইল, ট্যাবলেট ও ডেসকটপ ফ্রেন্ডলি ডিজাইন এবং কাস্টম বাংলা ৪০৪ পেজ হ্যান্ডলিং।

---

## 🛠️ Technologies Used (ব্যবহার করা প্রযুক্তিসমূহ)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & DaisyUI
- **Authentication**: BetterAuth (Email/Password & Social Google/GitHub)
- **Notification**: React Hot Toast
- **Icons**: Emoji & Lucide React

---

## 🚀 Getting Started (রান করার নিয়ম)

১. প্রজেক্ট রিপোজিটরি ক্লোন করুন:
```bash
git clone https://github.com/your-username/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
```

২. প্রয়োজনীয় ডিপেনডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

৪. ব্রাউজারে দেখতে ভিজিট করুন: `http://localhost:3000`

---

## 📬 Live Submission Links

- **Live Site**: `https://bazar-iq77ounpd-annoyed.vercel.app`
- **GitHub Repository**: `https://github.com/your-username/B14-A7-Bazar-Dor`
