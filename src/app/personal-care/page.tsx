import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Natural Personal Care | Nandi Farms",
  description: "Pure herbal bathing bars, desi cow ghee lip balms, and natural wellness products from Nandi Farms.",
};

export default function PersonalCarePage() {
  const category = harvestCategories.find((c) => c.key === "personal-care");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
