export interface MilkJourneyStep {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  time: string;
  timeline: string;
}

export interface MilkJourneyData {
  badge: string;
  title: string;
  description: string;
  steps: MilkJourneyStep[];
  cta?: {
    label: string;
    href: string;
  };
}

export const milkJourney: MilkJourneyData = {
  badge: "THE MILK JOURNEY",
  title: "From Farm to Your Door",
  description: "Discover the pure dawn story behind your daily bottle.",

  steps: [
    {
      number: "01",
      title: "At the Farm",
      subtitle: "ETHICAL CATTLE CARE • 100% GRASS-FED",
      text: "Gently collected before sunrise from free-grazing indigenous Hallikar, Desi Gir & Murrah cattle nourished on organic green fodder. Zero synthetic hormones, zero antibiotics, and zero commercial feed.",
      tags: ["100% Grass-Fed", "Desi A2 Purity"],
      time: "04:30 AM",
      timeline: "Pre-dawn milking in open pastures",
    },
    {
      number: "02",
      title: "Careful Handling",
      subtitle: "4°C COLD CHAIN • UNTOUCHED RAW GOODNESS",
      text: "Drawn through automated, sanitized stainless lines directly into sealed tanks. Flash-chilled to 4°C within 45 mins to preserve vital living enzymes, vitamins, and the natural intact cream-top layer.",
      tags: ["Chilled to 4°C", "Whole Cream Top"],
      time: "05:15 AM",
      timeline: "Instant chill preservation",
    },
    {
      number: "03",
      title: "Glass Bottles",
      subtitle: "ZERO MICROPLASTICS • PURE DAWN TASTE",
      text: "Bottled in clinical-grade, sterilized 500ml glass jars that eliminate microplastic leaching and preserve dawn taste. Hermetically sealed with a gold-foil crown cap for uncompromised freshness.",
      tags: ["Sterilized Glass", "Zero Plastic"],
      time: "05:45 AM",
      timeline: "Sealed in sterilized glass jars",
    },
    {
      number: "04",
      title: "To Your Doorstep",
      subtitle: "MORNING 06:30 AM • FLEXIBLE SUBSCRIPTION",
      text: "Delivered cold to your doorstep before 6:30 AM every morning. Enjoy effortless control with flexible one-tap pause, vacation holds, and quantity updates via your mobile account.",
      tags: ["By 06:30 AM", "Easy Pause & Play"],
      time: "06:30 AM",
      timeline: "Delivered fresh to your doorstep",
    },
  ],
};

export const milkJourneySteps = milkJourney.steps;
