'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product, CartItem } from '@/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularCategories } from '@/components/PopularCategories';
import { TodaysFreshPicks } from '@/components/TodaysFreshPicks';
import { PromoBanners } from '@/components/PromoBanners';
import { WeeklyBestSelling } from '@/components/WeeklyBestSelling';
import { MostSellingProducts } from '@/components/MostSellingProducts';
import { CTABanner } from '@/components/CTABanner';
import { JustForYou } from '@/components/JustForYou';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LoginModal } from '@/components/LoginModal';

export default function Home() {
  // Initial cart with items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 3 }, // Organic Red Tomatoes
    { product: PRODUCTS[1], quantity: 2 }, // Fresh Bananas
    { product: PRODUCTS[2], quantity: 2 }, // Fresh Whole Milk
    { product: PRODUCTS[3], quantity: 2 }, // Premium Basmati Rice
  ]);

  const [lovedItems, setLovedItems] = useState<string[]>(['prod-1', 'prod-3']);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-[#3d1e31] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header Bar */}
      <Header
        cartCount={cartCount}
        lovedCount={lovedItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddToCart={handleAddToCart}
      />

      {/* Search results banner if search active */}
      {searchQuery.trim() && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">
              Showing results for "{searchQuery}" ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Main Continuous Sections */}
      <main className="w-full">
        {/* 1. Hero Section (In clean container) */}
        <div className="bg-[#f8f9fa] py-2">
          <HeroSection />
        </div>

        {/* FULL LENGTH EDGE-TO-EDGE 3D ROTATING BACKGROUND CANVAS (Popular Categories to Just For You) */}
        <div className="relative bg-[#3d1e31] text-white py-8 sm:py-12 w-full overflow-hidden border-t border-[#522943]">
          
          {/* 3D Background Canvas Animations (Fixed & Multi-Section Giant Rotating Circles) */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-45">
            
            {/* GIANT CIRCLE 1: Behind Popular Categories & Today's Fresh Picks */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[820px] md:h-[820px] lg:w-[920px] lg:h-[920px] rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path id="ring1" d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0" />
                </defs>
                <text className="fill-[#fcd34d] text-[15px] font-black tracking-[0.22em] uppercase">
                  <textPath href="#ring1" startOffset="0%">
                    • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-3 text-4xl">🍋</span>
              <span className="absolute top-[14%] right-[7%] text-4xl">🌶️</span>
              <span className="absolute top-1/2 -right-3 text-4xl">🍍</span>
              <span className="absolute bottom-[14%] right-[7%] text-4xl">🍅</span>
              <span className="absolute -bottom-3 text-4xl">🌿</span>
              <span className="absolute bottom-[14%] left-[7%] text-4xl">🍓</span>
              <span className="absolute top-1/2 -left-3 text-4xl">🥒</span>
              <span className="absolute top-[14%] left-[7%] text-4xl">🍊</span>
            </div>
            <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center opacity-40">
              <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none font-sans drop-shadow-2xl">
                NANDI<br /><span className="text-[#8ee435]">FARMS</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-extrabold text-[#fcd34d] uppercase tracking-[0.3em]">
                Fresh Vegetables & Organic Fruits • 100% Quality
              </p>
            </div>

            {/* GIANT CIRCLE 2: Behind Promo Banners & Weekly Best Selling */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[820px] md:h-[820px] lg:w-[920px] lg:h-[920px] rounded-full flex items-center justify-center animate-[spin_45s_linear_infinite_reverse]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path id="ring2" d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0" />
                </defs>
                <text className="fill-[#fcd34d] text-[15px] font-black tracking-[0.22em] uppercase">
                  <textPath href="#ring2" startOffset="0%">
                    • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-3 text-4xl">🌿</span>
              <span className="absolute top-1/2 -right-3 text-4xl">🍅</span>
              <span className="absolute -bottom-3 text-4xl">🍋</span>
              <span className="absolute top-1/2 -left-3 text-4xl">🌶️</span>
            </div>
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 text-center opacity-40">
              <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none font-sans drop-shadow-2xl">
                NANDI<br /><span className="text-[#8ee435]">FARMS</span>
              </h2>
            </div>

            {/* GIANT CIRCLE 3: Behind Most Selling Products & CTA Banner */}
            <div className="absolute top-[68%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[820px] md:h-[820px] lg:w-[920px] lg:h-[920px] rounded-full flex items-center justify-center animate-[spin_38s_linear_infinite]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path id="ring3" d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0" />
                </defs>
                <text className="fill-[#fcd34d] text-[15px] font-black tracking-[0.22em] uppercase">
                  <textPath href="#ring3" startOffset="0%">
                    • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-3 text-4xl">🍓</span>
              <span className="absolute top-1/2 -right-3 text-4xl">🍍</span>
              <span className="absolute -bottom-3 text-4xl">🥒</span>
              <span className="absolute top-1/2 -left-3 text-4xl">🍊</span>
            </div>
            <div className="absolute top-[72%] left-1/2 -translate-x-1/2 text-center opacity-40">
              <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none font-sans drop-shadow-2xl">
                NANDI<br /><span className="text-[#8ee435]">FARMS</span>
              </h2>
            </div>

            {/* GIANT CIRCLE 4: Behind Just For You */}
            <div className="absolute top-[92%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[820px] md:h-[820px] lg:w-[920px] lg:h-[920px] rounded-full flex items-center justify-center animate-[spin_42s_linear_infinite_reverse]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path id="ring4" d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0" />
                </defs>
                <text className="fill-[#fcd34d] text-[15px] font-black tracking-[0.22em] uppercase">
                  <textPath href="#ring4" startOffset="0%">
                    • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS • FRESH VEGETABLES & ORGANIC FRUITS • DAIRY PRODUCTS • 100% QUALITY PRODUCTS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-3 text-4xl">🍋</span>
              <span className="absolute top-1/2 -right-3 text-4xl">🌶️</span>
            </div>
            <div className="absolute top-[94%] left-1/2 -translate-x-1/2 text-center opacity-40">
              <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none font-sans drop-shadow-2xl">
                NANDI<br /><span className="text-[#8ee435]">FARMS</span>
              </h2>
            </div>

          </div>

          {/* Foreground Main Sections directly on Edge-to-Edge 3D Plum Canvas */}
          <div className="relative z-10 space-y-8 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 2. Popular Categories Section */}
            <PopularCategories />

            {/* 3. Today's Fresh Picks */}
            <TodaysFreshPicks
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 4. Promo Banners Row */}
            <PromoBanners />

            {/* 5. Weekly Best Selling items */}
            <WeeklyBestSelling
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 6. Most Selling Products */}
            <MostSellingProducts
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 7. Call To Action Banner */}
            <CTABanner />

            {/* 8. Just for you */}
            <JustForYou
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Login / Signup Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
