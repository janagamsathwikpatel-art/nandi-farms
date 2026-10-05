'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Headphones, 
  Leaf,
  Menu,
  X
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';

interface HeaderProps {
  cartCount: number;
  lovedCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  lovedCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-40 shadow-xs border-b border-gray-100">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Country Selector (India 🇮🇳 IN) */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50/80 px-3 py-1.5 rounded-full border border-gray-200/60 cursor-pointer hover:bg-gray-100 transition-colors">
          <span className="text-base">🇮🇳</span>
          <span className="font-medium text-xs tracking-wide">IN</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>

        {/* Center-Left: Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Grocery Items..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200/80 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex items-center justify-center">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-emerald-100 text-emerald-600" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 font-serif">
              Nandi<span className="text-emerald-600 font-sans font-bold">Farms</span>
            </span>
          </a>
        </div>

        {/* Right Utility Buttons (Login/Signup removed as requested) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Loved / Wishlist */}
          <button 
            className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-emerald-700 transition-colors py-1.5 px-2 rounded-full hover:bg-gray-50"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="w-4 h-4 text-gray-700" />
              {lovedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {lovedCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline tracking-wider uppercase text-[11px]">LOVED</span>
          </button>

          {/* Cart Drawer Trigger */}
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

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Bar */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-xs font-medium">
          {/* Left Navigation Pills */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
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

          {/* Right Navigation Group */}
          <div className="hidden lg:flex items-center space-x-4 text-gray-600 text-xs font-medium">
            <a href="#policy" className="hover:text-emerald-800 transition-colors">Policy</a>
            <a href="#faqs" className="hover:text-emerald-800 transition-colors">FAQ's</a>
            <a href="#help" className="flex items-center space-x-1.5 hover:text-emerald-800 transition-colors">
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span>Help & Support</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
