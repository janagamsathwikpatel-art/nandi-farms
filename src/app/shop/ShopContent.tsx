import catalog from "@/data/nandi-shop-catalog.json";
import { type HarvestCategory } from "@/data/nandi-shop";
import ShopCatalog from "./ShopCatalog";

export default function ShopContent({
  category,
}: {
  category?: HarvestCategory;
}) {
  return (
    <>
      <section className="farm-banner" aria-label="Nandi Farms Shop Banner">
        <h1 className="sr-only">{category?.title ?? "Shop the farm"}</h1>
        <img
          src="/images/nandi-farm-shop-banner-hd.png"
          alt="Nandi Farms - Shop the farm: Fresh milk, seasonal produce, and pantry staples"
          loading="eager"
          decoding="async"
        />
      </section>
      <ShopCatalog
        products={
          category
            ? catalog.filter((product) => product.category === category.key)
            : catalog
        }
        category={category}
      />
    </>
  );
}
