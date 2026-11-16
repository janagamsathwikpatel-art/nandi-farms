import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Homemade Karam Podulu | Nandi Farms",
  description: "Authentic Andhra podulu ground traditionally with stone-milled spices from Nandi Farms.",
};

export default function KaramPoduluPage() {
  const category = harvestCategories.find((c) => c.key === "karam-podulu");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
