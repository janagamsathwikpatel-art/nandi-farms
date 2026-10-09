'use client';

import React from 'react';
import { ChevronRight, Plus, Minus, Sparkles, Heart } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface JustForYouProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onShowAll?: () => void;
}

export const JustForYou: React.FC<JustForYouProps> = ({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onShowAll,
}) => {
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

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 my-6 sm:my-8">
      {/* Soft Sage Green Container Wrapper */}
      <div className="bg-emerald-50/80 p-5 sm:p-8 rounded-3xl border border-emerald-100/90 shadow-xs">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {justForYouItems.map(({ product: prod, tag }) => {
            const qty = getProductQuantity(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-4 border border-emerald-100/90 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between items-center text-center group relative overflow-hidden"
              >
                {/* Recommendation Tag Chip */}
                <div className="absolute top-2 left-2 bg-emerald-100 text-emerald-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs tracking-wider z-10">
                  {tag}
                </div>

                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="w-28 h-28 sm:w-32 sm:h-32 mt-4 mb-2 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/50 p-2 group-hover:scale-105 transition-transform cursor-pointer relative"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Product Details */}
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="space-y-1 w-full mb-3 cursor-pointer"
                >
                  <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium">{prod.farmer}</p>
                  <div className="pt-1">
                    <span className="text-base font-extrabold text-emerald-950">
                      ₹{prod.price}
                    </span>
                    <span className="text-[11px] font-normal text-gray-500 ml-1">
                      / {prod.unit}
                    </span>
                  </div>
                </div>

                {/* Add to Cart / Quantity Control */}
                <div className="w-full">
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs py-2 px-3 rounded-full transition-all duration-150 flex items-center justify-center space-x-1.5 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-950 text-white rounded-full py-1.5 px-3 flex items-center justify-between shadow-md">
                      <button
                        onClick={() => onUpdateQuantity(prod.id, -1)}
                        className="w-6 h-6 rounded-full hover:bg-emerald-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs">{qty}</span>
                      <button
                        onClick={() => onUpdateQuantity(prod.id, 1)}
                        className="w-6 h-6 rounded-full hover:bg-emerald-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
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
