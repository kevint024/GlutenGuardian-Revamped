// Gluten Analysis Engine - Core detection logic

export interface AnalysisResult {
  status: 'safe' | 'caution' | 'unsafe' | 'unknown';
  glutenIngredients: string[];
  cautionIngredients: string[];
  allIngredients: string[];
  summary: string;
}

const GLUTEN_INGREDIENTS: string[] = [
  // Core gluten grains & direct gluten reference
  'gluten',
  'wheat', 'barley', 'rye', 'triticale', 'spelt', 'farro', 'einkorn', 'emmer', 'kamut', 'freekeh',

  // Non-English gluten grains (German, French, Spanish, Italian, Dutch, Portuguese)
  'weizen', 'weizenmehl', 'hartweizengrieß', 'hartweizengriess', 'hartweizengrießmehl',
  'hartweizen', 'dinkel', 'dinkelmehl', 'roggen', 'roggenmehl', 'gerste', 'gerstenmalz',
  'grieß', 'griess', 'weizengrieß', 'weizenstärke', 'weizenkleber',
  'blé', 'ble', 'farine de blé', 'farine de ble', 'semoule', 'semoule de blé',
  'seigle', 'orge', 'épeautre', 'epeautre',
  'trigo', 'harina de trigo', 'harina', 'centeno', 'cebada', 'espelta',
  'grano', 'farina di grano', 'farina', 'segale', 'orzo', 'farro',
  'tarwe', 'tarwemeel', 'rogge', 'gerst', 'spelt',
  'trigo', 'farinha de trigo', 'centeio', 'cevada',

  // Wheat forms & derivatives
  'wheat flour', 'whole wheat flour', 'white flour', 'all-purpose flour', 'all purpose flour',
  'self-rising flour', 'self rising flour', 'enriched flour', 'enriched wheat flour',
  'bleached flour', 'unbleached flour', 'bread flour', 'cake flour', 'pastry flour',
  'durum', 'durum flour', 'durum wheat', 'semolina', 'semolina flour',
  'graham flour', 'graham cracker', 'wheat starch', 'wheat germ', 'wheat germ oil',
  'wheat bran', 'wheat protein', 'wheat gluten', 'vital wheat gluten',
  'cracked wheat', 'wheat berries', 'bulgur', 'bulgur wheat',
  'couscous', 'seitan', 'fu', 'gluten flour',
  'hydrolyzed wheat protein', 'hydrolyzed wheat starch',
  'wheat protein isolate', 'wheat dextrin',
  'atta flour', 'atta', 'maida', 'maida flour',
  'sooji', 'suji', 'rava', 'dalia', 'daliya', 'broken wheat',
  'wheat farina', 'farina',

  // Malt & barley derivatives
  'malt', 'malt extract', 'malt syrup', 'malt flavoring', 'malt flavor',
  'malt vinegar', 'malted milk', 'malted barley', 'malted barley flour',
  'malt powder', 'malt sugar', 'maltose',
  'barley flour', 'barley flakes', 'barley malt', 'barley malt extract',
  'barley grass', 'barley protein', 'pearl barley', 'hulled barley',
  'pot barley', 'barley water',

  // Rye derivatives
  'rye flour', 'rye bread', 'rye meal', 'rye flakes',
  'pumpernickel', 'pumpernickel flour',

  // Brewer's & baking
  'brewer\'s yeast', 'brewers yeast', 'brewer yeast',
  'baker\'s yeast extract',

  // Pasta & bread products
  'orzo', 'panko', 'panko breadcrumbs',
  'bread crumbs', 'breadcrumbs', 'bread crumb',
  'croutons', 'crouton', 'rusk',
  'flour tortilla', 'wheat tortilla',
  'pita', 'pita bread', 'naan', 'naan bread',
  'matzo', 'matzoh', 'matza', 'matzah',
  'udon', 'udon noodles', 'ramen noodles', 'ramen',
  'soba noodles', 'yakisoba noodles',
  'egg noodles', 'lo mein noodles', 'chow mein noodles',
  'wonton wrapper', 'wonton wrappers', 'wonton skin',
  'dumpling wrapper', 'dumpling wrappers', 'gyoza wrapper',
  'spring roll wrapper', 'egg roll wrapper',
  'phyllo dough', 'filo dough', 'puff pastry',
  'pie crust', 'pizza dough', 'pizza crust',
  'croissant', 'baguette', 'brioche',
  'sourdough', 'focaccia', 'ciabatta',

  // Sauces & condiments with wheat
  'soy sauce', 'shoyu', 'tamari', 
  'teriyaki sauce', 'teriyaki',
  'hoisin sauce', 'hoisin',
  'oyster sauce', 
  'miso paste', 

  // Cereals & snacks
  'cream of wheat', 'farina cereal',
  'granola', 
  'muesli',
  'pretzels', 'pretzel',

  // Beer & beverages
  'beer', 'lager', 'ale', 'stout', 'porter',
  'malt beverage', 'malt liquor',

  // Batter & coating
  'beer batter', 'tempura batter', 'tempura',
  'breaded', 'breading', 'battered',
  'flour coating', 'seasoned flour',

  // Thickeners from wheat
  'roux', 'white sauce', 'bechamel',
  'gravy', 'gravy mix', 'gravy powder',
  'cream sauce',
];

const CAUTION_INGREDIENTS: string[] = [
  // Starches (may be wheat-derived)
  'modified food starch', 'modified starch', 'food starch',
  'modified corn starch', 
  'starch', 'vegetable starch', 'edible starch',
  'pregelatinized starch', 'resistant starch',
  'dextrin', 'maltodextrin', 'cyclodextrin',

  // Flavorings (can contain wheat-derived carriers)
  'natural flavor', 'natural flavors', 'natural flavoring', 'natural flavourings',
  'artificial flavor', 'artificial flavors', 'artificial flavoring',
  'smoke flavoring', 'smoke flavor', 'liquid smoke',
  'seasoning', 'seasoning blend', 'seasoning mix',
  'spice mix', 'spice blend', 'spice extract',
  'flavor enhancer', 'flavour enhancer',

  // Colors & additives
  'caramel color', 'caramel coloring', 'caramel colour',
  'color added', 'colour added',

  // Proteins (may be wheat-derived)
  'hydrolyzed vegetable protein', 'hydrolyzed plant protein',
  'hydrolyzed protein', 'hydrolyzed soy protein',
  'textured vegetable protein', 'textured soy protein', 'tvp',
  'vegetable protein', 'plant protein', 'protein isolate',
  'protein concentrate',

  // Yeast & fermentation
  'yeast extract', 'autolyzed yeast extract', 'autolyzed yeast',
  'torula yeast', 'nutritional yeast', 
  'yeast nutrient',

  // Sauces & condiments
  'worcestershire sauce', 'worcestershire',
  'fish sauce', 
  'barbecue sauce', 'bbq sauce',
  'salad dressing', 'ranch dressing', 'caesar dressing',
  'marinara sauce', 
  'curry paste', 'curry powder', 
  'mustard', 'mustard powder', 
  'ketchup', 
  'mayo', 'mayonnaise', 
  'hot sauce',

  // Dairy & cheese
  'processed cheese', 'imitation cheese', 'cheese sauce',
  'cheese powder', 'cheese flavoring',
  'cream cheese', 
  'cottage cheese', 
  'sour cream', 
  'frozen yogurt',

  // Meat & protein products
  'sausage', 'sausages', 'hot dog', 'hot dogs',
  'salami', 'pepperoni', 'bologna',
  'deli meat', 'lunch meat', 'cold cuts',
  'imitation crab', 'surimi', 'crab stick',
  'meatball', 'meatballs', 'meat loaf', 'meatloaf',
  'veggie burger', 'vegetable burger',
  'chicken nugget', 'chicken nuggets',
  'fish stick', 'fish sticks', 'fish fingers',
  'beef jerky', 'jerky',
  'bacon bits',
  'protein bar', 'energy bar', 'granola bar',

  // Soups & bases
  'bouillon', 'bouillon cube', 'bouillon powder',
  'broth', 'stock', 'stock cube', 'stock powder',
  'soup base', 'soup mix', 'cream soup',
  'condensed soup',

  // Snacks & sweets
  'licorice', 'liquorice', 'twizzlers',
  'candy', 'chocolate', 'chocolate bar',
  'communion wafer', 'wafer', 'wafers',
  'rice cakes', 
  'chips', 'potato chips', 'flavored chips',
  'tortilla chips', 'corn chips',
  'trail mix',
  'dried fruit', 

  // Baking & cooking
  'baking powder', 'baking mix',
  'coating', 'coating mix', 'breading mix',
  'stuffing', 'stuffing mix',
  'crumb topping', 'streusel',
  'thickener', 'thickening agent',
  'stabilizer', 'stabiliser',
  'emulsifier', 'emulsifying agent',
  'lecithin', 
  'mono and diglycerides', 'mono- and diglycerides',
  'diglycerides', 'monoglycerides',
  'xanthan gum', 
  'guar gum',

  // Vinegar & alcohol
  'vinegar', 'distilled vinegar', 
  'white vinegar', 'wine vinegar',
  'rice vinegar', 'rice wine vinegar',
  'cooking wine', 'cooking sherry',

  // Asian ingredients
  'miso', 'miso soup',
  'tofu', 'fried tofu', 
  'edamame', 
  'rice noodles', 
  'bean sauce', 'black bean sauce',
  'sweet chili sauce', 'sriracha',
  'coconut aminos', 

  // Oats (controversial)
  'oats', 'oatmeal', 'oat flour', 'oat bran',
  'oat fiber', 'oat milk',
 

  // Supplements & medicine
  'glucose syrup', 'brown rice syrup',
  'corn syrup', 'high fructose corn syrup',
  'citric acid', 
  'vitamin e', 'tocopherol',
];

export { GLUTEN_INGREDIENTS, CAUTION_INGREDIENTS }

// Common gluten-free grains for educational reference
export const SAFE_GRAINS: string[] = [
  'rice', 'corn', 'quinoa', 'oats (certified gluten-free)', 'millet',
  'sorghum', 'teff', 'amaranth', 'buckwheat', 'arrowroot',
  'tapioca', 'potato starch', 'corn starch', 'almond flour',
  'coconut flour', 'chickpea flour', 'cassava flour',
  'flaxseed meal', 'hemp flour', 'tigernut flour',
  'sweet potato flour', 'plantain flour', 'water chestnut flour',
  'sago', 'kudzu starch', 'lotus root starch',
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Strip Open Food Facts language prefixes (en:, de:, fr:, etc.)
    .replace(/\b[a-z]{2}:/g, '')
    // Strip underscore allergen markers from OFF ingredient text
    .replace(/_/g, '')
    .replace(/\s+/g, ' ');
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// "malt" won't match inside "maltodextrin", etc.
function matchesKeyword(text: string, keyword: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`);
  return pattern.test(text);
}

export function analyzeIngredients(ingredientText: string): AnalysisResult {
  const normalized = normalizeText(ingredientText);

  if (!normalized) {
    return {
      status: 'unknown',
      glutenIngredients: [],
      cautionIngredients: [],
      allIngredients: [],
      summary: 'No ingredient information available. Unable to determine gluten status.',
    };
  }

  const ingredients = normalized
    .split(/[,;()\[\]\/\n]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const foundGluten: Set<string> = new Set();
  const foundCaution: Set<string> = new Set();

  for (const ingredient of ingredients) {
    for (const gluten of GLUTEN_INGREDIENTS) {
      if (matchesKeyword(ingredient, gluten)) {
        foundGluten.add(gluten);
      }
    }
    for (const caution of CAUTION_INGREDIENTS) {
      if (matchesKeyword(ingredient, caution)) {
        foundCaution.add(caution);
      }
    }
  }

  // Also check the full text for multi-word matches
  for (const gluten of GLUTEN_INGREDIENTS) {
    if (matchesKeyword(normalized, gluten)) {
      foundGluten.add(gluten);
    }
  }
  for (const caution of CAUTION_INGREDIENTS) {
    if (matchesKeyword(normalized, caution)) {
      foundCaution.add(caution);
    }
  }

  const glutenArr = Array.from(foundGluten);
  const cautionArr = Array.from(foundCaution);

  let status: 'safe' | 'caution' | 'unsafe' | 'unknown';
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

export function getStatusColor(status: 'safe' | 'caution' | 'unsafe' | 'unknown'): string {
  switch (status) {
    case 'safe': return '#16a34a';
    case 'caution': return '#f59e0b';
    case 'unsafe': return '#dc2626';
    case 'unknown': return '#6b7280';
  }
}

export function getStatusEmoji(status: 'safe' | 'caution' | 'unsafe' | 'unknown'): string {
  switch (status) {
    case 'safe': return '✅';
    case 'caution': return '⚠️';
    case 'unsafe': return '❌';
    case 'unknown': return 'ℹ️';
  }
}

export function getStatusLabel(status: 'safe' | 'caution' | 'unsafe' | 'unknown'): string {
  switch (status) {
    case 'safe': return 'Safe';
    case 'caution': return 'Caution';
    case 'unsafe': return 'Unsafe';
    case 'unknown': return 'Not Enough Info';
  }
}
