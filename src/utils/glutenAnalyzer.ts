// Gluten Analysis Engine - Core detection logic

export interface AnalysisResult {
  status: 'safe' | 'caution' | 'unsafe';
  glutenIngredients: string[];
  cautionIngredients: string[];
  allIngredients: string[];
  summary: string;
}

const GLUTEN_INGREDIENTS: string[] = [
  'wheat', 'barley', 'rye', 'malt', 'semolina', 'triticale', 'spelt', 'farro',
  'durum', 'vital wheat gluten', 'graham flour', 'brewer\'s yeast',
  'hydrolyzed wheat protein', 'wheat starch', 'wheat flour', 'wheat germ',
  'wheat bran', 'cracked wheat', 'wheat berries', 'seitan', 'fu',
  'couscous', 'bulgur', 'einkorn', 'emmer', 'kamut', 'freekeh',
  'wheat protein', 'wheat gluten', 'barley malt', 'malt extract',
  'malt syrup', 'malt flavoring', 'malt vinegar', 'barley flour',
  'barley flakes', 'rye flour', 'rye bread', 'pumpernickel',
  'orzo', 'panko', 'bread crumbs', 'breadcrumbs',
  'flour tortilla', 'wheat tortilla', 'atta flour', 'maida',
  'sooji', 'rava', 'dalia', 'broken wheat',
];

const CAUTION_INGREDIENTS: string[] = [
  'modified food starch', 'maltodextrin', 'dextrin',
  'natural flavor', 'natural flavors', 'natural flavoring',
  'artificial flavor', 'artificial flavors',
  'caramel color', 'caramel coloring',
  'hydrolyzed vegetable protein', 'hydrolyzed plant protein',
  'textured vegetable protein', 'soy sauce',
  'teriyaki sauce', 'worcestershire sauce',
  'modified starch', 'food starch',
  'mono and diglycerides', 'maltose',
  'brown rice syrup', 'smoke flavoring',
  'seasoning', 'spice mix', 'spice blend',
  'bouillon', 'broth', 'stock',
  'communion wafer', 'breading', 'coating',
  'thickener', 'stabilizer', 'emulsifier',
  'yeast extract', 'autolyzed yeast extract',
  'hydrolyzed protein', 'vegetable protein',
  'processed cheese', 'imitation cheese',
  'licorice', 'candy',
];

// Common gluten-free grains for educational reference
export const SAFE_GRAINS: string[] = [
  'rice', 'corn', 'quinoa', 'oats (certified gluten-free)', 'millet',
  'sorghum', 'teff', 'amaranth', 'buckwheat', 'arrowroot',
  'tapioca', 'potato starch', 'corn starch', 'almond flour',
  'coconut flour', 'chickpea flour', 'cassava flour',
];

function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function analyzeIngredients(ingredientText: string): AnalysisResult {
  const normalized = normalizeText(ingredientText);
  const ingredients = normalized
    .split(/[,;()\[\]\/\n]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const foundGluten: Set<string> = new Set();
  const foundCaution: Set<string> = new Set();

  for (const ingredient of ingredients) {
    for (const gluten of GLUTEN_INGREDIENTS) {
      if (ingredient.includes(gluten) || gluten.includes(ingredient)) {
        foundGluten.add(gluten);
      }
    }
    for (const caution of CAUTION_INGREDIENTS) {
      if (ingredient.includes(caution) || caution.includes(ingredient)) {
        foundCaution.add(caution);
      }
    }
  }

  // Also check the full text for multi-word matches
  for (const gluten of GLUTEN_INGREDIENTS) {
    if (normalized.includes(gluten)) {
      foundGluten.add(gluten);
    }
  }
  for (const caution of CAUTION_INGREDIENTS) {
    if (normalized.includes(caution)) {
      foundCaution.add(caution);
    }
  }

  const glutenArr = Array.from(foundGluten);
  const cautionArr = Array.from(foundCaution);

  let status: 'safe' | 'caution' | 'unsafe';
  let summary: string;

  if (glutenArr.length > 0) {
    status = 'unsafe';
    summary = `Contains ${glutenArr.length} gluten ingredient(s): ${glutenArr.join(', ')}`;
  } else if (cautionArr.length > 0) {
    status = 'caution';
    summary = `No definite gluten found, but ${cautionArr.length} ingredient(s) may contain hidden gluten: ${cautionArr.join(', ')}`;
  } else {
    status = 'safe';
    summary = 'No gluten-containing ingredients detected. This product appears to be gluten-free.';
  }

  return {
    status,
    glutenIngredients: glutenArr,
    cautionIngredients: cautionArr,
    allIngredients: ingredients,
    summary,
  };
}

// Analyze a dish name by using the comprehensive dish database
import { searchDishes } from '../data/dishDatabase'

export function analyzeDish(dishName: string): { status: 'safe' | 'caution' | 'unsafe'; info: string } | null {
  const results = searchDishes(dishName, 1)
  if (results.length > 0 && results[0].score >= 35) {
    return { status: results[0].status, info: results[0].info }
  }
  return null
}

export function getStatusColor(status: 'safe' | 'caution' | 'unsafe'): string {
  switch (status) {
    case 'safe': return '#16a34a';
    case 'caution': return '#f59e0b';
    case 'unsafe': return '#dc2626';
  }
}

export function getStatusEmoji(status: 'safe' | 'caution' | 'unsafe'): string {
  switch (status) {
    case 'safe': return '✅';
    case 'caution': return '⚠️';
    case 'unsafe': return '❌';
  }
}

export function getStatusLabel(status: 'safe' | 'caution' | 'unsafe'): string {
  switch (status) {
    case 'safe': return 'Safe';
    case 'caution': return 'Caution';
    case 'unsafe': return 'Unsafe';
  }
}
