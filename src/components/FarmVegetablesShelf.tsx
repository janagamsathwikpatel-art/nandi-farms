"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Leaf,
  Plus,
  Minus,
  X,
  Sparkles,
  ShoppingBag,
  ChevronDown,
  Check,
  Eye,
} from "lucide-react";
import { Product, CartItem } from "@/types";

export const FARM_VEGETABLES: Product[] = [
  {
    id: "veg-tomatoes-vine",
    name: "Organic Red Vine Tomatoes",
    category: "Fresh Vegetables",
    farmer: "Nandi Organic Farms, Field 3",
    price: 45,
    originalPrice: 60,
    unit: "500g",
    image: "/images/farm_vegetables/tomatoes_clean.jpg",
    rating: 4.9,
    reviewsCount: 1420,
    badge: "Vine Ripened",
    isPopular: true,
    description:
      "Sun-drenched, vine-ripened red country tomatoes with thin skins and rich natural acidity. Grown without chemical fertilisers or ripening sprays.",
  },
  {
    id: "veg-basket-seasonal",
    name: "Seasonal Farm Vegetable Basket",
    category: "Fresh Vegetables",
    farmer: "Nandi Organic Farms, Harvest Unit A",
    price: 199,
    originalPrice: 249,
    unit: "basket",
    image: "/images/farm_vegetables/basket_clean.jpg",
    rating: 5.0,
    reviewsCount: 2350,
    badge: "Harvested Today",
    isBestSeller: true,
    description:
      "An assorted morning harvest containing fresh organic vegetables: vine tomatoes, crisp carrots, baby potatoes, green capsicum, and fresh coriander.",
  },
  {
    id: "veg-carrots-crisp",
    name: "Fresh Farm Red Carrots",
    category: "Roots Vegetables",
    farmer: "Nandi Deep Soil Beds",
    price: 40,
    originalPrice: 55,
    unit: "500g",
    image: "/images/farm_vegetables/carrots_clean.jpg",
    rating: 4.8,
    reviewsCount: 980,
    badge: "Sweet & Crisp",
    isPopular: true,
    description:
      "Crisp, sweet carrots harvested from deep organic black soil beds. Washed in natural mountain spring water and packed immediately.",
  },
  {
    id: "veg-broccoli-garden",
    name: "Fresh Garden Broccoli",
    category: "Fresh Vegetables",
    farmer: "Nandi Hydro & Raised Beds",
    price: 65,
    originalPrice: 85,
    unit: "500g",
    image: "/images/farm_vegetables/broccoli_clean.jpg",
    rating: 4.9,
    reviewsCount: 760,
    badge: "Crisp Florets",
    isBestSeller: true,
    description:
      "Tender, nutrient-dense green florets bursting with vitamin C, folate, and living plant enzymes. Zero chemical pesticides.",
  },
  {
    id: "veg-potatoes-organic",
    name: "Organic Farm Potatoes",
    category: "Roots Vegetables",
    farmer: "Nandi Organic Soil Beds",
    price: 35,
    originalPrice: 48,
    unit: "1 kg",
    image: "/images/farm_vegetables/potatoes_clean.jpg",
    rating: 4.8,
    reviewsCount: 1840,
    badge: "Thin Skin Staple",
    isPopular: true,
    description:
      "Naturally sweet, starchy farm potatoes with ultra-thin golden skins. Ideal for everyday curries, boiling, and roasting.",
  },
  {
    id: "veg-capsicum-bell",
    name: "Green Bell Peppers / Capsicum",
    category: "Fresh Vegetables",
    farmer: "Nandi Controlled Polyhouse",
    price: 42,
    originalPrice: 55,
    unit: "500g",
    image: "/images/farm_vegetables/bell_peppers_clean.jpg",
    rating: 4.8,
    reviewsCount: 650,
    badge: "Polyhouse Fresh",
    isPopular: true,
    description:
      "Crisp, thick-walled green bell peppers harvested fresh every dawn. Plump, juicy, and rich in antioxidant vitamin A & C.",
  },
  {
    id: "veg-ginger-organic",
    name: "Organic Fresh Ginger & Roots",
    category: "Roots Vegetables",
    farmer: "Nandi Shade-Grown Agroforest",
    price: 55,
    originalPrice: 70,
    unit: "250g",
    image: "/images/farm_vegetables/roots_clean.jpg",
    rating: 4.9,
    reviewsCount: 1120,
    badge: "Aromatic Root",
    isBestSeller: true,
    description:
      "Hand-dug aromatic ginger rhizomes and roots packed with natural essential gingerols. Intense aroma and authentic warmth.",
  },
  {
    id: "veg-spinach-tender",
    name: "Fresh Green Spinach (Palak)",
    category: "Fresh Vegetables",
    farmer: "Nandi Morning Harvest Patch",
    price: 30,
    originalPrice: 42,
    unit: "300g",
    image: "/images/farm_vegetables/spinach_clean.jpg",
    rating: 4.9,
    reviewsCount: 1680,
    badge: "Tender Morning Cut",
    isPopular: true,
    description:
      "Tender, vibrant green spinach leaves hand-cut at 5:00 AM. Washed in ozonated pure spring water and rich in bio-available iron.",
  },
];

interface FarmVegetablesShelfProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export default function FarmVegetablesShelf({
  isOpen,
  onClose,
  onSelectProduct,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}: FarmVegetablesShelfProps) {
  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  if (!isOpen) return null;

  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

  const getUnitOptions = (unit: string) => {
    const u = (unit || "").toLowerCase();
    if (u.includes("basket")) {
      return ["1 basket", "2 baskets"];
    }
    if (u.includes("250g")) {
      return ["250g", "500g", "1 kg"];
    }
    if (u.includes("300g")) {
      return ["300g", "600g (2 bunches)", "1 kg"];
    }
    if (u.includes("1 kg") || u.includes("kg")) {
      return ["500g", "1 kg", "2 kg"];
    }
    return ["500g", "1 kg", "2 kg"];
  };

  const getAdjustedPrice = (prod: Product, selectedUnit: string) => {
    const basePrice = prod.price;
    const baseUnit = (prod.unit || "").toLowerCase();
    const u = (selectedUnit || baseUnit).toLowerCase();

    if (u === baseUnit) return basePrice;
    if (u.includes("250g")) {
      return baseUnit.includes("500g") ? Math.round(basePrice * 0.55) : Math.round(basePrice * 0.3);
    }
    if (u.includes("500g")) {
      return baseUnit.includes("1 kg") ? Math.round(basePrice * 0.55) : basePrice;
    }
    if (u.includes("2 kg") || u.includes("2 baskets") || u.includes("600g")) {
      return Math.round(basePrice * 1.9);
    }
    if (u.includes("1 kg")) {
      return baseUnit.includes("500g") ? Math.round(basePrice * 1.9) : basePrice;
    }
    return basePrice;
  };

  return (
    <section
      id="farm-vegetables-shelf"
      className="w-full bg-[#fbf7ee] border-y border-[#ede3d2] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 transition-all duration-500 animate-in fade-in slide-in-from-top-4"
      aria-label="Fresh Farm Vegetables Collection"
    >
      <div className="max-w-7xl mx-auto">
        {/* Model 1 Warm Parchment Header */}
        <div className="bg-white/80 backdrop-blur-xs border border-[#ede3d2] rounded-3xl p-5 sm:p-7 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef4ee] border border-[#d6e5d7] text-[#245e33] text-xs font-semibold uppercase tracking-wider mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Nandi Organic Soil Beds • Harvested Daily</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1b4332] tracking-tight">
              Fresh Farm Harvest Vegetables
            </h2>
            <p className="text-sm sm:text-base text-[#4a5e50] mt-1">
              Pure living harvest cultivated with organic compost, spring water & zero chemical sprays.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b4332] text-[#fbf7ee] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e5b369]" />
              <span>8 Farm Vegetables Available</span>
            </span>

            {/* Close Shelf Button */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#f3ede0] border border-[#d8ccb8] text-[#334637] hover:text-[#0f1f13] text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Close vegetables showcase"
            >
              <X className="w-4 h-4" />
              <span>Close Showcase</span>
            </button>
          </div>
        </div>

        {/* 8 Farm Vegetables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {FARM_VEGETABLES.map((product) => {
            const currentUnit = selectedUnits[product.id] || product.unit;
            const unitOptions = getUnitOptions(product.unit);
            const currentPrice = getAdjustedPrice(product, currentUnit);
            const originalPrice = product.originalPrice
              ? Math.round(product.originalPrice * (currentPrice / product.price))
              : Math.round(currentPrice * 1.3);
            const discountPercent = Math.round(
              ((originalPrice - currentPrice) / originalPrice) * 100
            );
            const quantity = getProductQuantity(product.id);
            const isDropdownOpen = openDropdownId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#ede3d2] hover:border-[#245e33]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top Badge & Image Area */}
                <div>
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#f7f3ea] mb-3.5">
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1b4332]/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                        <Leaf className="w-3 h-3 text-[#d3f9d8]" />
                        {product.badge || "Farm Fresh"}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      title="View farm details"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#1b4332] text-xs font-bold shadow-md hover:scale-105 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </span>
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/vegetable-basket.png";
                      }}
                    />
                  </div>

                  {/* Sourcing */}
                  <p className="text-[11px] font-medium text-[#65776a] mb-1">
                    🌱 {product.farmer}
                  </p>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-base sm:text-lg font-serif font-bold text-[#1e3c23] group-hover:text-[#245e33] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  {/* Unit Selector Dropdown */}
                  <div className="relative mt-2 mb-3">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownId(isDropdownOpen ? null : product.id)
                      }
                      className="w-full flex items-center justify-between px-3 py-1.5 bg-[#fbf7ee] hover:bg-[#f3ede0] border border-[#e2d5bd] rounded-xl text-xs font-semibold text-[#284a2d] transition-colors cursor-pointer"
                    >
                      <span>Weight: {currentUnit}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#527058] transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-[#e2d5bd] rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                        {unitOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSelectedUnits((prev) => ({
                                ...prev,
                                [product.id]: opt,
                              }));
                              setOpenDropdownId(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#fbf7ee] transition-colors cursor-pointer ${
                              currentUnit === opt
                                ? "font-bold text-[#1b4332] bg-[#f5efe4]"
                                : "text-[#4a5e50]"
                            }`}
                          >
                            <span>{opt}</span>
                            {currentUnit === opt && (
                              <Check className="w-3.5 h-3.5 text-[#1b4332]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="pt-2 border-t border-[#f0e8d9] flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-[#1b4332]">
                        ₹{currentPrice}
                      </span>
                      {originalPrice > currentPrice && (
                        <span className="text-xs text-[#8c9c90] line-through font-medium">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Add to Cart / Quantity Stepper */}
                  <div>
                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          onAddToCart({
                            ...product,
                            price: currentPrice,
                            unit: currentUnit,
                          })
                        }
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b4332] hover:bg-[#143426] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-[#1b4332] text-white rounded-full px-2 py-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5 min-w-[16px] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
