"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import HarvestCategoryGrid from "@/components/HarvestCategoryGrid";
import ExperienceFarm from "@/components/ExperienceFarm";
import MilkSubscriptionBanner from "@/components/MilkSubscriptionBanner";
import MilkSubscriptionModal from "@/components/MilkSubscriptionModal";
import VisitFarm from "@/components/VisitFarm";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] selection:bg-[#c58b4a] selection:text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* 3x3 Harvest Category Grid directly below Hero */}
        <HarvestCategoryGrid />

        {/* "Explore the Harvest" Section matching exact reference image */}
        <ExperienceFarm />

        {/* 4K Ultra-HD Fresh Milk Subscriptions Section with Live HTML Elements */}
        <MilkSubscriptionBanner onOpenModal={() => setIsSubModalOpen(true)} />

        {/* Vertical Spacing Gap (Option 2: Warm Parchment #f1e6d4) */}
        <div className="w-full h-8 sm:h-12 md:h-16 bg-[#f1e6d4]" aria-hidden="true" />

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

      {/* Milk Subscription Booking Modal */}
      <MilkSubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
    </div>
  );
}
