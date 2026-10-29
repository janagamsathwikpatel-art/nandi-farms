"use client";

import React, { useState, useRef } from "react";
import {
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";

export interface BlinkitProduct {
  id: string;
  title: string;
  subCategory: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
  optionsCount?: number;
}

export interface SubCategoryTab {
  id: string;
  name: string;
  image: string;
}

export interface PrimaryCategory {
  id: string;
  name: string;
  bannerTitle: string;
  bannerSubtitle: string;
  image: string;
  subCategories: SubCategoryTab[];
  seoTitle: string;
  seoDescription: string;
}

export const PRIMARY_CATEGORIES: PrimaryCategory[] = [
  {
    id: "milk",
    name: "Milk",
    bannerTitle: "Dairy, Bread & Eggs",
    bannerSubtitle: "Pure, fresh farm harvest and chilled dairy essentials",
    image: "/images/category_cards/milk_hd.jpg",
    seoTitle: "Milk Online",
    seoDescription:
      "The richness of milk as nature's perfect food is demonstrated by its high content of essential nutrients, versatility in cooking, and its indispensable role in sustaining life. Milk has been more than a simple staple; it is a source of vital nourishment across all generations.",
    subCategories: [
      { id: "milk", name: "Milk", image: "/images/categories/desi-milk.png" },
      { id: "bread", name: "Bread & Pav", image: "/images/categories/bread.png" },
      { id: "eggs", name: "Eggs", image: "/images/categories/eggs.png" },
      { id: "curd", name: "Curd & Yogurt", image: "/images/products/paneer-amul.jpg" },
      { id: "cheese", name: "Cheese & Butter", image: "/images/products/cheese-slices.jpg" },
      { id: "batter", name: "Batter", image: "/images/categories/flour.png" },
      { id: "paneer", name: "Paneer & Tofu", image: "/images/products/paneer-milky-mist.jpg" },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    bannerTitle: "Fresh Farm Vegetables",
    bannerSubtitle: "Naturally grown vegetables harvested daily at sunrise",
    image: "/images/category_cards/vegetables_hd.jpg",
    seoTitle: "Fresh Vegetables Online",
    seoDescription:
      "Grown in mineral-rich black soils using chemical-free practices. Hand-plucked at dawn and delivered crisp to your home within hours.",
    subCategories: [
      { id: "all-veg", name: "All Veggies", image: "/images/quick_categories/c1.webp" },
      { id: "roots", name: "Roots & Tubers", image: "/images/quick_categories/c2.webp" },
      { id: "tomatoes", name: "Tomatoes", image: "/images/quick_categories/c3.webp" },
      { id: "peppers", name: "Capsicum & Peas", image: "/images/quick_categories/c4.webp" },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    bannerTitle: "Orchard Fresh Fruits",
    bannerSubtitle: "Tree-ripened nature's sweetest harvest",
    image: "/images/category_cards/fruits_hd.jpg",
    seoTitle: "Fresh Fruits Online",
    seoDescription:
      "Naturally ripened without artificial carbides or wax coating. Bursting with vitamins, enzymes, and pure natural sweetness.",
    subCategories: [
      { id: "all-fruits", name: "All Fruits", image: "/images/quick_categories/c5.webp" },
      { id: "apples", name: "Apples & Pears", image: "/images/quick_categories/c6.webp" },
      { id: "bananas", name: "Bananas", image: "/images/quick_categories/c7.webp" },
      { id: "pomegranates", name: "Pomegranates", image: "/images/quick_categories/c8.webp" },
    ],
  },
  {
    id: "grains_pulses",
    name: "Grains & Pulses",
    bannerTitle: "Wholesome Grains & Pulses",
    bannerSubtitle: "Unpolished native dals and aromatic aged rice",
    image: "/images/category_cards/grains_pulses_hd.jpg",
    seoTitle: "Organic Grains & Pulses Online",
    seoDescription:
      "Traditional native seeds, 100% unpolished to retain natural dietary fiber, plant protein, and essential minerals.",
    subCategories: [
      { id: "dals", name: "Dals & Pulses", image: "/images/categories/dal.png" },
      { id: "rice", name: "Aged Basmati", image: "/images/categories/rice.png" },
      { id: "millets", name: "Native Millets", image: "/images/categories/millet.png" },
      { id: "flour", name: "Atta & Flours", image: "/images/categories/flour.png" },
    ],
  },
  {
    id: "oils_ghee",
    name: "Oils & Ghee",
    bannerTitle: "Pure Vedic Oils & Ghee",
    bannerSubtitle: "Cultured A2 bilona ghee and wood-pressed oils",
    image: "/images/category_cards/oils_ghee_hd.jpg",
    seoTitle: "Pure Ghee & Cold Pressed Oils Online",
    seoDescription:
      "Hand-churned bilona ghee made from cultured curd of indigenous Gir cows. Cold-pressed virgin cooking oils extracted at room temperature.",
    subCategories: [
      { id: "ghee", name: "A2 Desi Ghee", image: "/images/categories/ghee.png" },
      { id: "mustard-oil", name: "Mustard Oil", image: "/images/categories/oil.png" },
      { id: "sesame-oil", name: "Sesame Oil", image: "/images/products/oil-sesame.jpg" },
      { id: "groundnut-oil", name: "Groundnut Oil", image: "/images/products/oil-groundnut.jpg" },
    ],
  },
  {
    id: "spices",
    name: "Spices",
    bannerTitle: "Stone Ground Spices",
    bannerSubtitle: "Aromatic indigenous spices rooted in tradition",
    image: "/images/category_cards/spices_hd.jpg",
    seoTitle: "Authentic Indian Spices Online",
    seoDescription:
      "Sun-dried hand-sorted spices rich in essential oils. Ground slowly on stone grinders to preserve natural fragrance and curcumin.",
    subCategories: [
      { id: "all-spices", name: "All Spices", image: "/images/categories/spices.png" },
      { id: "turmeric", name: "Turmeric & Chilli", image: "/images/products/spices-haldi.jpg" },
      { id: "whole-spices", name: "Whole Spices", image: "/images/products/spices-coriander.jpg" },
      { id: "masalas", name: "Garam Masala", image: "/images/products/spices-garam-masala.jpg" },
    ],
  },
  {
    id: "dairy_products",
    name: "Dairy Products",
    bannerTitle: "Artisanal Fresh Dairy",
    bannerSubtitle: "Fresh malai paneer, set dahi and cultured butter",
    image: "/images/category_cards/dairy_products_hd.jpg",
    seoTitle: "Artisanal Dairy Online",
    seoDescription:
      "Slow-crafted daily from pure unadulterated whole milk. No synthetic thickeners, preservatives, or artificial coloring.",
    subCategories: [
      { id: "paneer-sub", name: "Malai Paneer", image: "/images/products/paneer-amul.jpg" },
      { id: "curd-sub", name: "Set Dahi", image: "/images/products/paneer-milky-mist.jpg" },
      { id: "cheese-sub", name: "Cheese Slices", image: "/images/products/cheese-slices.jpg" },
    ],
  },
  {
    id: "leafy_greens",
    name: "Leafy Greens",
    bannerTitle: "Fresh Leafy Greens",
    bannerSubtitle: "Dewy, crisp greens plucked fresh at dawn",
    image: "/images/category_cards/leafy_greens_hd.jpg",
    seoTitle: "Farm Greens Online",
    seoDescription:
      "Harvested fresh with roots intact, washed in clean farm water and delivered crisp for vibrant everyday nutrition.",
    subCategories: [
      { id: "palak-sub", name: "Tender Palak", image: "/images/quick_categories/c9.webp" },
      { id: "methi-sub", name: "Fresh Methi", image: "/images/quick_categories/c10.webp" },
      { id: "herbs-sub", name: "Mint & Coriander", image: "/images/quick_categories/c11.webp" },
    ],
  },
  {
    id: "healthy_snacks",
    name: "Healthy Snacks",
    bannerTitle: "Nutritious Farm Snacks",
    bannerSubtitle: "Roasted superfood seeds and California nuts",
    image: "/images/category_cards/healthy_snacks_hd.jpg",
    seoTitle: "Healthy Snacks Online",
    seoDescription:
      "Crunchy slow-roasted nuts, Himalayan pink salt makhana, and raw omega-3 superfood seeds for energetic living.",
    subCategories: [
      { id: "nuts-sub", name: "Almonds & Walnuts", image: "/images/products/dryfruit-almonds.jpg" },
      { id: "seeds-sub", name: "Chia & Flax Seeds", image: "/images/products/seeds-flax.jpg" },
      { id: "crunch-sub", name: "Roasted Makhana", image: "/images/products/dryfruit-walnuts.jpg" },
    ],
  },
];

export const BLINKIT_CATALOG: Record<string, BlinkitProduct[]> = {
  // Milk Sub-Category matching user screenshot
  milk: [
    {
      id: "heritage-daily-health",
      title: "Heritage Daily Health Toned Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 33,
      image: "/images/products/milk-amul-toned.jpg",
    },
    {
      id: "amul-taaza-500",
      title: "Amul Taaza Toned Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 30,
      image: "/images/products/milk-amul-gold.jpg",
      optionsCount: 2,
    },
    {
      id: "amul-buffalo-a2",
      title: "Amul Buffalo A2 Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 42,
      image: "/images/products/milk-desi-a2.jpg",
    },
    {
      id: "heritage-golden-cow",
      title: "Heritage Golden Cow Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 33,
      image: "/images/products/milk-amul-gold.jpg",
    },
    {
      id: "arokya-toned",
      title: "Arokya Toned Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 32,
      image: "/images/products/milk-desi-a2.jpg",
    },
    {
      id: "godrej-jersey",
      title: "Godrej Jersey Toned Milk - 14g Protein",
      subCategory: "milk",
      weight: "500 ml",
      price: 32,
      originalPrice: 33,
      image: "/images/products/milk-amul-toned.jpg",
    },
    {
      id: "heritage-long-life",
      title: "Heritage Special Long Life Milk (90 Days Shelf Life)",
      subCategory: "milk",
      weight: "450 ml",
      price: 33,
      originalPrice: 34,
      image: "/images/products/milk-amul-gold.jpg",
    },
    {
      id: "amul-taaza-homo-1l",
      title: "Amul Taaza Homogenised Toned Milk",
      subCategory: "milk",
      weight: "1 ltr",
      price: 77,
      image: "/images/products/milk-amul-gold.jpg",
    },
    {
      id: "sids-farm-toned",
      title: "Sids Farm Toned Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 38,
      image: "/images/products/milk-desi-a2.jpg",
      optionsCount: 2,
    },
    {
      id: "sids-farm-pure-cow",
      title: "Sids Farm Pure Cow Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 46,
      image: "/images/products/milk-desi-a2.jpg",
      optionsCount: 2,
    },
    {
      id: "country-delight-buffalo",
      title: "Country Delight Buffalo Fresh Milk",
      subCategory: "milk",
      weight: "450 ml",
      price: 59,
      originalPrice: 62,
      image: "/images/products/milk-amul-gold.jpg",
    },
    {
      id: "arokya-full-cream",
      title: "Arokya Full Cream Milk",
      subCategory: "milk",
      weight: "500 ml",
      price: 45,
      image: "/images/products/milk-desi-a2.jpg",
    },
  ],

  // Bread & Pav
  bread: [
    {
      id: "bread-multigrain",
      title: "The Health Factory Zero Maida Multigrain Bread",
      subCategory: "bread",
      weight: "400 g",
      price: 55,
      originalPrice: 60,
      image: "/images/products/bread-multigrain.jpg",
    },
    {
      id: "bread-wheat",
      title: "Modern 100% Whole Wheat Brown Bread",
      subCategory: "bread",
      weight: "400 g",
      price: 45,
      image: "/images/products/bread-wheat.jpg",
    },
    {
      id: "bread-white-pav",
      title: "Artisanal Soft Bakery Pav Buns",
      subCategory: "bread",
      weight: "6 pcs",
      price: 35,
      image: "/images/products/bread-white.jpg",
    },
  ],

  // Eggs
  eggs: [
    {
      id: "eggs-nutriplus",
      title: "Eggoz Farm Fresh Brown Protein Eggs",
      subCategory: "eggs",
      weight: "6 pcs",
      price: 75,
      originalPrice: 85,
      image: "/images/products/eggs-nutriplus.jpg",
    },
    {
      id: "eggs-white",
      title: "Farmstead Clean White Table Eggs",
      subCategory: "eggs",
      weight: "6 pcs",
      price: 48,
      image: "/images/products/eggs-white.jpg",
    },
    {
      id: "eggs-brown",
      title: "Country Free Range Desi Eggs",
      subCategory: "eggs",
      weight: "6 pcs",
      price: 90,
      originalPrice: 105,
      image: "/images/products/eggs-brown.jpg",
    },
  ],

  // Curd & Yogurt
  curd: [
    {
      id: "curd-farm-dahi",
      title: "Heritage Daily Pure Fresh Curd / Dahi",
      subCategory: "curd",
      weight: "400 g",
      price: 45,
      image: "/images/products/paneer-amul.jpg",
    },
    {
      id: "curd-milky-mist",
      title: "Milky Mist Natural Set Dahi",
      subCategory: "curd",
      weight: "1 kg",
      price: 90,
      originalPrice: 98,
      image: "/images/products/paneer-milky-mist.jpg",
    },
  ],

  // Cheese & Butter
  cheese: [
    {
      id: "cheese-slices-brand",
      title: "Amul Processed Natural Cheese Slices",
      subCategory: "cheese",
      weight: "100 g (5 slices)",
      price: 85,
      image: "/images/products/cheese-slices.jpg",
    },
    {
      id: "butter-amul",
      title: "Amul Pasteurised Butter",
      subCategory: "cheese",
      weight: "100 g",
      price: 58,
      image: "/images/products/ghee-amul.jpg",
    },
  ],

  // Batter
  batter: [
    {
      id: "batter-idli-dosa",
      title: "iD Fresh Natural Idli & Dosa Batter",
      subCategory: "batter",
      weight: "1 kg",
      price: 85,
      originalPrice: 95,
      image: "/images/products/atta-khapli.jpg",
    },
  ],

  // Paneer & Tofu
  paneer: [
    {
      id: "paneer-amul-fresh",
      title: "Amul Fresh Malai Paneer",
      subCategory: "paneer",
      weight: "200 g",
      price: 95,
      image: "/images/products/paneer-amul.jpg",
    },
    {
      id: "paneer-milky-cubes",
      title: "Milky Mist Fresh Diced Paneer",
      subCategory: "paneer",
      weight: "200 g",
      price: 110,
      originalPrice: 120,
      image: "/images/products/paneer-milky-mist.jpg",
    },
  ],

  // Vegetables
  "all-veg": [
    {
      id: "veg-tomato",
      title: "Country Farm Red Ripe Tomatoes",
      subCategory: "all-veg",
      weight: "1 kg",
      price: 38,
      originalPrice: 50,
      image: "/images/quick_categories/c1.webp",
    },
    {
      id: "veg-carrot",
      title: "Fresh Crunchy Orange Carrots",
      subCategory: "all-veg",
      weight: "500 g",
      price: 32,
      originalPrice: 45,
      image: "/images/quick_categories/c2.webp",
    },
    {
      id: "veg-potato",
      title: "Fresh Jyoti Thin-Skin Potatoes",
      subCategory: "all-veg",
      weight: "1 kg",
      price: 35,
      originalPrice: 45,
      image: "/images/quick_categories/c3.webp",
    },
    {
      id: "veg-capsicum",
      title: "Green Capsicum / Shimla Mirch",
      subCategory: "all-veg",
      weight: "500 g",
      price: 42,
      originalPrice: 55,
      image: "/images/quick_categories/c4.webp",
    },
  ],

  // Fruits
  "all-fruits": [
    {
      id: "fruit-apple",
      title: "Royal Delicious Kashmiri Apples",
      subCategory: "all-fruits",
      weight: "4 pcs (~600 g)",
      price: 165,
      originalPrice: 210,
      image: "/images/quick_categories/c5.webp",
    },
    {
      id: "fruit-papaya",
      title: "Farm Sweet Ripe Papaya",
      subCategory: "all-fruits",
      weight: "1 pc (~800 g)",
      price: 52,
      originalPrice: 65,
      image: "/images/quick_categories/c6.webp",
    },
    {
      id: "fruit-banana",
      title: "Organic Robusta Bananas",
      subCategory: "all-fruits",
      weight: "500 g (4-5 pcs)",
      price: 38,
      originalPrice: 48,
      image: "/images/quick_categories/c7.webp",
    },
    {
      id: "fruit-pomegranate",
      title: "Ruby Red Sweet Pomegranates",
      subCategory: "all-fruits",
      weight: "2 pcs (~500 g)",
      price: 125,
      originalPrice: 160,
      image: "/images/quick_categories/c8.webp",
    },
  ],

  // Grains & Pulses
  dals: [
    {
      id: "grain-toor",
      title: "Organic Unpolished Toor Dal",
      subCategory: "dals",
      weight: "1 kg",
      price: 185,
      originalPrice: 230,
      image: "/images/products/dal-toor.jpg",
    },
    {
      id: "grain-moong",
      title: "Organic Green Moong Dal (Split)",
      subCategory: "dals",
      weight: "1 kg",
      price: 160,
      originalPrice: 195,
      image: "/images/products/dal-moong.jpg",
    },
    {
      id: "grain-chana",
      title: "Traditional Unpolished Chana Dal",
      subCategory: "dals",
      weight: "1 kg",
      price: 130,
      originalPrice: 160,
      image: "/images/products/dal-chana.jpg",
    },
    {
      id: "grain-urad",
      title: "Organic Dhuli Urad Dal",
      subCategory: "dals",
      weight: "1 kg",
      price: 175,
      originalPrice: 210,
      image: "/images/products/dal-urad.jpg",
    },
  ],

  // Oils & Ghee
  ghee: [
    {
      id: "ghee-anveshan-bilona",
      title: "Anveshan A2 Gir Cow Vedic Bilona Ghee",
      subCategory: "ghee",
      weight: "500 ml",
      price: 950,
      originalPrice: 1150,
      image: "/images/products/ghee-anveshan.jpg",
    },
    {
      id: "ghee-gowardhan-pure",
      title: "Gowardhan 100% Pure Cow Ghee",
      subCategory: "ghee",
      weight: "1 L",
      price: 680,
      originalPrice: 740,
      image: "/images/products/ghee-gowardhan.jpg",
    },
    {
      id: "ghee-amul-tin",
      title: "Amul Pure Ghee Tin",
      subCategory: "ghee",
      weight: "1 L",
      price: 640,
      image: "/images/products/ghee-amul.jpg",
    },
  ],

  // Spices
  "all-spices": [
    {
      id: "spices-haldi-pack",
      title: "Tata Sampann Organic Turmeric Powder",
      subCategory: "all-spices",
      weight: "200 g",
      price: 85,
      originalPrice: 110,
      image: "/images/products/spices-haldi.jpg",
    },
    {
      id: "spices-chilli-pack",
      title: "Catch Kashmiri Mirch Powder",
      subCategory: "all-spices",
      weight: "200 g",
      price: 110,
      originalPrice: 140,
      image: "/images/products/spices-chilli.jpg",
    },
    {
      id: "spices-coriander-pack",
      title: "Everest Coriander Dhaniya Powder",
      subCategory: "all-spices",
      weight: "200 g",
      price: 80,
      originalPrice: 100,
      image: "/images/products/spices-coriander.jpg",
    },
    {
      id: "spices-garam-pack",
      title: "MDH Royal Garam Masala",
      subCategory: "all-spices",
      weight: "100 g",
      price: 95,
      originalPrice: 120,
      image: "/images/products/spices-garam-masala.jpg",
    },
  ],
};

export default function HarvestCategoryGrid() {
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState<string>("milk");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("milk");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const catalogViewRef = useRef<HTMLDivElement>(null);

  const currentPrimary =
    PRIMARY_CATEGORIES.find((c) => c.id === selectedPrimaryCategory) || PRIMARY_CATEGORIES[0];

  const handleCategoryBoxClick = (catId: string) => {
    setSelectedPrimaryCategory(catId);
    const prim = PRIMARY_CATEGORIES.find((c) => c.id === catId);
    if (prim && prim.subCategories.length > 0) {
      setSelectedSubCategory(prim.subCategories[0].id);
    }
    if (catalogViewRef.current) {
      catalogViewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubCategoryClick = (subId: string) => {
    setSelectedSubCategory(subId);
  };

  const updateCart = (productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Products to show
  const currentProducts =
    BLINKIT_CATALOG[selectedSubCategory] ||
    BLINKIT_CATALOG[selectedPrimaryCategory] ||
    BLINKIT_CATALOG["milk"] ||
    [];

  return (
    <section id="categories" className="relative w-full bg-[#fdfbf7] overflow-hidden">
      {/* 1. Panoramic Artistic Banner: "Shop By Category" */}
      <div className="w-full bg-[#fdfbf7] pt-6 sm:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <img
            src="/images/shop-by-category-banner.png"
            alt="Shop By Category - Pure Goodness for a Healthier Tomorrow"
            className="w-full max-w-5xl h-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>

      {/* 2. 100% BORDERLESS 3x3 CATEGORY GRID (Zero box lines, zero divider borders, seamless full width) */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full border-none gap-0 p-0 m-0">
          {PRIMARY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryBoxClick(cat.id)}
              className="group relative w-full overflow-hidden text-left focus:outline-none transition-all duration-300 border-none p-0 m-0 cursor-pointer block bg-[#f4eee2]"
              aria-label={`Open ${cat.name} Blinkit Catalog`}
            >
              {/* Ultra HD Card Artwork */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                loading="eager"
              />

              {/* Gentle luminous hover vignette */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. AUTHENTIC BLINKIT.COM CATALOG VIEW (Directly Down of that section) */}
      <div
        id="blinkit-catalog"
        ref={catalogViewRef}
        className="w-full bg-white border-t border-gray-200 mt-6 transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Top Category Title Bar */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-20">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
                {currentPrimary.bannerTitle}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{currentPrimary.bannerSubtitle}</p>
            </div>

            {selectedPrimaryCategory === "milk" && (
              <button
                type="button"
                onClick={() => setIsMilkModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Daily Milk Subscription →</span>
              </button>
            )}
          </div>

          {/* Blinkit 2-Column Layout: Left Sidebar + Right Products Grid */}
          <div className="flex w-full min-h-[600px]">
            {/* Left Sidebar Rail */}
            <div className="w-24 sm:w-28 md:w-32 flex-shrink-0 bg-[#f9f9f9] border-r border-gray-200 flex flex-col py-2">
              {currentPrimary.subCategories.map((sub) => {
                const isActive = selectedSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSubCategoryClick(sub.id)}
                    className={`w-full py-3.5 px-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-b border-gray-100 ${
                      isActive
                        ? "bg-white border-l-4 border-l-[#0c831f] shadow-xs"
                        : "bg-[#f9f9f9] hover:bg-gray-100/80 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center mb-1.5 shadow-2xs border border-gray-100">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span
                      className={`text-[11px] leading-tight px-1 ${
                        isActive ? "font-bold text-gray-900" : "font-medium text-gray-600"
                      }`}
                    >
                      {sub.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Main Product Catalog Grid */}
            <div className="flex-1 p-4 sm:p-6 bg-white overflow-y-auto">
              {/* Product Cards Grid matching Blinkit screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {currentProducts.map((prod) => {
                  const qty = cart[prod.id] || 0;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-xl border border-gray-200/90 p-3 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                    >
                      {/* Product Top */}
                      <div>
                        {/* Packshot Image */}
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white mb-2 flex items-center justify-center">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-full h-full object-contain p-1"
                            loading="lazy"
                          />
                        </div>

                        {/* ETA Pill: ⏱ 8 MINS */}
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600 mb-1">
                          <Clock className="w-2.5 h-2.5 text-gray-500" />
                          <span>8 MINS</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[32px]">
                          {prod.title}
                        </h4>

                        {/* Weight */}
                        <p className="text-[11px] text-gray-500 mt-1 font-medium">{prod.weight}</p>
                      </div>

                      {/* Price & Green ADD Button */}
                      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-gray-900">₹{prod.price}</span>
                            {prod.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ₹{prod.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => updateCart(prod.id, 1)}
                              className="px-3.5 py-1 border border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f] hover:text-white rounded-md text-[11px] font-bold tracking-wide uppercase transition-colors shadow-2xs cursor-pointer"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="flex items-center bg-[#0c831f] text-white rounded-md px-1.5 py-0.5 gap-1.5 shadow-xs">
                              <button
                                type="button"
                                onClick={() => updateCart(prod.id, -1)}
                                className="w-4 h-4 flex items-center justify-center font-bold hover:opacity-80 cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="text-[11px] font-bold w-3 text-center">{qty}</span>
                              <button
                                type="button"
                                onClick={() => updateCart(prod.id, 1)}
                                className="w-4 h-4 flex items-center justify-center font-bold hover:opacity-80 cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          )}

                          {prod.optionsCount && qty === 0 && (
                            <span className="text-[9px] text-gray-400 font-normal mt-0.5">
                              {prod.optionsCount} options
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Editorial Content Block (matching Blinkit screenshot) */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 font-sans mb-2">
                  {currentPrimary.seoTitle}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-5xl">
                  {currentPrimary.seoDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Floating Farm Basket Summary Bar (when items are added) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-[#16301d] text-white rounded-full px-5 py-3.5 shadow-2xl border border-emerald-500/30 flex items-center justify-between backdrop-blur-md animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-200">
                {totalCartCount} {totalCartCount === 1 ? "item" : "items"} in Farm Basket
              </p>
              <p className="text-xs text-white/80">⏱ Delivery in 8-10 mins</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Proceeding to checkout with ${totalCartCount} fresh farm items!`)}
            className="px-4 py-2 bg-[#d89b4f] hover:bg-[#c58b4a] active:scale-95 text-[#162e1e] font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>View Basket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Milk Subscription Modal */}
      <MilkSubscriptionModal
        isOpen={isMilkModalOpen}
        onClose={() => setIsMilkModalOpen(false)}
      />
    </section>
  );
}
