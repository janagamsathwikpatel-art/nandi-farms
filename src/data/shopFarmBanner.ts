export interface ShopFarmBannerData {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
}

export const shopFarmBanner: ShopFarmBannerData = {
  title: "Shop the Farm",
  description: "Fresh milk, seasonal produce, and farm essentials for your home.",
  cta: {
    label: "SHOP NOW",
    href: "/shop"
  }
};
