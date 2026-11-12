"use client";

import React, { useState } from "react";
import ExperienceFarm from "@/components/ExperienceFarm";
import FarmVegetablesShelf from "@/components/FarmVegetablesShelf";
import { ProductModal } from "@/components/ProductModal";
import { Product, CartItem } from "@/types";

export default function ExploreShelfPreviewPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  return (
    <div className="min-h-screen bg-[#f1e6d4] py-8">
      <div className="max-w-7xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white">
        <ExperienceFarm
          isVegetablesOpen={isOpen}
          onExploreVegetables={() => setIsOpen((prev) => !prev)}
        />
        <FarmVegetablesShelf
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectProduct={(p) => setActiveModal(p)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </div>

      <ProductModal
        product={activeModal}
        isOpen={Boolean(activeModal)}
        onClose={() => setActiveModal(null)}
        quantity={
          activeModal
            ? cartItems.find((c) => c.product.id === activeModal.id)?.quantity || 0
            : 0
        }
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        isLoved={false}
        onToggleLoved={() => {}}
      />
    </div>
  );
}
