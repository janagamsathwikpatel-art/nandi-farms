'use client';

import React from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';
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
    products.find((p) => p.name.includes('Basmati Rice')) || products[4],
    products.find((p) => p.name.includes('Pineapple')) || products[8],
    products.find((p) => p.name.includes('Papaya')) || products[14],
    products.find((p) => p.name.includes('Tomatoes')) || products[0],
    products.find((p) => p.name.includes('Strawberries')) || products[11],
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-0 mb-0">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Just for you
        </h2>
        <button
          onClick={onShowAll}
          className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
        >
          <span>Show All</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 5 Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {justForYouItems.map((prod) => {
          const qty = getProductQuantity(prod.id);
          return (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-4 border border-gray-100/90 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between items-center text-center group"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="w-28 h-28 sm:w-32 sm:h-32 mb-3 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/50 p-2 group-hover:scale-105 transition-transform cursor-pointer"
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
                className="space-y-1 w-full mb-4 cursor-pointer"
              >
                <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium">{prod.farmer}</p>
                <div className="pt-1">
                  <span className="text-sm font-extrabold text-gray-900">
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
                    className="w-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-800 font-medium text-xs py-2 px-3 rounded-full transition-all duration-150 flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="w-full bg-emerald-950 text-white rounded-full py-1.5 px-3 flex items-center justify-between shadow-md">
                    <button
                      onClick={() => onUpdateQuantity(prod.id, -1)}
                      className="w-6 h-6 rounded-full hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs">{qty}</span>
                    <button
                      onClick={() => onUpdateQuantity(prod.id, 1)}
                      className="w-6 h-6 rounded-full hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
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
