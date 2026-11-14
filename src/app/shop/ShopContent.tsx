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
        <picture>
          <source
            type="image/avif"
            srcSet="
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-2048.avif 2048w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1440.avif 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1024.avif 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-640.avif 640w
            "
            sizes="(max-width: 640px) 100vw, 1024px"
          />
          <source
            type="image/webp"
            srcSet="
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-2048.webp 2048w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1440.webp 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1024.webp 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-640.webp 640w
            "
            sizes="(max-width: 640px) 100vw, 1024px"
          />
          <img
            src="/images/banners/shop/sunrise/shop-banner-sunrise-h200-1024.png"
            srcSet="
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-2048.png 2048w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1440.png 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-1024.png 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-h200-640.png 640w
            "
            sizes="(max-width: 640px) 100vw, 1024px"
            alt="Scenic sunrise over Nandi Farms pasture with cows grazing, fresh dairy milk, butter, cheese, and farm produce"
            width={1024}
            height={200}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
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
