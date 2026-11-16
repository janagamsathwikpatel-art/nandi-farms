import React from "react";
import Link from "next/link";
import { shopFarmBanner } from "@/data/shopFarmBanner";
import "./ShopFarmBanner.css";

export default function ShopFarmBanner() {
  return (
    <section className="shop-farm-banner" aria-label="Shop the Farm">
      <Link href="/shop" className="shop-farm-banner-bg" aria-label="Shop the Farm" tabIndex={-1}>
        <picture>
          <source srcSet="/images/banners/shop/shop-farm-banner-plate.webp?v=5" type="image/webp" />
          <img
            src="/images/banners/shop/shop-farm-banner-plate.png?v=5"
            alt="Nandi Farms - Fresh Farm Produce"
            className="shop-farm-banner-img"
            width={1024}
            height={341}
            loading="eager"
            decoding="async"
          />
        </picture>
      </Link>

      <div className="shop-farm-content">
        <h1>{shopFarmBanner.title}</h1>
        <p>{shopFarmBanner.description}</p>
        <Link href={shopFarmBanner.cta.href} className="shop-now" aria-label="Shop Now">
          {shopFarmBanner.cta.label} →
        </Link>
      </div>
    </section>
  );
}
