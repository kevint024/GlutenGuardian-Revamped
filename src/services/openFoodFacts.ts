// Open Food Facts API Service

export interface ProductData {
  code: string;
  name: string;
  brand: string;
  image: string;
  ingredients: string;
  allergens: string;
  traces: string;
  labels: string;
  categories: string;
  nutriScore: string;
  novaGroup: number | null;
  quantity: string;
  countries: string;
  found: boolean;
}

const API_BASE = 'https://world.openfoodfacts.net';

function fetchWithTimeout(url: string, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(id));
}

export async function fetchProductByBarcode(barcode: string): Promise<ProductData> {
  const sanitized = barcode.replace(/[^0-9]/g, '');
  if (!sanitized || sanitized.length < 4) {
    throw new Error('Invalid barcode format');
  }
  
  const response = await fetchWithTimeout(
    `${API_BASE}/api/v2/product/${encodeURIComponent(sanitized)}.json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  
  const data = await response.json();
  
  if (!data.product) {
    return {
      code: sanitized,
      name: '',
      brand: '',
      image: '',
      ingredients: '',
      allergens: '',
      traces: '',
      labels: '',
      categories: '',
      nutriScore: '',
      novaGroup: null,
      quantity: '',
      countries: '',
      found: false,
    };
  }

  const p = data.product;
  return {
    code: sanitized,
    name: p.product_name || p.product_name_en || '',
    brand: p.brands || '',
    image: p.image_front_url || p.image_url || '',
    ingredients: p.ingredients_text || p.ingredients_text_en || '',
    allergens: p.allergens_tags?.join(', ') || '',
    traces: p.traces_tags?.join(', ') || '',
    labels: p.labels || '',
    categories: p.categories || '',
    nutriScore: p.nutriscore_grade || '',
    novaGroup: p.nova_group || null,
    quantity: p.quantity || '',
    countries: p.countries || '',
    found: true,
  };
}

export async function searchProducts(query: string, page: number = 1): Promise<{
  products: ProductData[];
  count: number;
  pageCount: number;
}> {
  const sanitized = query.replace(/[<>"';&]/g, '').trim();
  if (!sanitized) {
    return { products: [], count: 0, pageCount: 0 };
  }
  
  const response = await fetchWithTimeout(
    `${API_BASE}/cgi/search.pl?search_terms=${encodeURIComponent(sanitized)}&search_simple=1&action=process&json=1&page=${page}&page_size=20`
  );
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  const data = await response.json();
  
  const products: ProductData[] = (data.products || []).map((p: any) => ({
    code: p.code || '',
    name: p.product_name || p.product_name_en || 'Unknown Product',
    brand: p.brands || '',
    image: p.image_front_small_url || p.image_front_url || '',
    ingredients: p.ingredients_text || p.ingredients_text_en || '',
    allergens: p.allergens_tags?.join(', ') || '',
    traces: p.traces_tags?.join(', ') || '',
    labels: p.labels || '',
    categories: p.categories || '',
    nutriScore: p.nutriscore_grade || '',
    novaGroup: p.nova_group || null,
    quantity: p.quantity || '',
    countries: p.countries || '',
    found: true,
  }));

  return {
    products,
    count: data.count || 0,
    pageCount: Math.ceil((data.count || 0) / 20),
  };
}

export async function checkApiStatus(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/api/v2/search?lc=en&page_size=1`, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
