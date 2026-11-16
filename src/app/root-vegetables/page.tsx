import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Fresh Root Vegetables | Nandi Farms",
  description: "Farm-fresh earthy roots, country potatoes, sweet carrots, and beetroots from Nandi Farms.",
};

export default function RootVegetablesPage() {
  const category = harvestCategories.find((c) => c.key === "root-vegetables");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
