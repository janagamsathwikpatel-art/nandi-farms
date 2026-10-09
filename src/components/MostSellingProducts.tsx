'use client';

import React from 'react';
import { ChevronRight, Plus, Minus, Star, Crown } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface MostSellingProductsProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onShowAll?: () => void;
}

export const MostSellingProducts: React.FC<MostSellingProductsProps> = ({
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

  const topSellingList = products.slice(4, 9);

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 pt-2 sm:pt-4 pb-4 sm:pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans flex items-center gap-2">
            <span>🔥 Most Selling Products</span>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              Top Customer Favorites
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Highest rated farm fresh produce & daily kitchen essentials
          </p>
        </div>
        <button
          onClick={onShowAll}
          className="flex items-center space-x-2 bg-emerald-950 hover:bg-emerald-900 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
        >
          <span>View All</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 5 Product Cards Grid — Anveshan Gold Crown Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {topSellingList.map((prod, idx) => {
          const qty = getProductQuantity(prod.id);
          const isTopOne = idx === 0;
          const isTopTwo = idx === 1;

          return (
            <div
              key={prod.id}
              className={`bg-white rounded-3xl p-4 border transition-all duration-200 flex flex-col justify-between items-center text-center group relative overflow-hidden ${
                isTopOne || isTopTwo
                  ? 'border-amber-300 shadow-md hover:shadow-xl ring-2 ring-amber-400/30'
                  : 'border-gray-100/90 shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Rank Crown Badge */}
              {isTopOne && (
                <div className="absolute top-2 left-2 bg-amber-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs tracking-wider z-10 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-200 fill-amber-200" />
                  <span>#1 BESTSELLER</span>
                </div>
              )}
              {isTopTwo && (
                <div className="absolute top-2 left-2 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs tracking-wider z-10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>#2 TOP RATED</span>
                </div>
              )}

              {/* Product Image */}
              <div
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="w-28 h-28 sm:w-32 sm:h-32 mt-4 mb-2 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/50 p-2 group-hover:scale-105 transition-transform cursor-pointer"
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

                {/* Rating Stats */}
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>4.9</span>
                  <span className="text-gray-400 font-normal">({80 + idx * 15})</span>
                </div>

                <p className="text-[11px] text-gray-400 font-medium">{prod.farmer}</p>

                {/* Pricing with MRP Strike-through */}
                <div className="pt-1 flex items-center justify-center gap-1.5">
                  <span className="text-base font-extrabold text-emerald-950">
                    ₹{prod.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through font-normal">
                    ₹{Math.round(prod.price * 1.2)}
                  </span>
                  <span className="text-[11px] font-normal text-gray-500">
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
    </section>
  );
};
