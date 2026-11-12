import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Y Daily | A Daily Ritual of Freshness",
  description:
    "Pure unadulterated A2 milk and farm-fresh organic vegetables delivered quietly to your doorstep every morning before 07:00 AM.",
  openGraph: {
    title: "Y Daily | A Daily Ritual of Freshness",
    description:
      "Pure unadulterated A2 milk and farm-fresh organic vegetables delivered directly from trusted local farms to your morning table.",
    images: ["/images/why-y-daily-a2-banner-4k.png"],
  },
};

export default function YDailyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
