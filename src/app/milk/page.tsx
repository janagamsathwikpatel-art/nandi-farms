import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Fresh Milk | Nandi Farms",
  description: "Pure farm fresh A2 milk from Nandi Farms.",
};

export default function MilkPage() {
  const milkCategory = harvestCategories.find((c) => c.key === "milk");
  return <ShopContent category={milkCategory} />;
}
