"use client";

import React, { useState } from "react";
import NandiFarmHero from "@/components/NandiFarmHero";
import QuickCategoryGrid from "@/components/QuickCategoryGrid";
import HarvestHeroSection, { HeroProduct } from "@/components/HarvestHeroSection";
import HarvestCategoryGrid from "@/components/HarvestCategoryGrid";
import ExperienceFarm from "@/components/ExperienceFarm";
import FarmVegetablesShelf from "@/components/FarmVegetablesShelf";
import { ProductModal } from "@/components/ProductModal";
import MilkSubscriptionBanner from "@/components/MilkSubscriptionBanner";
import MilkSubscriptionModal from "@/components/MilkSubscriptionModal";
import YDailyFooter from "@/components/YDailyFooter";
import ContactModal from "@/components/ContactModal";
import { Product, CartItem } from "@/types";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // Model 1: Warm Parchment Farm Vegetables Shelf State
  const [isVegetablesShowcaseOpen, setIsVegetablesShowcaseOpen] = useState(false);
  const [activeVegetableModal, setActiveVegetableModal] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lovedItems, setLovedItems] = useState<string[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get("explore") === "vegetables" ||
        window.location.hash === "#farm-vegetables-shelf"
      ) {
        setIsVegetablesShowcaseOpen(true);
      }
    }
  }, []);

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

  const handleAddHeroProductToCart = (heroProduct: HeroProduct, quantity: number) => {
    const product: Product = {
      id: heroProduct.id,
      name: heroProduct.name,
      category: heroProduct.id.includes("milk") ? "Milk" : "Fresh Vegetables",
      farmer: "Nandi Organic Farms",
      price: heroProduct.price,
      unit: heroProduct.unit,
      image: heroProduct.image,
      description: heroProduct.description,
      badge: heroProduct.badge,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleOpenHeroModal = (heroProduct: HeroProduct) => {
    setActiveVegetableModal({
      id: heroProduct.id,
      name: heroProduct.name,
      category: heroProduct.id.includes("milk") ? "Milk" : "Fresh Vegetables",
      farmer: "Nandi Organic Farms",
      price: heroProduct.price,
      unit: heroProduct.unit,
      image: heroProduct.image,
      description: heroProduct.description,
      badge: heroProduct.badge,
    });
  };

  const scrollToCategories = () => {
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleToggleLoved = (productId: string) => {
    setLovedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf5ea] selection:bg-[#c58b4a] selection:text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Nandi Farms Hero Section (with video, parallax harvest crate & navigation) */}
        <NandiFarmHero onOpenSubscription={() => setIsSubModalOpen(true)} />

        {/* Shop by Category Quick Grid (directly down of Hero Section as requested) */}
        <QuickCategoryGrid />

        {/* TODAY'S HARVEST Section directly down of Category Section */}
        <HarvestHeroSection
          cartCount={totalCartCount}
          onAddToCart={handleAddHeroProductToCart}
          onOpenModal={handleOpenHeroModal}
          onViewAllProducts={scrollToCategories}
        />

        {/* 3x3 Harvest Category Grid directly below Today's Harvest */}
        <HarvestCategoryGrid />

        {/* "Explore the Harvest" Section matching exact reference image */}
        <ExperienceFarm
          isVegetablesOpen={isVegetablesShowcaseOpen}
          onExploreVegetables={() => setIsVegetablesShowcaseOpen((prev) => !prev)}
        />

        {/* Model 1: Seamless Warm Parchment Inline Farm Vegetables Showcase */}
        <FarmVegetablesShelf
          isOpen={isVegetablesShowcaseOpen}
          onClose={() => setIsVegetablesShowcaseOpen(false)}
          onSelectProduct={(product) => setActiveVegetableModal(product)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Vertical Spacing Gap between Explore the Harvest and Milk Subscriptions (Warm Parchment #faf5ea) */}
        <div className="w-full h-8 sm:h-12 md:h-16 bg-[#faf5ea]" aria-hidden="true" />

        {/* 4K Ultra-HD Fresh Milk Subscriptions Section with Live HTML Elements */}
        <MilkSubscriptionBanner onOpenModal={() => setIsSubModalOpen(true)} />

        {/* Vertical Spacing Gap (Warm Parchment #faf5ea) */}
        <div className="w-full h-8 sm:h-12 md:h-16 bg-[#faf5ea]" aria-hidden="true" />
      </main>

      {/* Brand New 4K Y Daily Scenic Footer with Working Links, Form & Socials */}
      <YDailyFooter
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSubscription={() => setIsSubModalOpen(true)}
      />

      {/* Detailed Product Modal for Farm Vegetables & Products */}
      <ProductModal
        product={activeVegetableModal}
        isOpen={Boolean(activeVegetableModal)}
        onClose={() => setActiveVegetableModal(null)}
        quantity={
          activeVegetableModal
            ? cartItems.find((c) => c.product.id === activeVegetableModal.id)?.quantity || 0
            : 0
        }
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        isLoved={
          activeVegetableModal ? lovedItems.includes(activeVegetableModal.id) : false
        }
        onToggleLoved={handleToggleLoved}
      />

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
