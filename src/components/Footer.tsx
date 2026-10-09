'use client';

import React from 'react';

interface FooterProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleScrollToProducts = () => {
    const el = document.getElementById('todays-picks') || document.getElementById('weekly-best-selling');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    handleScrollToProducts();
  };

  return (
    <footer className="w-full bg-[#f4f7ef] relative overflow-hidden font-sans select-none border-t border-[#e2ebd9]">
      {/* 100% Full-Length Viewport Ultra HD Graphic Asset Container */}
      <div className="relative w-full max-w-none px-0 min-w-full overflow-hidden">
        <img
          src="/footer-best-banner.png"
          alt="NANDI FARMS — Freshness, naturally."
          className="w-full h-auto object-cover block min-w-full select-none transform-gpu"
          style={{
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            filter: 'contrast(102%) brightness(101%)',
          }}
          loading="eager"
        />

        {/* 100% Interactive Overlay Hotspots */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {/* Logo / Home Link Hotspot */}
          <div
            onClick={handleScrollToProducts}
            className="absolute top-[10%] left-[4%] w-[18%] h-[32%] cursor-pointer hover:bg-black/5 rounded-2xl transition-all"
            title="Nandi Farms — Return to Home"
          />

          {/* EXPLORE Links Hotspots */}
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="absolute top-[26%] left-[41.5%] w-[5%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Shop All Products"
          />
          <button
            type="button"
            onClick={() => handleCategoryClick('Dairy')}
            className="absolute top-[33%] left-[41.5%] w-[4%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Milk & Dairy Category"
          />
          <button
            type="button"
            onClick={() => handleCategoryClick('Fresh Vegetables')}
            className="absolute top-[40%] left-[41.5%] w-[6%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Fresh Vegetables Category"
          />
          <button
            type="button"
            onClick={() => handleCategoryClick('Fruits')}
            className="absolute top-[46%] left-[41.5%] w-[4%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Fresh Fruits Category"
          />

          {/* CONNECT Links Hotspots */}
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="absolute top-[26%] left-[53.8%] w-[5.5%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="About Us — Farm Fresh Heritage"
          />
          <a
            href="mailto:support@nandifarms.com"
            className="absolute top-[33%] left-[53.8%] w-[6.5%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all"
            title="Contact Us (support@nandifarms.com)"
          />
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="absolute top-[40%] left-[53.8%] w-[4%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="FAQs — Organic Standards"
          />

          {/* EXPLORE OUR PRODUCTS Button Hotspot */}
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="absolute top-[63%] left-[5%] w-[23%] h-[11%] cursor-pointer hover:bg-emerald-900/10 rounded-full transition-all border border-emerald-800/0 hover:border-emerald-800/20 active:scale-98"
            title="Explore Our Farm Fresh Products"
          />

          {/* Bottom Legal Privacy Policy Hotspot */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute top-[89.5%] right-[14.5%] w-[6.5%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Privacy Policy — 100% Protected"
          />
          {/* Bottom Legal Terms & Conditions Hotspot */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute top-[89.5%] right-[5%] w-[8.5%] h-[6%] cursor-pointer hover:bg-black/5 rounded-md transition-all text-left"
            title="Terms & Conditions"
          />
        </div>
      </div>
    </footer>
  );
};
