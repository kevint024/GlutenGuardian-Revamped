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

// Analyze a dish name by checking common gluten-containing dishes
const GLUTEN_DISHES: Record<string, { status: 'safe' | 'caution' | 'unsafe'; info: string }> = {
  'pizza': { status: 'unsafe', info: 'Pizza crust is made with wheat flour. Look for gluten-free crust options.' },
  'pasta': { status: 'unsafe', info: 'Traditional pasta is made from wheat semolina/durum. Choose rice, corn, or legume-based pasta.' },
  'spaghetti': { status: 'unsafe', info: 'Made from wheat flour. Try rice noodles or zucchini noodles instead.' },
  'bread': { status: 'unsafe', info: 'Most bread contains wheat flour. Look for certified gluten-free bread.' },
  'sandwich': { status: 'unsafe', info: 'Sandwiches use bread (wheat). Use gluten-free bread or lettuce wraps.' },
  'burger': { status: 'caution', info: 'The bun contains wheat. The patty is usually safe. Ask for lettuce wrap or GF bun.' },
  'pancake': { status: 'unsafe', info: 'Made with wheat flour. Use buckwheat or rice flour pancake mixes.' },
  'waffle': { status: 'unsafe', info: 'Made with wheat flour. Gluten-free waffle mixes are available.' },
  'cake': { status: 'unsafe', info: 'Cakes use wheat flour. Look for almond or coconut flour cakes.' },
  'cookie': { status: 'unsafe', info: 'Most cookies use wheat flour. Try GF cookie brands.' },
  'muffin': { status: 'unsafe', info: 'Made with wheat flour. GF muffin options exist.' },
  'croissant': { status: 'unsafe', info: 'Made with wheat flour and butter. Very difficult to find GF versions.' },
  'bagel': { status: 'unsafe', info: 'Made from wheat flour. Some bakeries offer GF bagels.' },
  'cereal': { status: 'caution', info: 'Many cereals contain wheat or barley malt. Check labels for GF certification.' },
  'beer': { status: 'unsafe', info: 'Beer is brewed from barley/wheat. Try gluten-free beer or cider.' },
  'soy sauce': { status: 'unsafe', info: 'Traditional soy sauce contains wheat. Use tamari (wheat-free) instead.' },
  'fried chicken': { status: 'unsafe', info: 'Breading contains wheat flour. Look for cornmeal-crusted options.' },
  'fish and chips': { status: 'unsafe', info: 'Batter uses wheat flour. Some restaurants offer GF batter.' },
  'chicken nuggets': { status: 'unsafe', info: 'Breading contains wheat. Air-fried plain chicken is safe.' },
  'noodles': { status: 'caution', info: 'Most noodles contain wheat. Rice noodles and glass noodles are GF.' },
  'ramen': { status: 'unsafe', info: 'Ramen noodles are wheat-based. Look for rice ramen alternatives.' },
  'couscous': { status: 'unsafe', info: 'Couscous is made from wheat semolina. Try cauliflower couscous.' },
  'salad': { status: 'caution', info: 'Salads are usually safe, but watch for croutons, dressings, and breaded toppings.' },
  'soup': { status: 'caution', info: 'Many soups use flour as thickener. Ask about ingredients.' },
  'steak': { status: 'safe', info: 'Plain steak is naturally gluten-free. Watch for marinades and sauces.' },
  'grilled chicken': { status: 'safe', info: 'Plain grilled chicken is GF. Be cautious of marinades.' },
  'rice': { status: 'safe', info: 'Plain rice is naturally gluten-free.' },
  'sushi': { status: 'caution', info: 'Rice and fish are GF, but soy sauce and tempura contain gluten. Use tamari.' },
  'tacos': { status: 'caution', info: 'Corn tortillas are GF. Flour tortillas contain wheat. Check fillings.' },
  'burrito': { status: 'unsafe', info: 'Flour tortillas contain wheat. Ask for a burrito bowl instead.' },
  'omelette': { status: 'safe', info: 'Eggs are naturally GF. Watch for added pancake batter (some restaurants).' },
  'french fries': { status: 'caution', info: 'Potatoes are GF but may be coated in flour or share a fryer with breaded items.' },
  'ice cream': { status: 'caution', info: 'Plain ice cream is usually GF. Watch for cookie/cake mix-ins and cones.' },
  'chocolate': { status: 'caution', info: 'Plain chocolate is often GF. Check for malt, wafers, or cookie pieces.' },
  'popcorn': { status: 'safe', info: 'Popcorn is naturally gluten-free. Watch for flavorings.' },
  'nachos': { status: 'safe', info: 'Corn chips are GF. Watch for flour-based toppings and cross-contamination.' },
  'curry': { status: 'caution', info: 'Most curries are GF. Watch for flour-thickened sauces and naan bread.' },
  'dim sum': { status: 'unsafe', info: 'Most dim sum wrappers contain wheat flour.' },
  'dumplings': { status: 'unsafe', info: 'Dumpling wrappers are made from wheat flour.' },
  'spring rolls': { status: 'caution', info: 'Fried spring rolls use wheat wrappers. Fresh spring rolls with rice paper are GF.' },
  'pad thai': { status: 'safe', info: 'Made with rice noodles and usually GF. Confirm soy sauce is GF.' },
  'pho': { status: 'safe', info: 'Rice noodle soup, naturally GF. Check that broth and soy sauce are GF.' },
};

export function analyzeDish(dishName: string): { status: 'safe' | 'caution' | 'unsafe'; info: string } | null {
  const normalized = normalizeText(dishName);
  
  for (const [dish, result] of Object.entries(GLUTEN_DISHES)) {
    if (normalized.includes(dish) || dish.includes(normalized)) {
      return result;
    }
  }
  
  return null;
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
