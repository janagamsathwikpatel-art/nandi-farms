export interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  time: string;
  timeline: string;
}

export interface LivingSoilJourneyData {
  badge: string;
  title: string;
  description: string;
  steps: JourneyStep[];
  cta: {
    label: string;
    href: string;
  };
}

export const livingSoilJourney: LivingSoilJourneyData = {
  badge: "THE LIVING SOIL JOURNEY",
  title: "From Living Soil to Kitchen in 12 Hours",
  description:
    "Follow our certified bio-organic vegetable journey. Rooted in microbial living soil, protected with neem decoctions, and hand-harvested at dawn to preserve living enzymes.",

  steps: [
    {
      number: "01",
      title: "Heritage Living Soil",
      subtitle: "REGENERATIVE FARMING • MICROBIAL RICH",
      text: "Nurtured with ancient bio-fertilizers and pure Jeevamrutha compost. Root crops and vines draw dense micro-nutrients naturally without synthetic stimulants.",
      tags: ["100% Bio-Organic", "Microbe-Rich Beds"],
      time: "04:30 AM",
      timeline: "Awakening Karnataka's living farm beds",
    },
    {
      number: "02",
      title: "Zero Synthetic Sprays",
      subtitle: "100% BIO-ORGANIC • SAFE FOR BABIES",
      text: "Protected using neem oil decoctions, companion marigolds, and beneficial birds. Zero chemical or pesticide residues, verified by weekly third-party lab assays.",
      tags: ["Zero Pesticide Residue", "Lab-Tested Clean"],
      time: "05:30 AM",
      timeline: "Solar-powered organic inspection",
    },
    {
      number: "03",
      title: "Dawn Dew Harvest",
      subtitle: "PEAK HYDRATION • HAND-HARVESTED",
      text: "Plucked at first light when soil moisture and plant turgor pressure are highest. Every bell pepper, cucumber, and leafy spinach bundle retains its crisp cellular crunch.",
      tags: ["Peak Dew Crunch", "Breathable Hampers"],
      time: "06:30 AM",
      timeline: "Gentle sorting into breathable baskets",
    },
    {
      number: "04",
      title: "Field-to-Wok in 12h",
      subtitle: "DOORSTEP FRESH • DELIVERED BY 7 AM",
      text: "Harvested at dawn and delivered straight to your door by 7 AM the very next morning. Experience the undeniable crunch, sweet vitality, and living enzymes of true farm-to-table produce.",
      tags: ["Doorstep Delivery by 7 AM", "Living Enzymes Intact"],
      time: "07:00 AM",
      timeline: "Chilled dispatch to your doorstep",
    },
  ],

  cta: {
    label: "Shop Fresh Organic Vegetables",
    href: "/vegetables",
  },
};
