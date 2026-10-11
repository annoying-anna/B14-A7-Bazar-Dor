export interface BazarPrice {
  name: string;
  price: number;
  min?: number;
  max?: number;
  division?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  category_name: string;
  unit: string;
  price: number;
  prev_price: number;
  last_week?: number;
  last_month?: number;
  change: number;
  is_rising: boolean;
  emoji: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  description?: string;
  bazars: BazarPrice[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export const CATEGORIES_DATA: Category[] = [
  { id: "chal", name: "চাল", slug: "chal", icon: "🍚", description: "দেশি ও আমদানিকৃত সকল প্রকার চালের দাম" },
  { id: "dal", name: "ডাল", slug: "dal", icon: "🫘", description: "মসুর, মুগ, ছোলা ও অন্যান্য ডালের বাজার দর" },
  { id: "tel", name: "তেল", slug: "tel", icon: "🛢️", description: "সয়াবিন, সরিষা ও পাম তেলের সর্বশেষ দাম" },
  { id: "sobji", name: "সবজি", slug: "sobji", icon: "🥬", description: "দৈনন্দিন তরতাজা শাক-সবজির বাজার দর" },
  { id: "mach", name: "মাছ", slug: "mach", icon: "🐟", description: "দেশি মাছ, ইলিশ, রুই, কাতলা ও চিংড়ির দাম" },
  { id: "mangsho", name: "মাংস", slug: "mangsho", icon: "🍗", description: "মুরগি, গরু, খাসি ও হাঁসের মাংসের দাম" },
  { id: "dim-dui", name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛", description: "ফার্মের ডিম, দুধ, দই ও মাখনের দাম" },
  { id: "mosla", name: "মসলা", slug: "mosla", icon: "🌶️", description: "আদা, রসুন, মরিচ গুঁড়া ও অন্যান্য মসলা" },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1", name: "স্বর্ণমাছি চাল", slug: "sorno-machi-chal", category: "chal", category_name: "চাল",
    unit: "কেজি", price: 148, prev_price: 145, change: 2.1, is_rising: true, emoji: "🍚",
    min_price: 134, max_price: 165, avg_price: 150,
    bazars: [{ name: "কারওয়ান বাজার", price: 155 }, { name: "মিরপুর বাজার", price: 151 }]
  },
  {
    id: "2", name: "মিনিকেট চাল", slug: "miniket-chal", category: "chal", category_name: "চাল",
    unit: "কেজি", price: 99, prev_price: 102, change: -2.9, is_rising: false, emoji: "🍚",
    min_price: 88, max_price: 110, avg_price: 99,
    bazars: [{ name: "কারওয়ান বাজার", price: 104 }, { name: "মিরপুর বাজার", price: 101 }]
  },
  {
    id: "12", name: "আলু", slug: "alu", category: "sobji", category_name: "সবজি",
    unit: "কেজি", price: 30, prev_price: 32, change: -6.2, is_rising: false, emoji: "🥔",
    min_price: 24, max_price: 36, avg_price: 30,
    bazars: [{ name: "কারওয়ান বাজার", price: 31 }, { name: "মিরপুর বাজার", price: 30 }]
  },
  {
    id: "13", name: "পেঁয়াজ", slug: "peyaj", category: "sobji", category_name: "সবজি",
    unit: "কেজি", price: 54, prev_price: 48, change: 12.5, is_rising: true, emoji: "🧅",
    min_price: 41, max_price: 65, avg_price: 53,
    bazars: [{ name: "কারওয়ান বাজার", price: 61 }, { name: "মিরপুর বাজার", price: 59 }]
  },
  {
    id: "19", name: "ইলিশ মাছ", slug: "ilish-mach", category: "mach", category_name: "মাছ",
    unit: "কেজি", price: 1850, prev_price: 1790, change: 3.4, is_rising: true, emoji: "🐠",
    min_price: 1463, max_price: 2430, avg_price: 1850,
    bazars: [{ name: "কারওয়ান বাজার", price: 2290 }, { name: "মিরপুর বাজার", price: 2225 }]
  },
  {
    id: "22", name: "মুরগির মাংস", slug: "murgi-r-mangsho", category: "mangsho", category_name: "মাংস",
    unit: "কেজি", price: 225, prev_price: 228, change: -1.3, is_rising: false, emoji: "🍗",
    min_price: 187, max_price: 270, avg_price: 225,
    bazars: [{ name: "কারওয়ান বাজার", price: 255 }, { name: "মিরপুর বাজার", price: 247 }]
  },
  {
    id: "26", name: "ডিম", slug: "dim", category: "dim-dui", category_name: "ডিম-দুধ",
    unit: "ডজন", price: 158, prev_price: 152, change: 3.9, is_rising: true, emoji: "🥚",
    min_price: 134, max_price: 183, avg_price: 155,
    bazars: [{ name: "কারওয়ান বাজার", price: 166 }, { name: "মিরপুর বাজার", price: 161 }]
  },
  {
    id: "30", name: "আদা", slug: "ada", category: "mosla", category_name: "মসলা",
    unit: "কেজি", price: 85, prev_price: 78, change: 9.0, is_rising: true, emoji: "🫚",
    min_price: 65, max_price: 114, avg_price: 83,
    bazars: [{ name: "কারওয়ান বাজার", price: 89 }, { name: "মিরপুর বাজার", price: 86 }]
  },
];

export function toBengaliNumber(num: number | string): string {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}
