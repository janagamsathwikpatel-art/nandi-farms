import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Traditional Sweets | Nandi Farms",
  description: "Authentic handmade sweets, putharekulu, and artisanal cookies from Nandi Farms.",
};

export default function SweetsPage() {
  const category = harvestCategories.find((c) => c.key === "sweets");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
