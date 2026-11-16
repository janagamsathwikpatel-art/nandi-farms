import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Pooja Essentials | Nandi Farms",
  description: "Fresh sacred flowers, mango leaves, and daily prayer essentials from Nandi Farms.",
};

export default function PoojaNeedsPage() {
  const category = harvestCategories.find((c) => c.key === "pooja-needs");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
