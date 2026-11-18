import catalog from "@/data/nandi-shop-catalog.json";
import { type HarvestCategory } from "@/data/nandi-shop";
import ShopCatalog from "./ShopCatalog";
import "./shop.css";

export default function ShopContent({
  category,
}: {
  category?: HarvestCategory;
}) {
  return (
    <div className="shop-content-wrapper">
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
