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
import { JustForYou } from '@/components/JustForYou';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LoginModal } from '@/components/LoginModal';
import { ProductModal } from '@/components/ProductModal';
import { WishlistModal } from '@/components/WishlistModal';
import { LocationModal } from '@/components/LocationModal';
import { Toast, ToastMessage } from '@/components/Toast';

export default function Home() {
  // Cart items state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 3 }, // Organic Red Tomatoes
    { product: PRODUCTS[1], quantity: 2 }, // Fresh Bananas
    { product: PRODUCTS[2], quantity: 2 }, // Fresh Whole Milk
    { product: PRODUCTS[3], quantity: 2 }, // Premium Basmati Rice
  ]);

  // Wishlist loved product IDs
  const [lovedItems, setLovedItems] = useState<string[]>(['prod-1', 'prod-3']);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast feedback state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

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
    addToast(`Added ${product.name} to your cart!`);
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
    const itemToRemove = PRODUCTS.find((p) => p.id === productId);
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      addToast(`Removed ${itemToRemove.name} from cart`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleLoved = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setLovedItems((prev) => {
      const isCurrentlyLoved = prev.includes(productId);
      if (isCurrentlyLoved) {
        if (prod) addToast(`Removed ${prod.name} from your Loved list`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prod) addToast(`Saved ${prod.name} to your Loved list!❤️`);
        return [...prev, productId];
      }
    });
  };

  const handleClaimOffer = (offerTitle: string) => {
    addToast(`Offer claimed! 🎉 (${offerTitle}) Code applied at checkout.`, 'success');
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategoryFilter(catName);
    addToast(`Filtered showcase for "${catName}"`, 'info');
  };

  const handleShowAllProducts = () => {
    setSelectedCategoryFilter(null);
    setSearchQuery('');
    addToast(`Showing all farm fresh products`, 'info');
    const el = document.getElementById('todays-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter products based on search query or selected category filter
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = searchQuery.trim()
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategoryFilter
      ? p.category.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
        (selectedCategoryFilter === 'Fresh Vegetables' && p.category === 'Vegetables')
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf9f4] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 relative overflow-x-hidden">
      {/* Header Bar */}
      <Header
        cartCount={cartCount}
        lovedCount={lovedItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddToCart={handleAddToCart}
        onSelectCategory={handleSelectCategory}
      />

      {/* Active Filter Banner (Search or Category Filter) */}
      {(searchQuery.trim() || selectedCategoryFilter) && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">
              {searchQuery.trim()
                ? `Showing search results for "${searchQuery}" (${filteredProducts.length} items found)`
                : `Showing category: "${selectedCategoryFilter}" (${filteredProducts.length} items found)`}
            </span>
            <button
              onClick={handleShowAllProducts}
              className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
            >
              Clear Filter / Show All
            </button>
          </div>
        </div>
      )}

      {/* WARM ORGANIC BACKGROUND LAYER WITH ENLARGED FLOATING LEAVES & HIGHER DENSITY */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Soft Organic Warm Cream Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f4] via-[#f7f6ee] to-[#fbfaf5]"></div>

        {/* High Density & Extra Large Floating Organic Leaves with Soft Blur */}
        <div className="absolute top-[3%] left-[1%] text-7xl sm:text-8xl lg:text-9xl opacity-55 blur-[1px] animate-bounce-slow transform -rotate-12">🍃</div>
        <div className="absolute top-[8%] right-[2%] text-8xl sm:text-9xl lg:text-[140px] opacity-45 blur-[1.5px] animate-pulse-slow transform rotate-45">🌿</div>
        <div className="absolute top-[14%] left-[6%] text-6xl sm:text-7xl opacity-60 animate-bounce-slow transform rotate-25">🌱</div>
        <div className="absolute top-[20%] right-[5%] text-7xl sm:text-8xl lg:text-9xl opacity-50 blur-[1px] animate-pulse-slow transform -rotate-45">🍃</div>
        <div className="absolute top-[26%] left-[2%] text-8xl sm:text-9xl opacity-55 blur-[2px] animate-bounce-slow transform rotate-30">🌿</div>
        <div className="absolute top-[33%] right-[3%] text-6xl sm:text-7xl opacity-65 animate-pulse-slow transform -rotate-15">🍃</div>
        <div className="absolute top-[40%] left-[5%] text-7xl sm:text-8xl opacity-50 blur-[1px] animate-bounce-slow transform rotate-45">🌱</div>
        <div className="absolute top-[48%] right-[6%] text-8xl sm:text-9xl lg:text-[130px] opacity-45 blur-[1.5px] animate-pulse-slow transform -rotate-30">🌿</div>
        <div className="absolute top-[56%] left-[3%] text-7xl sm:text-8xl opacity-60 animate-bounce-slow transform rotate-12">🍃</div>
        <div className="absolute top-[64%] right-[4%] text-8xl sm:text-9xl opacity-50 blur-[1px] animate-pulse-slow transform -rotate-45">🌱</div>
        <div className="absolute top-[72%] left-[6%] text-6xl sm:text-7xl opacity-65 animate-bounce-slow transform rotate-30">🌿</div>
        <div className="absolute top-[81%] right-[2%] text-8xl sm:text-9xl lg:text-[130px] opacity-50 blur-[2px] animate-pulse-slow transform -rotate-20">🍃</div>
        <div className="absolute top-[89%] left-[4%] text-7xl sm:text-8xl opacity-55 animate-bounce-slow transform rotate-15">🌿</div>
        <div className="absolute top-[96%] right-[5%] text-6xl sm:text-7xl opacity-60 animate-pulse-slow transform -rotate-10">🌱</div>

        {/* Left Bottom Botanical Foliage Accent SVG (Enlarged) */}
        <div className="absolute bottom-0 left-0 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] opacity-35 pointer-events-none transform -translate-x-12 translate-y-12">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-800">
            <path d="M20 180 C50 120, 90 80, 150 40 M40 160 C70 140, 80 110, 70 80 M90 120 C120 100, 130 70, 110 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <circle cx="150" cy="40" r="12" fill="currentColor" opacity="0.7" />
            <circle cx="70" cy="80" r="14" fill="currentColor" opacity="0.6" />
            <circle cx="110" cy="50" r="16" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        {/* Right Bottom Botanical Foliage Accent SVG (Enlarged) */}
        <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] opacity-35 pointer-events-none transform translate-x-12 translate-y-12">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-800">
            <path d="M180 180 C150 120, 110 80, 50 40 M160 160 C130 140, 120 110, 130 80 M110 120 C80 100, 70 70, 90 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <circle cx="50" cy="40" r="12" fill="currentColor" opacity="0.7" />
            <circle cx="130" cy="80" r="14" fill="currentColor" opacity="0.6" />
            <circle cx="90" cy="50" r="16" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Main Continuous Sections */}
      <main className="space-y-6 sm:space-y-8 py-4 relative z-10">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Popular Categories Section */}
        <PopularCategories
          onSelectCategory={handleSelectCategory}
          onShowAll={handleShowAllProducts}
        />

        {/* 3. Today's Fresh Picks */}
        <TodaysFreshPicks
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onShowAll={handleShowAllProducts}
        />

        {/* 4. Promo Banners Row */}
        <PromoBanners onClaimOffer={handleClaimOffer} />

        {/* 5. Weekly Best Selling items */}
        <WeeklyBestSelling
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onShowAll={handleShowAllProducts}
        />

        {/* 6. Most Selling Products */}
        <MostSellingProducts
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onShowAll={handleShowAllProducts}
        />

        {/* 7. Just for you */}
        <JustForYou
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onShowAll={handleShowAllProducts}
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

      {/* Wishlist Drawer */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        lovedProductIds={lovedItems}
        allProducts={PRODUCTS}
        onToggleLoved={handleToggleLoved}
        onAddToCart={handleAddToCart}
      />

      {/* Delivery Location Selector Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          addToast(`Delivery location updated to ${city}! 📍`, 'success');
        }}
      />

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        quantity={
          selectedProduct
            ? cartItems.find((ci) => ci.product.id === selectedProduct.id)?.quantity || 0
            : 0
        }
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        isLoved={Boolean(selectedProduct && lovedItems.includes(selectedProduct.id))}
        onToggleLoved={handleToggleLoved}
      />

      {/* Login / Signup Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
