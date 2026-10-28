'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, Heart, ArrowLeft, Check, Sparkles, Filter } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface FilteredCategoryProductsProps {
  categoryName: string;
  products: Product[];
  cartItems: CartItem[];
  lovedItems?: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSelectProduct?: (product: Product) => void;
  onToggleLoved?: (productId: string) => void;
  onClearFilter: () => void;
}

export const FilteredCategoryProducts: React.FC<FilteredCategoryProductsProps> = ({
  categoryName,
  products,
  cartItems,
  lovedItems = [],
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onToggleLoved,
  onClearFilter,
}) => {
  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const getProductQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.product.id === id);
    return item ? item.quantity : 0;
  };

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
    if (u.includes('pack')) {
      return ['per pack', 'pack of 2', 'family pack'];
    }
    return ['Small Pack', 'Standard Pack', 'Family Pack'];
  };

  const getAdjustedPrice = (prod: Product, selectedUnit: string) => {
    const basePrice = prod.price;
    const u = selectedUnit.toLowerCase();
    const baseUnit = (prod.unit || '').toLowerCase();
    if (u === baseUnit) {
      return basePrice;
    }
    if (u.includes('500g') || u.includes('500 ml') || u.includes('half')) {
      return Math.round(basePrice * 0.55);
    }
    if (u.includes('pack of 2')) {
      return Math.round(basePrice * 1.9);
    }
    if (u.includes('family pack')) {
      return Math.round(basePrice * 2.7);
    }
    if (u.includes('2 kg') || u.includes('2 l') || u.includes('2l')) {
      return Math.round(basePrice * 1.9);
    }
    if (u.includes('5 kg')) {
      return Math.round(basePrice * 4.5);
    }
    return basePrice;
  };

  return (
    <section id="category-products-view" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-8 relative">
      {/* Category Header with Back Button and Products Count */}
      <div className="bg-emerald-900/5 border border-emerald-900/10 rounded-3xl p-5 sm:p-7 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onClearFilter}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 mb-2 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Categories</span>
          </button>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b6b38] font-serif tracking-tight">
              {categoryName}
            </h2>
            <span className="bg-[#1b6b38] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
              {products.length} {products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Showing only products available in <span className="font-bold text-emerald-900">{categoryName}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClearFilter}
          className="self-start sm:self-auto bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center space-x-2"
        >
          <Filter className="w-3.5 h-3.5 text-emerald-700" />
          <span>Show All Products</span>
        </button>
      </div>

      {/* When no products match */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-8">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🧺
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found in this category</h3>
          <p className="text-xs text-gray-500 mb-6">
            We are restocking fresh farm produce for {categoryName}. Check back soon!
          </p>
          <button
            type="button"
            onClick={onClearFilter}
            className="bg-[#1a8e4c] hover:bg-emerald-800 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
          >
            Browse All Categories
          </button>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
          {products.map((prod, idx) => {
            const qty = getProductQuantity(prod.id);
            const isLoved = lovedItems.includes(prod.id);
            const discountPercent = idx % 2 === 0 ? '15%' : '10%';

            const variantOptions = getVariantOptions(prod.unit);
            const currentUnit = selectedUnits[prod.id] || prod.unit || variantOptions[0];
            const currentPrice = getAdjustedPrice(prod, currentUnit);
            const isDropdownOpen = openDropdownId === prod.id;

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 border border-emerald-950/5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative hover:-translate-y-1.5"
              >
                {/* Product Image Stage */}
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-[#f8f9fa] overflow-hidden flex items-center justify-center mb-2.5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                    loading="lazy"
                  />

                  {/* Top Discount Badge */}
                  <div className="absolute top-2 left-2 bg-[#F3D778] text-[#4A3800] text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
                    {discountPercent} OFF
                  </div>

                  {/* Wishlist Love Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleLoved) onToggleLoved(prod.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                      isLoved
                        ? 'bg-red-50 text-red-500 fill-red-500 shadow-sm'
                        : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLoved ? 'fill-current text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Product Information */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block truncate">
                      {prod.category}
                    </span>
                    <h3 className="font-extrabold text-xs sm:text-[13px] text-gray-900 line-clamp-2 leading-snug mt-0.5 group-hover:text-emerald-800 transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Price Row */}
                  <div className="mt-2 flex items-baseline space-x-1.5">
                    <span className="text-sm sm:text-base font-black text-gray-900">
                      ₹{currentPrice}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                      ₹{Math.round(currentPrice * 1.2)}
                    </span>
                  </div>

                  {/* Weight / Unit Dropdown Selector */}
                  <div className="relative mt-2 mb-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : prod.id);
                      }}
                      className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-[11px] py-1 px-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="truncate">{currentUnit}</span>
                      <ChevronDown className="w-3 h-3 text-gray-500 ml-1 flex-shrink-0" />
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
                            className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
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
                      className="w-full bg-[#28563D] hover:bg-[#1E422F] text-white font-extrabold text-xs sm:text-sm py-2 sm:py-2.5 px-3 rounded-full shadow-md hover:shadow-emerald-950/30 transition-all duration-200 cursor-pointer text-center block active:scale-95"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full bg-[#28563D] text-white rounded-full py-1 sm:py-1.5 px-2.5 sm:px-3 flex items-center justify-between shadow-md">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, -1);
                        }}
                        className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </button>
                      <span className="font-black text-xs sm:text-sm px-1 truncate">{qty} in Cart</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, 1);
                        }}
                        className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </button>
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
