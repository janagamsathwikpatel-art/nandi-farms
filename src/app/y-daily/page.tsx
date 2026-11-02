"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import HarvestCategoryGrid from "@/components/HarvestCategoryGrid";
import ExperienceFarm from "@/components/ExperienceFarm";
import MilkSubscriptionBanner from "@/components/MilkSubscriptionBanner";
import MilkSubscriptionModal from "@/components/MilkSubscriptionModal";
import YDailyFooter from "@/components/YDailyFooter";
import ContactModal from "@/components/ContactModal";

export default function YDailyPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] selection:bg-[#c58b4a] selection:text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Y Daily Hero Experience with 3-Stage Dawn Journey */}
        <Hero />

        {/* 3x3 Harvest Category Grid with Interactive 3D Storybook */}
        <HarvestCategoryGrid />

        {/* Explore the Harvest 4K Ultra-HD Panoramic Banner */}
        <ExperienceFarm />

        {/* Vertical Spacing Gap between Explore the Harvest and Milk Subscriptions (Warm Parchment #f1e6d4) */}
        <div className="w-full h-8 sm:h-12 md:h-16 bg-[#f1e6d4] border-y border-[#dfd2be]/60" aria-hidden="true" />

        {/* 4K Ultra-HD Fresh Milk Subscriptions Section with Live HTML Elements */}
        <MilkSubscriptionBanner onOpenModal={() => setIsSubModalOpen(true)} />

        {/* Vertical Spacing Gap (Warm Parchment #f1e6d4) */}
        <div className="w-full h-8 sm:h-12 md:h-16 bg-[#f1e6d4]" aria-hidden="true" />
      </main>

      {/* Brand New 4K Y Daily Scenic Footer with Working Links, Form & Socials */}
      <YDailyFooter
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSubscription={() => setIsSubModalOpen(true)}
      />

      {/* Contact / Visit Modal */}
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
