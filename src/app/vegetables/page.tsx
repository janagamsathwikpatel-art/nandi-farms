import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Organic Vegetables | Nandi Farms",
  description: "Freshly harvested organic farm vegetables from Nandi Farms.",
};

export default function VegetablesPage() {
  const vegCategory = harvestCategories.find((c) => c.key === "vegetables");
  return (
    <ShopLayout>
      <ShopContent category={vegCategory} />
    </ShopLayout>
  );
}
