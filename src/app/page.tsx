'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product, CartItem } from '@/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { BarcoopBevySection } from '@/components/BarcoopBevySection';
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
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
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
      <main className="space-y-4 sm:space-y-6">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Barcoop Bevy Inspired 3D Rotating "REAL INGREDIENTS ONLY" Feature Section */}
        <BarcoopBevySection />

        {/* Continuous Background Wrapper from Popular Categories to Just For You */}
        <div className="relative overflow-hidden">
          {/* Ambient Continuous Rotating Watermark & Floating Icons Background Layer */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30 z-0">
            {/* Top Left Rotating Watermark Ring */}
            <div className="absolute top-[3%] -left-20 w-80 h-80 rounded-full border-4 border-dashed border-emerald-300/40 animate-[spin_40s_linear_infinite] flex items-center justify-center">
              <span className="text-6xl text-emerald-500/30">🌿</span>
            </div>

            {/* Middle Right Rotating Watermark Ring */}
            <div className="absolute top-[28%] -right-24 w-96 h-96 rounded-full border-4 border-dashed border-[#3d1e31]/20 animate-[spin_45s_linear_infinite_reverse] flex items-center justify-center">
              <span className="text-7xl text-[#3d1e31]/20">🍋</span>
            </div>

            {/* Lower Left Rotating Watermark Ring */}
            <div className="absolute top-[60%] -left-28 w-[420px] h-[420px] rounded-full border-4 border-dashed border-amber-300/40 animate-[spin_50s_linear_infinite] flex items-center justify-center">
              <span className="text-8xl text-amber-500/20">🍅</span>
            </div>

            {/* Bottom Right Watermark Ring */}
            <div className="absolute bottom-[5%] -right-20 w-80 h-80 rounded-full border-4 border-dashed border-rose-300/40 animate-[spin_38s_linear_infinite_reverse] flex items-center justify-center">
              <span className="text-6xl text-rose-500/30">🍓</span>
            </div>
          </div>

          {/* Foreground Sections Content */}
          <div className="relative z-10 space-y-4 sm:space-y-6">
            {/* 3. Popular Categories */}
            <PopularCategories />

            {/* 4. Today's Fresh Picks */}
            <TodaysFreshPicks
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 5. Promo Banners Row */}
            <PromoBanners />

            {/* 6. Weekly Best Selling items */}
            <WeeklyBestSelling
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 7. Most Selling Products */}
            <MostSellingProducts
              products={filteredProducts}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 8. Call To Action Banner */}
            <CTABanner />

            {/* 9. Just for you */}
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
