'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronUp, Plus, Minus, Star, Heart, Sparkles, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
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
  // Layout variant state: 'modern-quick-add' | 'spotlight-carousel' | 'compact-rows' | 'glassmorphic-premium'
  const [layoutMode, setLayoutMode] = useState<'modern-quick-add' | 'spotlight-carousel' | 'compact-rows' | 'glassmorphic-premium'>('modern-quick-add');

  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProducts = products.slice(0, 10);
  const featuredProduct = activeProducts[0];

  return (
    <section id="todays-picks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-8 sm:pb-10 relative scroll-mt-20">
      {/* Top Scroll Back Up Icon */}
      <div className="flex justify-center mb-2">
        <button
          onClick={scrollToTop}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-500 hover:text-emerald-800 flex items-center justify-center transition-colors border border-gray-200/80 shadow-2xs cursor-pointer"
          title="Back to Top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Section Header & Layout Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
            Today's Fresh Picks
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Farm-harvested daily & delivered within 2 hours
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Mode Selector Pills */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/80 text-xs font-semibold text-gray-700">
            <button
              onClick={() => setLayoutMode('modern-quick-add')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                layoutMode === 'modern-quick-add'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'hover:text-emerald-700'
              }`}
            >
              Layout 1 (Blinkit)
            </button>
            <button
              onClick={() => setLayoutMode('spotlight-carousel')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                layoutMode === 'spotlight-carousel'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'hover:text-emerald-700'
              }`}
            >
              Layout 2 (Spotlight)
            </button>
            <button
              onClick={() => setLayoutMode('compact-rows')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                layoutMode === 'compact-rows'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'hover:text-emerald-700'
              }`}
            >
              Layout 3 (Rows)
            </button>
            <button
              onClick={() => setLayoutMode('glassmorphic-premium')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                layoutMode === 'glassmorphic-premium'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'hover:text-emerald-700'
              }`}
            >
              Layout 4 (Glass)
            </button>
          </div>

          <button
            onClick={onShowAll || scrollToTop}
            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
          >
            <span>Show All</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* LAYOUT 1: Modern Quick-Add Grocery Cards (Clean Floating Cards without Heavy Grid Boxes) */}
      {layoutMode === 'modern-quick-add' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 animate-in fade-in duration-200">
          {activeProducts.map((prod, idx) => {
            const qty = getProductQuantity(prod.id);
            const isLoved = lovedItems.includes(prod.id);

            return (
              <div
                key={prod.id}
                className="flex flex-col justify-between group relative transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image Container with Floating Heart Love Button & Discount Badge */}
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="w-full h-36 sm:h-44 mb-3 flex items-center justify-center overflow-hidden rounded-2xl bg-white p-2.5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/80 relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                    {idx % 2 === 0 ? '15% OFF' : 'FRESH'}
                  </div>

                  {/* Loved (Wishlist Heart Button) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleLoved) onToggleLoved(prod.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-xs border border-gray-200/60"
                    title={isLoved ? "Remove from Loved Wishlist" : "Add to Loved Wishlist"}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isLoved ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'}`} />
                  </button>

                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="space-y-1 mb-3 cursor-pointer px-1"
                >
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {prod.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-extrabold text-gray-800">{prod.rating || 4.9}</span>
                    <span className="text-[10px] text-gray-400 font-medium">({prod.reviewsCount || 40})</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-semibold">{prod.farmer}</p>
                </div>

                {/* Bottom Row: Price + Add to Cart Button */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 px-1">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-gray-900 block leading-none">
                      ₹{prod.price}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                      / {prod.unit}
                    </span>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-1.5 rounded-full transition-all shadow-xs hover:shadow-md hover:scale-105 flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div className="bg-emerald-950 text-white rounded-full py-1 px-3 flex items-center space-x-2.5 shadow-md">
                      <button
                        onClick={() => onUpdateQuantity(prod.id, -1)}
                        className="text-white hover:text-emerald-200 p-0.5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs">{qty}</span>
                      <button
                        onClick={() => onUpdateQuantity(prod.id, 1)}
                        className="text-white hover:text-emerald-200 p-0.5 cursor-pointer"
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
      )}

      {/* LAYOUT 2: Featured Spotlight Hero Card + Grid Carousel */}
      {layoutMode === 'spotlight-carousel' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 animate-in fade-in duration-200">
          {/* Featured Spotlight Hero Card */}
          {featuredProduct && (
            <div className="lg:col-span-1 bg-gradient-to-br from-emerald-900 via-emerald-850 to-teal-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-4 right-4 bg-amber-400 text-gray-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>Deal of the Day</span>
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Spotlight Pick
                </span>
                <h3 className="text-xl font-extrabold mt-1 leading-snug">
                  {featuredProduct.name}
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  Freshly picked by {featuredProduct.farmer}
                </p>

                <div className="my-5 relative h-44 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-2 border border-white/20">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-2xl font-black text-amber-300">₹{featuredProduct.price}</span>
                  <span className="text-xs text-emerald-200 font-medium">/ {featuredProduct.unit}</span>
                  <span className="text-xs text-emerald-400 line-through ml-auto">₹{featuredProduct.price + 20}</span>
                </div>

                <button
                  onClick={() => onAddToCart(featuredProduct)}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs py-3 px-4 rounded-full transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Deal to Cart</span>
                </button>
              </div>
            </div>
          )}

          {/* Remaining 9 Grid Cards */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activeProducts.slice(1, 10).map((prod) => {
              const qty = getProductQuantity(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-3.5 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    className="w-full h-28 sm:h-32 mb-2 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-2 cursor-pointer"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div onClick={() => onSelectProduct && onSelectProduct(prod)} className="space-y-0.5 mb-2 cursor-pointer">
                    <h4 className="font-bold text-xs text-gray-900 truncate group-hover:text-emerald-700">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium">{prod.farmer}</p>
                    <span className="text-xs font-black text-gray-900 block">₹{prod.price} / {prod.unit}</span>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full bg-emerald-50 hover:bg-emerald-700 text-emerald-900 hover:text-white font-bold text-xs py-1.5 rounded-full transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-950 text-white rounded-full py-1 px-3 flex items-center justify-between">
                      <button onClick={() => onUpdateQuantity(prod.id, -1)} className="cursor-pointer"><Minus className="w-3 h-3" /></button>
                      <span className="font-bold text-xs">{qty}</span>
                      <button onClick={() => onUpdateQuantity(prod.id, 1)} className="cursor-pointer"><Plus className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LAYOUT 3: Compact 2-Column Horizontal Rows (Instamart Row View) */}
      {layoutMode === 'compact-rows' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
          {activeProducts.map((prod) => {
            const qty = getProductQuantity(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-3.5 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-200 flex items-center justify-between gap-4 group"
              >
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 shrink-0 p-1.5 cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                  />
                </div>

                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="flex-1 min-w-0 space-y-1 cursor-pointer"
                >
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    {prod.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 truncate group-hover:text-emerald-700">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">Sourced by {prod.farmer}</p>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-base font-black text-gray-900">₹{prod.price}</span>
                    <span className="text-xs text-gray-500">/ {prod.unit}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-full shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="bg-emerald-950 text-white rounded-full py-1.5 px-3 flex items-center space-x-2 shadow-md">
                      <button onClick={() => onUpdateQuantity(prod.id, -1)} className="cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="font-bold text-xs">{qty}</span>
                      <button onClick={() => onUpdateQuantity(prod.id, 1)} className="cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LAYOUT 4: Floating Premium Glassmorphic Cards */}
      {layoutMode === 'glassmorphic-premium' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 animate-in fade-in duration-200">
          {activeProducts.map((prod) => {
            const qty = getProductQuantity(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/40 rounded-[32px] p-4 border border-emerald-100/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-center group relative backdrop-blur-xs"
              >
                {/* Floating Heart Icon */}
                <button className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-gray-500 hover:text-rose-500 flex items-center justify-center transition-colors shadow-2xs">
                  <Heart className="w-4 h-4" />
                </button>

                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="w-full h-32 sm:h-36 mb-3 flex items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div onClick={() => onSelectProduct && onSelectProduct(prod)} className="space-y-1 mb-4 cursor-pointer">
                  <div className="flex items-center justify-center space-x-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-black text-gray-900">{prod.rating || 4.9}</span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-emerald-900 font-semibold">{prod.farmer}</p>
                  <span className="text-sm font-black text-gray-900 block pt-1">
                    ₹{prod.price} <span className="text-xs font-medium text-gray-500">/ {prod.unit}</span>
                  </span>
                </div>

                <div>
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full bg-gray-900 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3 rounded-full transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-950 text-white rounded-full py-2 px-3 flex items-center justify-between shadow-md">
                      <button onClick={() => onUpdateQuantity(prod.id, -1)} className="cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="font-bold text-xs">{qty} in Cart</span>
                      <button onClick={() => onUpdateQuantity(prod.id, 1)} className="cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
