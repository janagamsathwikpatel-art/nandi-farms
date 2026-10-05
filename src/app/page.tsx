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
          
          {/* 3D Background Canvas Animations (Text Rings, Watermarks, Floating Icons) */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-40">
            {/* Top Center 3D Rotating Text Ring (Behind Popular Categories) */}
            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[480px] h-[480px] md:w-[620px] md:h-[620px] rounded-full flex items-center justify-center animate-[spin_35s_linear_infinite]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path
                    id="ringTop"
                    d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
                  />
                </defs>
                <text className="fill-[#fcd34d] text-[16px] font-black tracking-[0.25em] uppercase">
                  <textPath href="#ringTop" startOffset="0%">
                    • 100% NATURAL INGREDIENTS • NO ARTIFICIAL PRESERVATIVES • DIRECT FROM FARMERS • ZERO CHEMICALS 
                  </textPath>
                </text>
              </svg>

              {/* Orbiting Icons */}
              <span className="absolute -top-2 text-3xl">🍋</span>
              <span className="absolute top-[15%] right-[8%] text-3xl">🌶️</span>
              <span className="absolute top-1/2 -right-2 text-3xl">🍍</span>
              <span className="absolute bottom-[15%] right-[8%] text-3xl">🍅</span>
              <span className="absolute -bottom-2 text-3xl">🌿</span>
              <span className="absolute bottom-[15%] left-[8%] text-3xl">🍓</span>
              <span className="absolute top-1/2 -left-2 text-3xl">🥒</span>
              <span className="absolute top-[15%] left-[8%] text-3xl">🍊</span>
            </div>

            {/* Middle Section 3D Watermark Text (REAL INGREDIENTS ONLY) */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-center opacity-30">
              <h2 className="text-6xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                REAL<br />
                <span className="text-[#fcd34d]">INGREDIENTS</span><br />
                ONLY
              </h2>
            </div>

            {/* Mid-Lower 3D Rotating Text Ring (Behind Weekly Best Selling) */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[520px] h-[520px] md:w-[680px] md:h-[680px] rounded-full flex items-center justify-center animate-[spin_42s_linear_infinite_reverse]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path
                    id="ringMid"
                    d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
                  />
                </defs>
                <text className="fill-[#fcd34d] text-[16px] font-black tracking-[0.25em] uppercase">
                  <textPath href="#ringMid" startOffset="0%">
                    • FARM FRESH PRODUCE • 100% ORGANIC & PURE • SAME-DAY DELIVERY • NANDI FARMS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-2 text-3xl">🌿</span>
              <span className="absolute top-1/2 -right-2 text-3xl">🍅</span>
              <span className="absolute -bottom-2 text-3xl">🍋</span>
              <span className="absolute top-1/2 -left-2 text-3xl">🌶️</span>
            </div>

            {/* Bottom 3D Rotating Text Ring (Behind Just For You) */}
            <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[480px] h-[480px] md:w-[600px] md:h-[600px] rounded-full flex items-center justify-center animate-[spin_38s_linear_infinite]">
              <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
                <defs>
                  <path
                    id="ringBottom"
                    d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
                  />
                </defs>
                <text className="fill-[#fcd34d] text-[16px] font-black tracking-[0.25em] uppercase">
                  <textPath href="#ringBottom" startOffset="0%">
                    • 100% NATURAL INGREDIENTS • NO ARTIFICIAL PRESERVATIVES • DIRECT FROM FARMERS 
                  </textPath>
                </text>
              </svg>
              <span className="absolute -top-2 text-3xl">🍓</span>
              <span className="absolute top-1/2 -right-2 text-3xl">🍍</span>
              <span className="absolute -bottom-2 text-3xl">🥒</span>
              <span className="absolute top-1/2 -left-2 text-3xl">🍊</span>
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
