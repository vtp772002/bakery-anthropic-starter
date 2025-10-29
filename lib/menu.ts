export type MenuItem = {
  name: string;
  ingredients?: string[];
  image?: string;
  price?: number;
};

export type MenuCategory = {
  name: string; // Display label (uppercase as on source)
  slug: string; // lowercase kebab-case, e.g., "bread"
  items: MenuItem[];
};

// Optional image mapping (built via scripts/sync-breadfactory-images.ts)
// This file may not exist at initial setup; keep import inside try/catch semantics via dynamic require.
let bfImages: { items: { name: string; image: string; category: string }[] } = { items: [] };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  bfImages = require("@/data/breadfactory-images.json");
} catch {
  // file may not exist during first run
}

// Data sourced from Bread Factory VN menu (https://breadfactory.com.vn/menu_)
// Crawled and normalized: item names and ingredient lists (when shown).
// Prices are not provided on the source page, so they are omitted here.
export const breadFactoryMenuCategories: MenuCategory[] = [
  {
    name: "BREAD",
    slug: "bread",
    items: [
      { name: "Coconut Charcoal Croissant", ingredients: ["Coconut", "Milk", "Charcoal"], image: bfImages.items.find(i => i.name === "Coconut Charcoal Croissant")?.image },
      { name: "Corn Sausage Croissant", ingredients: ["Sausage", "Corn", "Cheese", "Egg"], image: bfImages.items.find(i => i.name === "Corn Sausage Croissant")?.image },
      { name: "Cream Cheese Brioche", ingredients: ["Creamcheese", "Egg", "Milk"], image: bfImages.items.find(i => i.name === "Cream Cheese Brioche")?.image },
      { name: "Cream Soboro", ingredients: ["Chocolate", "Peanut", "Fresh cream", "Egg"] },
      { name: "Baguette", ingredients: ["Flour", "Levain", "Water"] },
      { name: "Crookie", ingredients: ["Butter", "Egg", "Chocolate"] },
      { name: "Bánh Mỳ Bơ Tỏi Lý Sơn", ingredients: ["Garlic", "Egg", "Creamcheese"] },
      { name: "Dark Chocolate Donut", ingredients: ["Dark chocolate", "Milk chocolate", "Egg"] },
      { name: "Chocolate Quay Quay", ingredients: ["Dark chocolate", "Milk", "Egg"] },
      { name: "Diamant Croissant", ingredients: ["Almond", "Milk", "Butter"] },
      { name: "Coffee Bun", ingredients: ["Almond", "Coffee", "Butter", "Egg"] },
      { name: "Cream Twist Donut", ingredients: ["Fresh cream", "Milk", "Egg"] },
      { name: "Dinosaur Eggs Bread", ingredients: ["Sesame", "Soy", "Tapioca"] },
      { name: "Croffle", ingredients: ["Butter", "Egg", "Milk"] },
      { name: "Egg Tart Portugal", ingredients: ["Egg", "Fresh cream", "Vanilla"] },
      { name: "Cruncky Twist", ingredients: ["Walnut", "Cashew nut", "Redbean"] },
      { name: "Fig Campagne", ingredients: ["Fig", "Walnut", "Cranberry"] },
      { name: "French Croissant", ingredients: ["Butter", "Egg", "Milk"] },
      { name: "Curry Croquette", ingredients: ["Onion", "Curry", "Sausage", "Egg"] },
      { name: "Garlic Baguette", ingredients: ["Garlic", "Butter", "Milk", "Egg"] },
      { name: "Dark Rye Toast", ingredients: ["Walnut", "Flaxseed", "Drak rye"] },
      { name: "G-Seven Mocha Cream Soboro", ingredients: ["Coffee", "Butter", "Egg"] },
      { name: "Glutinous Red Bean Donut", ingredients: ["Glutinous rice", "Redbean", "Sugar"] },
      { name: "Glutinous Rice Donut", ingredients: ["Sugar", "Glutinous rice"] },
      { name: "Honey Toast", ingredients: ["Milk", "Egg", "Honey"] },
      { name: "Kouign Amann", ingredients: ["Sugar", "Butter", "Milk"] },
      { name: "Honey Baguette", ingredients: ["Egg", "Honey", "Milk"] },
      { name: "Jalapeno", ingredients: ["Jalapeno", "Olive", "Sausage"] },
      { name: "Maple Flat Croissant", ingredients: ["Butter", "Egg", "Maple syrup"] },
      { name: "Kimchi Croquette", ingredients: ["Kimchi", "Sausage", "Potato", "Egg"] },
      { name: "Olive Ciabatta", ingredients: ["Olive", "Potato"] },
      { name: "Mont Blanc", ingredients: ["Butter", "Egg", "Milk"] },
      { name: "Olive Tangzong Toast", ingredients: ["Olive", "Tangzhong", "Cheese"] },
      { name: "Onion Sausage Pizza", ingredients: ["Sausage", "Olive", "Onion", "Egg"] },
      { name: "Milk Toast", ingredients: ["Milk", "Egg", "Butter"] },
      { name: "Mini Croissant", ingredients: ["Butter", "Egg", "Milk"] },
      { name: "Original Glazed Donut", ingredients: ["Sugar powder", "milk", "butter"] },
      { name: "Pain aux raisins", ingredients: ["Raisin", "Almond", "Milk", "Butter"] },
      { name: "Natural Campagne", ingredients: ["Walnut", "Wholemeal", "Cranberry"] },
      { name: "Pea Bean Bread", ingredients: ["Grean pea", "Egg", "Milk"] },
      { name: "Plain Bagel", ingredients: ["Flour", "Water", "Olive oil"] },
      { name: "Onion Cream Cheese Pretzel", ingredients: ["Cream cheese", "Mustard", "Onion"] },
      { name: "Red Pepper Sausage", ingredients: ["Sausage", "Korean chile sauce", "Garlic", "Egg"] },
      { name: "Palmier Carre", ingredients: ["Butter", "Sugar", "Dark chocolat"] },
      { name: "Snow Bean Cream", ingredients: ["Fresh cream", "Red bean", "Egg"] },
      { name: "Patisserie Cream Bread", ingredients: ["Milk", "Egg", "Butter"] },
      { name: "Snow Milk Cream Bun", ingredients: ["Milk", "Butter", "Sugar"] },
      { name: "Petite Roll Cheese Bread", ingredients: ["Cheese", "Flour", "Water"] },
      { name: "Sweet potato Patissier cream Toast", ingredients: ["Patisserie cream", "Sweet potato", "Black sesame"] },
      { name: "Plain Scone", ingredients: ["Butter", "Milk", "Egg"] },
      { name: "Sweet Potato Redbean Toast", ingredients: ["Redbean", "Peanut butter", "Sweet potato"] },
      { name: "Red Bean Walnut", ingredients: ["Red bean", "Walnut", "Milk", "Egg"] },
      { name: "Red bean Butter Pretzel", ingredients: ["Fresh butter", "Levain", "Red bean"] },
      { name: "Tangzhong Toast", ingredients: ["Flour", "Fresh milk", "Tangzhong"] },
      { name: "Salted Butter Roll", ingredients: ["Sea salt", "Butter", "Milk"] },
      { name: "Bacon Corn Cheese Mayo Toast", ingredients: ["Bacon", "Corn", "Cheese", "Mayo", "Toast"] },
      { name: "Soboro Fries", ingredients: ["Butter", "red bean", "milk"] },
      { name: "Bagel Roll Sausage", ingredients: ["Sausage", "Mozzarella", "Mustard"] },
      { name: "Soboro", ingredients: ["Chocolate", "Peanut", "Milk", "Egg"] },
      { name: "Banh Mi Salad", ingredients: ["Sausage", "Potato", "Pickle"] },
      { name: "Soft Roll", ingredients: ["Egg", "Butter", "Milk"] },
      { name: "Blue Cream Cheese Pretzel", ingredients: ["Sausage", "Potato", "Pickle"] },
      { name: "Sriracha Sausage Pastry", ingredients: ["Sausage", "Sriracha", "cheese"] },
      { name: "Butter Pretzel", ingredients: ["Fresh butter", "Levain", "Water"] },
      { name: "Strawberry Cream Donut", ingredients: ["Strawberry", "Sugar", "Fresh cream"] },
      { name: "Butter Roll", ingredients: ["Butter", "Condensed milk", "Egg"] },
      { name: "Chocolat Croissant", ingredients: ["Butter", "Chocolate", "Milk"] },
      { name: "Chocolate Almond Croissant" },
      { name: "Strawberry Soboro", ingredients: ["Strawberry", "Peanut", "Fresh cream"] },
      { name: "Chocolate Cream Soboro", ingredients: ["Chocolate", "Fresh cream", "Peanut"] },
      { name: "Sweet Potato Bread", ingredients: ["Sweet potato", "Tapioca", "Cheese"] },
      { name: "Chocolate Muffin", ingredients: ["Dark chocolate", "Milk", "Butter"] },
      { name: "Sweet Potato Onion Pizza", ingredients: ["Sweet potato", "Squid ink", "Onion"] },
      { name: "Choconuts Flat Croissant", ingredients: ["Butter", "Egg", "Milk", "Nuts"] },
      { name: "Sweet pumpkin" },
      { name: "ChopChop Pie", ingredients: ["Jam", "Egg", "Butter"] },
      { name: "Tiramisu Danish Pastry", ingredients: ["Cacao", "Cream cheese", "Butter"] },
      { name: "Churros", ingredients: ["Cinnamon", "Butter", "Egg"] },
      { name: "Twist Donut", ingredients: ["Egg", "Butter", "Milk"] },
      { name: "White Roll", ingredients: ["Fresh cream", "Egg", "Butter"] },
      { name: "Cinamon Roll", ingredients: ["Creamcheese", "Cinnamon", "Egg"] }
    ]
  },
  {
    name: "BRUNCH",
    slug: "brunch",
    items: [
      { name: "Cajun chicken salad" },
      { name: "Cranberry Chicken Sandwich", ingredients: ["Chicken breast", "Cranberry", "Walnut"] },
      { name: "Egg Mayo Sandwich", ingredients: ["Egg", "Mayonnaise", "Strawberry"] },
      { name: "Ham Cheese Danish", ingredients: ["Tomato", "Ham", "Cheese"] },
      { name: "Ham Cheese Sandwich", ingredients: ["Cheese", "Ham", "Carrot"] },
      { name: "Seaweed Sesame Cold Pasta", ingredients: ["Seadweed", "Sesame", "Spaghetti"] },
      { name: "Sweet Chili Cold Pasta", ingredients: ["Chicken", "cheese", "Spaghetti"] }
    ]
  },
  {
    name: "CAKE",
    slug: "cake",
    items: [
      { name: "Blueberry Yogurt Cake (S)", ingredients: ["Blueberry", "Fresh cream", "Yogurt"] },
      { name: "Carrot Cake (S)", ingredients: ["Carrot", "Creamcheese", "Walnut", "Cinamon"] },
      { name: "Chocolat Bear Cake (S)", ingredients: ["Fresh cream", "Dark chocolate", "Cacao powder"] },
      { name: "Chocolat River Side (S)", ingredients: ["Dark chocolat", "Fresh cream", "Milk"] },
      { name: "Chocolate lace cake (S)", ingredients: ["Dark chocolate", "Raspberry", "Cacao powder"] },
      { name: "Fresh Cloud Cake (S)", ingredients: ["Strawberry", "Fresh milk cream", "Mango"] },
      { name: "Grapefruit Earl grey Cake (S)", ingredients: ["Grapefruit", "Earl grey", "Milk"] },
      { name: "Green Grape Ring Cake (S)", ingredients: ["Green grape", "Fresh cream", "Milk"] },
      { name: "Mango Ring Cake (S)", ingredients: ["Mango", "Fresh cream", "Milk"] },
      { name: "Milk Pong Dang Cake (S)", ingredients: ["Strawberry", "Mango", "Fresh cream"] },
      { name: "Real Chocolate Cake (S)", ingredients: ["Dark chocolate", "Milk", "Butter"] },
      { name: "Red Velvet Cake (S)", ingredients: ["Vanilla bean", "Milk", "Mascapone"] },
      { name: "Strawberry Crunch Cake (S)", ingredients: ["Strawberry", "Fresh cream", "Milk"] },
      { name: "Strawberry Mascapone cake (S)", ingredients: ["Strawberry", "Mascarpone cream", "Vanilla bean"] },
      { name: "Strawberry Rabbit Cake (S)", ingredients: ["Strawberry", "Fresh cream", "Chocolat"] },
      { name: "Strawberry Ring Cake (S)", ingredients: ["Strawberry", "Fresh cream", "Milk"] },
      { name: "Strawberry Yogurt Chantilly (S)", ingredients: ["Almond", "Strawberry", "Yogurt"] },
      { name: "Sweet Potato Mousse (S)", ingredients: ["Sweet potato", "fresh cream", "Milk"] },
      { name: "Trawberry X-mas Cake (S)", ingredients: ["Strawberry", "Fresh cream", "Milk"] }
    ]
  },
  {
    name: "COOKIES",
    slug: "cookies",
    items: [
      { name: "Almond Chocolate Sable", ingredients: ["Almond", "Cacao", "Butter"] },
      { name: "Butter Cookie", ingredients: ["Butter", "Egg", "Sugar"] },
      { name: "Caramel Walnut", ingredients: ["Walnut", "Sugar", "Butter"] },
      { name: "Cheddar Cheese Levain Cookie", ingredients: ["Butter", "Sugar", "Almond powder", "Cheese"] },
      { name: "Cheddar Cheese Sable", ingredients: ["Cheese", "Butter", "Flour"] },
      { name: "Chocolate Chip Cookie", ingredients: ["Chocolat chip", "Butter", "Flour"] },
      { name: "Chocolate S.More Levain Cookie", ingredients: ["Marshmello", "Dark chocolate", "Butter"] },
      { name: "Chocolate Walnut Levain Cookie", ingredients: ["White chocolate", "Dark chocolate", "Walnut"] },
      { name: "Coconut Rocher", ingredients: ["Coconut", "White egg", "Sugar"] },
      { name: "Cracker Meringue Cookies", ingredients: ["White egg", "suger", "cracker"] },
      { name: "Lemon Sable", ingredients: ["Lemon", "Butter", "Flour"] },
      { name: "Meringue Cookies", ingredients: ["Egg white", "Sugar"] },
      { name: "Oreo Levain Cookie", ingredients: ["Oreo", "Milk chocolate", "Butter"] },
      { name: "Prezel Meringue Cookie", ingredients: ["Pretzel", "Egg white", "Sugar"] },
      { name: "Red Velvet Levain Cookie", ingredients: ["Creamcheese", "Cacao powder", "Butter"] },
      { name: "Sable Au Coconut", ingredients: ["Coconut", "Sugar", "White egg"] },
      { name: "Strawberry Crunch", ingredients: ["Strawberry", "White chocolat"] }
    ]
  },
  {
    name: "DESSERT",
    slug: "dessert",
    items: [
      { name: "Basque Cheesecake (Piece)", ingredients: ["Fresh cream", "Creamcheese", "Vanilla"] },
      { name: "Black&Pink Brownie", ingredients: ["White chocolate", "Strawberry", "Dark chocolate"] },
      { name: "Blueberry Yogurt Cake (Piece)", ingredients: ["Blueberry", "Fresh cream", "Yogurt"] },
      { name: "Carrot Cake (Piece)", ingredients: ["Carrot", "Creamcheese", "Cinnamon", "Walnut"] },
      { name: "Chocolat Castalla", ingredients: ["Honey", "Fresh cream", "Egg"] },
      { name: "Cream Cheese Roll (Piece)", ingredients: ["Creamcheese", "Fresh cream", "Vanilla bean"] },
      { name: "Cream Cheese Roll", ingredients: ["Creamcheese", "Fresh cream", "Vanilla bean"] },
      { name: "Dark Chocolate Roll (Piece)", ingredients: ["Dark chocolate", "Fresh cream", "Cacao powder"] },
      { name: "Dolce Latte Roll (Piece)", ingredients: ["Condensed milk", "Coffee", "Mousseline cream"] },
      { name: "Dolce Latte Roll", ingredients: ["Condensed milk", "Coffee", "Mousseline cream"] },
      { name: "Fig Pound Cake", ingredients: ["Fig", "Butter", "Egg"] },
      { name: "Honey Bee Choux", ingredients: ["Butter", "Milk", "Egg"] },
      { name: "Honey Castella", ingredients: ["Honey", "Butter", "Egg"] },
      { name: "Mon Cher Tonton brownie", ingredients: ["Milk", "Cacao powder", "dark chocolate"] },
      { name: "Passion Mango Tart", ingredients: ["Mango", "Creamcheese", "Passion"] },
      { name: "Prune Pound Cake", ingredients: ["Prune", "Butter", "Egg"] },
      { name: "Red Velvet Cake (Piece)", ingredients: ["Vanilla bean", "Milk", "Mascapone"] },
      { name: "Strawberry Marble castella", ingredients: ["Cream", "Strawberry", "Cacao powder", "Egg"] },
      { name: "Strawberry Roll", ingredients: ["Cream", "Strawberry", "Cacao powder", "Egg"] },
      { name: "Strawberry Roll", ingredients: ["Vanilla bean", "Strawberry", "fresh cream"] },
      { name: "Walnut Financier Cake", ingredients: ["Walnut", "Almond powder", "Butter"] },
      { name: "White Castalla", ingredients: ["Honey", "Fresh cream", "Egg"] }
    ]
  },
  {
    name: "MACAROON",
    slug: "macaroon",
    items: [
      { name: "Big Macaroon Cheese Pretzel", ingredients: ["Smoke cheese", "Pretzel", "Fresh cream"] },
      { name: "Big Macaroon Cheese", ingredients: ["Cheese", "Almond", "Cream cheese"] },
      { name: "Big Macaroon Chocolat", ingredients: ["Cacao nibs", "Dark chocolat", "Almond"] },
      { name: "Big Macaroon Coconut", ingredients: ["Coconut", "Coconut milk", "Almond"] },
      { name: "Big Macaroon Coffee", ingredients: ["Coffee", "Dark chocolat", "Milk"] },
      { name: "Big Macaroon Lemon", ingredients: ["Lemon", "White chocolat", "Fresh cream"] },
      { name: "Big Macaroon Matcha", ingredients: ["Matcha", "Dark chocolat", "Almond"] },
      { name: "Big Macaroon Oreo", ingredients: ["Oreo", "White chocolat", "Almond"] },
      { name: "Big Macaroon Raspberry Chocolate", ingredients: ["Raspberry", "Chocolat", "Almond"] },
      { name: "Big Macaroon Strawberry", ingredients: ["Strawberry", "Butter", "Almond"] },
      { name: "Big Macaroon Vanila", ingredients: ["Vanilla bean", "Caramel", "Almond"] }
    ]
  }
];

// Enrich items with crawled images by exact name match
try {
  const imageByName = new Map<string, string>();
  for (const it of bfImages.items) {
    if (!imageByName.has(it.name)) {
      imageByName.set(it.name, it.image);
    }
  }
  for (const category of breadFactoryMenuCategories) {
    for (const item of category.items) {
      if (!item.image && imageByName.has(item.name)) {
        item.image = imageByName.get(item.name);
      }
    }
  }
} catch {
  // ignore if mapping file missing
}

// Assign reasonable prices if not provided
function assignReasonablePrice(name: string, categorySlug: string): number {
  const n = name.toLowerCase();
  switch (categorySlug) {
    case "bread": {
      if (/(baguette|plain bagel|plain scone)/.test(n)) return 3.0;
      if (/(toast|roll|soft roll|ciabatta|campagne|tangzhong)/.test(n)) return 3.5;
      if (/(donut|croissant|croffle|pretzel|muffin|soboro|churros|scone)/.test(n)) return 4.0;
      if (/pizza/.test(n)) return 5.5;
      if (/(croquette|bagel roll|jalapeno)/.test(n)) return 4.5;
      if (/egg tart/.test(n)) return 3.5;
      if (/kouign|palmier/.test(n)) return 4.0;
      return 4.0;
    }
    case "brunch": {
      if (/sandwich/.test(n)) return 7.5;
      if (/pasta/.test(n)) return 8.5;
      if (/salad/.test(n)) return 7.0;
      if (/danish/.test(n)) return 4.5;
      return 7.0;
    }
    case "cake": {
      return 16.0;
    }
    case "cookies": {
      if (/levain/.test(n)) return 3.5;
      if (/sable/.test(n)) return 3.0;
      if (/meringue/.test(n)) return 2.0;
      if (/cookie/.test(n)) return 2.5;
      return 3.0;
    }
    case "dessert": {
      if (/cheesecake/.test(n)) return 4.5;
      if (/roll/.test(n)) return 3.5;
      if (/brownie/.test(n)) return 3.5;
      if (/choux|castella/.test(n)) return 3.5;
      if (/tart/.test(n)) return 4.0;
      if (/pound cake/.test(n)) return 4.0;
      return 4.0;
    }
    case "macaroon": {
      return 3.5;
    }
    default:
      return 4.0;
  }
}

for (const category of breadFactoryMenuCategories) {
  for (const item of category.items) {
    if (typeof item.price !== "number") {
      item.price = assignReasonablePrice(item.name, category.slug);
    }
  }
}


