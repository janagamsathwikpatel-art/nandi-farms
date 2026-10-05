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
import SmoothScrollSlider from '@/components/SmoothScrollSlider';
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
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 relative overflow-x-hidden">
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

      {/* AMBIENT ANIMATED 3D FRUITS & VEGETABLES BACKDROP SYMBOLS LAYER */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-40">
        {/* Floating 3D Broccoli */}
        <div className="absolute top-[12%] left-[2%] text-5xl sm:text-6xl animate-bounce-slow transform hover:scale-125 transition-transform filter drop-shadow-md">
          🥦
        </div>

        {/* Floating 3D Carrot */}
        <div className="absolute top-[18%] right-[3%] text-5xl sm:text-6xl animate-pulse-slow transform rotate-12 filter drop-shadow-md">
          🥕
        </div>

        {/* Floating 3D Tomato */}
        <div className="absolute top-[28%] left-[4%] text-5xl sm:text-6xl animate-bounce-slow transform -rotate-12 filter drop-shadow-md">
          🍅
        </div>

        {/* Floating 3D Banana */}
        <div className="absolute top-[34%] right-[2%] text-5xl sm:text-6xl animate-pulse-slow transform rotate-45 filter drop-shadow-md">
          🍌
        </div>

        {/* Floating 3D Pineapple */}
        <div className="absolute top-[44%] left-[3%] text-5xl sm:text-6xl animate-bounce-slow transform -rotate-6 filter drop-shadow-md">
          🍍
        </div>

        {/* Floating 3D Strawberry */}
        <div className="absolute top-[52%] right-[4%] text-5xl sm:text-6xl animate-pulse-slow transform rotate-12 filter drop-shadow-md">
          🍓
        </div>

        {/* Floating 3D Avocado */}
        <div className="absolute top-[62%] left-[2%] text-5xl sm:text-6xl animate-bounce-slow transform rotate-15 filter drop-shadow-md">
          🥑
        </div>

        {/* Floating 3D Lemon */}
        <div className="absolute top-[70%] right-[3%] text-5xl sm:text-6xl animate-pulse-slow transform -rotate-12 filter drop-shadow-md">
          🍋
        </div>

        {/* Floating 3D Grapes */}
        <div className="absolute top-[80%] left-[4%] text-5xl sm:text-6xl animate-bounce-slow transform rotate-6 filter drop-shadow-md">
          🍇
        </div>

        {/* Floating 3D Chili */}
        <div className="absolute top-[88%] right-[2%] text-5xl sm:text-6xl animate-pulse-slow transform -rotate-45 filter drop-shadow-md">
          🌶️
        </div>

        {/* Floating 3D Mint Leaf */}
        <div className="absolute top-[95%] left-[3%] text-5xl sm:text-6xl animate-bounce-slow transform rotate-12 filter drop-shadow-md">
          🌿
        </div>
      </div>

      {/* Main Continuous Sections */}
      <main className="space-y-6 sm:space-y-8 py-4 relative z-10">
        {/* 1. Hero Section */}
        <HeroSection />

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

        {/* Originkit Smooth Scroll Slider (Farm Produce Showcase) */}
        <SmoothScrollSlider />

        {/* 7. Call To Action Banner */}
        <CTABanner />

        {/* 8. Just for you */}
        <JustForYou
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </main>

      {/* Footer Section */}
      <div className="relative z-10">
        <Footer />
      </div>

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
