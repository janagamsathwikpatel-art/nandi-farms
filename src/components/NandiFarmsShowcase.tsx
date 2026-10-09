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

  const tickerItemsUpper = [
    '🥒 Pesticides Free',
    '🎖️ Premium Quality',
    '🍃 Direct from Farms',
    'Traditional Bilona Ghee',
    '🍯 Pure Raw A2 Honey',
    '🌾 Stoneground Organic Atta',
    '🥦 Farm Fresh Vegetables',
    '🍎 Organic Fresh Fruits',
    '🥛 Pure A2 Cow Milk',
    '📦 Value Family Combos',
  ];

  const tickerItemsLower = [
    '🛒 Order Fresh Daily',
    '🚀 2-Hour Doorstep Delivery in Hyderabad',
    '🌿 100% Certified Organic Harvest',
    '❤️ Loved by 50,000+ Happy Families',
    '🛡️ 100% Satisfaction Guarantee',
    '📦 Free Shipping on Orders Over ₹499',
  ];

  const cards = [
    {
      id: 'showcase-1',
      title: 'Spices & Masalas',
      buttonText: 'Order Now',
      image: '/promo-card-1.jpg',
    },
    {
      id: 'showcase-2',
      title: 'Wood Cold Pressed Oils',
      buttonText: 'Order Now',
      image: '/promo-card-2.jpg',
    },
    {
      id: 'showcase-3',
      title: 'Honey Varieties',
      buttonText: 'Shop Now',
      image: '/promo-card-3.jpg',
    },
    {
      id: 'showcase-4',
      title: 'Special Millet Semiya',
      buttonText: 'Shop Now',
      image: '/promo-card-1.jpg',
    },
    {
      id: 'showcase-5',
      title: 'Premium A2 Cow Ghee',
      buttonText: 'Order Now',
      image: '/promo-card-2.jpg',
    },
  ];

  return (
    <section className="w-full bg-transparent py-2 relative overflow-hidden font-sans my-2 select-none">
      
      {/* 1. UPPER PRODUCT NAMES & FEATURES MARQUEE TICKER BAR */}
      <div className="w-full bg-[#0a4233] text-white py-2.5 overflow-hidden shadow-inner cursor-pointer group/ticker relative z-10">
        <div className="flex w-max animate-marquee space-x-8 group-hover/ticker:[animation-play-state:paused] transition-all">
          {/* Double items array for continuous seamless infinite loop */}
          {[...tickerItemsUpper, ...tickerItemsUpper, ...tickerItemsUpper, ...tickerItemsUpper].map((item, idx) => (
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

      {/* 2. ENLARGED NANDI FARMS PRODUCT IMAGES AUTO-SCROLLING ROW (Pauses on Mouse Hover) */}
      <div className="w-full py-6 px-2 overflow-hidden group/showcase relative">
        <div className="flex w-max animate-marquee-slow space-x-5 sm:space-x-6 lg:space-x-8 group-hover/showcase:[animation-play-state:paused] transition-all">
          {/* Repeat product image items thrice for smooth endless horizontal left scrolling */}
          {[...cards, ...cards, ...cards].map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              onClick={handleAction}
              className="w-72 sm:w-80 md:w-96 h-56 sm:h-64 md:h-72 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative flex-shrink-0 bg-transparent border-0"
            >
              {/* Direct 100% Flush Enlarged Product Image Graphic */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover block rounded-3xl group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />

              {/* Interactive Hover Action Overlay Pill Button */}
              <div className="absolute inset-0 bg-black/25 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-[#1a8e4c] hover:bg-emerald-800 text-white text-xs sm:text-sm font-black px-7 py-3 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 tracking-wider uppercase border border-amber-300/40">
                  {card.buttonText} 🛒
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LOWER MATCHING GREEN TICKER BAR (Framing below images) */}
      <div className="w-full bg-[#0a4233] text-white py-2.5 overflow-hidden shadow-inner cursor-pointer group/bottomticker relative z-10">
        <div className="flex w-max animate-marquee space-x-8 group-hover/bottomticker:[animation-play-state:paused] transition-all">
          {[...tickerItemsLower, ...tickerItemsLower, ...tickerItemsLower, ...tickerItemsLower].map((item, idx) => (
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

    </section>
  );
};
