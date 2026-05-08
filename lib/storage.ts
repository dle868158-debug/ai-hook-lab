// localStorage abstraction for AI Hook Lab

import { HistoryItem, Hook } from './types';

const STORAGE_KEYS = {
  HISTORY: 'aihooklab_history',
  FAVORITES: 'aihooklab_favorites',
  SETTINGS: 'aihooklab_settings',
} as const;

const MAX_HISTORY_ITEMS = 50;

// ============ History ============

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(item: HistoryItem): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    history.unshift(item);
    // Keep only the latest MAX_HISTORY_ITEMS
    const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function removeFromHistory(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to remove history item:', e);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

// ============ Favorites ============

export function getFavorites(): Hook[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToFavorites(hook: Hook): void {
  if (typeof window === 'undefined') return;
  try {
    const favorites = getFavorites();
    // Avoid duplicates
    if (!favorites.some(f => f.id === hook.id)) {
      favorites.unshift(hook);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (e) {
    console.error('Failed to add to favorites:', e);
  }
}

export function removeFromFavorites(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const favorites = getFavorites().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to remove from favorites:', e);
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().some(f => f.id === id);
}

export function clearFavorites(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.FAVORITES);
}

// ============ Settings ============

interface AppSettings {
  hasApiKey: boolean;
  lastUsedPlatform?: string;
  lastUsedContentType?: string;
}

export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return { hasApiKey: false };
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { hasApiKey: false };
  } catch {
    return { hasApiKey: false };
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}