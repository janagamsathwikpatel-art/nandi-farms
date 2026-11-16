import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Farm Fresh Eggs | Nandi Farms",
  description: "Browse farm fresh eggs from Nandi Farms.",
};

export default function EggsPage() {
  const eggsCategory = harvestCategories.find((c) => c.key === "eggs");
  return <ShopContent category={eggsCategory} />;
}
