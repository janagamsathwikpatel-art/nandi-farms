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
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Truck,
  Leaf,
} from "lucide-react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";

export interface HarvestItem {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  subCategory?: string;
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
  subCategories: string[];
  bannerDesc: string;
}

export const CATEGORY_BOXES: CategoryBox[] = [
  {
    id: "milk",
    title: "Milk",
    tagline: "Pure. Fresh. Everyday. →",
    image: "/images/category_cards/milk_hd.jpg",
    subCategories: ["All Milk", "A2 Desi Cow", "Buffalo Milk", "Full Cream"],
    bannerDesc:
      "100% single-source farm fresh milk chilled to 4°C within 15 minutes of dawn milking. Zero adulteration, zero preservatives, and no synthetic hormones.",
  },
  {
    id: "vegetables",
    title: "Vegetables",
    tagline: "Seasonal goodness from our farms. →",
    image: "/images/category_cards/vegetables_hd.jpg",
    subCategories: ["All Veggies", "Daily Cooking", "Roots & Tubers", "Crisp & Salads"],
    bannerDesc:
      "Harvested daily from certified organic acreage. Grown in rich living soil nourished by natural compost and fresh rainwater.",
  },
  {
    id: "fruits",
    title: "Fruits",
    tagline: "Nature's sweetest harvest. →",
    image: "/images/category_cards/fruits_hd.jpg",
    subCategories: ["All Fruits", "Seasonal Harvest", "Tree Ripened", "Citrus & Berries"],
    bannerDesc:
      "Tree-ripened orchard harvest delivered without carbide ripening or wax coating. Bursting with natural fructose, minerals, and vitamins.",
  },
  {
    id: "grains_pulses",
    title: "Grains & Pulses",
    tagline: "Wholesome nutrition for every meal. →",
    image: "/images/category_cards/grains_pulses_hd.jpg",
    subCategories: ["All Grains", "Unpolished Dals", "Aged Rice", "Native Millets"],
    bannerDesc:
      "Traditional native seeds, unpolished to retain 100% of their nutrient-dense bran and natural dietary fibers.",
  },
  {
    id: "oils_ghee",
    title: "Oils & Ghee",
    tagline: "Pure oils for a healthier you. →",
    image: "/images/category_cards/oils_ghee_hd.jpg",
    subCategories: ["All Oils & Ghee", "A2 Bilona Ghee", "Cold Pressed", "Wood Pressed"],
    bannerDesc:
      "Hand-churned Vedic bilona curd ghee and slow-pressed oils extracted at room temperature in wooden mills.",
  },
  {
    id: "spices",
    title: "Spices",
    tagline: "Natural flavours, rooted in tradition. →",
    image: "/images/category_cards/spices_hd.jpg",
    subCategories: ["All Spices", "High Curcumin", "Sun Dried", "Stone Ground"],
    bannerDesc:
      "Sun-dried indigenous spices, rich in active volatile essential oils and slow-ground to preserve heritage aromas.",
  },
  {
    id: "dairy_products",
    title: "Dairy Products",
    tagline: "Goodness in every bite. →",
    image: "/images/category_cards/dairy_products_hd.jpg",
    subCategories: ["All Dairy", "Malai Paneer", "Farm Butter", "Set Curd & Dahi"],
    bannerDesc:
      "Slow-batch artisan dairy crafted fresh daily from whole unhomogenized A2 cow and buffalo milk.",
  },
  {
    id: "leafy_greens",
    title: "Leafy Greens",
    tagline: "Fresh leaves, brighter days. →",
    image: "/images/category_cards/leafy_greens_hd.jpg",
    subCategories: ["All Greens", "Tender Spinach", "Aromatic Herbs", "Cooking Greens"],
    bannerDesc:
      "Crisp, dewy leaves plucked at dawn and hydro-cooled immediately to preserve tender cell walls and crisp crunch.",
  },
  {
    id: "healthy_snacks",
    title: "Healthy Snacks",
    tagline: "Nutritious choices for active living. →",
    image: "/images/category_cards/healthy_snacks_hd.jpg",
    subCategories: ["All Snacks", "Roasted Nuts", "Omega-3 Seeds", "Guilt-Free Crunch"],
    bannerDesc:
      "Lightly roasted farm nuts and superfood seeds without palm oil, artificial flavors, or synthetic preservatives.",
  },
];

export const CATEGORY_HARVEST_ITEMS: Record<string, HarvestItem[]> = {
  milk: [
    {
      id: "milk-desi-a2",
      title: "Desi Gir Cow A2 Raw Milk (Chilled)",
      category: "milk",
      categoryTitle: "Milk",
      subCategory: "A2 Desi Cow",
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
      subCategory: "Buffalo Milk",
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
      subCategory: "A2 Desi Cow",
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
      subCategory: "Full Cream",
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
      subCategory: "Daily Cooking",
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
      subCategory: "Crisp & Salads",
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
      subCategory: "Roots & Tubers",
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
      subCategory: "Crisp & Salads",
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
      subCategory: "Seasonal Harvest",
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
      subCategory: "Tree Ripened",
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
      subCategory: "Daily Fresh",
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
      subCategory: "Citrus & Berries",
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
      subCategory: "Unpolished Dals",
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
      subCategory: "Unpolished Dals",
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
      subCategory: "Aged Rice",
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
      subCategory: "Native Millets",
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
      subCategory: "A2 Bilona Ghee",
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
      subCategory: "Cold Pressed",
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
      subCategory: "Wood Pressed",
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
      subCategory: "Wood Pressed",
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
      subCategory: "High Curcumin",
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
      subCategory: "Stone Ground",
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
      subCategory: "Sun Dried",
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
      subCategory: "Stone Ground",
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
      subCategory: "Malai Paneer",
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
      subCategory: "Malai Paneer",
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
      subCategory: "Set Curd & Dahi",
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
      subCategory: "Tender Spinach",
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
      subCategory: "Cooking Greens",
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
      subCategory: "Aromatic Herbs",
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
      subCategory: "Aromatic Herbs",
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
      subCategory: "Roasted Nuts",
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
      subCategory: "Roasted Nuts",
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
      subCategory: "Omega-3 Seeds",
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
      subCategory: "Omega-3 Seeds",
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
  const [activeSubFilter, setActiveSubFilter] = useState<string>("all");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const freshPageRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveSubFilter("all");
    if (freshPageRef.current) {
      freshPageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToGridTop = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const activeBox = CATEGORY_BOXES.find((b) => b.id === selectedCategory) || CATEGORY_BOXES[0];
  const allCategoryItems = CATEGORY_HARVEST_ITEMS[selectedCategory] || [];

  const filteredItems =
    activeSubFilter === "all"
      ? allCategoryItems
      : allCategoryItems.filter((item) => item.subCategory === activeSubFilter);

  return (
    <section id="categories" className="relative w-full bg-[#f6f2e8] overflow-hidden">
      {/* Panoramic Artistic Banner: "Shop By Category" */}
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

      {/* 1. 100% BORDERLESS 3x3 CATEGORY GRID (Zero box lines, zero divider borders, seamless full width) */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full border-none gap-0 p-0 m-0">
          {CATEGORY_BOXES.map((box) => (
            <button
              key={box.id}
              type="button"
              onClick={() => handleCardClick(box.id)}
              className="group relative w-full overflow-hidden text-left focus:outline-none transition-all duration-300 border-none p-0 m-0 cursor-pointer block bg-[#f4eee2]"
              aria-label={`Open ${box.title} Fresh Page`}
            >
              {/* Ultra HD Card Artwork - 100% Clean without lines or badges */}
              <img
                src={box.image}
                alt={box.title}
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                loading="eager"
              />

              {/* Gentle luminous hover vignette */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* 2. DEDICATED "FRESH PAGE" CATEGORY EXPERIENCE (Directly down of that section) */}
      <div
        id="category-fresh-page"
        ref={freshPageRef}
        className="w-full bg-[#fdfbf7] border-t border-[#ede7d8] transition-all duration-500"
      >
        {/* Fresh Page Breadcrumb Top Bar */}
        <div className="bg-[#f7f3ea] border-b border-[#e9e2d2] py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
            <button
              type="button"
              onClick={scrollToGridTop}
              className="inline-flex items-center gap-1.5 text-emerald-900 font-semibold hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Categories</span>
            </button>

            <div className="flex items-center gap-2 text-[#687366]">
              <span>Farm Harvest</span>
              <span>/</span>
              <span className="font-semibold text-emerald-900">{activeBox.title}</span>
            </div>
          </div>
        </div>

        {/* Fresh Page Editorial Hero Banner */}
        <div className="relative bg-gradient-to-b from-[#f7f3ea] to-[#fdfbf7] py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#eee8db]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/10 text-emerald-900 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nandi Farms Certified Harvest</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#162e1e] font-medium tracking-tight">
                Fresh {activeBox.title} Collection
              </h1>
              <p className="text-sm sm:text-base text-[#465544] mt-2.5 font-sans leading-relaxed">
                {activeBox.bannerDesc}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-[#5a6858] font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Zero Chemical Spray
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-700" /> Cold-Chain Delivery in 10-15 Mins
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-700" /> Harvested Fresh Daily
                </span>
              </div>
            </div>

            {/* Milk Subscription Quick Trigger (when in Milk category) */}
            {selectedCategory === "milk" && (
              <div className="bg-white p-5 rounded-2xl border border-emerald-600/30 shadow-md max-w-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Daily Morning Delivery</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#162e1e]">
                    A2 Milk Subscription
                  </h3>
                  <p className="text-xs text-[#526050] mt-1">
                    Delivered cold to your doorstep before 7:00 AM every morning. Automated pause anytime.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMilkModalOpen(true)}
                  className="mt-4 w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fresh Page Sub-Filter Chips & Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Sub-Filter Chips */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-8 border-b border-[#ece5d7]">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveSubFilter("all")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeSubFilter === "all"
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "bg-[#f2ece0] text-[#4a5847] hover:bg-[#e6decf]"
                }`}
              >
                All Items ({allCategoryItems.length})
              </button>
              {activeBox.subCategories.slice(1).map((subCat) => (
                <button
                  key={subCat}
                  type="button"
                  onClick={() => setActiveSubFilter(subCat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeSubFilter === subCat
                      ? "bg-emerald-900 text-white shadow-sm"
                      : "bg-[#f2ece0] text-[#4a5847] hover:bg-[#e6decf]"
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>

            <div className="text-xs font-medium text-[#657363]">
              Showing {filteredItems.length} fresh {activeBox.title.toLowerCase()} items
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((product) => {
              const qty = cart[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-4 border border-[#e8e2d4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Packshot Image */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fbf9f4] mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {product.tag && (
                        <span className="absolute top-2.5 left-2.5 bg-[#162e1e] text-[#f8f4e8] text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md">
                          {product.tag}
                        </span>
                      )}
                      <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-emerald-100">
                        <Zap className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                        {product.eta}
                      </span>
                    </div>

                    {/* Weight & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#6e7b6d] mb-1">
                      <span className="font-medium text-[#2d3a2c]">{product.weight}</span>
                      <span className="flex items-center gap-0.5 text-amber-700 font-semibold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-sm font-semibold text-[#18271a] line-clamp-2 leading-snug group-hover:text-emerald-800 transition-colors">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-[#6a7568] mt-1.5 line-clamp-2 font-sans leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="mt-4 pt-3 border-t border-[#f2ede3] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-[#162e1e]">₹{product.price}</span>
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
                        className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-emerald-800 text-white rounded-lg px-2 py-1 shadow-sm gap-2">
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded transition-colors cursor-pointer"
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
