"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StoryBookSection from "@/components/StoryBookSection";
import NandiFarmsFooter from "@/components/NandiFarmsFooter";
import ContactModal from "@/components/ContactModal";
import MilkSubscriptionModal from "@/components/MilkSubscriptionModal";

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf5ea]">
      <header className="sticky top-0 z-50 bg-[#faf5ea]/90 backdrop-blur-md border-b border-[#ded7c8]/60 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/footer/nandi-farms-calf-logo-v3.png"
            alt="Nandi Farms"
            width={48}
            height={46}
            className="h-10 w-auto object-contain"
          />
          <span className="font-serif text-xl font-bold text-[#650b0b]">
            Nandi Farms
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-[#3c322d] hover:text-[#650b0b]">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-semibold text-[#3c322d] hover:text-[#650b0b]">
            Shop
          </Link>
          <button
            type="button"
            onClick={() => setIsSubModalOpen(true)}
            className="text-sm font-semibold bg-[#164633] text-white px-4 py-2 rounded-full hover:bg-[#103325] transition"
          >
            Milk Plans
          </button>
        </nav>
      </header>

      <main className="flex-1">
        <StoryBookSection />
      </main>

      <NandiFarmsFooter
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSubscription={() => setIsSubModalOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <MilkSubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
    </div>
  );
}
