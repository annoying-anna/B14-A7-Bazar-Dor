import {
  CATEGORIES_DATA,
  PRODUCTS_DATA,
  type BazarPrice,
  type Category,
  type Product,
} from "./data";

/** The official assignment API endpoint */
const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

const REQUEST_TIMEOUT_MS = 10000;

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const bengaliToLatin: Record<string, string> = {
      "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
      "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
    };
    const latin = value.replace(/[০-৯]/g, (digit) => bengaliToLatin[digit] ?? digit);
    const parsed = Number(latin.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function toText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

/**
 * The new API uses:
 *   nameBn, today, yesterday, lastWeek, lastMonth,
 *   change: { dir: "up"|"down"|"flat", pct: number },
 *   markets: [{ market, division, min, max }],
 *   categoryNameBn, categoryIcon, image (emoji)
 */
function normalizeApiProduct(raw: unknown, index: number): Product | null {
  const record = isRecord(raw) ? raw : {};

  const name = toText(record.nameBn ?? record.name ?? record.title).trim();
  if (!name) return null;

  const id = toText(record.id ?? record._id, String(index + 1));
  const slug = toText(record.slug, "").trim() || id;
  const categorySlug = toText(record.category ?? record.category_slug, "").trim();
  const categoryName = toText(record.categoryNameBn ?? record.category_name ?? record.categoryName, categorySlug);
  const knownCategory = CATEGORIES_DATA.find((c) => c.slug === categorySlug);

  // Prices
  const price = toNumber(record.today ?? record.price ?? record.current_price, 0);
  const prevPrice = toNumber(record.yesterday ?? record.prev_price ?? record.previous_price, price);

  // Change — new API sends { dir: "up"|"down"|"flat", pct: number }
  let changePct = 0;
  let isRising = false;
  const changeField = record.change;
  if (isRecord(changeField)) {
    changePct = toNumber(changeField.pct, 0);
    isRising = toText(changeField.dir) === "up";
  } else {
    const rawChange = toNumber(record.change ?? record.price_change, 0);
    changePct = rawChange;
    isRising = rawChange > 0;
  }

  // Markets — new API: { market, division, min, max }
  const rawMarkets = toArray(record.markets ?? record.bazars ?? record.bazar_prices);
  const bazars: BazarPrice[] = rawMarkets
    .filter(isRecord)
    .reduce<BazarPrice[]>((acc, m) => {
      const marketName = toText(m.market ?? m.name ?? m.bazar, "").trim();
      const minVal = toNumber(m.min ?? m.price, 0);
      const maxVal = toNumber(m.max, minVal);
      const avgPrice = Math.round((minVal + maxVal) / 2);
      const division = toText(m.division, "");
      if (!marketName || !avgPrice) return acc;
      acc.push({ name: marketName, price: avgPrice, min: minVal, max: maxVal, division });
      return acc;
    }, []);

  const bazarPrices = bazars.map((b) => b.price);
  const minPrice = toNumber(
    record.min_price,
    bazarPrices.length > 0 ? Math.min(...bazarPrices) : price,
  );
  const maxPrice = toNumber(
    record.max_price,
    bazarPrices.length > 0 ? Math.max(...bazarPrices) : price,
  );
  const avgPrice = bazarPrices.length > 0
    ? Number((bazarPrices.reduce((s, v) => s + v, 0) / bazarPrices.length).toFixed(0))
    : price;

  // Emoji — new API uses `image` field for emoji
  const emoji = toText(record.image ?? record.emoji ?? record.categoryIcon ?? record.icon, knownCategory?.icon ?? "🛒");

  return {
    id,
    name,
    slug,
    category: categorySlug,
    category_name: categoryName,
    unit: toText(record.unit, "কেজি"),
    price,
    prev_price: prevPrice,
    last_week: isRecord(raw) ? toNumber((raw as ApiRecord).lastWeek) : undefined,
    last_month: isRecord(raw) ? toNumber((raw as ApiRecord).lastMonth) : undefined,
    change: Math.abs(changePct),
    is_rising: isRising,
    emoji,
    min_price: minPrice,
    max_price: maxPrice,
    avg_price: avgPrice,
    bazars,
  };
}

function normalizeCategory(raw: unknown, index: number): Category | null {
  const record = isRecord(raw) ? raw : {};
  const name = toText(record.nameBn ?? record.name ?? record.title).trim();
  if (!name) return null;

  const slug = toText(record.slug ?? record.id, "").trim();
  const known = CATEGORIES_DATA.find((c) => c.slug === slug || c.name === name);

  return {
    id: toText(record.id ?? record._id, String(index + 1)),
    name,
    slug,
    icon: toText(record.icon ?? record.emoji, known?.icon ?? "🛒"),
    description: toText(record.description, known?.description ?? ""),
  };
}

async function fetchApi(path: string): Promise<unknown | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[BazarDor] API ${path} returned ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`[BazarDor] ${API_BASE}${path} is unavailable.`, error);
    return null;
  }
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (isRecord(payload)) {
    for (const key of ["data", "products", "categories", "result", "items", "results"]) {
      const value = payload[key];
      if (Array.isArray(value)) return value;
    }
  }
  return [];
}

function extractObject(payload: unknown): unknown {
  if (isRecord(payload) && !Array.isArray(payload)) {
    for (const key of ["data", "product", "result"]) {
      const value = payload[key];
      if (isRecord(value)) return value;
    }
    return payload;
  }
  return payload;
}

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  const path = categorySlug
    ? `/products?category=${encodeURIComponent(categorySlug)}`
    : "/products";
  const payload = await fetchApi(path);

  const list = Array.isArray(payload) ? payload : extractList(payload);

  const remote = list
    .map((item, index) => normalizeApiProduct(item, index))
    .filter((p): p is Product => p !== null);

  if (remote.length > 0) {
    return categorySlug
      ? remote.filter((p) => p.category === categorySlug)
      : remote;
  }

  const fallback = categorySlug
    ? PRODUCTS_DATA.filter((p) => p.category === categorySlug)
    : PRODUCTS_DATA;
  return fallback.map((p) => ({ ...p }));
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  // Try direct slug lookup first
  const direct = await fetchApi(`/products/${encodeURIComponent(slug)}`);
  if (direct) {
    const obj = isRecord(direct) ? extractObject(direct) : direct;
    const normalized = normalizeApiProduct(obj, 0);
    if (normalized && normalized.name) return normalized;
  }

  // Fall back to filtering the full product list
  const list = await fetchProducts();
  const match = list.find((p) => p.slug === slug || p.id === slug);
  if (match) return match;

  const localMatch = PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug);
  return localMatch ? { ...localMatch } : null;
}

export async function fetchCategories(): Promise<Category[]> {
  const payload = await fetchApi("/categories");

  const list = Array.isArray(payload) ? payload : extractList(payload);

  const remote = list
    .map((item, index) => normalizeCategory(item, index))
    .filter((c): c is Category => c !== null);

  return remote.length > 0 ? remote : CATEGORIES_DATA.map((c) => ({ ...c }));
}
