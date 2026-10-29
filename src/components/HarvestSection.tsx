"use client";

import React, { useState } from "react";
import "./HarvestSection.css";

export interface HarvestProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  highlights?: string[];
  unit?: string;
}

const defaultProducts: HarvestProduct[] = [
  {
    id: "th-buffalo-milk",
    name: "Buffalo Milk (1 L)",
    description: "Rich, creamy, farm-fresh buffalo milk",
    price: 70,
    originalPrice: 85,
    image: "/images/buffalo-milk.png",
    badge: "Rich & Creamy",
    unit: "1 L",
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
    originalPrice: 75,
    image: "/images/cow-milk.png",
    badge: "A2 Single Source",
    unit: "1 L",
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
    originalPrice: 249,
    image: "/images/vegetable-basket.png",
    badge: "Harvested Today",
    unit: "basket",
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
    originalPrice: 40,
    image: "/images/leafy-greens.png",
    badge: "Hydro / Soil Pure",
    unit: "300 g",
    highlights: [
      "Zero Chemical Pesticides",
      "Tender Morning Cut",
      "Washed in Ozonated Water",
      "Vibrant & Living Greens",
    ],
  },
];

interface HarvestSectionProps {
  cartCount?: number;
  onAddToCart?: (product: HarvestProduct, qty: number) => void;
  onOpenModal?: (product: HarvestProduct) => void;
  onViewAllProducts?: () => void;
}

export default function HarvestSection({
  cartCount = 0,
  onAddToCart,
  onOpenModal,
  onViewAllProducts,
}: HarvestSectionProps) {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  const updateQuantity = (id: string, amount: number) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(1, (previous[id] || 1) + amount),
    }));
  };

  const handleAddToCart = (product: HarvestProduct) => {
    const qty = quantities[product.id] || 1;
    if (onAddToCart) {
      onAddToCart(product, qty);
    }
  };

  return (
    <section className="harvest-section">
      <div className="harvest-topbar">
        <span className="cart-count">
          Cart ({cartCount})
        </span>

        <button
          type="button"
          className="view-products"
          onClick={onViewAllProducts}
        >
          View all products <span>→</span>
        </button>
      </div>

      <div className="harvest-layout">
        <header className="harvest-heading">
          <p className="eyebrow">FRESH TODAY</p>
          <h1>
            TODAY’S
            <br />
            HARVEST
          </h1>

          <p className="harvest-intro">
            Carefully sourced. Honestly priced.
            <br />
            Delivered in Hyderabad.
          </p>

          <div className="leaf-divider">❧</div>
        </header>

        <div className="product-grid">
          {defaultProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div
                className="product-image"
                onClick={() => onOpenModal && onOpenModal(product)}
                title={`Click to view ${product.name} details`}
              >
                <img src={product.image} alt={product.name} />
              </div>

              <h2
                onClick={() => onOpenModal && onOpenModal(product)}
                style={{ cursor: "pointer" }}
              >
                {product.name}
              </h2>

              <p className="product-description">
                {product.description}
              </p>

              <p className="product-price">
                ₹{product.price}
                <span>
                  / {product.unit || "1 L"}
                </span>
              </p>

              <div className="quantity-control">
                <button
                  type="button"
                  aria-label={`Decrease ${product.name} quantity`}
                  onClick={() => updateQuantity(String(product.id), -1)}
                >
                  −
                </button>

                <span>{quantities[product.id] || 1}</span>

                <button
                  type="button"
                  aria-label={`Increase ${product.name} quantity`}
                  onClick={() => updateQuantity(String(product.id), 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="add-cart"
                onClick={() => handleAddToCart(product)}
              >
                <span aria-hidden="true">🛒</span>
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
