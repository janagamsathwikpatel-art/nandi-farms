import React from "react";
import Link from "next/link";
import "./ShopFarmBanner.css";

export default function ShopFarmBanner() {
  return (
    <section className="shop-farm-banner" aria-label="Shop the Farm">
      <Link href="/shop" className="shop-farm-banner-link" aria-label="Shop the Farm">
        <picture>
          <source srcSet="/images/banners/shop/shop-farm-banner-plate.webp?v=4" type="image/webp" />
          <img
            src="/images/banners/shop/shop-farm-banner-plate.png?v=4"
            alt="Nandi Farms - Fresh Farm Produce"
            className="shop-farm-banner-img"
            width={1024}
            height={341}
            loading="eager"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
