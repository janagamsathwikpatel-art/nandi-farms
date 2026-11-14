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
              /images/banners/shop/shop-banner-3840.avif 3840w,
              /images/banners/shop/shop-banner-2560.avif 2560w,
              /images/banners/shop/shop-banner-1920.avif 1920w,
              /images/banners/shop/shop-banner-1280.avif 1280w
            "
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1600px"
          />
          <source
            type="image/webp"
            srcSet="
              /images/banners/shop/shop-banner-3840.webp 3840w,
              /images/banners/shop/shop-banner-2560.webp 2560w,
              /images/banners/shop/shop-banner-1920.webp 1920w,
              /images/banners/shop/shop-banner-1280.webp 1280w
            "
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1600px"
          />
          <img
            src="/images/banners/shop/shop-banner-2560.png"
            srcSet="
              /images/banners/shop/shop-banner-3840.png 3840w,
              /images/banners/shop/shop-banner-2560.png 2560w,
              /images/banners/shop/shop-banner-1920.png 1920w,
              /images/banners/shop/shop-banner-1280.png 1280w
            "
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1600px"
            alt="Nandi Farms - Shop the farm: Fresh milk, seasonal produce, and pantry staples"
            width={3840}
            height={1280}
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
