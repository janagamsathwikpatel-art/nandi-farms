export interface ShopCategoryItem {
  name: string;
  href: string;
  image: string;
}

export interface ShopCategoriesData {
  title: string;
  subtitle: string;
  seeAll: {
    label: string;
    href: string;
  };
  categories: ShopCategoryItem[];
}

export const shopCategories: ShopCategoriesData = {
  title: "Shop by Category",
  subtitle: "PURE GOODNESS FOR A HEALTHIER TOMORROW",
  seeAll: {
    label: "See All",
    href: "/shop"
  },
  categories: [
    { name: "Fresh Vegetables", href: "/vegetables", image: "/images/shop_categories/fresh-vegetables.png" },
    { name: "Fruits", href: "/fruits", image: "/images/shop_categories/fruits.png" },
    { name: "Dairy", href: "/dairy", image: "/images/shop_categories/dairy.png" },
    { name: "Meat & Fish", href: "/meat-fish", image: "/images/shop_categories/meat-fish.png" },
    { name: "Sweets", href: "/sweets", image: "/images/shop_categories/sweets.png" },
    { name: "Pooja Needs", href: "/pooja-needs", image: "/images/shop_categories/pooja-needs.png" },
    { name: "Karam Podulu", href: "/karam-podulu", image: "/images/shop_categories/karam-podulu.png" },
    { name: "Ravva", href: "/ravva", image: "/images/shop_categories/ravva.png" },
    { name: "Rice", href: "/rice", image: "/images/shop_categories/rice.png" },
    { name: "Eggs", href: "/eggs", image: "/images/shop_categories/eggs.png" },
    { name: "Roots Vegetables", href: "/root-vegetables", image: "/images/shop_categories/roots-vegetables.png" },
    { name: "Pickles", href: "/pickles", image: "/images/shop_categories/pickles.png" },
    { name: "Personal Care", href: "/personal-care", image: "/images/shop_categories/personal-care.png" },
    { name: "Tea & Coffee Powder", href: "/tea-coffee", image: "/images/shop_categories/tea-coffee.png" }
  ]
};
