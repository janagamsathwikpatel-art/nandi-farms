'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface TodaysFreshPicksProps {
  products: Product[];
  cartItems: CartItem[];
  lovedItems?: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onToggleLoved?: (productId: string) => void;
  onShowAll?: () => void;
}

export const TodaysFreshPicks: React.FC<TodaysFreshPicksProps> = ({
  products,
  cartItems,
  lovedItems = [],
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onToggleLoved,
  onShowAll,
}) => {
  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

  const activeProducts = products.slice(0, 5);

  return (
    <section id="todays-picks" className="w-full max-w-none bg-[#fbf9f4] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 my-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Section Header (Matching Reference Screenshot Title) */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a8e4c] tracking-tight font-serif inline-block">
            Our Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1.5">
            Farm-harvested daily & delivered fresh directly to your doorstep
          </p>
        </div>

        {/* 5-Column Product Cards Row (Matching Reference Screenshot Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {activeProducts.map((prod, idx) => {
            const qty = getProductQuantity(prod.id);
            const isLoved = lovedItems.includes(prod.id);
            const discountPercent = idx === 0 ? '18%' : idx === 1 ? '17%' : idx === 2 ? '18%' : idx === 3 ? '10%' : '14%';
            const originalPrice = Math.round(prod.price * 1.2);

            return (
              <div
                key={prod.id}
                className="bg-[#f7f3e8] border border-amber-200/60 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Badges: Left Yellow Discount Pill | Right Green Bestseller Pill */}
                  <div className="flex items-center justify-between mb-3 z-10 relative">
                    <span className="bg-amber-400 text-gray-950 font-black text-xs px-2.5 py-1 rounded-full shadow-2xs">
                      {discountPercent} OFF
                    </span>

                    <span className="bg-[#1a8e4c] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-2xs">
                      Bestseller
                    </span>
                  </div>

                  {/* Product Image Container — Full Length Image Fit */}
                  <div
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    className="w-full h-52 sm:h-60 rounded-2xl bg-white p-3 flex items-center justify-center overflow-hidden border border-amber-100 shadow-inner mb-4 cursor-pointer relative"
                  >
                    {/* Floating Loved Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleLoved) onToggleLoved(prod.id);
                      }}
                      className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-xs border border-gray-200/60"
                      title={isLoved ? "Remove from Loved Wishlist" : "Add to Loved Wishlist"}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isLoved ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'}`} />
                    </button>

                    {/* High Definition Full Length Product Image */}
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
                    className="font-extrabold text-sm sm:text-base text-gray-900 text-center line-clamp-1 mb-2 cursor-pointer group-hover:text-[#1a8e4c] transition-colors"
                  >
                    {prod.name}
                  </h3>

                  {/* Product Price Row (Current Price + Strike-through MRP) */}
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-base sm:text-lg font-black text-gray-900">
                      ₹ {prod.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through font-semibold">
                      ₹ {originalPrice}
                    </span>
                  </div>

                  {/* Variant Dropdown Selector Pill Container */}
                  <div className="border border-gray-900 rounded-full px-4 py-1.5 text-xs font-extrabold flex items-center justify-between bg-white text-gray-900 cursor-pointer mb-4 shadow-2xs hover:bg-gray-50 transition-colors">
                    <span>{prod.unit || '500 ml'}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-700 stroke-[3]" />
                  </div>
                </div>

                {/* Add to Cart / Quantity Selector Full-Width Button */}
                <div className="w-full pt-1">
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => onAddToCart(prod)}
                      className="w-full bg-[#1a8e4c] hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base py-3 px-6 rounded-full shadow-md hover:shadow-emerald-700/30 transition-all duration-200 cursor-pointer text-center block active:scale-95"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full bg-[#1a8e4c] text-white rounded-full py-2 px-4 flex items-center justify-between shadow-md">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(prod.id, -1)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="font-black text-sm">{qty} in Cart</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(prod.id, 1)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
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
