import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Handcrafted Farm Pickles | Nandi Farms",
  description: "Sun-cured traditional Andhra pickles made with cold-pressed oil and heirloom recipes from Nandi Farms.",
};

export default function PicklesPage() {
  const category = harvestCategories.find((c) => c.key === "pickles");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
