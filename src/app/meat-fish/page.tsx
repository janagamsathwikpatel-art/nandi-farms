import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Fresh Meat & Fish | Nandi Farms",
  description: "Farm-fresh cuts, antibiotic-free poultry, and fresh river fish from Nandi Farms.",
};

export default function MeatFishPage() {
  const category = harvestCategories.find((c) => c.key === "meat-fish");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
