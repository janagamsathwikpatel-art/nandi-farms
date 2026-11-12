"use client";

import React, { useState } from "react";
import { Plus, Minus, Zap, Sparkles, Clock, CheckCircle2, Search, ArrowRight } from "lucide-react";

export interface HarvestProduct {
  id: string;
  name: string;
  category: "greens" | "veggies" | "fruits" | "dairy" | "pantry";
  categoryLabel: string;
  weight: string;
  price: number;
  originalPrice: number;
  discount: string;
  eta: string;
  tag?: string;
  image: string;
  description: string;
}

export const HARVEST_PRODUCTS: HarvestProduct[] = [
  {
    id: "spinach-palak",
    name: "Baby Spinach (Tender Palak)",
    category: "greens",
    categoryLabel: "Leafy Greens",
    weight: "250 g",
    price: 36,
    originalPrice: 48,
    discount: "25% OFF",
    eta: "15 MINS",
    tag: "Morning Harvest",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    description: "Crisp pesticide-free baby spinach picked at dawn, triple-washed and packed fresh.",
  },
  {
    id: "butterhead-lettuce",
    name: "Hydroponic Butterhead Lettuce",
    category: "greens",
    categoryLabel: "Leafy Greens",
    weight: "1 bunch (200 g)",
    price: 65,
    originalPrice: 85,
    discount: "23% OFF",
    eta: "15 MINS",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=600&q=80",
    description: "Delicate, sweet buttery leaves grown with clean mountain mineral water.",
  },
  {
    id: "desi-tomatoes",
    name: "Vine-Ripened Country Tomatoes",
    category: "veggies",
    categoryLabel: "Fresh Veggies",
    weight: "500 g",
    price: 28,
    originalPrice: 38,
    discount: "26% OFF",
    eta: "15 MINS",
    tag: "Naturally Ripened",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    description: "Tangy heirloom country tomatoes bursting with authentic aroma and rich flavor.",
  },
  {
    id: "orange-carrots",
    name: "Organic Tender Farm Carrots",
    category: "veggies",
    categoryLabel: "Fresh Veggies",
    weight: "500 g",
    price: 42,
    originalPrice: 55,
    discount: "23% OFF",
    eta: "18 MINS",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    description: "Sweet, crunchy soil-grown organic carrots packed with natural beta-carotene.",
  },
  {
    id: "fresh-strawberries",
    name: "Sweet Highland Farm Strawberries",
    category: "fruits",
    categoryLabel: "Fruits",
    weight: "200 g box",
    price: 110,
    originalPrice: 145,
    discount: "24% OFF",
    eta: "15 MINS",
    tag: "Seasonal Pick",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    description: "Succulent, handpicked ruby strawberries with intense natural sweetness.",
  },
  {
    id: "bell-peppers",
    name: "Crisp Trio Bell Peppers",
    category: "veggies",
    categoryLabel: "Fresh Veggies",
    weight: "3 pcs (approx 350g)",
    price: 75,
    originalPrice: 95,
    discount: "21% OFF",
    eta: "15 MINS",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80",
    description: "Bright red, yellow, and green capsicums harvested straight from polyhouse beds.",
  },
  {
    id: "a2-desi-milk",
    name: "Fresh A2 Gir Cow Raw Milk",
    category: "dairy",
    categoryLabel: "Dairy & Eggs",
    weight: "1 Litre Glass Bottle",
    price: 88,
    originalPrice: 105,
    discount: "16% OFF",
    eta: "15 MINS",
    tag: "Pure A2",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    description: "Unadulterated raw A2 milk from grass-fed indigenous cows, chilled immediately.",
  },
  {
    id: "country-eggs",
    name: "Pastured Free-Range Country Eggs",
    category: "dairy",
    categoryLabel: "Dairy & Eggs",
    weight: "6 pcs pack",
    price: 68,
    originalPrice: 85,
    discount: "20% OFF",
    eta: "15 MINS",
    tag: "Free Range",
    image: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=600&q=80",
    description: "Golden yolk eggs laid by happy chickens foraging outdoors under open skies.",
  },
  {
    id: "wild-forest-honey",
    name: "Raw Unfiltered Forest Honey",
    category: "pantry",
    categoryLabel: "Pantry & Oils",
    weight: "350 g Jar",
    price: 240,
    originalPrice: 295,
    discount: "18% OFF",
    eta: "20 MINS",
    tag: "100% Raw",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "Ethically harvested wild multifloral nectar with preserved pollen and enzymes.",
  },
  {
    id: "wood-pressed-oil",
    name: "Cold Wood-Pressed Mustard Oil",
    category: "pantry",
    categoryLabel: "Pantry & Oils",
    weight: "500 ml Bottle",
    price: 165,
    originalPrice: 195,
    discount: "15% OFF",
    eta: "20 MINS",
    tag: "Traditional Kachi Ghani",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "Cold extracted in wooden churners to preserve natural pungency, nutrients, and aroma.",
  },
];

interface ZeptoHarvestSectionProps {
  cart: { [productId: string]: number };
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  onOpenCart: () => void;
}

export default function ZeptoHarvestSection({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}: ZeptoHarvestSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "🌿 All Harvest" },
    { id: "greens", label: "🥬 Leafy Greens" },
    { id: "veggies", label: "🥕 Fresh Veggies" },
    { id: "fruits", label: "🍎 Orchard Fruits" },
    { id: "dairy", label: "🥛 Dairy & Eggs" },
    { id: "pantry", label: "🍯 Cold-Pressed & Honey" },
  ];

  const filteredProducts = HARVEST_PRODUCTS.filter((product) => {
    const matchesCat = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="harvest-store" className="relative bg-[#f7f5ef] py-12 sm:py-16 border-b border-[#e5dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Zepto Header Banner with Quick Commerce Polish */}
        <div className="bg-gradient-to-r from-[#173220] via-[#1b3a25] to-[#254d32] rounded-2xl p-5 sm:p-7 text-white shadow-xl mb-8 relative overflow-hidden border border-[#2e593a]">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c8924b]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
            <div>
              {/* Delivery Speed / Zepto Style Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a5538] border border-[#3e754e] text-xs font-semibold text-[#e8c07e] mb-2.5">
                <Zap className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                <span>Zepto Fast-Dispatch • Harvest to Kitchen in 15–25 Mins</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Today&apos;s Fresh Farm Harvest
              </h2>
              <p className="text-sm sm:text-base text-[#cfded1] mt-1">
                Zero chemical fertilizers. Zero transit cold-storage delays. Plucked fresh every morning.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="w-full lg:w-72 relative">
              <input
                type="text"
                placeholder="Search greens, veggies, milk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 text-sm border border-white/20 focus:border-[#d89b4f] focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-white/60 absolute left-3 top-3.5" />
            </div>
          </div>
        </div>

        {/* Zepto Category Pills Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                  isActive
                    ? "bg-[#162e1e] text-white shadow-md ring-2 ring-[#c8924b]"
                    : "bg-white text-[#38483b] hover:bg-[#eae4d7] border border-[#dcd6c8]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {filteredProducts.map((product) => {
            const qty = cart[product.id] || 0;
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl sm:rounded-2xl border border-[#e8e2d4] hover:border-[#b87a38] overflow-hidden flex flex-col justify-between p-3 sm:p-3.5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Product Image Box */}
                  <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#f3efe6] mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* ETA Badge */}
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[#183420] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-[#e0dbcd]">
                      <Clock className="w-2.5 h-2.5 text-[#b87a38]" />
                      <span>{product.eta}</span>
                    </div>

                    {/* Tag / Discount Badge */}
                    {product.tag ? (
                      <div className="absolute top-2 left-2 bg-[#173822] text-[#e8c07e] text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                        {product.tag}
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 bg-[#b87a38] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow">
                        {product.discount}
                      </div>
                    )}
                  </div>

                  {/* Weight / Pack */}
                  <span className="text-[11px] font-semibold text-[#738374] block tracking-wide">
                    {product.weight}
                  </span>

                  {/* Title */}
                  <h3 className="font-medium text-xs sm:text-sm text-[#1b2b1d] line-clamp-2 mt-0.5 leading-snug group-hover:text-[#b87a38] transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Price and Zepto Action Button */}
                <div className="mt-3 pt-2.5 border-t border-[#f0ece1] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-[#183420]">
                        ₹{product.price}
                      </span>
                      <span className="text-[11px] text-[#939e94] line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Zepto Add Button / Stepper */}
                  <div>
                    {qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(product.id)}
                        className="px-3 sm:px-4 py-1.5 rounded-lg border-2 border-[#1c4028] bg-white text-[#1c4028] hover:bg-[#1c4028] hover:text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#1c4028] text-white rounded-lg px-1.5 py-1 shadow-md">
                        <button
                          onClick={() => onRemoveFromCart(product.id)}
                          className="p-1 hover:bg-[#2b5a3a] rounded transition-colors active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAddToCart(product.id)}
                          className="p-1 hover:bg-[#2b5a3a] rounded transition-colors active:scale-90"
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

        {/* Feature Badges below products */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#e2dcd0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b3d26]/10 flex items-center justify-center text-[#1b3d26]">
              <Sparkles className="w-5 h-5 text-[#b87a38]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a2d1e]">Zero Preservatives</p>
              <p className="text-[11px] text-[#697a6b]">Natural organic soil nourishment</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b3d26]/10 flex items-center justify-center text-[#1b3d26]">
              <Clock className="w-5 h-5 text-[#b87a38]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a2d1e]">Dawn Harvest Dispatch</p>
              <p className="text-[11px] text-[#697a6b]">Arrives within hours of plucking</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b3d26]/10 flex items-center justify-center text-[#1b3d26]">
              <CheckCircle2 className="w-5 h-5 text-[#b87a38]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a2d1e]">100% Traceable Origin</p>
              <p className="text-[11px] text-[#697a6b]">Know your farmer &amp; field bed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b3d26]/10 flex items-center justify-center text-[#1b3d26]">
              <Zap className="w-5 h-5 text-[#b87a38]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a2d1e]">Direct Farm Pricing</p>
              <p className="text-[11px] text-[#697a6b]">No middlemen markups</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
