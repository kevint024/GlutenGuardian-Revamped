// Local storage service for favorites and scan history

export interface FavoriteItem {
  id: string;
  type: 'product' | 'dish' | 'ingredient';
  name: string;
  brand?: string;
  barcode?: string;
  status: 'safe' | 'caution' | 'unsafe' | 'unknown';
  image?: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  type: 'scan' | 'search' | 'manual' | 'dish';
  name: string;
  barcode?: string;
  status: 'safe' | 'caution' | 'unsafe' | 'unknown';
  timestamp: number;
}

const FAVORITES_KEY = 'gluten_guardian_favorites';
const HISTORY_KEY = 'gluten_guardian_history';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Favorites
export function getFavorites(): FavoriteItem[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(item: Omit<FavoriteItem, 'id' | 'timestamp'>): FavoriteItem {
  const favorites = getFavorites();
  const newItem: FavoriteItem = { ...item, id: generateId(), timestamp: Date.now() };
  favorites.unshift(newItem);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return newItem;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter(f => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(name: string, barcode?: string): boolean {
  const favorites = getFavorites();
  return favorites.some(f => 
    (barcode && f.barcode === barcode) || f.name.toLowerCase() === name.toLowerCase()
  );
}

// History
export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
  const history = getHistory();
  const newItem: HistoryItem = { ...item, id: generateId(), timestamp: Date.now() };
  history.unshift(newItem);
  // Keep last 100 items
  if (history.length > 100) history.length = 100;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
}
