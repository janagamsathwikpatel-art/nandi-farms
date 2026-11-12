import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop the farm | Nandi Farms",
  description:
    "Browse milk, seasonal produce, and pantry staples in the Nandi Farms shop.",
};

export default function ShopPage() {
  return <ShopContent />;
}
