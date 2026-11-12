"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import ScrollMilkJourney from "./ScrollMilkJourney";
import { FilteredCategoryProducts } from "./FilteredCategoryProducts";
import { ProductModal } from "./ProductModal";
import { PRODUCTS } from "@/data/products";
import { Product, CartItem } from "@/types";

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
  photo: string;
  subCategories: string[];
  bannerDesc: string;
}

export const CATEGORY_BOXES: CategoryBox[] = [
  {
    id: "milk",
    title: "Milk",
    tagline: "Pure. Fresh. Everyday.",
    photo: "/images/category_photos/milk_photo.jpg",
    subCategories: ["All Milk", "A2 Desi Cow", "Buffalo Milk", "Full Cream"],
    bannerDesc:
      "100% single-source farm fresh milk chilled to 4°C within 15 minutes of dawn milking. Zero adulteration, zero preservatives, and no synthetic hormones.",
  },
  {
    id: "vegetables",
    title: "Vegetables",
    tagline: "Seasonal goodness from our farms.",
    photo: "/images/category_photos/vegetables_photo.jpg",
    subCategories: ["All Veggies", "Daily Cooking", "Roots & Tubers", "Crisp & Salads"],
    bannerDesc:
      "Harvested daily from certified organic acreage. Grown in rich living soil nourished by natural compost and fresh rainwater.",
  },
  {
    id: "fruits",
    title: "Fruits",
    tagline: "Nature's sweetest harvest.",
    photo: "/images/category_photos/fruits_photo.jpg",
    subCategories: ["All Fruits", "Seasonal Harvest", "Tree Ripened", "Citrus & Berries"],
    bannerDesc:
      "Tree-ripened orchard harvest delivered without carbide ripening or wax coating. Bursting with natural fructose, minerals, and vitamins.",
  },
  {
    id: "grains_pulses",
    title: "Grains & Pulses",
    tagline: "Wholesome nutrition for every meal.",
    photo: "/images/category_photos/grains_pulses_photo.jpg",
    subCategories: ["All Grains", "Unpolished Dals", "Aged Rice", "Native Millets"],
    bannerDesc:
      "Traditional native seeds, unpolished to retain 100% of their nutrient-dense bran and natural dietary fibers.",
  },
  {
    id: "oils_ghee",
    title: "Oils & Ghee",
    tagline: "Pure oils for a healthier you.",
    photo: "/images/category_photos/oils_ghee_photo.jpg",
    subCategories: ["All Oils & Ghee", "A2 Bilona Ghee", "Cold Pressed", "Wood Pressed"],
    bannerDesc:
      "Hand-churned Vedic bilona curd ghee and slow-pressed oils extracted at room temperature in wooden mills.",
  },
  {
    id: "spices",
    title: "Spices",
    tagline: "Natural flavours, rooted in tradition.",
    photo: "/images/category_photos/spices_photo.jpg",
    subCategories: ["All Spices", "High Curcumin", "Sun Dried", "Stone Ground"],
    bannerDesc:
      "Sun-dried indigenous spices, rich in active volatile essential oils and slow-ground to preserve heritage aromas.",
  },
  {
    id: "dairy_products",
    title: "Dairy Products",
    tagline: "Goodness in every bite.",
    photo: "/images/category_photos/dairy_products_photo.jpg",
    subCategories: ["All Dairy", "Malai Paneer", "Farm Butter", "Set Curd & Dahi"],
    bannerDesc:
      "Slow-batch artisan dairy crafted fresh daily from whole unhomogenized A2 cow and buffalo milk.",
  },
  {
    id: "leafy_greens",
    title: "Leafy Greens",
    tagline: "Fresh leaves, brighter days.",
    photo: "/images/category_photos/leafy_greens_photo.jpg",
    subCategories: ["All Greens", "Tender Spinach", "Aromatic Herbs", "Cooking Greens"],
    bannerDesc:
      "Crisp, dewy leaves plucked at dawn and hydro-cooled immediately to preserve tender cell walls and crisp crunch.",
  },
  {
    id: "healthy_snacks",
    title: "Healthy Snacks",
    tagline: "Nutritious choices for active living.",
    photo: "/images/category_photos/healthy_snacks_photo.jpg",
    subCategories: ["All Snacks", "Roasted Nuts", "Omega-3 Seeds", "Guilt-Free Crunch"],
    bannerDesc:
      "Lightly roasted farm nuts and superfood seeds without palm oil, artificial flavors, or synthetic preservatives.",
  },
];

export interface CollectionCardItem {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  image: string;
  bgColor: string;
  arrowWidthClass: string;
  aspectClass: string;
  flexRatio: number;
}

export interface CollectionRow {
  rowId: string;
  desktopAspect: string;
  items: CollectionCardItem[];
}

export const COLLECTION_ROWS: CollectionRow[] = [
  {
    rowId: "row-1",
    desktopAspect: "lg:aspect-[975/230]",
    items: [
      {
        id: "milk",
        title: "Milk",
        category: "milk",
        subCategory: "all",
        image: "/images/collections/col_milk_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[356/230]",
        flexRatio: 356,
      },
      {
        id: "vegetables",
        title: "Vegetables",
        category: "vegetables",
        subCategory: "all",
        image: "/images/collections/col_vegetables_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-24 sm:w-28",
        aspectClass: "aspect-[317/230]",
        flexRatio: 317,
      },
      {
        id: "fruits",
        title: "Fruits",
        category: "fruits",
        subCategory: "all",
        image: "/images/collections/col_fruits_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[302/230]",
        flexRatio: 302,
      },
    ],
  },
  {
    rowId: "row-2",
    desktopAspect: "lg:aspect-[977/198]",
    items: [
      {
        id: "curd",
        title: "Curd",
        category: "dairy_products",
        subCategory: "Set Curd & Dahi",
        image: "/images/collections/col_curd_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[297/198]",
        flexRatio: 297,
      },
      {
        id: "paneer",
        title: "Paneer",
        category: "dairy_products",
        subCategory: "Malai Paneer",
        image: "/images/collections/col_paneer_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[320/198]",
        flexRatio: 320,
      },
      {
        id: "ghee",
        title: "Ghee",
        category: "oils_ghee",
        subCategory: "A2 Bilona Ghee",
        image: "/images/collections/col_ghee_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[360/198]",
        flexRatio: 360,
      },
    ],
  },
  {
    rowId: "row-3",
    desktopAspect: "lg:aspect-[972/198]",
    items: [
      {
        id: "grains",
        title: "Grains",
        category: "grains_pulses",
        subCategory: "Aged Rice",
        image: "/images/collections/col_grains_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[324/198]",
        flexRatio: 324,
      },
      {
        id: "pulses",
        title: "Pulses",
        category: "grains_pulses",
        subCategory: "Unpolished Dals",
        image: "/images/collections/col_pulses_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-16 sm:w-20",
        aspectClass: "aspect-[296/198]",
        flexRatio: 296,
      },
      {
        id: "dryfruits",
        title: "Dry Fruits",
        category: "healthy_snacks",
        subCategory: "Roasted Nuts",
        image: "/images/collections/col_dryfruits_clean_2x.png",
        bgColor: "bg-[#faf5ea]",
        arrowWidthClass: "w-24 sm:w-28",
        aspectClass: "aspect-[352/198]",
        flexRatio: 352,
      },
    ],
  },
];

export const ALL_9_COLLECTIONS: CollectionCardItem[] = COLLECTION_ROWS.flatMap(
  (row) => row.items
);

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

interface TodaysHarvestFeatured {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  unit: string;
  image: string;
  badge?: string;
  description: string;
  highlights: string[];
}

const TODAYS_HARVEST_PRODUCTS: TodaysHarvestFeatured[] = [
  {
    id: "th-buffalo-milk",
    title: "Buffalo Milk (1 L)",
    subtitle: "Rich, creamy, farm-fresh buffalo milk",
    price: 70,
    originalPrice: 85,
    unit: "1 L",
    image: "/images/buffalo-milk.png",
    badge: "Rich & Creamy",
    description: "100% single-source farm fresh buffalo milk from pasture-fed water buffaloes. Naturally sweet, thick, and packed with calcium and healthy fats. Bottled within 15 minutes of dawn milking.",
    highlights: ["Chilled to 4°C in 15 mins", "Zero Preservatives or Additives", "Eco-friendly Sealed Glass Bottle", "Delivered Cold before 7:00 AM"],
  },
  {
    id: "th-cow-milk",
    title: "Cow Milk (1 L)",
    subtitle: "Light, nutritious, perfect for everyday",
    price: 60,
    originalPrice: 75,
    unit: "1 L",
    image: "/images/cow-milk.png",
    badge: "A2 Single Source",
    description: "Gentle on digestion and naturally rich in A2 beta-casein proteins. Sourced directly from our free-grazing indigenous cows at Nandi Eco Farm with zero hormone injections.",
    highlights: ["Certified A2 Beta-Casein", "Zero Adulteration or Dilution", "Farm-Bottled Fresh Daily", "Automated Pause Anytime"],
  },
  {
    id: "th-veggie-basket",
    title: "Seasonal Vegetable Basket",
    subtitle: "Handpicked farm-fresh vegetables",
    price: 199,
    originalPrice: 249,
    unit: "basket",
    image: "/images/vegetable-basket.png",
    badge: "Harvested Today",
    description: "An assorted morning harvest containing seasonal farm staples: vine-ripened red tomatoes, tender baby carrots, crisp bell peppers, and fresh coriander, harvested fresh at 5:00 AM.",
    highlights: ["100% Chemical-Free Farming", "Harvested at First Dawn", "Zero Cold-Storage Delay", "Direct Farm-to-Kitchen"],
  },
  {
    id: "th-leafy-greens",
    title: "Leafy Greens (300 g)",
    subtitle: "Fresh, nutritious and locally grown",
    price: 30,
    originalPrice: 40,
    unit: "300 g",
    image: "/images/leafy-greens.png",
    badge: "Hydro / Soil Pure",
    description: "Crisp, vibrant spinach and local greens harvested at first dawn. Washed in ozonated natural water, tender, and packed with vital iron, folate, and living nutrients.",
    highlights: ["Zero Chemical Pesticides", "Tender Morning Cut", "Washed in Ozonated Water", "Vibrant & Living Greens"],
  },
];

export function getProductsForCategory(catId: string): Product[] {
  return PRODUCTS.filter((p) => {
    const c = (p.category || "").toLowerCase();
    const n = (p.name || "").toLowerCase();
    if (catId === "milk") {
      return (n.includes("milk") || c === "milk") && !n.includes("combo");
    }
    if (catId === "vegetables") {
      return (
        (c === "fresh vegetables" || c === "roots vegetables") &&
        !["spinach", "methi", "coriander", "mint", "palak"].some((k) => n.includes(k))
      );
    }
    if (catId === "fruits") {
      return c === "fruits";
    }
    if (catId === "grains_pulses") {
      return c === "rice" || c === "ravva" || n.includes("atta");
    }
    if (catId === "oils_ghee") {
      return c === "oils" || n.includes("ghee") || n.includes("oil");
    }
    if (catId === "spices") {
      return (
        c === "karam podulu" ||
        c === "pickles" ||
        n.includes("chilli") ||
        n.includes("podi") ||
        n.includes("pickle")
      );
    }
    if (catId === "dairy_products") {
      return c === "dairy" && !n.includes("milk");
    }
    if (catId === "leafy_greens") {
      return (
        c === "leafy greens" ||
        ["spinach", "methi", "coriander", "mint", "palak", "greens"].some((k) =>
          n.includes(k)
        )
      );
    }
    if (catId === "healthy_snacks") {
      return c === "sweets" || n.includes("honey") || n.includes("ladoo") || n.includes("jamun");
    }
    return false;
  });
}

export default function HarvestCategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("milk");
  const [isCategoryProductsOpen, setIsCategoryProductsOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lovedItems, setLovedItems] = useState<string[]>([]);
  const [activeSubFilter, setActiveSubFilter] = useState<string>("all");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<TodaysHarvestFeatured | null>(null);
  const [showAllCollections, setShowAllCollections] = useState(false);
  const freshPageRef = useRef<HTMLDivElement>(null);
  const allCollectionsRef = useRef<HTMLDivElement>(null);
  const categoryProductsAnchorRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleAllCollections = () => {
    setShowAllCollections((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (allCollectionsRef.current) {
          allCollectionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return next;
    });
  };

  const handleCardClick = (catId: string, subFilter?: string) => {
    setSelectedCategory(catId);
    setActiveSubFilter(subFilter || "all");
    setIsCategoryProductsOpen(true);
    setTimeout(() => {
      if (categoryProductsAnchorRef.current) {
        categoryProductsAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleAddToCartProduct = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    updateCart(product.id, 1);
  };

  const handleUpdateQuantityProduct = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
    updateCart(productId, delta);
  };

  const handleToggleLovedProduct = (productId: string) => {
    setLovedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
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
    <section id="categories" className="relative w-full bg-[#faf5ea] overflow-hidden py-6 sm:py-8 lg:py-10">
      {/* 1. EVERYDAY GOODNESS 9 COLLECTIONS BENTO CONTAINER (Pure Artwork, Zero White Layout, No Clipping) */}
      <div
        ref={allCollectionsRef}
        id="collections-container"
        className="w-full max-w-[1536px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pb-6 sm:pb-8 select-none"
      >
        <div className="w-full">
          {!showAllCollections ? (
            /* STATE A: EVERYDAY GOODNESS (Exact 2nd Image: 3-Box Bento Layout) */
            <div className="animate-in fade-in duration-500">
              {/* Header Bar: Everyday Goodness with "View all 9 collections ->" button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 sm:pb-8 gap-4 border-b border-[#ece3d5]/80 mb-6 sm:mb-8">
                <div>
                  <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[44px] text-[#16301d] font-normal tracking-tight leading-none">
                    Everyday Goodness
                  </h2>
                  <p className="text-sm sm:text-base text-[#4b5563] mt-2.5 font-sans font-medium">
                    Explore dairy, fruits, vegetables and more.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAllCollections}
                  className="inline-flex items-center gap-2 bg-[#f3e4d5] hover:bg-[#ebd3be] text-[#4a3018] font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none"
                  aria-label="View all 9 collections"
                >
                  <span>View all 9 collections</span>
                  <span className="text-base transition-transform duration-300">→</span>
                </button>
              </div>

              {/* Bento 3-Box Grid: Exact 2nd Image Layout (Milk on left, Veg & Fruits on right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
                {/* A. Left Column: Milk Card (5 of 12 cols on desktop) */}
                <button
                  type="button"
                  onClick={() => handleCardClick("milk")}
                  className={`group relative w-full lg:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[356/370] lg:aspect-auto lg:h-full text-left focus:outline-none p-0 cursor-pointer block bg-[#faf5ea] shadow-xs hover:shadow-md transition-all duration-300 min-h-[340px] sm:min-h-[400px] lg:min-h-0 ${
                    isCategoryProductsOpen && selectedCategory === "milk"
                      ? "ring-4 ring-[#16301d]"
                      : ""
                  }`}
                  aria-label="Open Milk Products"
                >
                  <img
                    src="/images/bento_v3/milk_exact_2x.png"
                    alt="Fresh Farm Milk"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                    loading="eager"
                  />

                  {/* Live HTML Typography In The Box, Outside Image File */}
                  <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-10 select-none">
                    <span className="font-playfair text-3xl sm:text-4xl lg:text-[40px] text-[#16301d] font-normal tracking-tight block leading-none drop-shadow-xs">
                      Milk
                    </span>
                    <div className="flex items-center w-24 sm:w-28 h-px bg-[#16301d]/60 mt-2 sm:mt-2.5 relative">
                      <span className="absolute -right-1 -top-2 text-xs sm:text-sm text-[#16301d] transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Active Indicator Badge */}
                  {isCategoryProductsOpen && selectedCategory === "milk" && (
                    <div className="absolute top-5 right-5 z-10 bg-[#16301d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 animate-in fade-in">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Viewing Dairy</span>
                    </div>
                  )}
                </button>

                {/* B. Right Column: Stacked Vegetables & Fruits (7 of 12 cols on desktop) */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-5 lg:gap-6">
                  {/* Top Card: Vegetables (Direct from User Image, Leaves Present Outside Box) */}
                  <div className="relative pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={() => handleCardClick("vegetables")}
                      className={`group relative w-full aspect-[612/180] rounded-2xl sm:rounded-3xl bg-[#dfe3d0] overflow-visible text-left focus:outline-none p-0 cursor-pointer block shadow-xs hover:shadow-md transition-all duration-300 ${
                        isCategoryProductsOpen && selectedCategory === "vegetables"
                          ? "ring-4 ring-[#16301d]"
                          : ""
                      }`}
                      aria-label="Open Vegetables Products"
                    >
                      {/* Exact image from user screenshot with leaves extending -11.7% above the top border */}
                      <img
                        src="/images/bento_v3/veg_exact_2x.png"
                        alt="Fresh Organic Vegetables"
                        className="absolute -top-[11.7%] left-0 w-full h-[111.7%] object-contain pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                      />

                      {/* Live HTML Typography In The Box, Outside Image File */}
                      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 lg:left-10 z-10 select-none">
                        <span className="font-playfair text-3xl sm:text-4xl lg:text-[40px] text-[#16301d] font-normal tracking-tight block leading-none drop-shadow-xs">
                          Vegetables
                        </span>
                        <div className="flex items-center w-36 sm:w-44 h-px bg-[#16301d]/60 mt-2 sm:mt-2.5 relative">
                          <span className="absolute -right-1 -top-2 text-xs sm:text-sm text-[#16301d] transition-transform duration-300 group-hover:translate-x-1.5">
                            →
                          </span>
                        </div>
                      </div>

                      {/* Active Indicator Badge */}
                      {isCategoryProductsOpen && selectedCategory === "vegetables" && (
                        <div className="absolute top-5 right-5 z-10 bg-[#16301d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 animate-in fade-in">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Viewing Veggies</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Bottom Card: Fruits */}
                  <button
                    type="button"
                    onClick={() => handleCardClick("fruits")}
                    className={`group relative w-full aspect-[612/179] rounded-2xl sm:rounded-3xl overflow-hidden text-left focus:outline-none p-0 cursor-pointer block bg-[#faf5ea] shadow-xs hover:shadow-md transition-all duration-300 ${
                      isCategoryProductsOpen && selectedCategory === "fruits"
                        ? "ring-4 ring-[#16301d]"
                        : ""
                    }`}
                    aria-label="Open Fruits Products"
                  >
                    <img
                      src="/images/bento_v3/fruit_exact_2x.png"
                      alt="Fresh Orchard Fruits"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                      loading="eager"
                    />

                    {/* Live HTML Typography In The Box, Outside Image File */}
                    <div className="absolute top-6 sm:top-8 left-6 sm:left-8 lg:left-10 z-10 select-none">
                      <span className="font-playfair text-3xl sm:text-4xl lg:text-[40px] text-[#16301d] font-normal tracking-tight block leading-none drop-shadow-xs">
                        Fruits
                      </span>
                      <div className="flex items-center w-28 sm:w-36 h-px bg-[#16301d]/60 mt-2 sm:mt-2.5 relative">
                        <span className="absolute -right-1 -top-2 text-xs sm:text-sm text-[#16301d] transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </div>
                    </div>

                    {/* Active Indicator Badge */}
                    {isCategoryProductsOpen && selectedCategory === "fruits" && (
                      <div className="absolute top-5 right-5 z-10 bg-[#16301d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 animate-in fade-in">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Viewing Fruits</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STATE B: 9 COLLECTIONS (Exact 1st Image: All 9 Collections with Names in Box) */
            <div className="animate-in fade-in duration-500">
              {/* Header Bar: Everyday Goodness with 9 Collections Badge & Back Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 sm:pb-8 gap-4 border-b border-[#ece3d5]/80 mb-6 sm:mb-8">
                <div>
                  <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[44px] text-[#16301d] font-normal tracking-tight leading-none">
                    Everyday Goodness
                  </h2>
                  <p className="text-sm sm:text-base text-[#4b5563] mt-2.5 font-sans font-medium">
                    Explore dairy, fruits, vegetables and more.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                  <span className="bg-[#f1e3d3] text-[#5c3e1e] font-sans font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-xs select-none">
                    9 Collections
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleAllCollections}
                    className="inline-flex items-center gap-2 bg-[#ede7da] hover:bg-[#e4dcce] text-[#16301d] font-sans font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full transition-colors cursor-pointer focus:outline-none"
                    aria-label="Back to Everyday Goodness"
                  >
                    <span>← Everyday Goodness</span>
                  </button>
                </div>
              </div>

              {/* 3 Bento Rows: 9 Collections matching Master Artwork with Names in Box Outside Image */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                {COLLECTION_ROWS.map((row) => (
                  <div
                    key={row.rowId}
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4 sm:gap-5 lg:gap-6 w-full ${row.desktopAspect}`}
                  >
                    {row.items.map((col) => {
                      const isSelected =
                        isCategoryProductsOpen &&
                        selectedCategory === col.category &&
                        (col.subCategory === "all" ||
                          activeSubFilter === col.subCategory ||
                          activeSubFilter === "all");

                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() =>
                            handleCardClick(
                              col.category,
                              col.subCategory === "all" ? undefined : col.subCategory
                            )
                          }
                          style={{ flex: `${col.flexRatio} ${col.flexRatio} 0%` }}
                          className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden ${col.aspectClass} lg:aspect-auto ${col.bgColor} shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer block text-left focus:outline-none p-0 w-full lg:w-auto h-auto min-h-[160px] sm:min-h-[200px] lg:min-h-0 ${
                            isSelected ? "ring-4 ring-[#16301d]" : ""
                          }`}
                          aria-label={`Open ${col.title} Collection`}
                        >
                          {/* Clean Photographic Plate (Zero text baked into image) */}
                          <img
                            src={col.image}
                            alt={col.title}
                            title={col.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
                            loading="lazy"
                          />

                          {/* Live HTML Typography In The Box, Outside Image File */}
                          <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6 z-10 select-none">
                            <span className="font-playfair text-2xl sm:text-3xl lg:text-[32px] text-[#16301d] font-normal tracking-tight block leading-none drop-shadow-xs">
                              {col.title}
                            </span>
                            <div
                              className={`flex items-center ${col.arrowWidthClass} h-px bg-[#16301d]/60 mt-1.5 sm:mt-2 relative`}
                            >
                              <span className="absolute -right-1 -top-2 text-xs sm:text-sm text-[#16301d] transition-transform duration-300 group-hover:translate-x-1.5">
                                →
                              </span>
                            </div>
                          </div>

                          {/* Active Indicator Badge if currently active in product view */}
                          {isSelected && (
                            <div className="absolute top-4 right-4 z-10 bg-[#16301d] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-in fade-in">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Viewing</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. DEDICATED CATEGORY PRODUCTS VIEW (Revealed when ANY Category Card is Clicked) */}
      {isCategoryProductsOpen && (
        <div
          ref={categoryProductsAnchorRef}
          id="category-products-anchor"
          className="w-full bg-[#fdfbf7] border-t border-b border-[#ede7d8] py-8 transition-all duration-500 animate-in fade-in"
        >
          <FilteredCategoryProducts
            categoryName={activeBox.title}
            products={getProductsForCategory(selectedCategory)}
            cartItems={cartItems}
            lovedItems={lovedItems}
            onAddToCart={handleAddToCartProduct}
            onUpdateQuantity={handleUpdateQuantityProduct}
            onSelectProduct={(p) => setActiveProductModal(p)}
            onToggleLoved={handleToggleLovedProduct}
            onClearFilter={() => {
              setIsCategoryProductsOpen(false);
              const gridEl = document.getElementById("categories");
              if (gridEl) gridEl.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* 2. DEDICATED "FRESH PAGE" CATEGORY EXPERIENCE (Replaces Screenshot 4 Section) */}
      <div
        id="category-fresh-page"
        ref={freshPageRef}
        className="w-full bg-[#faf5ea] border-t border-[#ded7c8] transition-all duration-500"
      >
        {/* Interactive Scroll-Driven 3-Step Milk Journey (Images 1, 2, 3 open sequentially as user scrolls) */}
        <div ref={catalogRef} className="w-full">
          <ScrollMilkJourney onShopFresh={scrollToCatalog} />
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

      {/* Featured Harvest Item Detail Modal (Opened when clicking an item) */}
      {activeModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#fdfbf7] rounded-3xl shadow-2xl border border-[#ede4d2] overflow-hidden p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f4ede0] hover:bg-[#eae1d0] active:scale-95 text-[#183622] flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-xs"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {/* Product Image & Key Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 shrink-0 bg-[#fbf8f2] rounded-2xl p-2.5 border border-[#ede5d6] flex items-center justify-center">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.title}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="text-left w-full">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300/60 inline-block mb-1.5">
                  {activeModalProduct.badge || "100% Farm Fresh"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#142819] font-medium tracking-tight">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#526350] mt-1">
                  {activeModalProduct.subtitle}
                </p>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className="font-serif text-2xl font-bold text-[#142918]">
                    ₹{activeModalProduct.price}
                  </span>
                  <span className="text-xs text-[#8c9789] line-through">
                    ₹{activeModalProduct.originalPrice}
                  </span>
                  <span className="text-xs text-[#526350]">/{activeModalProduct.unit}</span>
                </div>
              </div>
            </div>

            {/* Full Description & Nutritional Highlights */}
            <div className="mt-5 pt-4 border-t border-[#ede5d6] text-left">
              <p className="text-xs sm:text-sm text-[#4b5a4a] leading-relaxed">
                {activeModalProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 mt-4">
                {activeModalProduct.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#3d4d3c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-5 border-t border-[#ede5d6] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  updateCart(activeModalProduct.id, 1);
                  setActiveModalProduct(null);
                }}
                className="w-full sm:flex-1 py-3 bg-[#183622] hover:bg-[#122b1a] active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Farm Basket (₹{activeModalProduct.price})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModalProduct(null);
                  setIsMilkModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-[#f2ebd9] hover:bg-[#e7dfcb] active:scale-95 text-[#183622] text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Subscribe Daily
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Category Product Detail Modal */}
      <ProductModal
        product={activeProductModal}
        isOpen={!!activeProductModal}
        onClose={() => setActiveProductModal(null)}
        quantity={
          activeProductModal
            ? cartItems.find((ci) => ci.product.id === activeProductModal.id)?.quantity || 0
            : 0
        }
        onAddToCart={handleAddToCartProduct}
        onUpdateQuantity={handleUpdateQuantityProduct}
        isLoved={activeProductModal ? lovedItems.includes(activeProductModal.id) : false}
        onToggleLoved={handleToggleLovedProduct}
      />
    </section>
  );
}
