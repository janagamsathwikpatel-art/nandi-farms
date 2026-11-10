import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { harvestCategories } from "@/data/nandi-shop";
import ShopContent from "../ShopContent";

type CategoryPageProps = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return harvestCategories.map(({ key }) => ({ category: key }));
}

async function getCategory(params: CategoryPageProps["params"]) {
  const { category } = await params;
  return harvestCategories.find(({ key }) => key === category) ?? notFound();
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params);
  return {
    title: `${category.title} | Nandi Farms`,
    description: category.description,
  };
}

export default async function ShopCategoryPage({ params }: CategoryPageProps) {
  return <ShopContent category={await getCategory(params)} />;
}
