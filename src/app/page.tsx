"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ZeptoHarvestSection, { HARVEST_PRODUCTS } from "@/components/ZeptoHarvestSection";
import ExperienceFarm from "@/components/ExperienceFarm";
import VisitFarm from "@/components/VisitFarm";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ContactModal from "@/components/ContactModal";
import { ShoppingBag, ArrowRight, Zap } from "lucide-react";

export default function Home() {
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    "spinach-palak": 1,
    "butterhead-lettuce": 1,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: current - 1,
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  // Calculate totals
  const totalItemsCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, q]) => {
    const item = HARVEST_PRODUCTS.find((p) => p.id === id);
    return sum + (item ? item.price * q : 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] selection:bg-[#c58b4a] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching exact reference image */}
        <Hero />

        {/* Zepto-Inspired Quick Harvest Market Section (down of hero section) */}
        <ZeptoHarvestSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* "Come Experience the Farm" Section matching exact reference image */}
        <ExperienceFarm />

        {/* "Visit Nandi Farms" Section matching exact reference image */}
        <VisitFarm onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Footer matching exact reference image */}
      <Footer />

      {/* Floating Zepto Farm Basket Bar (Visible when items > 0) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#162e1e] text-white rounded-2xl shadow-2xl p-3 sm:p-3.5 border border-[#305338] flex items-center justify-between backdrop-blur-md animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#b87a38] flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#162e1e] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-white">
                  ₹{totalPrice}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/50 flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5" /> 15m ETA
                </span>
              </div>
              <p className="text-[11px] text-[#b3c7b6]">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in Farm Basket
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#b87a38] hover:bg-[#c98741] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>View Basket</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Zepto Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* "Get in Touch" / Visit Booking Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
