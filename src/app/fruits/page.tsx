import type { Metadata } from "next";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Fresh Orchard Fruits | Nandi Farms",
  description: "Hand-picked, sun-ripened orchard fruits from Nandi Farms.",
};

export default function FruitsPage() {
  return <ShopContent />;
}
