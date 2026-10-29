"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";

export interface HarvestItem {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  weight: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  eta: string;
  image: string;
  tag?: string;
  description: string;
}

export interface CategoryBox {
  id: string;
  title: string;
  tagline: string;
  image: string;
}

export const CATEGORY_BOXES: CategoryBox[] = [
  {
    id: "milk",
    title: "Milk",
    tagline: "Pure. Fresh. Everyday. →",
    image: "/images/category_cards/milk_hd.jpg",
  },
  {
    id: "vegetables",
    title: "Vegetables",
    tagline: "Seasonal goodness from our farms. →",
    image: "/images/category_cards/vegetables_hd.jpg",
  },
  {
    id: "fruits",
    title: "Fruits",
    tagline: "Nature's sweetest harvest. →",
    image: "/images/category_cards/fruits_hd.jpg",
  },
  {
    id: "grains_pulses",
    title: "Grains & Pulses",
    tagline: "Wholesome nutrition for every meal. →",
    image: "/images/category_cards/grains_pulses_hd.jpg",
  },
  {
    id: "oils_ghee",
    title: "Oils & Ghee",
    tagline: "Pure oils for a healthier you. →",
    image: "/images/category_cards/oils_ghee_hd.jpg",
  },
  {
    id: "spices",
    title: "Spices",
    tagline: "Natural flavours, rooted in tradition. →",
    image: "/images/category_cards/spices_hd.jpg",
  },
  {
    id: "dairy_products",
    title: "Dairy Products",
    tagline: "Goodness in every bite. →",
    image: "/images/category_cards/dairy_products_hd.jpg",
  },
  {
    id: "leafy_greens",
    title: "Leafy Greens",
    tagline: "Fresh leaves, brighter days. →",
    image: "/images/category_cards/leafy_greens_hd.jpg",
  },
  {
    id: "healthy_snacks",
    title: "Healthy Snacks",
    tagline: "Nutritious choices for active living. →",
    image: "/images/category_cards/healthy_snacks_hd.jpg",
  },
];

export const CATEGORY_HARVEST_ITEMS: Record<string, HarvestItem[]> = {
  milk: [
    {
      id: "milk-desi-a2",
      title: "Desi Gir Cow A2 Raw Milk (Chilled)",
      category: "milk",
      categoryTitle: "Milk",
      weight: "1 L",
      price: 85,
      originalPrice: 95,
      discount: "10% OFF",
      rating: 4.9,
      reviewsCount: 1420,
      eta: "10 MINS",
      image: "/images/products/milk-desi-a2.jpg",
      tag: "Pure A2 Cow",
      description: "Direct morning harvest from indigenous Gir cows with natural beta-casein.",
    },
    {
      id: "milk-amul-gold",
      title: "Farmstead Buffalo Fresh Whole Milk",
      category: "milk",
      categoryTitle: "Milk",
      weight: "1 L",
      price: 78,
      originalPrice: 85,
      discount: "8% OFF",
      rating: 4.8,
      reviewsCount: 960,
      eta: "10 MINS",
      image: "/images/products/milk-amul-gold.jpg",
      tag: "Rich & Creamy",
      description: "Creamy fresh buffalo milk, rich in calcium and natural fats for morning tea and coffee.",
    },
    {
      id: "milk-amul-toned",
      title: "Nandi Farms A2 Toned Fresh Milk",
      category: "milk",
      categoryTitle: "Milk",
      weight: "500 ml",
      price: 45,
      originalPrice: 50,
      discount: "10% OFF",
      rating: 4.9,
      reviewsCount: 820,
      eta: "10 MINS",
      image: "/images/products/milk-amul-toned.jpg",
      tag: "Daily Essential",
      description: "Light, digestible single-source farm fresh milk pasteurized with zero preservatives.",
    },
    {
      id: "milk-farm-raw",
      title: "Farm Fresh Glass Bottle A2 Farm Milk",
      category: "milk",
      categoryTitle: "Milk",
      weight: "1 L",
      price: 92,
      originalPrice: 105,
      discount: "12% OFF",
      rating: 5.0,
      reviewsCount: 610,
      eta: "10 MINS",
      image: "/images/products/milk-desi-a2.jpg",
      tag: "Eco Glass Bottle",
      description: "Delivered cold within 4 hours of milking in sanitized returnable glass bottles.",
    },
  ],
  vegetables: [
    {
      id: "veg-tomato",
      title: "Country Vine Ripe Tomatoes",
      category: "vegetables",
      categoryTitle: "Vegetables",
      weight: "1 kg",
      price: 38,
      originalPrice: 50,
      discount: "24% OFF",
      rating: 4.8,
      reviewsCount: 1890,
      eta: "10 MINS",
      image: "/images/quick_categories/c1.webp",
      tag: "Farm Picked",
      description: "Naturally ripened juicy red country tomatoes with rich tangy flavour.",
    },
    {
      id: "veg-carrot",
      title: "Organic Orange Farm Carrots",
      category: "vegetables",
      categoryTitle: "Vegetables",
      weight: "500 g",
      price: 32,
      originalPrice: 45,
      discount: "28% OFF",
      rating: 4.8,
      reviewsCount: 780,
      eta: "10 MINS",
      image: "/images/quick_categories/c2.webp",
      tag: "Sweet & Crunchy",
      description: "Crisp sweet carrots grown without chemical sprays in black soil.",
    },
    {
      id: "veg-potato",
      title: "Farm Jyoti Fresh Potatoes",
      category: "vegetables",
      categoryTitle: "Vegetables",
      weight: "1 kg",
      price: 35,
      originalPrice: 45,
      discount: "22% OFF",
      rating: 4.7,
      reviewsCount: 2150,
      eta: "10 MINS",
      image: "/images/quick_categories/c3.webp",
      tag: "Staple",
      description: "Firm fresh harvesting potatoes with thin skin, ideal for curries and baking.",
    },
    {
      id: "veg-capsicum",
      title: "Green Bell Peppers / Capsicum",
      category: "vegetables",
      categoryTitle: "Vegetables",
      weight: "500 g",
      price: 42,
      originalPrice: 55,
      discount: "23% OFF",
      rating: 4.8,
      reviewsCount: 640,
      eta: "10 MINS",
      image: "/images/quick_categories/c4.webp",
      tag: "Fresh Harvest",
      description: "Crisp, thick-walled green peppers harvested early morning from polyhouses.",
    },
  ],
  fruits: [
    {
      id: "fruit-apple",
      title: "Kashmiri Royal Delicious Apples",
      category: "fruits",
      categoryTitle: "Fruits",
      weight: "4 pcs (~600 g)",
      price: 165,
      originalPrice: 210,
      discount: "21% OFF",
      rating: 4.9,
      reviewsCount: 1120,
      eta: "10 MINS",
      image: "/images/quick_categories/c5.webp",
      tag: "Mountain Orchard",
      description: "Sweet, crunchy high-altitude Kashmiri apples with zero wax coating.",
    },
    {
      id: "fruit-papaya",
      title: "Farm Fresh Sweet Papaya",
      category: "fruits",
      categoryTitle: "Fruits",
      weight: "1 pc (~800 g)",
      price: 52,
      originalPrice: 65,
      discount: "20% OFF",
      rating: 4.8,
      reviewsCount: 840,
      eta: "10 MINS",
      image: "/images/quick_categories/c6.webp",
      tag: "Digestive Aid",
      description: "Sweet golden papaya harvested ripe straight from our plantation.",
    },
    {
      id: "fruit-banana",
      title: "Organic Robusta Farm Bananas",
      category: "fruits",
      categoryTitle: "Fruits",
      weight: "500 g (4-5 pcs)",
      price: 38,
      originalPrice: 48,
      discount: "20% OFF",
      rating: 4.7,
      reviewsCount: 1650,
      eta: "10 MINS",
      image: "/images/quick_categories/c7.webp",
      tag: "Daily Potassium",
      description: "Naturally ripened without carbide; rich and creamy texture.",
    },
    {
      id: "fruit-pomegranate",
      title: "Ruby Red Farm Pomegranates",
      category: "fruits",
      categoryTitle: "Fruits",
      weight: "2 pcs (~500 g)",
      price: 125,
      originalPrice: 160,
      discount: "21% OFF",
      rating: 4.9,
      reviewsCount: 570,
      eta: "10 MINS",
      image: "/images/quick_categories/c8.webp",
      tag: "Antioxidant Rich",
      description: "Juicy deep ruby pearls with soft seeds and high natural sweetness.",
    },
  ],
  grains_pulses: [
    {
      id: "grain-toor",
      title: "Organic Unpolished Toor Dal",
      category: "grains_pulses",
      categoryTitle: "Grains & Pulses",
      weight: "1 kg",
      price: 185,
      originalPrice: 230,
      discount: "19% OFF",
      rating: 4.9,
      reviewsCount: 2240,
      eta: "10 MINS",
      image: "/images/products/dal-toor.jpg",
      tag: "Unpolished",
      description: "Native seed toor dal, 100% unpolished to retain natural dietary fiber and protein.",
    },
    {
      id: "grain-moong",
      title: "Organic Green Moong Dal (Split)",
      category: "grains_pulses",
      categoryTitle: "Grains & Pulses",
      weight: "1 kg",
      price: 160,
      originalPrice: 195,
      discount: "17% OFF",
      rating: 4.9,
      reviewsCount: 1480,
      eta: "10 MINS",
      image: "/images/products/dal-moong.jpg",
      tag: "High Protein",
      description: "Nutritious split green moong dal, easy to digest and ideal for khichdi and soups.",
    },
    {
      id: "grain-basmati",
      title: "Aged Traditional Himalayan Basmati Rice",
      category: "grains_pulses",
      categoryTitle: "Grains & Pulses",
      weight: "1 kg",
      price: 145,
      originalPrice: 180,
      discount: "19% OFF",
      rating: 4.9,
      reviewsCount: 1950,
      eta: "10 MINS",
      image: "/images/products/rice-basmati.jpg",
      tag: "2-Yr Aged",
      description: "Naturally aged extra-long grain basmati with delicate natural aroma.",
    },
    {
      id: "grain-foxtail",
      title: "Organic Native Foxtail Millet (Kangni)",
      category: "grains_pulses",
      categoryTitle: "Grains & Pulses",
      weight: "1 kg",
      price: 120,
      originalPrice: 150,
      discount: "20% OFF",
      rating: 4.9,
      reviewsCount: 890,
      eta: "10 MINS",
      image: "/images/products/millet-foxtail.jpg",
      tag: "Gluten-Free",
      description: "Low-GI ancient grain packed with iron and calcium for sustainable stamina.",
    },
  ],
  oils_ghee: [
    {
      id: "oil-ghee-gir",
      title: "Pure A2 Bilona Gir Cow Cultured Ghee",
      category: "oils_ghee",
      categoryTitle: "Oils & Ghee",
      weight: "500 ml",
      price: 950,
      originalPrice: 1150,
      discount: "17% OFF",
      rating: 5.0,
      reviewsCount: 3120,
      eta: "10 MINS",
      image: "/images/products/ghee-anveshan.jpg",
      tag: "Vedic Bilona",
      description: "Traditional curd-churned golden bilona ghee with aromatic nutty grains.",
    },
    {
      id: "oil-mustard",
      title: "Cold Pressed Yellow Mustard Oil (Kachi Ghani)",
      category: "oils_ghee",
      categoryTitle: "Oils & Ghee",
      weight: "1 L",
      price: 240,
      originalPrice: 290,
      discount: "17% OFF",
      rating: 4.9,
      reviewsCount: 1640,
      eta: "10 MINS",
      image: "/images/products/oil-mustard-fortune.jpg",
      tag: "Cold Pressed",
      description: "Extracted at room temperature to preserve natural pungency and essential fatty acids.",
    },
    {
      id: "oil-sesame",
      title: "Wood Pressed Sesame Gingelly Oil",
      category: "oils_ghee",
      categoryTitle: "Oils & Ghee",
      weight: "500 ml",
      price: 210,
      originalPrice: 260,
      discount: "19% OFF",
      rating: 4.9,
      reviewsCount: 780,
      eta: "10 MINS",
      image: "/images/products/oil-sesame.jpg",
      tag: "Wood Pressed",
      description: "Traditional mara chekku extraction using country sesame seeds and palm jaggery.",
    },
    {
      id: "oil-groundnut",
      title: "Wood Pressed Groundnut Peanut Oil",
      category: "oils_ghee",
      categoryTitle: "Oils & Ghee",
      weight: "1 L",
      price: 260,
      originalPrice: 320,
      discount: "18% OFF",
      rating: 4.8,
      reviewsCount: 920,
      eta: "10 MINS",
      image: "/images/products/oil-groundnut.jpg",
      tag: "Pure Virgin",
      description: "Rich peanut aroma with high smoke point, ideal for everyday Indian cooking.",
    },
  ],
  spices: [
    {
      id: "spice-turmeric",
      title: "High-Curcumin Salem Organic Turmeric Powder",
      category: "spices",
      categoryTitle: "Spices",
      weight: "200 g",
      price: 85,
      originalPrice: 110,
      discount: "22% OFF",
      rating: 4.9,
      reviewsCount: 2350,
      eta: "10 MINS",
      image: "/images/products/spices-haldi.jpg",
      tag: "5.5% Curcumin",
      description: "Direct farm-ground aromatic golden turmeric with high medicinal curcumin.",
    },
    {
      id: "spice-chilli",
      title: "Kashmiri Reshampatti Red Chilli Powder",
      category: "spices",
      categoryTitle: "Spices",
      weight: "200 g",
      price: 110,
      originalPrice: 140,
      discount: "21% OFF",
      rating: 4.8,
      reviewsCount: 1420,
      eta: "10 MINS",
      image: "/images/products/spices-chilli.jpg",
      tag: "Vibrant Color",
      description: "Mild heat with deep natural crimson color for royal gravies.",
    },
    {
      id: "spice-coriander",
      title: "Sun-Dried Green Coriander Dhaniya Powder",
      category: "spices",
      categoryTitle: "Spices",
      weight: "200 g",
      price: 80,
      originalPrice: 100,
      discount: "20% OFF",
      rating: 4.8,
      reviewsCount: 890,
      eta: "10 MINS",
      image: "/images/products/spices-coriander.jpg",
      tag: "Aromatic",
      description: "Slow-roasted seeds stone-ground to release citrusy herbal fragrance.",
    },
    {
      id: "spice-garam",
      title: "Artisanal 16-Spice Royal Garam Masala",
      category: "spices",
      categoryTitle: "Spices",
      weight: "100 g",
      price: 95,
      originalPrice: 120,
      discount: "20% OFF",
      rating: 4.9,
      reviewsCount: 1150,
      eta: "10 MINS",
      image: "/images/products/spices-garam-masala.jpg",
      tag: "Hand Roasted",
      description: "Blended with whole mace, star anise, nutmeg, and green cardamom.",
    },
  ],
  dairy_products: [
    {
      id: "dairy-paneer-amul",
      title: "Farm Fresh A2 Malai Paneer Block",
      category: "dairy_products",
      categoryTitle: "Dairy Products",
      weight: "200 g",
      price: 110,
      originalPrice: 130,
      discount: "15% OFF",
      rating: 4.9,
      reviewsCount: 2840,
      eta: "10 MINS",
      image: "/images/products/paneer-amul.jpg",
      tag: "Melt-in-Mouth",
      description: "Soft, spongy malai paneer crafted fresh every dawn from whole cow milk.",
    },
    {
      id: "dairy-paneer-milky",
      title: "Artisanal Farmstead Vacuum Diced Paneer",
      category: "dairy_products",
      categoryTitle: "Dairy Products",
      weight: "200 g",
      price: 115,
      originalPrice: 135,
      discount: "14% OFF",
      rating: 4.8,
      reviewsCount: 1210,
      eta: "10 MINS",
      image: "/images/products/paneer-milky-mist.jpg",
      tag: "Fresh Cut",
      description: "Pre-cut gourmet paneer cubes ready to saute or add to rich curries.",
    },
    {
      id: "dairy-cheese",
      title: "Farmstead Natural Cheddar Cheese Slices",
      category: "dairy_products",
      categoryTitle: "Dairy Products",
      weight: "100 g (5 slices)",
      price: 95,
      originalPrice: 115,
      discount: "17% OFF",
      rating: 4.7,
      reviewsCount: 640,
      eta: "10 MINS",
      image: "/images/products/cheese-slices.jpg",
      tag: "Pure Dairy",
      description: "Natural aged cheese slices with no artificial emulsifiers or palm oil.",
    },
  ],
  leafy_greens: [
    {
      id: "leafy-palak",
      title: "Country Farm Tender Palak / Spinach",
      category: "leafy_greens",
      categoryTitle: "Leafy Greens",
      weight: "250 g",
      price: 25,
      originalPrice: 35,
      discount: "28% OFF",
      rating: 4.9,
      reviewsCount: 1980,
      eta: "10 MINS",
      image: "/images/quick_categories/c9.webp",
      tag: "Hydroponic & Soil",
      description: "Crisp emerald leaves washed with pure farm water, packed with iron.",
    },
    {
      id: "leafy-methi",
      title: "Fresh Tender Methi / Fenugreek Leaves",
      category: "leafy_greens",
      categoryTitle: "Leafy Greens",
      weight: "250 g",
      price: 30,
      originalPrice: 40,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 890,
      eta: "10 MINS",
      image: "/images/quick_categories/c10.webp",
      tag: "Aromatic Herb",
      description: "Tender bitter-sweet greens, perfect for methi parathas and aloo methi.",
    },
    {
      id: "leafy-pudina",
      title: "Fresh Green Mountain Mint / Pudina",
      category: "leafy_greens",
      categoryTitle: "Leafy Greens",
      weight: "1 bunch (~100 g)",
      price: 15,
      originalPrice: 20,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 1420,
      eta: "10 MINS",
      image: "/images/quick_categories/c11.webp",
      tag: "Invigorating",
      description: "Intense refreshing menthol aroma for fresh chutneys, raitas, and teas.",
    },
    {
      id: "leafy-coriander",
      title: "Organic Fresh Green Coriander / Dhaniya",
      category: "leafy_greens",
      categoryTitle: "Leafy Greens",
      weight: "1 bunch (~100 g)",
      price: 20,
      originalPrice: 25,
      discount: "20% OFF",
      rating: 4.8,
      reviewsCount: 1740,
      eta: "10 MINS",
      image: "/images/quick_categories/c12.webp",
      tag: "Fresh Cut",
      description: "Bright leafy sprigs harvested with root intact for maximum longevity.",
    },
  ],
  healthy_snacks: [
    {
      id: "snack-almonds",
      title: "Premium California Jumbo Badam Almonds",
      category: "healthy_snacks",
      categoryTitle: "Healthy Snacks",
      weight: "250 g",
      price: 280,
      originalPrice: 340,
      discount: "17% OFF",
      rating: 4.9,
      reviewsCount: 2650,
      eta: "10 MINS",
      image: "/images/products/dryfruit-almonds.jpg",
      tag: "Heart Healthy",
      description: "Crunchy hand-selected whole almonds with high vitamin E and healthy fats.",
    },
    {
      id: "snack-walnuts",
      title: "Kashmiri Light Halves Walnut Kernels",
      category: "healthy_snacks",
      categoryTitle: "Healthy Snacks",
      weight: "250 g",
      price: 390,
      originalPrice: 480,
      discount: "18% OFF",
      rating: 4.9,
      reviewsCount: 1120,
      eta: "10 MINS",
      image: "/images/products/dryfruit-walnuts.jpg",
      tag: "Omega-3 Rich",
      description: "Bitter-free light golden walnut halves from high Kashmir valleys.",
    },
    {
      id: "snack-flax",
      title: "Roasted Omega-3 Organic Flax Seeds",
      category: "healthy_snacks",
      categoryTitle: "Healthy Snacks",
      weight: "200 g",
      price: 90,
      originalPrice: 115,
      discount: "21% OFF",
      rating: 4.8,
      reviewsCount: 840,
      eta: "10 MINS",
      image: "/images/products/seeds-flax.jpg",
      tag: "Superfood",
      description: "Slow-roasted nutty flax seeds for smooth digestion and plant protein.",
    },
    {
      id: "snack-chia",
      title: "Black Raw Superfood Chia Seeds",
      category: "healthy_snacks",
      categoryTitle: "Healthy Snacks",
      weight: "200 g",
      price: 110,
      originalPrice: 145,
      discount: "24% OFF",
      rating: 4.9,
      reviewsCount: 960,
      eta: "10 MINS",
      image: "/images/products/seeds-chia.jpg",
      tag: "High Fiber",
      description: "Hydrating hydrophilic seeds that expand in smoothies and puddings.",
    },
  ],
};

export default function HarvestCategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("milk");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const itemsSectionRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (catId: string) => {
    setSelectedCategory(catId);
    if (itemsSectionRef.current) {
      itemsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
  const activeItems = CATEGORY_HARVEST_ITEMS[selectedCategory] || [];
  const activeBox = CATEGORY_BOXES.find((b) => b.id === selectedCategory) || CATEGORY_BOXES[0];

  return (
    <section id="categories" className="relative w-full bg-[#f6f2e8] overflow-hidden">
      {/* 1. 3x3 Full-Width Edge-to-Edge Grid (0 side margin, 0 horizontal gap) */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full border-t border-b border-[#e5decb]">
          {CATEGORY_BOXES.map((box) => {
            const isSelected = selectedCategory === box.id;
            return (
              <button
                key={box.id}
                type="button"
                onClick={() => handleCardClick(box.id)}
                className={`group relative w-full overflow-hidden text-left focus:outline-none transition-all duration-200 border-b lg:border-b sm:border-r border-[#e5decb] ${
                  isSelected ? "ring-4 ring-inset ring-emerald-600/70" : "hover:opacity-95"
                }`}
                aria-label={`View ${box.title} items`}
              >
                {/* Ultra HD Card Image */}
                <div className="w-full relative overflow-hidden bg-[#f4eee2]">
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Active Indicator Badge overlay on top corner */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-emerald-800 text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Viewing Items ↓
                    </div>
                  )}

                  {/* Subtle interactive hover highlight */}
                  <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/5 transition-colors pointer-events-none" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Category Harvest Items Showcase (Directly Below Grid) */}
      <div ref={itemsSectionRef} className="w-full py-12 md:py-16 bg-[#faf7f0] border-b border-[#e5decb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#e8dfcf]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Selected Category Harvest</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1a3323] font-medium tracking-tight">
                Fresh {activeBox.title} Collection
              </h2>
              <p className="text-sm text-[#4a5848] mt-1 font-sans">
                {activeBox.tagline.replace(" →", "")} • Harvested at peak ripeness and delivered cold.
              </p>
            </div>

            {/* Quick Actions & Milk Subscription Link */}
            <div className="flex items-center gap-3">
              {selectedCategory === "milk" && (
                <button
                  type="button"
                  onClick={() => setIsMilkModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-full transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Setup Daily Milk Subscription →</span>
                </button>
              )}
              <span className="text-xs font-medium text-[#6c786a] bg-white px-3 py-1.5 rounded-full border border-[#ded5c2]">
                Showing {activeItems.length} items
              </span>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeItems.map((product) => {
              const qty = cart[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-3.5 sm:p-4 border border-[#e5decb] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Top packshot + badge */}
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f7f5ee] mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {product.tag && (
                        <span className="absolute top-2 left-2 bg-[#1a3323] text-[#f8f4e8] text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md">
                          {product.tag}
                        </span>
                      )}
                      <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs border border-emerald-100">
                        <Zap className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                        {product.eta}
                      </span>
                    </div>

                    {/* Weight & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#6e7b6d] mb-1">
                      <span className="font-medium text-[#2d3a2c]">{product.weight}</span>
                      <span className="flex items-center gap-0.5 text-amber-700 font-semibold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {product.rating}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-sm font-semibold text-[#18271a] line-clamp-2 leading-snug group-hover:text-emerald-800 transition-colors">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-[#6a7568] mt-1 line-clamp-2 font-sans">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="mt-4 pt-3 border-t border-[#f0ece1] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-[#1a3323]">₹{product.price}</span>
                        <span className="text-xs text-[#8c9789] line-through">₹{product.originalPrice}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {product.discount}
                      </span>
                    </div>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => updateCart(product.id, 1)}
                        className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-emerald-800 text-white rounded-lg px-1.5 py-1 shadow-sm gap-2">
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Floating Farm Basket Summary Bar (when items are added) */}
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
              <p className="text-xs text-white/80">⚡ Delivery in 10-15 mins</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Proceeding to checkout with ${totalCartCount} fresh farm items!`)}
            className="px-4 py-2 bg-[#d89b4f] hover:bg-[#c58b4a] active:scale-95 text-[#162e1e] font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-md"
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
