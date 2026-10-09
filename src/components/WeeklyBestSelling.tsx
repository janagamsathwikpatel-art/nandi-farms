'use client';

import React, { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { CATEGORIES } from '@/data/products';
import { CategoryQuickNav } from './CategoryQuickNav';

interface WeeklyBestSellingProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onShowAll?: () => void;
}

export const WeeklyBestSelling: React.FC<WeeklyBestSellingProps> = ({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onShowAll,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ghee');

  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ghee') return p.name.toLowerCase().includes('ghee') || p.category === 'Dairy';
    if (activeCategory === 'oils') return p.name.toLowerCase().includes('oil') || p.category === 'Oils';
    if (activeCategory === 'atta') return p.name.toLowerCase().includes('atta') || p.category === 'Ravva';
    if (activeCategory === 'honey') return p.name.toLowerCase().includes('honey') || p.name.toLowerCase().includes('karam');
    if (activeCategory === 'combos') return p.isBestSeller;
    if (activeCategory === 'fresh-vegetables') return p.category === 'Fresh Vegetables' || p.category === 'Roots Vegetables';
    if (activeCategory === 'fruits') return p.category === 'Fruits';
    if (activeCategory === 'dairy') return p.category === 'Dairy' || p.category === 'Eggs';
    return true;
  }).slice(0, 5);

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 pt-0 sm:pt-1 pb-4 sm:pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans flex items-center gap-2">
            <span>Weekly Best Selling items</span>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              100% Traditional
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Authentic farm-fresh essentials bilona churned & wood pressed
          </p>
        </div>
        <button
          onClick={onShowAll}
          className="flex items-center space-x-2 bg-emerald-950 hover:bg-emerald-900 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
        >
          <span>Show All</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Anveshan Category Quick-Nav Circular Bar */}
      <CategoryQuickNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />

      {/* 5 Product Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {filteredProducts.map((prod) => {
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
