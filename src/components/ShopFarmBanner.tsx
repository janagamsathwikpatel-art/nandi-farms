import React from "react";
import Link from "next/link";
import { shopFarmBanner } from "@/data/shopFarmBanner";
import "./ShopFarmBanner.css";

export default function ShopFarmBanner() {
  return (
    <section className="shop-farm-banner" aria-label="Shop the Farm">
      <h1>{shopFarmBanner.title}</h1>

      <p>{shopFarmBanner.description}</p>

      <Link href={shopFarmBanner.cta.href} className="shop-now">
        {shopFarmBanner.cta.label} →
      </Link>
    </section>
  );
}
