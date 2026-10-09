'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Minus, Sparkles, Heart, Check } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface JustForYouProps {
  products: Product[];
  cartItems: CartItem[];
  lovedItems?: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onToggleLoved?: (productId: string) => void;
  onShowAll?: () => void;
}

export const JustForYou: React.FC<JustForYouProps> = ({
  products,
  cartItems,
  lovedItems = [],
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onToggleLoved,
  onShowAll,
}) => {
  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

  const justForYouItems = [
    { product: products.find((p) => p.name.includes('Basmati Rice')) || products[4], tag: 'FREQUENTLY BOUGHT' },
    { product: products.find((p) => p.name.includes('Pineapple')) || products[8], tag: 'RECOMMENDED' },
    { product: products.find((p) => p.name.includes('Papaya')) || products[14], tag: 'DIET MATCH' },
    { product: products.find((p) => p.name.includes('Tomatoes')) || products[0], tag: 'DAILY ESSENTIAL' },
    { product: products.find((p) => p.name.includes('Strawberries')) || products[11], tag: 'FARM FRESH' },
  ];

  const getVariantOptions = (unit: string) => {
    const u = (unit || '').toLowerCase();
    if (u.includes('ghee') || u.includes('l') || u.includes('ml')) {
      return ['500 ml', '1 L', '2 L'];
    }
    if (u.includes('dozen')) {
      return ['per dozen', 'half dozen'];
    }
    if (u.includes('g') || u.includes('kg')) {
      return ['500g', '1 kg', '2 kg'];
    }
    return ['Small Pack', 'Standard Pack', 'Family Pack'];
  };

  const getAdjustedPrice = (prod: Product, selectedUnit: string) => {
    const basePrice = prod.price;
    const u = selectedUnit.toLowerCase();
    if (u.includes('500g') || u.includes('500 ml') || u.includes('half')) {
      return Math.round(basePrice * 0.55);
    }
    if (u.includes('2 kg') || u.includes('2 l') || u.includes('2l')) {
      return Math.round(basePrice * 1.9);
    }
    return basePrice;
  };

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 my-6 sm:my-8">
      {/* Soft Sage Green Container Wrapper */}
      <div className="bg-emerald-50/80 p-5 sm:p-8 rounded-3xl border border-emerald-100/90 shadow-xs max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight font-sans flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400 animate-pulse" />
              <span>Just for you</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800/80 font-medium mt-0.5">
              Personalized organic farm recommendations curated for your kitchen
            </p>
          </div>
          <button
            type="button"
            onClick={onShowAll}
            className="flex items-center space-x-2 bg-emerald-950 hover:bg-emerald-900 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
          >
            <span>Explore All</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* 5 Product Cards Grid inside Sage Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
          {justForYouItems.map(({ product: prod, tag }, idx) => {
            const qty = getProductQuantity(prod.id);
            const isLoved = lovedItems.includes(prod.id);
            const discountPercent = idx % 3 === 0 ? '18%' : idx % 3 === 1 ? '17%' : '14%';

            const variantOptions = getVariantOptions(prod.unit);
            const currentUnit = selectedUnits[prod.id] || prod.unit || variantOptions[0];
            const currentPrice = getAdjustedPrice(prod, currentUnit);
            const originalPrice = Math.round(currentPrice * 1.2);
            const isDropdownOpen = openDropdownId === prod.id;

            return (
              <div
                key={prod.id}
                className="bg-[#f7f3e8] border border-amber-200/60 rounded-3xl p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2.5 z-10 relative">
                    <span className="bg-amber-400 text-gray-950 font-black text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-2xs">
                      {discountPercent} OFF
                    </span>

                    <span className="bg-[#1a8e4c] text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-2xs">
                      {tag}
                    </span>
                  </div>

                  {/* Compact Product Image Container Box */}
                  <div
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    className="w-full h-36 sm:h-44 md:h-48 rounded-2xl bg-white p-2.5 flex items-center justify-center overflow-hidden border border-amber-100 shadow-inner mb-3 cursor-pointer relative"
                  >
                    {/* Floating Loved Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleLoved) onToggleLoved(prod.id);
                      }}
                      className="absolute top-2 right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-xs border border-gray-200/60"
                      title={isLoved ? "Remove from Loved Wishlist" : "Add to Loved Wishlist"}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isLoved ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'}`} />
                    </button>

                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain block group-hover:scale-105 transition-transform duration-300 rounded-xl"
                      loading="eager"
                    />
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    className="font-extrabold text-xs sm:text-sm text-gray-900 text-center line-clamp-1 mb-1.5 cursor-pointer group-hover:text-[#1a8e4c] transition-colors"
                  >
                    {prod.name}
                  </h3>

                  {/* Product Price Row */}
                  <div className="flex items-center justify-center space-x-1.5 mb-2">
                    <span className="text-sm sm:text-base font-black text-gray-900">
                      ₹ {currentPrice}
                    </span>
                    <span className="text-[11px] text-gray-400 line-through font-semibold">
                      ₹ {originalPrice}
                    </span>
                  </div>

                  {/* Interactive Variant Dropdown Selector Pill */}
                  <div className="relative mb-3 z-30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : prod.id);
                      }}
                      className="w-full border border-gray-900 rounded-full px-3 py-1 text-[11px] font-extrabold flex items-center justify-between bg-white text-gray-900 cursor-pointer shadow-2xs hover:bg-gray-50 transition-colors"
                    >
                      <span>{currentUnit}</span>
                      <ChevronDown className={`w-3 h-3 text-gray-700 stroke-[3] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Options Popup Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl p-1 z-40 animate-fade-in">
                        {variantOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUnits((prev) => ({ ...prev, [prod.id]: opt }));
                              setOpenDropdownId(null);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                              currentUnit === opt
                                ? 'bg-emerald-50 text-emerald-950 font-black'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{opt}</span>
                            {currentUnit === opt && <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart / Quantity Selector Full-Width Button */}
                <div className="w-full pt-1">
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart({ ...prod, price: currentPrice, unit: currentUnit });
                      }}
                      className="w-full bg-[#1a8e4c] hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-full shadow-md hover:shadow-emerald-700/30 transition-all duration-200 cursor-pointer text-center block active:scale-95"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full bg-[#1a8e4c] text-white rounded-full py-1.5 px-3 flex items-center justify-between shadow-md">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, -1);
                        }}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>
                      <span className="font-black text-xs sm:text-sm">{qty} in Cart</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, 1);
                        }}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
