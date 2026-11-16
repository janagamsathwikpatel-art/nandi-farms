export interface FruitHarvestStep {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  time: string;
  timeline: string;
}

export interface FruitHarvestJourneyData {
  badge: string;
  title: string;
  description: string;
  steps: FruitHarvestStep[];
  cta: {
    label: string;
    href: string;
  };
}

export const fruitHarvestSteps: FruitHarvestStep[] = [
  {
    number: "01",
    title: "Sun-Kissed Orchards",
    subtitle: "ETHICAL GROWING • 100% TREE-RIPENED",
    text: "Nurtured across chemical-free heritage orchards in Karnataka. Allowed to mature fully on the branch under natural sunlight, achieving rich natural sweetness and peak nutritional density.",
    tags: ["100% Tree-Ripened", "Zero Carbide"],
    time: "05:00 AM",
    timeline: "Dawn harvesting in mist-covered orchards",
  },
  {
    number: "02",
    title: "Zero Chemicals",
    subtitle: "BIO-ORGANIC CARE • SAFE FOR CHILDREN",
    text: "Protected using traditional neem decoctions, friendly bio-controls, and pure cow dung vermicompost. Every single harvest batch is rigorously lab-tested for zero synthetic chemical or carbide residues.",
    tags: ["Zero Pesticide Residue", "Lab-Tested Clean"],
    time: "06:00 AM",
    timeline: "Organic pest shield inspection",
  },
  {
    number: "03",
    title: "Hand-Sorted Grade-A",
    subtitle: "GENTLE SORTING • PEAK BRIX INDEX",
    text: "Carefully hand-graded at dawn by skilled farming artisans. Only pristine, unblemished, and peak-brix fruits make it into your morning harvest basket, ensuring supreme sweetness and aroma.",
    tags: ["Hand-Graded", "Peak Brix Sugar"],
    time: "06:45 AM",
    timeline: "Artisanal grading for uncompromised brix",
  },
  {
    number: "04",
    title: "Tree-to-Door in 12h",
    subtitle: "MORNING 06:30 AM • DOORSTEP FRESH",
    text: "Harvested at dawn and delivered to your doorstep the very next morning. Experience the unbeatable crunch, fragrant orchard perfume, and vital living enzymes of true farm freshness.",
    tags: ["Delivered by 7 AM", "Peak Morning Crunch"],
    time: "07:15 AM",
    timeline: "Packed fresh and dispatched",
  },
];

export const fruitHarvestJourney: FruitHarvestJourneyData = {
  badge: "THE FRUIT HARVEST",
  title: "From Orchards to Your Table",
  description:
    "Hand-picked at peak natural ripeness with zero chemicals and zero carbide.",
  steps: fruitHarvestSteps,
  cta: {
    label: "Shop Farm Fresh Fruits",
    href: "/shop",
  },
};
