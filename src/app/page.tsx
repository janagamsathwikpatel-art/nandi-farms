"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumpyCategorySection, { CategoryItem } from "@/components/HumpyCategorySection";
import ExperienceFarm from "@/components/ExperienceFarm";
import VisitFarm from "@/components/VisitFarm";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (cat: CategoryItem) => {
    setSelectedCategory(cat.title);
    setTimeout(() => {
      setSelectedCategory(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] selection:bg-[#c58b4a] selection:text-white">
      {/* Top Navbar matching reference design */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        cartCount={0}
        onOpenCart={() => setIsContactOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching exact reference image with 4K HD text-free landscape */}
        <Hero />

        {/* Humpy Farms "Shop By Category" Section (directly down of hero section) */}
        <HumpyCategorySection onSelectCategory={handleSelectCategory} />

        {/* Selected Category Toast / Notification */}
        {selectedCategory && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#003628] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#0f533a] animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-sm font-medium">
              Exploring <strong>{selectedCategory}</strong> collection
            </span>
          </div>
        )}

        {/* "Come Experience the Farm" Section matching exact reference image */}
        <ExperienceFarm />

        {/* "Visit Nandi Farms" Section matching exact reference image with 4K HD text-free landscape */}
        <VisitFarm onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Footer matching exact reference image */}
      <Footer />

      {/* "Get in Touch" / Visit Booking Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
