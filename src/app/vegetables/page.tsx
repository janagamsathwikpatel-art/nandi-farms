import type { Metadata } from "next";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Organic Vegetables | Nandi Farms",
  description: "Freshly harvested organic farm vegetables from Nandi Farms.",
};

export default function VegetablesPage() {
  return <ShopContent />;
}
