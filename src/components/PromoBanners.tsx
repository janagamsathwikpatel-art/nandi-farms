'use client';

import React from 'react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer }) => {
  const cards = [
    {
      id: 'promo-1',
      title: '10% OFF FIRST ORDER',
      waveBg: 'bg-[#00875a]',
      badge: 'LIMITED TIME',
      priceText: 'On orders over ₹299',
      description: 'Join today and get an exclusive 10% discount on your entire first order of farm-fresh groceries.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      waveBg: 'bg-[#ef5350]',
      badge: 'ON ORDERS OVER ₹499',
      priceText: 'On orders over ₹499',
      description: 'Shop and get your fresh produce delivered straight to your doorstep quickly with our express service.',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      waveBg: 'bg-[#f59e0b]',
      badge: 'DIRECT FROM LOCAL FARMS',
      priceText: 'Min order ₹199',
      description: 'Enjoy the finest quality produce, harvested daily from local sustainable farms for maximum flavor and nutrition.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-0 my-0 mb-0">
      {/* 3 Compact Ultra-HD Wave Cards — Indian Rupee Prices & Decreased Height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onClaimOffer && onClaimOffer(card.title)}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100/90 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[350px] sm:min-h-[370px]"
          >
            {/* Top Organic Wave Curve Header */}
            <div className={`${card.waveBg} text-white pt-5 pb-10 px-5 relative overflow-hidden text-center rounded-b-[40px] shadow-xs`}>
              {/* Organic Leaf Vector Overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M10,30 Q30,10 50,30 T90,30 Q70,70 50,50 T10,30 Z" />
                  <path d="M20,60 Q40,40 60,60 T100,60 Q80,90 60,80 T20,60 Z" />
                </svg>
              </div>

              {/* HD Vector Heading */}
              <h3 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-black tracking-tight leading-tight uppercase font-sans drop-shadow-xs">
                {card.title}
              </h3>
            </div>

            {/* Floating 3D Produce Cutout Frame */}
            <div className="relative z-10 -mt-8 sm:-mt-9 flex justify-center items-center px-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Bottom Content & Green Claim Offer CTA */}
            <div className="p-4 pt-2 text-center flex flex-col items-center justify-between flex-1">
              <div>
                {/* Indian Rupee Pill Badge */}
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-1.5 border border-amber-200/80">
                  {card.badge}
                </span>

                {/* Indian Price Subtitle */}
                <p className="text-xs font-bold text-gray-900 mb-1">
                  {card.priceText}
                </p>

                {/* Description */}
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-xs mx-auto line-clamp-2">
                  {card.description}
                </p>
              </div>

              {/* Green Pill Claim Offer Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClaimOffer) onClaimOffer(card.title);
                }}
                className="mt-3 w-full py-2.5 px-5 rounded-full bg-[#00875a] hover:bg-[#00704a] text-white font-extrabold text-xs transition-all shadow-md group-hover:shadow-lg cursor-pointer flex items-center justify-center space-x-1.5 group/btn"
              >
                <span>Claim Offer</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};



