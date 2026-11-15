"use client";

import React from "react";
import Link from "next/link";
import ShopFarmBanner from "./ShopFarmBanner";
import "./HarvestHeroSection.css";

export interface HeroProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

export const HERO_PRODUCTS: HeroProduct[] = [
  {
    id: "th-buffalo-milk",
    name: "Buffalo Milk (1 L)",
    description: "Rich, creamy, farm-fresh buffalo milk",
    price: 70,
    unit: "1 L",
    image: "/images/buffalo-milk.png",
    badge: "Rich & Creamy",
    highlights: [
      "Chilled to 4°C in 15 mins",
      "Zero Preservatives or Additives",
      "Eco-friendly Sealed Glass Bottle",
      "Delivered Cold before 7:00 AM",
    ],
  },
  {
    id: "th-cow-milk",
    name: "Cow Milk (1 L)",
    description: "Light, nutritious, perfect for everyday",
    price: 60,
    unit: "1 L",
    image: "/images/cow-milk.png",
    badge: "A2 Single Source",
    highlights: [
      "Certified A2 Beta-Casein",
      "Zero Adulteration or Dilution",
      "Farm-Bottled Fresh Daily",
      "Automated Pause Anytime",
    ],
  },
  {
    id: "th-veggie-basket",
    name: "Seasonal Vegetable Basket",
    description: "Handpicked farm-fresh vegetables",
    price: 199,
    unit: "basket",
    image: "/images/vegetable-basket.png",
    badge: "Harvested Today",
    highlights: [
      "100% Chemical-Free Farming",
      "Harvested at First Dawn",
      "Zero Cold-Storage Delay",
      "Direct Farm-to-Kitchen",
    ],
  },
  {
    id: "th-leafy-greens",
    name: "Leafy Greens (300 g)",
    description: "Fresh, nutritious and locally grown",
    price: 30,
    unit: "300 g",
    image: "/images/leafy-greens.png",
    badge: "Hydro / Soil Pure",
    highlights: [
      "Zero Chemical Pesticides",
      "Tender Morning Cut",
      "Washed in Ozonated Water",
      "Vibrant & Living Greens",
    ],
  },
];

interface HarvestHeroSectionProps {
  cartCount?: number;
  onAddToCart?: (product: HeroProduct, quantity: number) => void;
  onOpenModal?: (product: HeroProduct) => void;
  onViewAllProducts?: () => void;
}

export default function HarvestHeroSection({
  cartCount,
  onAddToCart,
  onOpenModal,
  onViewAllProducts,
}: HarvestHeroSectionProps) {
  return (
    <div id="shop-farm-hero" className="w-full">
      <ShopFarmBanner />
    </div>
  );
}
