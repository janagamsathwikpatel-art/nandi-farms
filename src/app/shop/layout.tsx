import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { nandiFarmFonts } from "@/components/nandiFarmFonts";
import { farmAssets, milkPlansUrl } from "@/data/nandi-shop";
import "./shop.css";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`shop-page ${nandiFarmFonts}`}>
      <a className="sr-only focus:not-sr-only" href="#shop-main">
        Skip to content
      </a>
      <header className="shop-header">
        <Link href="/" className="shop-brand">
          <Image
            src={`${farmAssets}/nandi-farms-logo.png`}
            width={260}
            height={260}
            alt="Nandi Farms home"
            loading="eager"
          />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/shop" aria-current="page">
            Shop
          </Link>
          <a href={milkPlansUrl}>Milk plans</a>
          <Link href="/#explore-harvest">Our farm</Link>
        </nav>
        <Link className="shop-home-link" href="/#categories">
          Shop by category <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <main className="shop-main" id="shop-main">
        {children}
      </main>
      <footer className="shop-footer">
        <p>
          <strong>Nandi Farms</strong>
          <span>From our family to yours.</span>
        </p>
        <nav aria-label="Footer navigation">
          <Link href="/#explore-harvest">Our farm</Link>
          <Link href="/#categories">Shop by category</Link>
          <a href={milkPlansUrl}>Milk plans</a>
        </nav>
      </footer>
    </div>
  );
}
