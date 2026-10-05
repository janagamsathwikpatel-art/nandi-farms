'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Leaf,
  Plus,
  X
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface HeaderProps {
  cartCount: number;
  lovedCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLocation: () => void;
  selectedCity: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddToCart?: (product: Product) => void;
  onSelectCategory?: (catName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  lovedCount,
  onOpenCart,
  onOpenWishlist,
  onOpenLocation,
  selectedCity,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onSelectCategory,
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for instant live search dropdown
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-40 shadow-xs border-b border-gray-100">
      {/* Top Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Country Selector (India 🇮🇳 IN) */}
        <button
          onClick={onOpenLocation}
          className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-700 bg-gray-50/80 px-2.5 sm:px-3 py-1.5 rounded-full border border-gray-200/60 cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
        >
          <span className="text-sm sm:text-base">🇮🇳</span>
          <span className="font-bold text-xs tracking-wide text-gray-900">{selectedCity || 'IN'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {/* Center: Brand Logo (NandiFarms) */}
        <div className="flex items-center justify-center">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-emerald-100 text-emerald-600" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 font-serif">
              Nandi<span className="text-emerald-600 font-sans font-bold">Farms</span>
            </span>
          </a>
        </div>

        {/* Right Utility Buttons (Loved & Cart) */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Loved / Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-emerald-700 transition-colors py-1.5 px-2.5 rounded-full hover:bg-gray-50 cursor-pointer"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="w-4 h-4 text-gray-700" />
              {lovedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {lovedCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline tracking-wider uppercase text-[11px] font-bold">LOVED</span>
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full border border-emerald-200/70 transition-all font-semibold text-xs shadow-xs hover:shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span className="tracking-wider uppercase text-[11px] font-bold">CART</span>
            <span className="bg-emerald-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              {cartCount}
            </span>
          </button>
        </div>

      </div>

      {/* Sub-Header Bar (Down of Main Header, right above Hero Section) */}
      <div className="border-t border-gray-100 bg-gray-50/50 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium">
          
          {/* Left Side: Navigation Pills */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
            <a
              href="#shop"
              className="bg-emerald-950 text-white px-4 py-1.5 rounded-full font-semibold transition-colors shadow-xs shrink-0"
            >
              Shop
            </a>

            {/* Categories Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-800 px-3 py-1.5 rounded-full hover:bg-white transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="flex items-center justify-between px-4 py-2 hover:bg-emerald-50 text-gray-800 text-xs font-medium transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#deals" className="text-gray-700 hover:text-emerald-800 px-3 py-1.5 rounded-full hover:bg-white transition-colors shrink-0">
              Deals
            </a>
            <a href="#fresh-produce" className="text-gray-700 hover:text-emerald-800 px-3 py-1.5 rounded-full hover:bg-white transition-colors shrink-0">
              Fresh Produce
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-800 px-3 py-1.5 rounded-full hover:bg-white transition-colors shrink-0">
              About
            </a>
          </nav>

          {/* Right Side: Search Grocery Items Input Bar (Placed down of main header right above Hero Section) */}
          <div ref={searchRef} className="w-full sm:w-80 md:w-96 relative shrink-0">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                placeholder="Search Grocery Items..."
                className="w-full pl-9 pr-8 py-1.5 bg-white border border-gray-200/90 rounded-full text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Live Search Results Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim() !== '' && (
              <div className="absolute top-full right-0 left-0 sm:left-auto sm:w-80 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto">
                <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Matching Grocery Items ({searchResults.length})
                </div>
                {searchResults.length === 0 ? (
                  <div className="px-4 py-4 text-xs text-gray-500 text-center">
                    No grocery items found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50/80 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-gray-900 truncate">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-medium">
                            ₹{prod.price} / {prod.unit}
                          </p>
                        </div>
                      </div>
                      {onAddToCart && (
                        <button
                          onClick={() => {
                            onAddToCart(prod);
                            setIsSearchDropdownOpen(false);
                          }}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold py-1 px-2.5 rounded-full flex items-center space-x-1 shadow-xs transition-colors shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
