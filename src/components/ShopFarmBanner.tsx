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
            srcSet="/images/banners/shop/shop-farm-banner-master-hd.webp?v=hd-final-1"
            type="image/webp"
          />
          <img
            src="/images/banners/shop/shop-farm-banner-master-hd.png?v=hd-final-1"
            alt="Shop the Farm - Fresh milk, seasonal produce, and farm essentials for your home."
            className="shop-farm-banner-img"
            width={2880}
            height={960}
            loading="eager"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
