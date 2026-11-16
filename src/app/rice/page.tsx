import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Pure Farm Rice & Grains | Nandi Farms",
  description: "Single-origin aged basmati, sona masoori, and natural unpolished rice from Nandi Farms.",
};

export default function RicePage() {
  const category = harvestCategories.find((c) => c.key === "rice");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
