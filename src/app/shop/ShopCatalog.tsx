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
};

const formatPrice = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});
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
  const activeBanner = category ? CATEGORY_BANNERS[category.key] : null;

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
          {activeBanner && (
            <div className="shop-category-banner">
              <Image
                src={activeBanner.src}
                alt={activeBanner.alt}
                width={1024}
                height={163}
                priority
                className="shop-category-banner-image"
              />
            </div>
          )}

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
                {matches.map((product) => (
                  <article className="shop-card" key={product.id}>
                    <a
                      className="shop-card-link"
                      href={`https://eveggie.in/products/${product.id}/details`}
                    >
                      <div className="shop-card-photo">
                        <Image
                          src={product.image}
                          width={320}
                          height={240}
                          alt=""
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
                        <h3>{product.name}</h3>
                        <div className="shop-card-bottom">
                          <p className="shop-price">
                            <span>{formatPrice.format(product.price)}</span>
                            {product.originalPrice !== null && (
                              <del>{formatPrice.format(product.originalPrice)}</del>
                            )}
                          </p>
                          <span className="shop-card-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
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
