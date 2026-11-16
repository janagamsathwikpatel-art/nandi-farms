import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Fresh Orchard Fruits | Nandi Farms",
  description: "Hand-picked, sun-ripened orchard fruits from Nandi Farms.",
};

export default function FruitsPage() {
  const fruitCategory = harvestCategories.find((c) => c.key === "fruits");
  return (
    <ShopLayout>
      <ShopContent category={fruitCategory} />
    </ShopLayout>
  );
}
