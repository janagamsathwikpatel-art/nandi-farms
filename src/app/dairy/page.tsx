import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Dairy Products | Nandi Farms",
  description: "Pure farm fresh A2 milk and dairy products from Nandi Farms.",
};

export default function DairyPage() {
  const milkCategory = harvestCategories.find((c) => c.key === "milk");
  return <ShopContent category={milkCategory} />;
}
