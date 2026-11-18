"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  farmAssets,
  harvestCategories,
  type HarvestCategory,
} from "@/data/nandi-shop";
import catalog from "@/data/nandi-shop-catalog.json";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number | null;
  category?: string;
};

function getProductUnit(name: string, category?: string): string {
  const match = name.match(/(\d+(?:\.\d+)?\s*(?:kg|g|gm|gms|ml|l|ltr|litre|pieces|pcs|pack|bunch))\b/i);
  if (match) {
    return match[1].replace(/(\d+)\s*([a-zA-Z]+)/, "$1 $2");
  }
  if (category === "milk") return "1 L";
  if (category === "vegetables" || category === "root-vegetables" || category === "fruits") return "500 g";
  if (category === "eggs") return "6 pcs";
  if (category === "leafy-greens") return "1 bunch";
  return "1 unit";
}

function formatInr(val: number): string {
  return `₹${val}`;
}

const fallbackImage = `${farmAssets}/nandi-farms-logo.png`;

const CATEGORY_BANNERS: Record<string, { src: string; alt: string }> = {
  fruits: {
    src: "/images/banners/shop/fruits-sleek-harvest-banner.jpg",
    alt: "Fresh Orchard Fruits - Nandi Farms",
  },
};

export default function ShopCatalog({
  products,
  category,
}: {
  products: Product[];
  category?: HarvestCategory;
}) {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const matches = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );
  const currentBanner = (category ? CATEGORY_BANNERS[category.key] : null) ?? {
    src: "/images/banners/shop/fruits-sleek-harvest-banner.jpg",
    alt: `${category?.label ?? "All products"} - Nandi Farms Harvest`,
  };

  return (
    <section className="shop-inventory" aria-labelledby="inventory-heading">
      <div className="shop-layout">
        {/* ========================================================= */}
        {/* LEFT SIDEBAR FILTER (Search & Category Filters)           */}
        {/* ========================================================= */}
        <aside className="shop-sidebar" aria-label="Product filters">
          {/* Search Box */}
          <div className="shop-sidebar-search">
            <div className="shop-search">
              <label htmlFor="shop-search" className="sr-only">
                Search products
              </label>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="5.5" />
                <path d="m15 15 4 4" />
              </svg>
              <input
                type="search"
                id="shop-search"
                placeholder="Search products"
                autoComplete="off"
                value={search}
                disabled={products.length === 0}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          {/* Categories Navigation Filter */}
          <div className="shop-sidebar-section">
            <h3 className="shop-sidebar-heading">Categories</h3>
            <nav className="shop-sidebar-nav" aria-label="Shop categories">
              <Link
                href="/shop"
                className="shop-sidebar-link"
                aria-current={category ? undefined : "page"}
              >
                <span className="shop-sidebar-link-text">All products</span>
                <span className="shop-sidebar-link-count">{catalog.length}</span>
              </Link>
              {harvestCategories.map(({ key, label }) => {
                const count = catalog.filter((p) => p.category === key).length;
                return (
                  <Link
                    href={`/shop/${key}`}
                    key={key}
                    className="shop-sidebar-link"
                    aria-current={category?.key === key ? "page" : undefined}
                  >
                    <span className="shop-sidebar-link-text">{label}</span>
                    <span className="shop-sidebar-link-count">{count}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT MAIN PRODUCTS AREA                                  */}
        {/* ========================================================= */}
        <div className="shop-main-content">
          {/* Universal Sleek Harvest Banner (All products & every Category) */}
          <div className="shop-category-banner">
            <Image
              src={currentBanner.src}
              alt={currentBanner.alt}
              width={1024}
              height={163}
              priority
              className="shop-category-banner-image"
            />
          </div>

          <div className="shop-results-heading">
            <h2 id="inventory-heading">{category?.label ?? "All products"}</h2>
            <p role="status">
              {matches.length} {matches.length === 1 ? "product" : "products"}
            </p>
          </div>

          {matches.length === 0 ? (
            <div className="shop-empty">
              <h3>
                {query ? "No matching products" : "Nothing listed here right now"}
              </h3>
              <p>
                {query
                  ? "Try a different search term."
                  : "Browse the full shop to see what’s available."}
              </p>
              {category && <Link href="/shop">Browse all products</Link>}
            </div>
          ) : (
            <>
              <div className="shop-grid">
                {matches.map((product) => {
                  const discount =
                    product.originalPrice && product.originalPrice > product.price
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )
                      : 0;
                  const unit = getProductUnit(product.name, product.category || category?.key);

                  return (
                    <article className="shop-card" key={product.id}>
                      <a
                        className="shop-card-link"
                        href={`https://eveggie.in/products/${product.id}/details`}
                      >
                        <div className="shop-card-photo">
                          {discount > 0 && (
                            <div className="shop-discount-badge" aria-label={`${discount}% off`}>
                              <span className="shop-discount-percent">{discount}%</span>
                              <span className="shop-discount-text">OFF</span>
                            </div>
                          )}
                          <Image
                            src={product.image}
                            width={320}
                            height={240}
                            alt={product.name}
                            onError={(event) => {
                              if (
                                event.currentTarget.getAttribute("src") !==
                                fallbackImage
                              ) {
                                event.currentTarget.src = fallbackImage;
                              }
                            }}
                          />
                        </div>
                        <div className="shop-card-info">
                          <div className="shop-delivery-time">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="13" r="8" />
                              <path d="M12 9v4l2 2" />
                              <path d="M5 3 2 6" />
                              <path d="m22 6-3-3" />
                              <path d="M10 2h4" />
                            </svg>
                            <span>8 MINS</span>
                          </div>

                          <h3 className="shop-card-title">{product.name}</h3>
                          <div className="shop-card-unit">{unit}</div>

                          <div className="shop-card-footer">
                            <div className="shop-card-pricing">
                              <span className="shop-current-price">
                                {formatInr(product.price)}
                              </span>
                              {product.originalPrice !== null && product.originalPrice > product.price && (
                                <del className="shop-original-price">
                                  {formatInr(product.originalPrice)}
                                </del>
                              )}
                            </div>
                            <span className="shop-add-btn">
                              ADD
                            </span>
                          </div>
                        </div>
                      </a>
                    </article>
                  );
                })}
              </div>
              <p className="shop-catalog-note">
                See each product page for current price and availability.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
