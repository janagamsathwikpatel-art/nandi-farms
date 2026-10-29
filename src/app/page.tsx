"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumpyCategorySection from "@/components/HumpyCategorySection";
import ExperienceFarm from "@/components/ExperienceFarm";
import VisitFarm from "@/components/VisitFarm";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] selection:bg-[#c58b4a] selection:text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Humpy Farms "Shop By Category" & Related Items Section (down of hero section) */}
        <HumpyCategorySection />

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
