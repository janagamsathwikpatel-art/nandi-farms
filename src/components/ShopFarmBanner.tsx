import React from "react";
import Link from "next/link";
import "./ShopFarmBanner.css";

export default function ShopFarmBanner() {
  return (
    <section className="shop-farm-banner" aria-label="Shop the Farm">
      <Link
        href="/shop"
        className="shop-farm-banner-link"
        aria-label="Shop the Farm - Fresh milk, seasonal produce, and farm essentials for your home."
      >
        <picture>
          <source
            srcSet="/images/banners/shop/nandi-sunrise-harvest-panoramic.webp?v=exact-p1 1x, /images/banners/shop/nandi-sunrise-harvest-panoramic-2x.webp?v=exact-p1 2x"
            type="image/webp"
          />
          <img
            src="/images/banners/shop/nandi-sunrise-harvest-panoramic.png?v=exact-p1"
            srcSet="/images/banners/shop/nandi-sunrise-harvest-panoramic.png?v=exact-p1 1x, /images/banners/shop/nandi-sunrise-harvest-panoramic-2x.png?v=exact-p1 2x"
            alt="Shop the Farm - Fresh milk, seasonal produce, and farm essentials for your home."
            className="shop-farm-banner-img"
            width={1024}
            height={172}
            loading="eager"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
