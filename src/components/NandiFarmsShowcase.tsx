'use client';

import React from 'react';

interface NandiFarmsShowcaseProps {
  onOrderNow?: () => void;
}

export const NandiFarmsShowcase: React.FC<NandiFarmsShowcaseProps> = ({ onOrderNow }) => {
  const handleAction = () => {
    if (onOrderNow) {
      onOrderNow();
    } else {
      const el = document.getElementById('todays-picks') || document.getElementById('weekly-best-selling');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tickerItems = [
    '🥒 Pesticides Free',
    '🎖️ Premium Quality',
    '🍃 Direct from Farms',
    '🧈 Traditional Bilona Ghee',
    '🍯 Pure Raw A2 Honey',
    '🌾 Stoneground Organic Atta',
    '🥦 Farm Fresh Vegetables',
    '🍎 Organic Fresh Fruits',
    '🥛 Pure A2 Cow Milk',
    '📦 Value Family Combos',
  ];

  const cards = [
    {
      id: 'showcase-1',
      title: 'SPICES & MASALAS',
      subtitle: 'From Farm to Flavor, Naturally',
      buttonText: 'Order Now',
      bgColor: 'from-amber-600 to-rose-700',
      badgeBg: 'bg-red-800',
      image: '/promo-card-1.jpg',
      features: ['100% Unadulterated', 'Traditional Stone Ground'],
    },
    {
      id: 'showcase-2',
      title: 'Wood Cold Pressed Oils',
      subtitle: 'Pure & Unrefined Oil Varieties',
      buttonText: 'Order Now',
      bgColor: 'from-sky-600 to-emerald-700',
      badgeBg: 'bg-blue-900',
      image: '/promo-card-2.jpg',
      features: ['Zero Chemicals', 'Wood Press Extracted'],
    },
    {
      id: 'showcase-3',
      title: 'Honey Varieties',
      subtitle: 'Pure & Healthy Wild Forest Honey',
      buttonText: 'Shop Now',
      bgColor: 'from-amber-700 to-emerald-800',
      badgeBg: 'bg-emerald-900',
      image: '/promo-card-3.jpg',
      features: ['Raw & Unprocessed', 'Rich Natural Enzymes'],
    },
    {
      id: 'showcase-4',
      title: 'Special Millet Semiya',
      subtitle: '10+ Healthy Farm Varieties',
      buttonText: 'Shop Now',
      bgColor: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-800',
      image: '/promo-card-1.jpg',
      features: ['High Fiber Millets', 'Zero Maida'],
    },
    {
      id: 'showcase-5',
      title: 'Premium A2 Cow Ghee',
      subtitle: 'Traditional Bilona Method',
      buttonText: 'Order Now',
      bgColor: 'from-emerald-800 to-teal-900',
      badgeBg: 'bg-emerald-950',
      image: '/promo-card-2.jpg',
      features: ['A2 Grass Fed Cows', 'Golden Grainy Texture'],
    },
  ];

  return (
    <section className="w-full bg-[#fbf9f4] py-4 relative overflow-hidden font-sans my-4 border-t border-b border-amber-200/50">
      
      {/* 1. UPPER PRODUCT NAMES & FEATURES MARQUEE TICKER BAR (Matching media_1791549332402.png) */}
      <div className="w-full bg-[#0a4233] text-white py-2.5 overflow-hidden shadow-inner cursor-pointer group/ticker select-none relative z-10">
        <div className="flex w-max animate-marquee space-x-8 group-hover/ticker:[animation-play-state:paused] transition-all">
          {/* Double items array for continuous seamless infinite loop */}
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={idx}
              onClick={handleAction}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold tracking-wide uppercase whitespace-nowrap text-amber-200 hover:text-white transition-colors"
            >
              <span>{item}</span>
              <span className="text-emerald-400 font-normal opacity-60 ml-6">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. NANDI FARMS SHOWCASE CARDS AUTO-SCROLLING ROW (Pauses on Mouse Hover) */}
      <div className="w-full py-6 px-4 overflow-hidden group/showcase relative">
        <div className="flex w-max animate-marquee space-x-5 sm:space-x-6 group-hover/showcase:[animation-play-state:paused] transition-all">
          {/* Repeat card items twice for smooth endless horizontal scrolling */}
          {[...cards, ...cards].map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              onClick={handleAction}
              className="w-64 sm:w-72 md:w-80 flex-shrink-0 bg-[#f7f3e8] border border-amber-200/80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative flex flex-col justify-between"
            >
              {/* Card Header Tagline Bar */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-[#0a4233] text-white">
                <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase block">
                  NANDI FARMS ORGANIC
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight font-sans text-white line-clamp-1 mt-0.5">
                  {card.title}
                </h3>
                <p className="text-[11px] text-emerald-100/90 font-medium line-clamp-1 mt-0.5">
                  {card.subtitle}
                </p>
              </div>

              {/* Card Product Image Display */}
              <div className="w-full h-48 sm:h-56 bg-white p-3 flex items-center justify-center relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Feature Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-1 z-10">
                  {card.features.map((ft, i) => (
                    <span
                      key={i}
                      className="bg-emerald-950/80 backdrop-blur-xs text-amber-200 text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider"
                    >
                      ✓ {ft}
                    </span>
                  ))}
                </div>

                {/* Hover Action Overlay Pill Button */}
                <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-[#1a8e4c] hover:bg-emerald-800 text-white text-xs font-black px-6 py-2.5 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300 tracking-wider uppercase border border-amber-300/40">
                    {card.buttonText} 🛒
                  </span>
                </div>
              </div>

              {/* Card Bottom CTA Footer */}
              <div className="p-3 bg-[#f2ebd9] border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-950">
                  Nandi Farms Fresh
                </span>
                <span className="text-xs font-black text-[#1a8e4c] group-hover:underline flex items-center gap-1">
                  <span>{card.buttonText}</span>
                  <span>➔</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
