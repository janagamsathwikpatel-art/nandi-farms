import Image from "next/image";
import Link from "next/link";
import catalog from "@/data/nandi-shop-catalog.json";
import { farmAssets, type HarvestCategory } from "@/data/nandi-shop";
import ShopCatalog from "./ShopCatalog";

export default function ShopContent({
  category,
}: {
  category?: HarvestCategory;
}) {
  return (
    <>
      <section className="shop-intro" aria-labelledby="shop-heading">
        <div className="shop-intro-copy">
          <Link className="shop-back" href="/">
            ← Back to the farm
          </Link>
          <p className="shop-kicker">The Nandi Farms shop</p>
          <h1 id="shop-heading">{category?.title ?? "Shop the farm"}</h1>
          <p id="shop-description">
            {category?.description ??
              "Fresh milk, seasonal produce, and pantry staples for your home."}
          </p>
        </div>
        <div className="shop-intro-art" aria-hidden="true">
          <Image
            src={`${farmAssets}/${category?.image ?? "nandi-farms-harvest-crate.webp"}`}
            width={category?.width ?? 1080}
            height={category ? 360 : 656}
            alt=""
            loading="eager"
          />
        </div>
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
