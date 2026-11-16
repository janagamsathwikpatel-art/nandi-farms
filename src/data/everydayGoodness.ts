export interface CollectionItem {
  title: string;
  href: string;
  image: string;
}

export interface EverydayGoodnessData {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  collections: CollectionItem[];
}

export const everydayGoodness: EverydayGoodnessData = {
  title: "Everyday Goodness",
  description: "Explore dairy, fruits, vegetables and more.",
  cta: {
    label: "View all 9 collections",
    href: "/shop"
  },
  collections: [
    {
      title: "Milk",
      href: "/milk",
      image: "/images/collections/milk.png"
    },
    {
      title: "Vegetables",
      href: "/vegetables",
      image: "/images/collections/vegetables.png"
    },
    {
      title: "Fruits",
      href: "/fruits",
      image: "/images/collections/fruits.png"
    }
  ]
};
