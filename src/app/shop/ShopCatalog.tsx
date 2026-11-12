"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  farmAssets,
  harvestCategories,
  type HarvestCategory,
} from "@/data/nandi-shop";

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

  return (
    <section className="shop-inventory" aria-labelledby="inventory-heading">
      <div className="shop-controls">
        <nav className="shop-categories" aria-label="Shop categories">
          <Link href="/shop" aria-current={category ? undefined : "page"}>
            All products
          </Link>
          {harvestCategories.map(({ key, label }) => (
            <Link
              href={`/shop/${key}`}
              key={key}
              aria-current={category?.key === key ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="shop-search">
          <label htmlFor="shop-search" className="sr-only">
            Search this category
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
    </section>
  );
}
