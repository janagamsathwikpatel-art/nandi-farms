import type { Metadata } from "next";
import { harvestCategories } from "@/data/nandi-shop";
import ShopLayout from "../shop/layout";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Healthy Ravva & Millets | Nandi Farms",
  description: "Unpolished millet idly ravva, upma ravva, and nutritious breakfast staples from Nandi Farms.",
};

export default function RavvaPage() {
  const category = harvestCategories.find((c) => c.key === "ravva");
  return (
    <ShopLayout>
      <ShopContent category={category} />
    </ShopLayout>
  );
}
