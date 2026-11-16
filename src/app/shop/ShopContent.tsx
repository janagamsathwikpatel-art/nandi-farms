import catalog from "@/data/nandi-shop-catalog.json";
import { type HarvestCategory } from "@/data/nandi-shop";
import ShopCatalog from "./ShopCatalog";
import ShopFarmBanner from "@/components/ShopFarmBanner";
import "./shop.css";

export default function ShopContent({
  category,
}: {
  category?: HarvestCategory;
}) {
  return (
    <div className="shop-content-wrapper">
      <ShopFarmBanner />
      <ShopCatalog
        products={
          category
            ? catalog.filter((product) => product.category === category.key)
            : catalog
        }
        category={category}
      />
    </div>
  );
}
