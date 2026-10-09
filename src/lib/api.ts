import { PRODUCTS_DATA, CATEGORIES_DATA, Product, Category } from "./data";

const API_BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = categorySlug 
      ? `${API_BASE_URL}/products?category=${categorySlug}`
      : `${API_BASE_URL}/products`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn("API Store Fetch failed, fallback to local data:", error);
  }

  // Fallback filtering on local static dataset
  if (categorySlug) {
    return PRODUCTS_DATA.filter((p) => p.category === categorySlug);
  }
  return PRODUCTS_DATA;
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.name) {
        return data;
      }
    }
  } catch (error) {
    console.warn(`API Single product fetch failed for ${slug}, fallback to local data:`, error);
  }

  const found = PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug);
  return found || null;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}/categories`, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn("API Categories fetch failed, fallback to local data:", error);
  }

  return CATEGORIES_DATA;
}
