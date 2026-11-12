export const farmAssets = "/nandi-farm";
export const milkPlansUrl = "https://eveggie.in/subscriptions";

export const harvestCategories = [
  {
    key: "milk",
    label: "Milk",
    title: "Fresh milk",
    description:
      "Choose from cow and buffalo milk in sizes that fit your home.",
    image: "harvest-milk.webp",
    width: 186,
  },
  {
    key: "eggs",
    label: "Eggs",
    title: "Eggs",
    description: "Browse eggs for breakfast, baking, and everyday cooking.",
    image: "harvest-eggs.webp",
    width: 506,
  },
  {
    key: "tomatoes",
    label: "Tomatoes",
    title: "Tomatoes",
    description: "Browse fresh tomatoes for salads, curries, and home cooking.",
    image: "harvest-tomatoes.webp",
    width: 394,
  },
  {
    key: "carrots",
    label: "Carrots",
    title: "Carrots",
    description: "Browse fresh carrots for the meals you make every day.",
    image: "harvest-carrots.webp",
    width: 335,
  },
  {
    key: "leafy-greens",
    label: "Leafy greens",
    title: "Leafy greens",
    description: "Browse seasonal leaves and greens for your kitchen.",
    image: "harvest-greens.webp",
    width: 448,
  },
] as const;

export type HarvestCategory = (typeof harvestCategories)[number];
