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
              /images/banners/shop/sunrise/shop-banner-sunrise-2172.avif 2172w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1920.avif 1920w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1440.avif 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1024.avif 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-640.avif 640w
            "
            sizes="(max-width: 640px) 100vw, 1120px"
          />
          <source
            type="image/webp"
            srcSet="
              /images/banners/shop/sunrise/shop-banner-sunrise-2172.webp 2172w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1920.webp 1920w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1440.webp 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1024.webp 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-640.webp 640w
            "
            sizes="(max-width: 640px) 100vw, 1120px"
          />
          <img
            src="/images/banners/shop/sunrise/shop-banner-sunrise-1920.png"
            srcSet="
              /images/banners/shop/sunrise/shop-banner-sunrise-2172.png 2172w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1920.png 1920w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1440.png 1440w,
              /images/banners/shop/sunrise/shop-banner-sunrise-1024.png 1024w,
              /images/banners/shop/sunrise/shop-banner-sunrise-640.png 640w
            "
            sizes="(max-width: 640px) 100vw, 1120px"
            alt="Nandi Farms - Shop the farm: Fresh milk, seasonal produce, and pantry staples"
            width={2172}
            height={724}
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
