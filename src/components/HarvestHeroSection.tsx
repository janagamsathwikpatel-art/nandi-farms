"use client";

import React, { useState } from "react";
import "./HarvestHeroSection.css";

export interface HeroProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

export const HERO_PRODUCTS: HeroProduct[] = [
  {
    id: "th-buffalo-milk",
    name: "Buffalo Milk (1 L)",
    description: "Rich, creamy, farm-fresh buffalo milk",
    price: 70,
    unit: "1 L",
    image: "/images/buffalo-milk-splash.png",
    badge: "Rich & Creamy",
    highlights: [
      "Chilled to 4°C in 15 mins",
      "Zero Preservatives or Additives",
      "Eco-friendly Sealed Glass Bottle",
      "Delivered Cold before 7:00 AM",
    ],
  },
  {
    id: "th-cow-milk",
    name: "Cow Milk (1 L)",
    description: "Light, nutritious, perfect for everyday",
    price: 60,
    unit: "1 L",
    image: "/images/cow-milk.png",
    badge: "A2 Single Source",
    highlights: [
      "Certified A2 Beta-Casein",
      "Zero Adulteration or Dilution",
      "Farm-Bottled Fresh Daily",
      "Automated Pause Anytime",
    ],
  },
  {
    id: "th-veggie-basket",
    name: "Seasonal Vegetable Basket",
    description: "Handpicked farm-fresh vegetables",
    price: 199,
    unit: "basket",
    image: "/images/vegetable-basket.png",
    badge: "Harvested Today",
    highlights: [
      "100% Chemical-Free Farming",
      "Harvested at First Dawn",
      "Zero Cold-Storage Delay",
      "Direct Farm-to-Kitchen",
    ],
  },
  {
    id: "th-leafy-greens",
    name: "Leafy Greens (300 g)",
    description: "Fresh, nutritious and locally grown",
    price: 30,
    unit: "300 g",
    image: "/images/leafy-greens.png",
    badge: "Hydro / Soil Pure",
    highlights: [
      "Zero Chemical Pesticides",
      "Tender Morning Cut",
      "Washed in Ozonated Water",
      "Vibrant & Living Greens",
    ],
  },
];

interface HarvestHeroSectionProps {
  cartCount?: number;
  onAddToCart?: (product: HeroProduct, quantity: number) => void;
  onOpenModal?: (product: HeroProduct) => void;
  onViewAllProducts?: () => void;
}

export default function HarvestHeroSection({
  cartCount = 0,
  onAddToCart,
  onOpenModal,
  onViewAllProducts,
}: HarvestHeroSectionProps) {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({
    "th-buffalo-milk": 1,
    "th-cow-milk": 1,
    "th-veggie-basket": 1,
    "th-leafy-greens": 1,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product: HeroProduct) => {
    const qty = quantities[product.id] || 1;
    if (onAddToCart) {
      onAddToCart(product, qty);
    }

    // Trigger confirmation toast message
    setToastMessage(`${product.name} added to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <section className="harvest-hero-section" aria-label="Today's Harvest">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="harvest-hero-toast" role="status" aria-live="polite">
          <span style={{ fontSize: "16px" }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar: Cart Counter & View All Products */}
      <div className="harvest-hero-topbar">
        <span className="harvest-hero-cart-count">
          Cart ({cartCount})
        </span>

        <button
          type="button"
          className="harvest-hero-view-products"
          onClick={onViewAllProducts}
        >
          View all products <span>→</span>
        </button>
      </div>

      {/* Main Banner Layout: Left Heading + Right 4 Products */}
      <div className="harvest-hero-layout">
        <header className="harvest-hero-heading">
          <p className="harvest-hero-eyebrow">FRESH TODAY</p>
          <h1>
            TODAY&apos;S
            <br />
            HARVEST
          </h1>

          <p className="harvest-hero-intro">
            Carefully sourced. Honestly priced.
            <br />
            Delivered in Hyderabad.
          </p>

          <div className="harvest-hero-leaf-divider" aria-hidden="true">
            ❧
          </div>
        </header>

        {/* 4 Product Cards Grid */}
        <div className="harvest-hero-product-grid">
          {HERO_PRODUCTS.map((product) => {
            const currentQty = quantities[product.id] || 1;
            return (
              <article className="harvest-hero-product-card" key={product.id}>
                <div>
                  <div
                    className="harvest-hero-product-image"
                    onClick={() => onOpenModal && onOpenModal(product)}
                    title={`Click to view ${product.name} details`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onOpenModal && onOpenModal(product);
                      }
                    }}
                  >
                    <img src={product.image} alt={product.name} loading="eager" />
                  </div>

                  <h2
                    onClick={() => onOpenModal && onOpenModal(product)}
                    title={`Click to view ${product.name} details`}
                  >
                    {product.name}
                  </h2>

                  <p className="harvest-hero-product-description">
                    {product.description}
                  </p>
                </div>

                <div>
                  <p className="harvest-hero-product-price">
                    ₹{product.price}
                    <span>/ {product.unit}</span>
                  </p>

                  {/* Quantity Selector: minus, qty, plus */}
                  <div className="harvest-hero-quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      −
                    </button>

                    <span>{currentQty}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    className="harvest-hero-add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span aria-hidden="true">🛒</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
