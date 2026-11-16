import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Tea & Coffee Powders | Nandi Farms",
  description: "Estate-grown aromatic filter coffee blends and rich whole-leaf teas from Nandi Farms.",
};

export default function TeaCoffeePage() {
  const category = harvestCategories.find((c) => c.key === "tea-coffee");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
