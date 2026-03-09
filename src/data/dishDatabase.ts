// Comprehensive dish database organized by cuisine
// Each dish has: status, description, alternatives, and cuisine category

export type DishStatus = 'safe' | 'caution' | 'unsafe';

export interface DishEntry {
  name: string;
  status: DishStatus;
  info: string;
  alternatives?: string;
  cuisine: string;
  keywords?: string[];  // extra search terms
}

export const CUISINE_CATEGORIES = [
  'American', 'Mexican', 'Italian', 'Chinese', 'Japanese',
  'Thai', 'Indian', 'Korean', 'Vietnamese', 'Mediterranean',
  'Middle Eastern', 'French', 'British', 'Greek', 'Spanish',
  'German', 'Ethiopian', 'Caribbean', 'Brazilian', 'Filipino',
  'Breakfast', 'Desserts & Sweets', 'Snacks & Sides',
  'Beverages', 'Sauces & Condiments', 'Fast Food',
] as const;

export const DISH_DATABASE: DishEntry[] = [
  // ═══════════════════════════════════════
  // AMERICAN
  // ═══════════════════════════════════════
  { name: 'Burger', status: 'caution', info: 'The bun contains wheat flour. The beef patty itself is typically GF. Ask for a lettuce wrap or GF bun.', alternatives: 'Bunless burger, lettuce-wrapped burger', cuisine: 'American', keywords: ['hamburger', 'cheeseburger'] },
  { name: 'Hot Dog', status: 'caution', info: 'Hot dog buns contain wheat. The frankfurter itself is usually GF but some brands add fillers. Check the label.', alternatives: 'Bunless hot dog, GF bun', cuisine: 'American', keywords: ['frankfurter', 'wiener'] },
  { name: 'Fried Chicken', status: 'unsafe', info: 'Traditional fried chicken uses wheat flour breading. The chicken itself is GF.', alternatives: 'Cornmeal-crusted chicken, grilled chicken, air-fried chicken', cuisine: 'American', keywords: ['southern fried chicken'] },
  { name: 'Chicken Nuggets', status: 'unsafe', info: 'Breading is made with wheat flour. Most fast food nuggets contain gluten.', alternatives: 'GF chicken nuggets (many frozen brands), plain grilled chicken strips', cuisine: 'American', keywords: ['chicken tenders', 'chicken strips', 'chicken fingers'] },
  { name: 'Grilled Chicken', status: 'safe', info: 'Plain grilled chicken is naturally gluten-free. Be cautious of marinades and sauces which may contain soy sauce or flour.', cuisine: 'American', keywords: ['chicken breast'] },
  { name: 'Steak', status: 'safe', info: 'Plain grilled or pan-seared steak is naturally GF. Watch for flour-based sauces, gravies, and marinades.', alternatives: 'Ask for plain steak with oil/butter only', cuisine: 'American', keywords: ['ribeye', 'sirloin', 'filet mignon', 't-bone', 'new york strip'] },
  { name: 'BBQ Ribs', status: 'caution', info: 'Ribs are GF but BBQ sauces may contain soy sauce, malt vinegar, or thickeners with gluten.', alternatives: 'Dry-rubbed ribs, ribs with verified GF sauce', cuisine: 'American', keywords: ['barbecue ribs', 'baby back ribs', 'spare ribs'] },
  { name: 'Pulled Pork', status: 'caution', info: 'The pork is GF but sauces and buns add gluten risk. Watch for BBQ sauce ingredients and skip the bun.', alternatives: 'Pulled pork bowl over rice, GF bun', cuisine: 'American' },
  { name: 'Meatloaf', status: 'unsafe', info: 'Traditional meatloaf uses breadcrumbs as a binder.', alternatives: 'Use GF breadcrumbs or rolled oats (certified GF) as binder', cuisine: 'American' },
  { name: 'Mac and Cheese', status: 'unsafe', info: 'Macaroni is wheat pasta. The cheese sauce may also use flour as a thickener.', alternatives: 'GF pasta mac and cheese, cauliflower mac and cheese', cuisine: 'American', keywords: ['macaroni and cheese', 'mac & cheese'] },
  { name: 'Cornbread', status: 'caution', info: 'Many cornbread recipes include wheat flour along with cornmeal. Pure cornmeal cornbread is GF.', alternatives: '100% cornmeal cornbread (check recipe)', cuisine: 'American' },
  { name: 'Clam Chowder', status: 'unsafe', info: 'New England clam chowder uses flour as a thickener.', alternatives: 'GF clam chowder thickened with potato starch or cornstarch', cuisine: 'American', keywords: ['chowder'] },
  { name: 'BLT', status: 'unsafe', info: 'The bread in a BLT contains wheat. Bacon, lettuce, and tomato are GF.', alternatives: 'BLT lettuce wrap, BLT on GF bread', cuisine: 'American' },
  { name: 'Club Sandwich', status: 'unsafe', info: 'Made with wheat bread/toast.', alternatives: 'Lettuce wrap version, GF bread', cuisine: 'American' },
  { name: 'Grilled Cheese', status: 'unsafe', info: 'Made with wheat bread. Cheese itself is typically GF.', alternatives: 'GF bread grilled cheese', cuisine: 'American' },
  { name: 'Pot Roast', status: 'caution', info: 'The meat is GF but gravy is often thickened with flour.', alternatives: 'Ask for gravy made with cornstarch or skip the gravy', cuisine: 'American' },
  { name: 'Cobb Salad', status: 'caution', info: 'Ingredients are mostly GF (chicken, egg, bacon, avocado, cheese) but check dressing for gluten.', alternatives: 'Oil and vinegar dressing', cuisine: 'American' },
  { name: 'Buffalo Wings', status: 'caution', info: 'Traditional buffalo wings are deep-fried without breading (GF), but some restaurants bread them or use shared fryers. Buffalo sauce is usually GF.', alternatives: 'Confirm wings are unbreaded and ask about fryer', cuisine: 'American', keywords: ['chicken wings', 'hot wings', 'wings'] },
  { name: 'Corn on the Cob', status: 'safe', info: 'Corn is naturally gluten-free. Butter and salt are also GF.', cuisine: 'American' },
  { name: 'Baked Potato', status: 'safe', info: 'Plain baked potato is GF. Butter, sour cream, cheese, and chives are all typically GF. Watch for bacon bits (check label).', cuisine: 'American', keywords: ['jacket potato'] },
  { name: 'Coleslaw', status: 'caution', info: 'Usually GF but some dressings may contain malt vinegar or modified food starch.', cuisine: 'American' },
  { name: 'Jambalaya', status: 'safe', info: 'Rice-based Cajun dish. Typically GF. Watch for sausage ingredients and seasoning blends.', cuisine: 'American', keywords: ['cajun'] },
  { name: 'Gumbo', status: 'unsafe', info: 'Traditional gumbo starts with a flour-based roux.', alternatives: 'GF gumbo using rice flour roux or filé powder as thickener', cuisine: 'American', keywords: ['cajun', 'creole'] },
  { name: 'Chili', status: 'safe', info: 'Most chili recipes are naturally GF (beans, meat, tomatoes, spices). Watch for thickeners and flour.', alternatives: 'Serve with corn chips instead of crackers', cuisine: 'American', keywords: ['chili con carne'] },
  { name: 'Lobster Roll', status: 'unsafe', info: 'Served on a wheat bun. The lobster salad filling is typically GF.', alternatives: 'Lobster salad without the bun', cuisine: 'American' },
  { name: 'Crab Cakes', status: 'unsafe', info: 'Traditional crab cakes contain breadcrumbs as a binder.', alternatives: 'GF crab cakes using almond flour or GF breadcrumbs', cuisine: 'American' },
  { name: 'Shrimp and Grits', status: 'safe', info: 'Grits (corn) and shrimp are naturally GF. Check sauce for flour.', cuisine: 'American' },
  { name: 'Mashed Potatoes', status: 'safe', info: 'Naturally GF. Made from potatoes, butter, and milk.', cuisine: 'American' },
  { name: 'Deviled Eggs', status: 'safe', info: 'Eggs, mayo, mustard, and spices are all GF.', cuisine: 'American' },

  // ═══════════════════════════════════════
  // MEXICAN / LATIN
  // ═══════════════════════════════════════
  { name: 'Tacos', status: 'caution', info: 'Corn tortillas are GF. Flour tortillas contain wheat. Always confirm which type. Check seasoning mixes.', alternatives: 'Corn tortilla tacos', cuisine: 'Mexican', keywords: ['taco'] },
  { name: 'Burrito', status: 'unsafe', info: 'Flour tortillas are made with wheat. Fillings like rice, beans, and meat are usually GF.', alternatives: 'Burrito bowl (no tortilla), corn tortilla wrap', cuisine: 'Mexican' },
  { name: 'Enchiladas', status: 'caution', info: 'Corn tortilla enchiladas are GF. Some restaurants use flour tortillas. Enchilada sauce is typically GF but may contain flour.', alternatives: 'Confirm corn tortillas and check sauce', cuisine: 'Mexican' },
  { name: 'Quesadilla', status: 'unsafe', info: 'Typically made with flour tortillas. Cheese and fillings are usually GF.', alternatives: 'Corn tortilla quesadilla', cuisine: 'Mexican' },
  { name: 'Nachos', status: 'safe', info: 'Corn tortilla chips are naturally GF. Cheese, beans, salsa, guacamole are GF. Watch for cross-contamination.', cuisine: 'Mexican' },
  { name: 'Guacamole', status: 'safe', info: 'Avocado, lime, onion, cilantro, and tomato are all naturally GF. Serve with corn chips.', cuisine: 'Mexican' },
  { name: 'Salsa', status: 'safe', info: 'Tomatoes, peppers, onions, and spices are naturally GF.', cuisine: 'Mexican' },
  { name: 'Tamales', status: 'safe', info: 'Made with masa (corn flour) and traditionally GF. Check fillings for any flour.', cuisine: 'Mexican' },
  { name: 'Churros', status: 'unsafe', info: 'Made with wheat flour dough. A classic gluten-heavy dessert.', alternatives: 'GF churros made with GF flour blend', cuisine: 'Mexican' },
  { name: 'Elote', status: 'safe', info: 'Mexican street corn is naturally GF. Corn, mayo, cheese, chili, lime.', cuisine: 'Mexican', keywords: ['mexican street corn', 'esquites'] },
  { name: 'Pozole', status: 'safe', info: 'Traditional Mexican soup made with hominy (corn). Naturally GF.', cuisine: 'Mexican' },
  { name: 'Chile Relleno', status: 'caution', info: 'Stuffed pepper may be battered with wheat flour before frying. Some use egg-only batter (GF).', alternatives: 'Ask if batter is egg-only', cuisine: 'Mexican', keywords: ['chiles rellenos'] },
  { name: 'Fajitas', status: 'caution', info: 'Grilled meat and vegetables are GF. Watch for flour tortillas and seasoning mixes. Use corn tortillas.', alternatives: 'Corn tortillas, fajita bowl', cuisine: 'Mexican' },
  { name: 'Tostadas', status: 'safe', info: 'Fried corn tortillas topped with beans, meat, and veggies. Naturally GF.', cuisine: 'Mexican' },
  { name: 'Huevos Rancheros', status: 'caution', info: 'Eggs on corn tortillas with salsa — typically GF. Confirm corn tortillas are used.', cuisine: 'Mexican' },
  { name: 'Carnitas', status: 'safe', info: 'Slow-cooked pork is naturally GF. Serve with corn tortillas, not flour.', cuisine: 'Mexican' },
  { name: 'Ceviche', status: 'safe', info: 'Raw fish cured in citrus. Naturally GF. Usually served with corn tostadas.', cuisine: 'Mexican' },
  { name: 'Empanadas', status: 'unsafe', info: 'Traditional dough is made with wheat flour.', alternatives: 'Corn flour empanadas, GF dough', cuisine: 'Mexican' },
  { name: 'Chilaquiles', status: 'safe', info: 'Corn tortilla chips in salsa with toppings. Naturally GF.', cuisine: 'Mexican' },

  // ═══════════════════════════════════════
  // ITALIAN
  // ═══════════════════════════════════════
  { name: 'Pizza', status: 'unsafe', info: 'Pizza crust is made with wheat flour.', alternatives: 'GF pizza crust (many restaurants offer it), cauliflower crust', cuisine: 'Italian' },
  { name: 'Pasta', status: 'unsafe', info: 'Traditional pasta is made from wheat semolina/durum flour.', alternatives: 'Rice pasta, corn pasta, lentil pasta, chickpea pasta, zoodles', cuisine: 'Italian', keywords: ['spaghetti', 'penne', 'fettuccine', 'linguine', 'rigatoni'] },
  { name: 'Lasagna', status: 'unsafe', info: 'Lasagna noodles are wheat-based. Meat sauce and cheese are typically GF.', alternatives: 'GF lasagna noodles, zucchini lasagna', cuisine: 'Italian' },
  { name: 'Ravioli', status: 'unsafe', info: 'Ravioli wrappers are made from wheat flour.', alternatives: 'GF ravioli (frozen brands available)', cuisine: 'Italian' },
  { name: 'Gnocchi', status: 'unsafe', info: 'Traditional gnocchi contains wheat flour along with potato.', alternatives: 'GF gnocchi made with rice flour or potato only', cuisine: 'Italian' },
  { name: 'Risotto', status: 'safe', info: 'Made with arborio rice, broth, butter, and parmesan. Naturally GF. Verify broth is GF.', cuisine: 'Italian' },
  { name: 'Bruschetta', status: 'unsafe', info: 'Served on toasted wheat bread.', alternatives: 'Bruschetta topping on GF bread or crackers', cuisine: 'Italian' },
  { name: 'Caprese Salad', status: 'safe', info: 'Fresh mozzarella, tomatoes, basil, and olive oil. Naturally GF.', cuisine: 'Italian', keywords: ['caprese'] },
  { name: 'Minestrone', status: 'unsafe', info: 'Traditional minestrone contains small pasta. The soup base is GF.', alternatives: 'Minestrone without pasta or with GF pasta', cuisine: 'Italian' },
  { name: 'Tiramisu', status: 'unsafe', info: 'Made with ladyfinger cookies (wheat flour).', alternatives: 'GF tiramisu using GF ladyfingers', cuisine: 'Italian' },
  { name: 'Panna Cotta', status: 'safe', info: 'Italian cream dessert made with cream, sugar, and gelatin. Naturally GF.', cuisine: 'Italian' },
  { name: 'Gelato', status: 'caution', info: 'Plain gelato flavors are usually GF. Cookie, cake, and wafer flavors contain gluten. Ask about mix-ins and shared scoops.', cuisine: 'Italian' },
  { name: 'Polenta', status: 'safe', info: 'Made from cornmeal. Naturally GF. A great side dish substitute for bread.', cuisine: 'Italian' },
  { name: 'Focaccia', status: 'unsafe', info: 'Italian flatbread made with wheat flour.', alternatives: 'GF focaccia', cuisine: 'Italian' },
  { name: 'Calzone', status: 'unsafe', info: 'Folded pizza dough made with wheat flour.', alternatives: 'GF calzone dough', cuisine: 'Italian' },
  { name: 'Osso Buco', status: 'caution', info: 'Braised veal shanks. The meat is GF but the dish is traditionally finished with flour dredging. Ask your server.', cuisine: 'Italian' },
  { name: 'Arancini', status: 'unsafe', info: 'Fried risotto balls coated in wheat breadcrumbs.', alternatives: 'GF breadcrumb-coated arancini', cuisine: 'Italian' },
  { name: 'Cioppino', status: 'safe', info: 'Italian-American fish stew in tomato broth. Usually GF. Skip the bread on the side.', cuisine: 'Italian' },
  { name: 'Antipasto', status: 'caution', info: 'Cured meats, cheese, olives, roasted peppers are GF. Watch for breadsticks and crackers.', alternatives: 'Skip bread items, enjoy meats and veggies', cuisine: 'Italian' },
  { name: 'Carbonara', status: 'unsafe', info: 'Pasta dish with eggs, cheese, pancetta. The pasta is wheat-based.', alternatives: 'GF pasta carbonara', cuisine: 'Italian' },

  // ═══════════════════════════════════════
  // CHINESE
  // ═══════════════════════════════════════
  { name: 'Fried Rice', status: 'caution', info: 'Rice is GF but soy sauce in fried rice contains wheat. Ask for tamari or GF soy sauce.', alternatives: 'Fried rice with tamari', cuisine: 'Chinese', keywords: ['egg fried rice', 'vegetable fried rice', 'chicken fried rice'] },
  { name: 'Lo Mein', status: 'unsafe', info: 'Egg noodles are made from wheat flour. Sauce also contains soy sauce (wheat).', alternatives: 'Rice noodle stir-fry with tamari', cuisine: 'Chinese', keywords: ['chow mein'] },
  { name: 'Chow Mein', status: 'unsafe', info: 'Stir-fried wheat noodles. Contains gluten in both noodles and soy sauce.', alternatives: 'Rice noodle stir-fry', cuisine: 'Chinese' },
  { name: 'Egg Rolls', status: 'unsafe', info: 'Wrappers are made from wheat flour.', alternatives: 'Fresh rice paper spring rolls', cuisine: 'Chinese', keywords: ['spring rolls'] },
  { name: 'Wontons', status: 'unsafe', info: 'Wonton wrappers are wheat-based.', alternatives: 'Wonton filling in GF soup without wrappers', cuisine: 'Chinese', keywords: ['wonton soup'] },
  { name: 'Dumplings', status: 'unsafe', info: 'Dumpling wrappers are made from wheat flour.', alternatives: 'Rice paper dumplings, steamed meatballs', cuisine: 'Chinese', keywords: ['potstickers', 'gyoza', 'jiaozi'] },
  { name: 'Dim Sum', status: 'unsafe', info: 'Most dim sum items use wheat flour wrappers (har gow is an exception — made with tapioca/wheat starch).', alternatives: 'Rice noodle rolls (cheung fun), steamed shrimp (har gow is sometimes GF)', cuisine: 'Chinese' },
  { name: 'Kung Pao Chicken', status: 'caution', info: 'Sauce contains soy sauce (wheat). Chicken may be dusted with cornstarch (GF) or flour.', alternatives: 'Ask for GF soy sauce and cornstarch only', cuisine: 'Chinese' },
  { name: 'Sweet and Sour Chicken', status: 'unsafe', info: 'Chicken is battered with wheat flour and the sauce often contains soy sauce.', alternatives: 'GF battered chicken with GF sweet and sour sauce', cuisine: 'Chinese', keywords: ['sweet and sour pork'] },
  { name: 'General Tso Chicken', status: 'unsafe', info: 'Deep-fried battered chicken with soy sauce-based glaze. Contains gluten.', alternatives: 'Ask for cornstarch batter and tamari', cuisine: 'Chinese', keywords: ["general tso's"] },
  { name: 'Sesame Chicken', status: 'unsafe', info: 'Battered and fried chicken with soy-based sauce. Wheat in both components.', cuisine: 'Chinese' },
  { name: 'Orange Chicken', status: 'unsafe', info: 'Battered fried chicken in orange sauce. Wheat flour batter and soy sauce in glaze.', cuisine: 'Chinese' },
  { name: 'Beef and Broccoli', status: 'caution', info: 'Usually thickened with cornstarch (GF) but contains soy sauce (wheat). Ask for tamari.', cuisine: 'Chinese' },
  { name: 'Ma Po Tofu', status: 'caution', info: 'Tofu dish with chili bean paste. Usually thickened with cornstarch. Contains soy sauce.', alternatives: 'Ask for tamari or GF soy sauce', cuisine: 'Chinese', keywords: ['mapo tofu'] },
  { name: 'Peking Duck', status: 'unsafe', info: 'Duck is GF but served with wheat flour pancakes and hoisin sauce (contains wheat).', alternatives: 'Eat the duck without pancakes, bring GF wraps', cuisine: 'Chinese' },
  { name: 'Hot and Sour Soup', status: 'caution', info: 'Contains soy sauce (wheat). Some recipes use wheat starch or flour to thicken.', cuisine: 'Chinese' },
  { name: 'Egg Drop Soup', status: 'caution', info: 'Usually thickened with cornstarch (GF) but contains soy sauce. Ask about ingredients.', cuisine: 'Chinese' },
  { name: 'Congee', status: 'safe', info: 'Rice porridge. Naturally GF. Watch for soy sauce-based toppings.', cuisine: 'Chinese', keywords: ['rice porridge', 'jook'] },
  { name: 'Steamed Rice', status: 'safe', info: 'Plain steamed rice is naturally GF.', cuisine: 'Chinese', keywords: ['white rice', 'jasmine rice'] },
  { name: 'Chinese BBQ Pork', status: 'caution', info: 'Char siu marinade often contains soy sauce and hoisin (both have wheat).', alternatives: 'Ask about marinade or make at home with tamari', cuisine: 'Chinese', keywords: ['char siu'] },
  { name: 'Mu Shu Pork', status: 'unsafe', info: 'Served with wheat flour pancakes and contains soy sauce.', cuisine: 'Chinese' },

  // ═══════════════════════════════════════
  // JAPANESE
  // ═══════════════════════════════════════
  { name: 'Sushi', status: 'caution', info: 'Rice and fish are GF, but soy sauce contains wheat. Imitation crab may have wheat starch. Tempura rolls contain gluten.', alternatives: 'Use tamari instead of soy sauce, avoid tempura rolls and imitation crab', cuisine: 'Japanese', keywords: ['sashimi', 'nigiri', 'maki'] },
  { name: 'Sashimi', status: 'safe', info: 'Plain sliced raw fish is naturally GF. Use tamari instead of regular soy sauce for dipping.', cuisine: 'Japanese' },
  { name: 'Ramen', status: 'unsafe', info: 'Ramen noodles are made from wheat flour. Broth may also contain soy sauce.', alternatives: 'Rice ramen noodles, pho', cuisine: 'Japanese' },
  { name: 'Udon', status: 'unsafe', info: 'Thick wheat flour noodles.', alternatives: 'Rice noodles, soba (100% buckwheat only)', cuisine: 'Japanese' },
  { name: 'Soba', status: 'caution', info: 'Buckwheat is GF, but most soba noodles are a mix of buckwheat AND wheat flour. Look for 100% buckwheat (juwari) soba.', alternatives: '100% buckwheat soba, rice noodles', cuisine: 'Japanese' },
  { name: 'Tempura', status: 'unsafe', info: 'Batter is made with wheat flour, and the dipping sauce (tentsuyu) contains soy sauce.', alternatives: 'Ask for items grilled instead of fried', cuisine: 'Japanese' },
  { name: 'Teriyaki', status: 'caution', info: 'Teriyaki sauce contains soy sauce (wheat). The protein itself is usually GF.', alternatives: 'Homemade teriyaki with tamari', cuisine: 'Japanese', keywords: ['teriyaki chicken', 'teriyaki salmon'] },
  { name: 'Edamame', status: 'safe', info: 'Steamed soybeans are naturally GF. A great appetizer option.', cuisine: 'Japanese' },
  { name: 'Miso Soup', status: 'caution', info: 'Miso paste is usually made from soybeans and rice (GF), but some contain barley (mugi miso). Check the type.', alternatives: 'Request rice miso (shiro/aka miso)', cuisine: 'Japanese' },
  { name: 'Yakitori', status: 'caution', info: 'Grilled chicken skewers. Salt-seasoned (shio) is GF. Tare sauce contains soy sauce (wheat).', alternatives: 'Order shio (salt) style instead of tare', cuisine: 'Japanese' },
  { name: 'Onigiri', status: 'safe', info: 'Rice balls with fillings, wrapped in nori. Usually GF. Check fillings and soy sauce glazes.', cuisine: 'Japanese', keywords: ['rice ball'] },
  { name: 'Katsu', status: 'unsafe', info: 'Breaded and deep-fried cutlet using panko (wheat breadcrumbs).', alternatives: 'GF panko or grilled cutlet', cuisine: 'Japanese', keywords: ['tonkatsu', 'chicken katsu'] },
  { name: 'Gyudon', status: 'caution', info: 'Beef bowl over rice. Sauce contains soy sauce and sometimes mirin. Rice is GF.', alternatives: 'Ask for tamari-based sauce', cuisine: 'Japanese', keywords: ['beef bowl'] },
  { name: 'Okonomiyaki', status: 'unsafe', info: 'Japanese savory pancake made with wheat flour. Topped with soy-based sauces.', cuisine: 'Japanese' },
  { name: 'Takoyaki', status: 'unsafe', info: 'Octopus balls made with wheat flour batter.', cuisine: 'Japanese' },
  { name: 'Mochi', status: 'safe', info: 'Made from glutinous rice flour (despite the name, glutinous rice is GF). Watch for wheat-containing fillings.', cuisine: 'Japanese' },
  { name: 'Matcha Latte', status: 'safe', info: 'Matcha powder and milk are GF. Watch for flavored powder mixes that may contain additives.', cuisine: 'Japanese' },

  // ═══════════════════════════════════════
  // THAI
  // ═══════════════════════════════════════
  { name: 'Pad Thai', status: 'safe', info: 'Made with rice noodles and typically GF. Confirm fish sauce and soy sauce are GF (some may use wheat-based soy).', cuisine: 'Thai' },
  { name: 'Green Curry', status: 'safe', info: 'Coconut milk-based curry with rice. Curry paste is usually GF. Served with rice.', cuisine: 'Thai', keywords: ['thai curry'] },
  { name: 'Red Curry', status: 'safe', info: 'Coconut milk curry with red curry paste. Naturally GF when served with rice.', cuisine: 'Thai' },
  { name: 'Massaman Curry', status: 'safe', info: 'Coconut milk-based curry with potatoes and peanuts. Usually GF. Verify curry paste.', cuisine: 'Thai' },
  { name: 'Tom Yum Soup', status: 'safe', info: 'Hot and sour soup with lemongrass, galangal, and lime. Naturally GF.', cuisine: 'Thai', keywords: ['tom yum goong'] },
  { name: 'Tom Kha Gai', status: 'safe', info: 'Coconut chicken soup with galangal and lemongrass. Naturally GF.', cuisine: 'Thai', keywords: ['coconut soup'] },
  { name: 'Papaya Salad', status: 'safe', info: 'Shredded green papaya with lime, fish sauce, and chili. Naturally GF.', cuisine: 'Thai', keywords: ['som tum', 'som tam'] },
  { name: 'Pad See Ew', status: 'caution', info: 'Wide rice noodles stir-fried with soy sauce. Rice noodles are GF but soy sauce contains wheat.', alternatives: 'Ask for tamari or GF soy sauce', cuisine: 'Thai' },
  { name: 'Pad Kra Pao', status: 'caution', info: 'Thai basil stir-fry. Meat and holy basil are GF, but sauce uses soy sauce and oyster sauce (check for wheat).', cuisine: 'Thai', keywords: ['basil chicken', 'basil stir fry'] },
  { name: 'Satay', status: 'caution', info: 'Grilled meat skewers are usually GF. Peanut dipping sauce may contain soy sauce. Ask about ingredients.', cuisine: 'Thai', keywords: ['chicken satay'] },
  { name: 'Sticky Rice', status: 'safe', info: 'Glutinous rice is naturally GF despite the name. Great accompaniment to Thai dishes.', cuisine: 'Thai', keywords: ['glutinous rice'] },
  { name: 'Spring Rolls (Fresh)', status: 'safe', info: 'Fresh spring rolls use rice paper wrappers — naturally GF. Dipping sauce may contain soy sauce.', alternatives: 'Ask for GF dipping sauce', cuisine: 'Thai', keywords: ['summer rolls', 'rice paper rolls'] },
  { name: 'Larb', status: 'safe', info: 'Minced meat salad with lime, fish sauce, herbs, and toasted rice powder. Naturally GF.', cuisine: 'Thai', keywords: ['laab', 'larb gai'] },
  { name: 'Mango Sticky Rice', status: 'safe', info: 'Glutinous rice with coconut milk and mango. Naturally GF.', cuisine: 'Thai' },
  { name: 'Thai Iced Tea', status: 'safe', info: 'Tea, sugar, and condensed milk. Naturally GF.', cuisine: 'Thai' },

  // ═══════════════════════════════════════
  // INDIAN
  // ═══════════════════════════════════════
  { name: 'Naan', status: 'unsafe', info: 'Flatbread made with wheat flour (maida).', alternatives: 'Papadum, rice, dosa', cuisine: 'Indian' },
  { name: 'Roti', status: 'unsafe', info: 'Whole wheat flatbread (chapati).', alternatives: 'Rice, papadum, GF roti made with millet flour', cuisine: 'Indian', keywords: ['chapati', 'phulka'] },
  { name: 'Paratha', status: 'unsafe', info: 'Layered wheat flatbread, often stuffed.', alternatives: 'Rice, papadum', cuisine: 'Indian' },
  { name: 'Biryani', status: 'safe', info: 'Rice-based dish with spices, meat, and vegetables. Naturally GF. One of the safest Indian choices.', cuisine: 'Indian', keywords: ['chicken biryani', 'lamb biryani', 'veg biryani'] },
  { name: 'Butter Chicken', status: 'safe', info: 'Chicken in tomato-cream sauce. The dish itself is naturally GF. Avoid the naan — eat with rice.', cuisine: 'Indian', keywords: ['murgh makhani'] },
  { name: 'Tikka Masala', status: 'safe', info: 'Marinated chicken in creamy tomato sauce. Usually GF. Serve with rice instead of naan.', cuisine: 'Indian', keywords: ['chicken tikka masala'] },
  { name: 'Palak Paneer', status: 'safe', info: 'Spinach and cheese curry. Naturally GF.', cuisine: 'Indian' },
  { name: 'Dal', status: 'safe', info: 'Lentil curry. Naturally GF and a staple of Indian cuisine. Great with rice.', cuisine: 'Indian', keywords: ['daal', 'dhal', 'lentil curry'] },
  { name: 'Tandoori Chicken', status: 'safe', info: 'Marinated yogurt-spice chicken roasted in tandoor. Naturally GF.', cuisine: 'Indian' },
  { name: 'Samosa', status: 'unsafe', info: 'Deep-fried pastry with wheat flour shell.', alternatives: 'Rice paper samosa, baked GF version', cuisine: 'Indian' },
  { name: 'Pakora', status: 'caution', info: 'Fritters usually made with chickpea flour (besan), which is GF. Some recipes add wheat flour. Ask.', alternatives: 'Confirm chickpea flour only (besan pakora)', cuisine: 'Indian', keywords: ['bhaji', 'onion bhaji'] },
  { name: 'Dosa', status: 'safe', info: 'Fermented rice and lentil crepe. Naturally GF and a great bread substitute. Served with sambar and chutney.', cuisine: 'Indian', keywords: ['masala dosa'] },
  { name: 'Idli', status: 'safe', info: 'Steamed rice and lentil cakes. Naturally GF.', cuisine: 'Indian' },
  { name: 'Papadum', status: 'safe', info: 'Thin crispy disc made from lentil (urad dal) flour. Naturally GF. Great bread alternative.', cuisine: 'Indian', keywords: ['poppadom', 'papad'] },
  { name: 'Chana Masala', status: 'safe', info: 'Chickpea curry. Naturally GF.', cuisine: 'Indian' },
  { name: 'Aloo Gobi', status: 'safe', info: 'Potato and cauliflower curry. Naturally GF.', cuisine: 'Indian' },
  { name: 'Vindaloo', status: 'safe', info: 'Spicy curry dish, typically GF. Often uses vinegar and spices with no flour.', cuisine: 'Indian' },
  { name: 'Korma', status: 'caution', info: 'Cream or coconut-based curry. Usually GF but some restaurants thicken with flour.', alternatives: 'Ask if thickened with flour or nut paste', cuisine: 'Indian' },
  { name: 'Puri', status: 'unsafe', info: 'Deep-fried wheat bread.', alternatives: 'Papadum, dosa, rice', cuisine: 'Indian', keywords: ['poori'] },
  { name: 'Kheer', status: 'safe', info: 'Rice pudding with milk, sugar, and cardamom. Naturally GF.', cuisine: 'Indian', keywords: ['rice pudding'] },
  { name: 'Gulab Jamun', status: 'unsafe', info: 'Traditionally made with khoya/milk powder, but many recipes include wheat flour or semolina.', cuisine: 'Indian' },
  { name: 'Raita', status: 'safe', info: 'Yogurt with cucumber and spices. Naturally GF.', cuisine: 'Indian' },
  { name: 'Saag', status: 'safe', info: 'Spinach-based curry. Naturally GF. Saag paneer and saag chicken are safe.', cuisine: 'Indian', keywords: ['saag paneer', 'saag chicken'] },

  // ═══════════════════════════════════════
  // KOREAN
  // ═══════════════════════════════════════
  { name: 'Bibimbap', status: 'caution', info: 'Rice bowl with vegetables, egg, and meat. Rice and toppings are GF, but gochujang sauce may contain wheat.', alternatives: 'Confirm gochujang is wheat-free or bring your own', cuisine: 'Korean' },
  { name: 'Korean BBQ', status: 'caution', info: 'Grilled meats are GF, but marinades (bulgogi, kalbi) contain soy sauce (wheat). Ask about marinade.', alternatives: 'Salt-seasoned meats, bring tamari for dipping', cuisine: 'Korean', keywords: ['bulgogi', 'kalbi', 'galbi'] },
  { name: 'Kimchi', status: 'safe', info: 'Fermented vegetables. Traditionally GF. Some commercial brands may add wheat-based soy sauce — check labels.', cuisine: 'Korean' },
  { name: 'Kimchi Jjigae', status: 'caution', info: 'Kimchi stew. Usually GF if kimchi is wheat-free. May contain gochujang or soy sauce with wheat.', cuisine: 'Korean', keywords: ['kimchi stew'] },
  { name: 'Japchae', status: 'caution', info: 'Glass noodles (sweet potato starch — GF!) stir-fried with soy sauce (wheat). Ask for tamari.', cuisine: 'Korean' },
  { name: 'Tteokbokki', status: 'caution', info: 'Rice cakes are GF, but the gochujang sauce may contain wheat. Some versions add fish cakes with wheat.', cuisine: 'Korean', keywords: ['rice cakes', 'spicy rice cakes'] },
  { name: 'Korean Fried Chicken', status: 'unsafe', info: 'Battered with wheat flour or starch mix. Sauce often contains soy sauce.', alternatives: 'Some places offer cornstarch-only batter — ask', cuisine: 'Korean', keywords: ['KFC', 'yangnyeom chicken'] },
  { name: 'Kimbap', status: 'caution', info: 'Rice and fillings wrapped in seaweed. Rice is GF, but seasoning may include soy sauce. Imitation crab may contain wheat.', cuisine: 'Korean', keywords: ['gimbap'] },
  { name: 'Sundubu Jjigae', status: 'caution', info: 'Soft tofu stew. Tofu and vegetables are GF but broth may contain soy sauce or gochujang with wheat.', cuisine: 'Korean', keywords: ['soft tofu stew'] },
  { name: 'Banchan', status: 'caution', info: 'Side dishes vary widely. Kimchi and pickled vegetables are usually GF. Soy-sauce-marinated items contain wheat.', cuisine: 'Korean' },
  { name: 'Pajeon', status: 'unsafe', info: 'Korean scallion pancake made with wheat flour.', alternatives: 'Look for buchimgae made with rice flour', cuisine: 'Korean', keywords: ['korean pancake', 'haemul pajeon'] },
  { name: 'Bingsu', status: 'caution', info: 'Shaved ice dessert. Base is GF but toppings like cookie crumbles, mochi, and cereal may have gluten. Choose fruit toppings.', cuisine: 'Korean', keywords: ['patbingsu', 'shaved ice'] },

  // ═══════════════════════════════════════
  // VIETNAMESE
  // ═══════════════════════════════════════
  { name: 'Pho', status: 'safe', info: 'Rice noodle soup. Naturally GF. One of the safest restaurant options. Confirm no wheat-based soy sauce in broth.', cuisine: 'Vietnamese', keywords: ['pho bo', 'pho ga'] },
  { name: 'Banh Mi', status: 'unsafe', info: 'Vietnamese sandwich on a wheat baguette.', alternatives: 'Banh mi fillings in a lettuce wrap or over rice', cuisine: 'Vietnamese' },
  { name: 'Bun Cha', status: 'safe', info: 'Grilled pork with rice vermicelli. Rice noodles are GF. Watch for dipping sauce (fish sauce is GF, soy is not).', cuisine: 'Vietnamese' },
  { name: 'Goi Cuon', status: 'safe', info: 'Fresh spring rolls with rice paper wrappers. Naturally GF. Dipping sauce (hoisin) may contain wheat.', alternatives: 'Use fish sauce-based dip instead of hoisin', cuisine: 'Vietnamese', keywords: ['fresh spring rolls', 'summer rolls'] },
  { name: 'Bun Bo Hue', status: 'safe', info: 'Spicy beef noodle soup with rice noodles. Naturally GF.', cuisine: 'Vietnamese' },
  { name: 'Com Tam', status: 'safe', info: 'Broken rice plates. Rice is naturally GF. Check sauces and marinated meats for soy sauce.', cuisine: 'Vietnamese', keywords: ['broken rice'] },
  { name: 'Cao Lau', status: 'caution', info: 'Noodles from Hoi An. Some recipes use a mix of rice and wheat. Ask about noodle ingredients.', cuisine: 'Vietnamese' },
  { name: 'Bo La Lot', status: 'safe', info: 'Beef wrapped in betel leaves and grilled. Naturally GF.', cuisine: 'Vietnamese' },
  { name: 'Che', status: 'safe', info: 'Vietnamese sweet dessert soup/drink. Usually made with beans, tapioca, and coconut milk — GF.', cuisine: 'Vietnamese' },

  // ═══════════════════════════════════════
  // MEDITERRANEAN
  // ═══════════════════════════════════════
  { name: 'Hummus', status: 'safe', info: 'Chickpeas, tahini, lemon, garlic. Naturally GF. Serve with veggies or GF crackers instead of pita.', cuisine: 'Mediterranean' },
  { name: 'Falafel', status: 'caution', info: 'Traditionally made from chickpeas and herbs (GF), but some recipes add flour or breadcrumbs as binder.', alternatives: 'Ask if pure chickpea or contains flour', cuisine: 'Mediterranean' },
  { name: 'Pita Bread', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'Corn tortillas, lettuce wraps, GF pita', cuisine: 'Mediterranean' },
  { name: 'Tabbouleh', status: 'unsafe', info: 'Made with bulgur wheat.', alternatives: 'Quinoa tabbouleh, cauliflower tabbouleh', cuisine: 'Mediterranean' },
  { name: 'Baba Ganoush', status: 'safe', info: 'Roasted eggplant dip with tahini. Naturally GF.', cuisine: 'Mediterranean' },
  { name: 'Kebab', status: 'caution', info: 'Grilled meat is GF. Some kebab mixes add breadcrumbs. Avoid pita wrap, choose rice.', alternatives: 'Kebab plate with rice and salad', cuisine: 'Mediterranean', keywords: ['kabob', 'shish kebab', 'doner'] },
  { name: 'Shawarma', status: 'caution', info: 'Seasoned meat is usually GF, but served in pita (wheat). Some seasonings may contain flour.', alternatives: 'Shawarma plate with rice, skip the pita', cuisine: 'Mediterranean' },
  { name: 'Dolma', status: 'safe', info: 'Grape leaves stuffed with rice and herbs. Naturally GF.', cuisine: 'Mediterranean', keywords: ['dolmades', 'stuffed grape leaves'] },
  { name: 'Labneh', status: 'safe', info: 'Strained yogurt. Naturally GF. Often served as a dip.', cuisine: 'Mediterranean' },
  { name: 'Shakshuka', status: 'safe', info: 'Eggs poached in tomato sauce. Naturally GF. Skip the bread on the side.', cuisine: 'Mediterranean' },
  { name: 'Fattoush', status: 'unsafe', info: 'Salad topped with toasted pita chips (wheat).', alternatives: 'Fattoush without pita, just the salad', cuisine: 'Mediterranean' },

  // ═══════════════════════════════════════
  // MIDDLE EASTERN
  // ═══════════════════════════════════════
  { name: 'Kibbeh', status: 'unsafe', info: 'Shell is made from bulgur wheat and ground meat.', alternatives: 'Rice kibbeh (kibbeh with rice shell)', cuisine: 'Middle Eastern' },
  { name: 'Manakish', status: 'unsafe', info: 'Flatbread topped with za\'atar or cheese. Dough is wheat-based.', cuisine: 'Middle Eastern', keywords: ['manakeesh', "za'atar bread"] },
  { name: 'Muhammara', status: 'caution', info: 'Red pepper and walnut dip. Usually GF but some recipes include breadcrumbs.', alternatives: 'Ask if breadcrumbs are used', cuisine: 'Middle Eastern' },
  { name: 'Baklava', status: 'unsafe', info: 'Made with phyllo dough (wheat) and nuts.', alternatives: 'GF nut-based desserts', cuisine: 'Middle Eastern' },
  { name: 'Kofta', status: 'caution', info: 'Ground meat with spices. Some recipes include breadcrumbs or bulgur.', alternatives: 'Ask if breadcrumbs or bulgur are used', cuisine: 'Middle Eastern', keywords: ['kafta', 'kofta kebab'] },
  { name: 'Tahini', status: 'safe', info: 'Ground sesame seed paste. Naturally GF.', cuisine: 'Middle Eastern' },
  { name: 'Tabbouleh', status: 'unsafe', info: 'Parsley salad made with bulgur wheat.', alternatives: 'Quinoa tabbouleh', cuisine: 'Middle Eastern' },

  // ═══════════════════════════════════════
  // FRENCH
  // ═══════════════════════════════════════
  { name: 'Croissant', status: 'unsafe', info: 'Laminated pastry made with wheat flour and butter. A core gluten food.', cuisine: 'French' },
  { name: 'Baguette', status: 'unsafe', info: 'Classic French bread made entirely from wheat flour.', cuisine: 'French' },
  { name: 'Crepes', status: 'unsafe', info: 'Made with wheat flour. Buckwheat galettes (savory crepes from Brittany) can be GF.', alternatives: 'Buckwheat galettes (confirm 100% buckwheat)', cuisine: 'French', keywords: ['galette'] },
  { name: 'Quiche', status: 'unsafe', info: 'Pie crust is wheat-based. Egg filling is GF.', alternatives: 'Crustless quiche, GF pie crust', cuisine: 'French' },
  { name: 'French Onion Soup', status: 'unsafe', info: 'Topped with bread and cheese. Bread is wheat. Broth may also be thickened with flour.', alternatives: 'Onion soup without bread and croutons', cuisine: 'French' },
  { name: 'Ratatouille', status: 'safe', info: 'Vegetable stew (eggplant, zucchini, tomatoes, peppers). Naturally GF.', cuisine: 'French' },
  { name: 'Coq au Vin', status: 'caution', info: 'Chicken braised in wine. Some recipes dredge chicken in flour.', alternatives: 'Ask if flour is used', cuisine: 'French' },
  { name: 'Bouillabaisse', status: 'safe', info: 'Provençal fish stew in tomato broth. Naturally GF. Skip the bread on the side.', cuisine: 'French' },
  { name: 'Crème Brûlée', status: 'safe', info: 'Custard dessert with caramelized sugar top. Naturally GF.', cuisine: 'French' },
  { name: 'Macarons', status: 'safe', info: 'Made with almond flour, egg whites, and sugar. Naturally GF (not to be confused with macaroni).', cuisine: 'French' },
  { name: 'Mousse au Chocolat', status: 'safe', info: 'Chocolate mousse made with chocolate, eggs, and cream. Naturally GF.', cuisine: 'French', keywords: ['chocolate mousse'] },
  { name: 'Escargot', status: 'caution', info: 'Snails in garlic butter are GF. Often served in pastry shells or with bread.', alternatives: 'Eat escargot, skip the bread', cuisine: 'French' },
  { name: 'Soufflé', status: 'caution', info: 'Sweet or savory soufflés usually contain some flour as a base.', cuisine: 'French' },
  { name: 'Niçoise Salad', status: 'safe', info: 'Tuna, eggs, olives, green beans, potatoes. Naturally GF.', cuisine: 'French', keywords: ['nicoise'] },
  { name: 'Duck Confit', status: 'safe', info: 'Slow-cooked duck leg preserved in its own fat. Naturally GF.', cuisine: 'French' },
  { name: 'Steak Frites', status: 'caution', info: 'Steak is GF. Fries may be coated or share a fryer. Béarnaise sauce is usually GF.', cuisine: 'French' },

  // ═══════════════════════════════════════
  // BRITISH
  // ═══════════════════════════════════════
  { name: 'Fish and Chips', status: 'unsafe', info: 'Fish batter is wheat-based. Chips may also share a fryer.', alternatives: 'GF batter fish, oven-baked chips', cuisine: 'British' },
  { name: 'Shepherd\'s Pie', status: 'caution', info: 'Meat filling may be thickened with flour. Mashed potato topping is GF.', alternatives: 'Ask for cornstarch-thickened filling', cuisine: 'British', keywords: ["cottage pie"] },
  { name: 'Bangers and Mash', status: 'caution', info: 'Many British sausages contain wheat rusk/breadcrumbs as filler. Mash is GF. Gravy often has flour.', alternatives: 'Confirm GF sausages and gravy', cuisine: 'British' },
  { name: 'Yorkshire Pudding', status: 'unsafe', info: 'Made with wheat flour, eggs, and milk.', cuisine: 'British' },
  { name: 'Scotch Egg', status: 'unsafe', info: 'Hard-boiled egg wrapped in sausage meat (may contain wheat) and breadcrumbs.', cuisine: 'British' },
  { name: 'Cornish Pasty', status: 'unsafe', info: 'Pastry shell made with wheat flour.', cuisine: 'British' },
  { name: 'Ploughman\'s Lunch', status: 'caution', info: 'Cheese, pickles, and cold cuts are GF. Served with bread and crackers (wheat). Skip the bread.', cuisine: 'British' },
  { name: 'Roast Dinner', status: 'caution', info: 'Meat is GF but Yorkshire pudding, stuffing, and gravy typically contain flour.', alternatives: 'Ask for just meat, roast veg, potatoes, and GF gravy', cuisine: 'British', keywords: ['sunday roast'] },
  { name: 'Toad in the Hole', status: 'unsafe', info: 'Sausages baked in Yorkshire pudding batter (wheat flour).', cuisine: 'British' },
  { name: 'Sticky Toffee Pudding', status: 'unsafe', info: 'Dense date cake made with wheat flour.', cuisine: 'British' },

  // ═══════════════════════════════════════
  // GREEK
  // ═══════════════════════════════════════
  { name: 'Greek Salad', status: 'safe', info: 'Tomatoes, cucumber, olives, feta, onion, olive oil. Naturally GF.', cuisine: 'Greek', keywords: ['horiatiki'] },
  { name: 'Gyro', status: 'unsafe', info: 'Served in pita bread (wheat). Meat may also contain breadcrumbs. Tzatziki is GF.', alternatives: 'Gyro plate without pita', cuisine: 'Greek', keywords: ['gyros'] },
  { name: 'Moussaka', status: 'caution', info: 'Eggplant and meat casserole. Béchamel sauce may use flour. Some recipes include breadcrumbs.', alternatives: 'Ask about flour in béchamel', cuisine: 'Greek' },
  { name: 'Spanakopita', status: 'unsafe', info: 'Spinach pie with phyllo dough (wheat). Filling is GF.', alternatives: 'Crustless spanakopita filling', cuisine: 'Greek' },
  { name: 'Souvlaki', status: 'safe', info: 'Grilled meat skewers. Naturally GF. Skip the pita bread.', cuisine: 'Greek' },
  { name: 'Tzatziki', status: 'safe', info: 'Yogurt, cucumber, garlic, and dill dip. Naturally GF.', cuisine: 'Greek' },
  { name: 'Baklava', status: 'unsafe', info: 'Layered phyllo dough (wheat) with nuts and honey syrup.', cuisine: 'Greek' },
  { name: 'Avgolemono', status: 'caution', info: 'Egg-lemon soup. Some recipes include rice (GF), others use orzo (wheat).', alternatives: 'Confirm rice is used, not orzo', cuisine: 'Greek' },
  { name: 'Pastitsio', status: 'unsafe', info: 'Greek baked pasta dish made with wheat pasta.', cuisine: 'Greek' },
  { name: 'Loukoumades', status: 'unsafe', info: 'Greek donuts made with wheat flour.', cuisine: 'Greek' },
  { name: 'Saganaki', status: 'unsafe', info: 'Pan-fried cheese coated in flour before frying.', alternatives: 'Uncoated grilled halloumi', cuisine: 'Greek' },

  // ═══════════════════════════════════════
  // SPANISH
  // ═══════════════════════════════════════
  { name: 'Paella', status: 'safe', info: 'Rice-based dish with seafood, meat, and vegetables. Naturally GF. One of the safest restaurant picks.', cuisine: 'Spanish' },
  { name: 'Tapas', status: 'caution', info: 'Varies widely. Patatas bravas, olives, jamón, and grilled items are GF. Avoid croquetas, empanadas, bread.', cuisine: 'Spanish' },
  { name: 'Gazpacho', status: 'safe', info: 'Cold tomato soup. Traditionally includes bread, but modern versions often don\'t. Ask.', cuisine: 'Spanish' },
  { name: 'Tortilla Española', status: 'safe', info: 'Spanish potato omelette made with eggs, potatoes, and onion. Naturally GF.', cuisine: 'Spanish', keywords: ['spanish omelette', 'tortilla de patatas'] },
  { name: 'Croquetas', status: 'unsafe', info: 'Béchamel-based croquettes with flour, coated in breadcrumbs.', cuisine: 'Spanish', keywords: ['croquettes'] },
  { name: 'Churros', status: 'unsafe', info: 'Fried dough made with wheat flour.', alternatives: 'GF churro recipes with GF flour blend', cuisine: 'Spanish' },
  { name: 'Patatas Bravas', status: 'safe', info: 'Fried potatoes with spicy tomato sauce. Usually GF. Check that sauce doesn\'t contain flour.', cuisine: 'Spanish' },
  { name: 'Jamón', status: 'safe', info: 'Cured ham. Naturally GF.', cuisine: 'Spanish', keywords: ['jamon iberico', 'jamon serrano'] },
  { name: 'Gambas al Ajillo', status: 'safe', info: 'Garlic shrimp in olive oil. Naturally GF.', cuisine: 'Spanish', keywords: ['garlic shrimp'] },
  { name: 'Pimientos de Padrón', status: 'safe', info: 'Blistered Padrón peppers with salt. Naturally GF.', cuisine: 'Spanish' },
  { name: 'Flan', status: 'safe', info: 'Caramel custard dessert. Made with eggs, milk, and sugar. Naturally GF.', cuisine: 'Spanish' },

  // ═══════════════════════════════════════
  // GERMAN
  // ═══════════════════════════════════════
  { name: 'Bratwurst', status: 'caution', info: 'Many German sausages are GF (just meat and spices), but some contain breadcrumbs. Check label or ask.', alternatives: 'Confirm no fillers, skip the bun or use GF bun', cuisine: 'German', keywords: ['wurst', 'sausage'] },
  { name: 'Schnitzel', status: 'unsafe', info: 'Breaded and fried cutlet using wheat flour and breadcrumbs.', alternatives: 'Unbreaded grilled cutlet, GF breadcrumb schnitzel', cuisine: 'German', keywords: ['wiener schnitzel'] },
  { name: 'Pretzel', status: 'unsafe', info: 'Made from wheat flour dough.', alternatives: 'GF pretzels (frozen brands available)', cuisine: 'German', keywords: ['brezel'] },
  { name: 'Sauerkraut', status: 'safe', info: 'Fermented cabbage. Naturally GF. Great side dish.', cuisine: 'German' },
  { name: 'Kartoffelsalat', status: 'safe', info: 'German potato salad. Naturally GF (potatoes, vinegar, mustard, onion).', cuisine: 'German', keywords: ['potato salad'] },
  { name: 'Spätzle', status: 'unsafe', info: 'Egg noodles/dumplings made with wheat flour.', cuisine: 'German' },
  { name: 'Sauerbraten', status: 'caution', info: 'Pot roast is GF, but gravy typically uses flour or gingerbread crumbs.', alternatives: 'Ask about gravy thickener', cuisine: 'German' },
  { name: 'Rouladen', status: 'caution', info: 'Beef rolls are GF, but gravy is usually flour-thickened.', cuisine: 'German' },
  { name: 'Strudel', status: 'unsafe', info: 'Stretched wheat flour pastry filled with fruit or savory filling.', cuisine: 'German', keywords: ['apple strudel', 'apfelstrudel'] },

  // ═══════════════════════════════════════
  // ETHIOPIAN
  // ═══════════════════════════════════════
  { name: 'Injera', status: 'caution', info: 'Traditionally made from teff flour (GF). However, many US restaurants mix in wheat flour. Always ask.', alternatives: 'Confirm 100% teff injera', cuisine: 'Ethiopian' },
  { name: 'Doro Wat', status: 'safe', info: 'Spicy chicken stew. Naturally GF. Eat with confirmed teff injera or rice.', cuisine: 'Ethiopian', keywords: ['doro wot'] },
  { name: 'Kitfo', status: 'safe', info: 'Ethiopian beef tartare/steak. Naturally GF. Seasoned with spiced butter.', cuisine: 'Ethiopian' },
  { name: 'Misir Wat', status: 'safe', info: 'Red lentil stew. Naturally GF.', cuisine: 'Ethiopian', keywords: ['misir wot'] },
  { name: 'Tibs', status: 'safe', info: 'Sautéed meat and vegetables. Naturally GF.', cuisine: 'Ethiopian' },

  // ═══════════════════════════════════════
  // CARIBBEAN
  // ═══════════════════════════════════════
  { name: 'Jerk Chicken', status: 'safe', info: 'Spice-rubbed grilled chicken. Marinade is typically GF (allspice, scotch bonnet, thyme). Verify no soy sauce.', cuisine: 'Caribbean' },
  { name: 'Rice and Peas', status: 'safe', info: 'Rice with kidney beans cooked in coconut milk. A Caribbean staple and naturally GF.', cuisine: 'Caribbean' },
  { name: 'Plantains', status: 'safe', info: 'Fried or baked plantains. Naturally GF. A great side dish.', cuisine: 'Caribbean', keywords: ['tostones', 'maduros'] },
  { name: 'Ackee and Saltfish', status: 'safe', info: 'Jamaica\'s national dish. Naturally GF. Usually served with rice or boiled dumplings (check dumpling flour).', cuisine: 'Caribbean' },
  { name: 'Roti (Caribbean)', status: 'unsafe', info: 'Caribbean roti wrap uses wheat flour.', alternatives: 'Ask for curry filling over rice instead', cuisine: 'Caribbean' },
  { name: 'Callaloo', status: 'safe', info: 'Leafy green stew. Naturally GF.', cuisine: 'Caribbean' },
  { name: 'Conch Fritters', status: 'unsafe', info: 'Battered with wheat flour.', alternatives: 'Grilled conch', cuisine: 'Caribbean' },
  { name: 'Doubles', status: 'unsafe', info: 'Trinidadian street food: curried chickpeas in fried bara bread (wheat flour).', cuisine: 'Caribbean' },

  // ═══════════════════════════════════════
  // BRAZILIAN
  // ═══════════════════════════════════════
  { name: 'Pão de Queijo', status: 'safe', info: 'Brazilian cheese bread made from tapioca flour. Naturally GF! A safe choice.', cuisine: 'Brazilian', keywords: ['cheese bread'] },
  { name: 'Feijoada', status: 'safe', info: 'Black bean and pork stew. Naturally GF. Served with rice.', cuisine: 'Brazilian' },
  { name: 'Churrasco', status: 'safe', info: 'Brazilian grilled meats. Naturally GF. One of the safest dining options.', cuisine: 'Brazilian', keywords: ['brazilian bbq', 'rodizio'] },
  { name: 'Coxinha', status: 'unsafe', info: 'Chicken croquette made with wheat flour dough and breadcrumbs.', cuisine: 'Brazilian' },
  { name: 'Brigadeiro', status: 'safe', info: 'Chocolate truffle made with condensed milk, cocoa, and butter. Naturally GF.', cuisine: 'Brazilian' },
  { name: 'Açaí Bowl', status: 'safe', info: 'Açaí, banana, and toppings. Naturally GF. Watch for granola toppings (may have wheat).', alternatives: 'Ask for GF granola or skip granola, add nuts', cuisine: 'Brazilian', keywords: ['acai'] },
  { name: 'Farofa', status: 'safe', info: 'Toasted cassava flour. Naturally GF. A Brazilian staple side dish.', cuisine: 'Brazilian' },

  // ═══════════════════════════════════════
  // FILIPINO
  // ═══════════════════════════════════════
  { name: 'Adobo', status: 'caution', info: 'Meat braised in vinegar and soy sauce. Vinegar is GF but soy sauce contains wheat.', alternatives: 'Make with tamari or coconut aminos', cuisine: 'Filipino', keywords: ['chicken adobo', 'pork adobo'] },
  { name: 'Sinigang', status: 'safe', info: 'Sour tamarind soup with vegetables and meat. Naturally GF.', cuisine: 'Filipino' },
  { name: 'Lumpia', status: 'unsafe', info: 'Filipino spring rolls with wheat flour wrappers.', alternatives: 'Fresh lumpia with lettuce wraps', cuisine: 'Filipino' },
  { name: 'Pancit', status: 'caution', info: 'Filipino noodles vary. Pancit bihon uses rice noodles (GF), pancit canton uses wheat noodles. Ask which type.', alternatives: 'Pancit bihon (rice noodles)', cuisine: 'Filipino' },
  { name: 'Lechon', status: 'safe', info: 'Whole roasted pig. Naturally GF. A Filipino celebration dish.', cuisine: 'Filipino' },
  { name: 'Kare-Kare', status: 'safe', info: 'Oxtail stew thickened with peanut sauce. Usually GF. Some versions add flour.', alternatives: 'Confirm no flour added', cuisine: 'Filipino' },
  { name: 'Halo-Halo', status: 'safe', info: 'Shaved ice dessert with beans, fruit, and evaporated milk. Usually GF. Watch for ube cake or leche flan toppings.', cuisine: 'Filipino' },

  // ═══════════════════════════════════════
  // BREAKFAST
  // ═══════════════════════════════════════
  { name: 'Pancakes', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'GF pancake mix (many brands available), buckwheat pancakes, banana oat pancakes', cuisine: 'Breakfast', keywords: ['pancake', 'hotcakes', 'flapjacks'] },
  { name: 'Waffles', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'GF waffle mix, rice flour waffles', cuisine: 'Breakfast', keywords: ['waffle'] },
  { name: 'French Toast', status: 'unsafe', info: 'Made with wheat bread.', alternatives: 'GF bread French toast', cuisine: 'Breakfast' },
  { name: 'Toast', status: 'unsafe', info: 'Wheat bread.', alternatives: 'GF bread, rice cakes', cuisine: 'Breakfast' },
  { name: 'Omelette', status: 'safe', info: 'Eggs are naturally GF. Watch for pancake batter added at some restaurants to make them fluffy (like IHOP).', alternatives: 'Ask if pure eggs are used', cuisine: 'Breakfast', keywords: ['omelet'] },
  { name: 'Scrambled Eggs', status: 'safe', info: 'Eggs are naturally GF. Some restaurants add a splash of pancake batter — ask.', cuisine: 'Breakfast' },
  { name: 'Eggs Benedict', status: 'unsafe', info: 'Served on an English muffin (wheat). Hollandaise sauce is usually GF.', alternatives: 'Eggs Benedict on GF English muffin or potato', cuisine: 'Breakfast' },
  { name: 'Bacon', status: 'safe', info: 'Plain bacon is naturally GF. Some flavored bacons may have gluten in seasoning — check labels.', cuisine: 'Breakfast' },
  { name: 'Sausage', status: 'caution', info: 'Many breakfast sausages are GF (just pork and spices), but some brands add wheat fillers. Check labels.', cuisine: 'Breakfast' },
  { name: 'Hash Browns', status: 'safe', info: 'Shredded potatoes. Naturally GF. Some restaurants add flour for crispiness — ask.', cuisine: 'Breakfast' },
  { name: 'Granola', status: 'caution', info: 'Most granola contains oats (check for GF certification) and may have wheat-based ingredients.', alternatives: 'Certified GF granola', cuisine: 'Breakfast' },
  { name: 'Oatmeal', status: 'caution', info: 'Oats are naturally GF but frequently cross-contaminated with wheat. Use only certified GF oats.', alternatives: 'Certified GF oats', cuisine: 'Breakfast', keywords: ['porridge'] },
  { name: 'Acai Bowl', status: 'safe', info: 'Açaí blend with fruit toppings. GF base. Watch for granola topping (may contain wheat).', cuisine: 'Breakfast' },
  { name: 'Smoothie', status: 'safe', info: 'Fruit, milk, yogurt smoothies are GF. Watch for protein powder mixes and granola add-ins.', cuisine: 'Breakfast' },
  { name: 'Bagel', status: 'unsafe', info: 'Made from wheat flour.', alternatives: 'GF bagels (several brands available)', cuisine: 'Breakfast' },
  { name: 'Cereal', status: 'caution', info: 'Many cereals contain wheat or barley malt. Lucky Charms, Corn Flakes, and many more have malt flavoring.', alternatives: 'Certified GF cereals', cuisine: 'Breakfast' },
  { name: 'Breakfast Burrito', status: 'unsafe', info: 'Flour tortilla contains wheat. Fillings (eggs, cheese, meat) are GF.', alternatives: 'Breakfast bowl, corn tortilla wrap', cuisine: 'Breakfast' },

  // ═══════════════════════════════════════
  // DESSERTS & SWEETS
  // ═══════════════════════════════════════
  { name: 'Cake', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'Almond flour cake, coconut flour cake, flourless chocolate cake', cuisine: 'Desserts & Sweets' },
  { name: 'Cookies', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'GF cookie brands (Enjoy Life, Goodie Girl, etc.)', cuisine: 'Desserts & Sweets', keywords: ['cookie', 'biscuit'] },
  { name: 'Brownies', status: 'unsafe', info: 'Typically made with wheat flour. One of the easiest desserts to make GF.', alternatives: 'GF brownies (black bean brownies, almond flour brownies)', cuisine: 'Desserts & Sweets' },
  { name: 'Pie', status: 'unsafe', info: 'Pie crust is made with wheat flour. Fillings are often GF.', alternatives: 'GF pie crust, crustless pie', cuisine: 'Desserts & Sweets' },
  { name: 'Doughnuts', status: 'unsafe', info: 'Made with wheat flour.', alternatives: 'GF doughnuts from specialty bakeries', cuisine: 'Desserts & Sweets', keywords: ['donut', 'donuts'] },
  { name: 'Ice Cream', status: 'caution', info: 'Plain ice cream is usually GF. Watch for cookie dough, cake batter, Oreo, and other mix-ins. Waffle cones contain gluten.', alternatives: 'Plain flavors in a cup', cuisine: 'Desserts & Sweets' },
  { name: 'Cheesecake', status: 'caution', info: 'Filling is usually GF. The crust is typically made from crushed Graham crackers (wheat).', alternatives: 'GF crust cheesecake, crustless cheesecake', cuisine: 'Desserts & Sweets' },
  { name: 'Pudding', status: 'safe', info: 'Most pudding is made with milk, sugar, cornstarch, and flavorings. Naturally GF.', cuisine: 'Desserts & Sweets' },
  { name: 'Jello', status: 'safe', info: 'Gelatin-based dessert. Naturally GF.', cuisine: 'Desserts & Sweets', keywords: ['jelly', 'gelatin'] },
  { name: 'Meringue', status: 'safe', info: 'Made from egg whites and sugar. Naturally GF.', cuisine: 'Desserts & Sweets', keywords: ['pavlova'] },
  { name: 'Sorbet', status: 'safe', info: 'Fruit-based frozen dessert. Naturally GF.', cuisine: 'Desserts & Sweets' },
  { name: 'Chocolate Mousse', status: 'safe', info: 'Made with chocolate, eggs, and cream. Naturally GF.', cuisine: 'Desserts & Sweets' },
  { name: 'Flourless Chocolate Cake', status: 'safe', info: 'Made with chocolate, butter, eggs, and sugar — no flour. A naturally GF dessert.', cuisine: 'Desserts & Sweets' },
  { name: 'Mochi', status: 'safe', info: 'Made from glutinous rice flour, which despite the name is gluten-free. Check fillings.', cuisine: 'Desserts & Sweets' },
  { name: 'Chocolate', status: 'caution', info: 'Plain dark, milk, and white chocolate are usually GF. Check for malt, wafer, cookie pieces, or shared facility warnings.', cuisine: 'Desserts & Sweets' },
  { name: 'Candy', status: 'caution', info: 'Many candies are GF (Skittles, Starburst, most gummies). Licorice, Twizzlers, KitKat, and malt balls contain gluten.', cuisine: 'Desserts & Sweets' },

  // ═══════════════════════════════════════
  // SNACKS & SIDES
  // ═══════════════════════════════════════
  { name: 'French Fries', status: 'caution', info: 'Potatoes are GF but may be coated in flour or share a fryer with breaded items.', alternatives: 'Ask about dedicated fryer and flour coating', cuisine: 'Snacks & Sides', keywords: ['fries', 'chips'] },
  { name: 'Popcorn', status: 'safe', info: 'Naturally GF. Watch for flavored popcorn which may have gluten seasonings.', cuisine: 'Snacks & Sides' },
  { name: 'Potato Chips', status: 'safe', info: 'Most plain potato chips are GF. Flavored varieties may contain malt vinegar or wheat starch.', alternatives: 'Plain or check for GF label on flavored chips', cuisine: 'Snacks & Sides', keywords: ['crisps'] },
  { name: 'Tortilla Chips', status: 'safe', info: 'Corn-based tortilla chips are naturally GF.', cuisine: 'Snacks & Sides' },
  { name: 'Rice Cakes', status: 'safe', info: 'Made from puffed rice. Naturally GF.', cuisine: 'Snacks & Sides' },
  { name: 'Trail Mix', status: 'caution', info: 'Nuts, seeds, and dried fruit are GF. Watch for pretzels, granola, or candy with gluten.', cuisine: 'Snacks & Sides' },
  { name: 'Mozzarella Sticks', status: 'unsafe', info: 'Breaded with wheat flour and breadcrumbs.', alternatives: 'GF breaded mozzarella sticks', cuisine: 'Snacks & Sides' },
  { name: 'Onion Rings', status: 'unsafe', info: 'Battered with wheat flour.', alternatives: 'GF battered onion rings', cuisine: 'Snacks & Sides' },
  { name: 'Breadsticks', status: 'unsafe', info: 'Made from wheat dough.', alternatives: 'GF breadsticks, veggie sticks', cuisine: 'Snacks & Sides' },
  { name: 'Pretzels', status: 'unsafe', info: 'Wheat flour dough.', alternatives: 'GF pretzels (Snyder\'s GF, Glutino)', cuisine: 'Snacks & Sides' },
  { name: 'Crackers', status: 'unsafe', info: 'Most crackers contain wheat flour.', alternatives: 'Rice crackers, GF crackers (Mary\'s Gone Crackers, Simple Mills)', cuisine: 'Snacks & Sides' },
  { name: 'Edamame', status: 'safe', info: 'Steamed soybeans. Naturally GF.', cuisine: 'Snacks & Sides' },
  { name: 'Salad', status: 'caution', info: 'Greens and vegetables are GF. Watch for croutons, breaded chicken, and dressings with gluten.', alternatives: 'Ask for no croutons, oil and vinegar dressing', cuisine: 'Snacks & Sides' },
  { name: 'Soup', status: 'caution', info: 'Many soups use flour as a thickener (cream soups especially). Clear broth-based soups are safer.', cuisine: 'Snacks & Sides' },
  { name: 'Coleslaw', status: 'caution', info: 'Usually GF. Some dressings may contain malt vinegar or modified food starch.', cuisine: 'Snacks & Sides' },
  { name: 'Guacamole', status: 'safe', info: 'Avocado-based dip. Naturally GF.', cuisine: 'Snacks & Sides' },
  { name: 'Hummus', status: 'safe', info: 'Chickpea and tahini dip. Naturally GF. Serve with veggies or GF crackers.', cuisine: 'Snacks & Sides' },

  // ═══════════════════════════════════════
  // BEVERAGES
  // ═══════════════════════════════════════
  { name: 'Beer', status: 'unsafe', info: 'Brewed from barley and/or wheat. Contains gluten.', alternatives: 'GF beer (Omission, Glutenberg, Redbridge), hard cider, wine, spirits', cuisine: 'Beverages' },
  { name: 'Wine', status: 'safe', info: 'Made from grapes. Naturally GF.', cuisine: 'Beverages' },
  { name: 'Cider', status: 'safe', info: 'Made from apples. Naturally GF. A great beer alternative.', cuisine: 'Beverages', keywords: ['hard cider'] },
  { name: 'Whiskey', status: 'caution', info: 'Distilled from grains (including wheat/barley), but distillation removes gluten proteins. Most experts consider distilled spirits safe. Sensitive individuals may react.', cuisine: 'Beverages', keywords: ['whisky', 'bourbon', 'scotch'] },
  { name: 'Vodka', status: 'caution', info: 'Some vodkas are distilled from wheat. The distillation process should remove gluten. Sensitive individuals may prefer potato or grape vodka.', alternatives: 'Tito\'s (corn), Chopin (potato), Ciroc (grape)', cuisine: 'Beverages' },
  { name: 'Coffee', status: 'safe', info: 'Plain coffee is GF. Flavored coffee drinks may have additives — check.', cuisine: 'Beverages' },
  { name: 'Tea', status: 'safe', info: 'Plain tea is GF. Herbal, green, black, and white teas are all safe.', cuisine: 'Beverages' },
  { name: 'Smoothie', status: 'safe', info: 'Fruit and milk/yogurt smoothies are GF. Watch for protein powders and oat-based additions.', cuisine: 'Beverages' },
  { name: 'Milkshake', status: 'caution', info: 'Ice cream and milk are usually GF. Some flavors use cookies, malt, or cake. Thick-shake machines may cross-contaminate.', cuisine: 'Beverages' },
  { name: 'Soda', status: 'safe', info: 'Most sodas are GF (Coke, Pepsi, Sprite, etc.).', cuisine: 'Beverages', keywords: ['cola', 'pop'] },
  { name: 'Juice', status: 'safe', info: '100% fruit juice is naturally GF.', cuisine: 'Beverages' },
  { name: 'Sake', status: 'safe', info: 'Made from rice. Naturally GF.', cuisine: 'Beverages' },
  { name: 'Tequila', status: 'safe', info: 'Made from agave. Naturally GF.', cuisine: 'Beverages', keywords: ['margarita'] },
  { name: 'Rum', status: 'safe', info: 'Made from sugarcane. Naturally GF.', cuisine: 'Beverages' },
  { name: 'Gin', status: 'caution', info: 'Typically distilled from grain, but distillation should remove gluten. Most consider it safe.', cuisine: 'Beverages' },
  { name: 'Kombucha', status: 'safe', info: 'Fermented tea. Naturally GF. Some flavored varieties may have additives — check.', cuisine: 'Beverages' },

  // ═══════════════════════════════════════
  // SAUCES & CONDIMENTS
  // ═══════════════════════════════════════
  { name: 'Soy Sauce', status: 'unsafe', info: 'Made from wheat and soybeans.', alternatives: 'Tamari (wheat-free), coconut aminos', cuisine: 'Sauces & Condiments' },
  { name: 'Tamari', status: 'safe', info: 'Japanese soy sauce typically made without wheat. Always verify the label says wheat-free.', cuisine: 'Sauces & Condiments' },
  { name: 'Hoisin Sauce', status: 'unsafe', info: 'Contains wheat flour or wheat starch.', alternatives: 'GF hoisin sauce brands', cuisine: 'Sauces & Condiments' },
  { name: 'Teriyaki Sauce', status: 'unsafe', info: 'Contains soy sauce (wheat).', alternatives: 'Make with tamari', cuisine: 'Sauces & Condiments' },
  { name: 'Oyster Sauce', status: 'caution', info: 'Some brands contain wheat. Check the label.', alternatives: 'GF oyster sauce brands', cuisine: 'Sauces & Condiments' },
  { name: 'Worcestershire Sauce', status: 'caution', info: 'Traditional recipe uses malt vinegar (barley). Some brands are GF.', alternatives: 'Lea & Perrins is GF in the US', cuisine: 'Sauces & Condiments' },
  { name: 'Ketchup', status: 'safe', info: 'Most ketchup brands are GF (Heinz, Hunt\'s).', cuisine: 'Sauces & Condiments' },
  { name: 'Mustard', status: 'safe', info: 'Plain mustard is GF. Some specialty mustards may have wheat flour.', cuisine: 'Sauces & Condiments' },
  { name: 'Mayonnaise', status: 'safe', info: 'Made with eggs, oil, and vinegar. Naturally GF.', cuisine: 'Sauces & Condiments' },
  { name: 'Hot Sauce', status: 'safe', info: 'Most hot sauces are GF (Tabasco, Cholula, Sriracha, Frank\'s).', cuisine: 'Sauces & Condiments' },
  { name: 'BBQ Sauce', status: 'caution', info: 'Many BBQ sauces are GF but some contain malt vinegar or soy sauce. Check labels.', cuisine: 'Sauces & Condiments' },
  { name: 'Gravy', status: 'unsafe', info: 'Traditional gravy is thickened with wheat flour.', alternatives: 'Cornstarch or arrowroot-thickened gravy', cuisine: 'Sauces & Condiments' },
  { name: 'Salad Dressing', status: 'caution', info: 'Many are GF but some contain malt vinegar, soy sauce, or modified food starch. Check labels.', cuisine: 'Sauces & Condiments' },
  { name: 'Pesto', status: 'safe', info: 'Basil, pine nuts, garlic, olive oil, Parmesan. Naturally GF.', cuisine: 'Sauces & Condiments' },
  { name: 'Malt Vinegar', status: 'unsafe', info: 'Made from barley. Contains gluten.', alternatives: 'Apple cider vinegar, wine vinegar, rice vinegar', cuisine: 'Sauces & Condiments' },
  { name: 'Fish Sauce', status: 'safe', info: 'Made from fermented fish and salt. Naturally GF. Common in Southeast Asian cooking.', cuisine: 'Sauces & Condiments' },
  { name: 'Coconut Aminos', status: 'safe', info: 'Soy sauce alternative made from coconut sap. GF and soy-free.', cuisine: 'Sauces & Condiments' },

  // ═══════════════════════════════════════
  // FAST FOOD
  // ═══════════════════════════════════════
  { name: 'McDonald\'s Fries', status: 'caution', info: 'In the US, McDonald\'s fries contain natural beef flavor with wheat derivatives. In some countries they\'re GF. Ask locally.', alternatives: 'Check regional ingredient lists', cuisine: 'Fast Food' },
  { name: 'Chick-fil-A Nuggets', status: 'unsafe', info: 'Breaded with wheat flour.', alternatives: 'Chick-fil-A grilled nuggets are GF', cuisine: 'Fast Food' },
  { name: 'Subway', status: 'unsafe', info: 'All standard Subway bread contains wheat. Fillings may be cross-contaminated. Not recommended.', cuisine: 'Fast Food' },
  { name: 'Wendy\'s Chili', status: 'safe', info: 'Wendy\'s chili is considered GF by the company. One of the better fast food GF options.', cuisine: 'Fast Food' },
  { name: 'Chipotle Bowl', status: 'safe', info: 'Rice, beans, meat, salsa, guacamole — all GF. One of the most GF-friendly fast food chains. Avoid flour tortilla.', cuisine: 'Fast Food', keywords: ['chipotle'] },
  { name: 'In-N-Out Burger', status: 'caution', info: 'Burger patties and fries are GF. Order "Protein Style" for a lettuce wrap instead of bun. Fries are cooked in dedicated fryer.', alternatives: 'Protein Style (lettuce wrap)', cuisine: 'Fast Food' },
  { name: 'Five Guys Burger', status: 'caution', info: 'Burgers can be ordered in a lettuce wrap or bowl. Fries are cooked in peanut oil in dedicated fryer (GF). Hot dogs are GF without the bun.', cuisine: 'Fast Food', keywords: ['five guys'] },
  { name: 'Taco Bell', status: 'caution', info: 'Corn tortilla items, rice, and beans are GF. Flour tortillas, Doritos Locos Tacos contain wheat. Cross-contamination risk.', cuisine: 'Fast Food' },
  { name: 'Pizza (Fast Food)', status: 'unsafe', info: 'All major chains (Domino\'s, Pizza Hut, Papa John\'s) use wheat dough. Some offer GF crusts (cross-contamination warnings apply).', cuisine: 'Fast Food' },
]

// ─────────────────────────────────────────
// Search helpers
// ─────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/['']/g, "'").replace(/\s+/g, ' ')
}

/** Score a dish against a query — higher is better, 0 = no match */
function scoreDish(dish: DishEntry, query: string): number {
  const q = normalize(query)
  const name = normalize(dish.name)

  // Exact match
  if (name === q) return 100

  // Name starts with query
  if (name.startsWith(q)) return 90

  // Name contains query
  if (name.includes(q)) return 80

  // Query contains name
  if (q.includes(name)) return 70

  // Keyword match
  if (dish.keywords?.some(k => normalize(k) === q)) return 85
  if (dish.keywords?.some(k => normalize(k).includes(q) || q.includes(normalize(k)))) return 65

  // Word-level matching
  const qWords = q.split(/\s+/)
  const nameWords = name.split(/\s+/)
  const matchedWords = qWords.filter(w => nameWords.some(nw => nw.includes(w) || w.includes(nw)))
  if (matchedWords.length > 0) return 40 + (matchedWords.length / qWords.length) * 20

  // Keyword word matching
  if (dish.keywords?.some(k => {
    const kWords = normalize(k).split(/\s+/)
    return qWords.some(w => kWords.some(kw => kw.includes(w) || w.includes(kw)))
  })) return 35

  // Cuisine match
  if (normalize(dish.cuisine).includes(q)) return 20

  return 0
}

export interface DishSearchResult extends DishEntry {
  score: number
}

export function searchDishes(query: string, limit: number = 20): DishSearchResult[] {
  if (!query.trim()) return []

  const results: DishSearchResult[] = []
  for (const dish of DISH_DATABASE) {
    const score = scoreDish(dish, query)
    if (score > 0) {
      results.push({ ...dish, score })
    }
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit)
}

export function getDishesByCuisine(cuisine: string): DishEntry[] {
  return DISH_DATABASE.filter(d => d.cuisine === cuisine)
}

export function getDishStats() {
  const total = DISH_DATABASE.length
  const safe = DISH_DATABASE.filter(d => d.status === 'safe').length
  const caution = DISH_DATABASE.filter(d => d.status === 'caution').length
  const unsafe = DISH_DATABASE.filter(d => d.status === 'unsafe').length
  const cuisines = new Set(DISH_DATABASE.map(d => d.cuisine)).size
  return { total, safe, caution, unsafe, cuisines }
}
