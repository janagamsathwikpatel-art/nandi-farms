'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

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
      description: 'Join today and get an exclusive 10% discount on your entire first order of farm-fresh groceries.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      waveBg: 'bg-[#ef5350]',
      badge: 'ON ORDERS OVER ₹499',
      description: 'Shop and get your fresh produce delivered straight to your doorstep quickly with our express service.',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      waveBg: 'bg-[#f59e0b]',
      badge: 'DIRECT FROM LOCAL FARMS',
      description: 'Enjoy the finest quality produce, harvested daily from local sustainable farms for maximum flavor and nutrition.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0 my-0 mb-0">
      {/* Ultra-HD Native Code Organic Wave 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onClaimOffer && onClaimOffer(card.title)}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100/90 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[440px] sm:min-h-[470px]"
          >
            {/* Top Organic Wave Curve Header */}
            <div className={`${card.waveBg} text-white pt-6 pb-12 px-6 sm:px-7 relative overflow-hidden text-center rounded-b-[45px] sm:rounded-b-[55px] shadow-xs`}>
              {/* Organic Leaf Vector Pattern Overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M10,30 Q30,10 50,30 T90,30 Q70,70 50,50 T10,30 Z" />
                  <path d="M20,60 Q40,40 60,60 T100,60 Q80,90 60,80 T20,60 Z" />
                </svg>
              </div>

              {/* HD Vector Heading */}
              <h3 className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight uppercase font-sans drop-shadow-xs">
                {card.title}
              </h3>
            </div>

            {/* Floating 3D Produce Cutout Frame */}
            <div className="relative z-10 -mt-10 sm:-mt-12 flex justify-center items-center px-4">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white p-1.5 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Bottom Content & Green Claim Offer CTA */}
            <div className="p-6 pt-3 text-center flex flex-col items-center justify-between flex-1">
              <div>
                {/* Gold / Cream Pill Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2 border border-amber-200/80">
                  {card.badge}
                </span>

                {/* Description */}
                <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-xs mx-auto line-clamp-3">
                  {card.description}
                </p>
              </div>

              {/* Green Pill Claim Offer Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClaimOffer) onClaimOffer(card.title);
                }}
                className="mt-4 w-full py-3 px-6 rounded-full bg-[#00875a] hover:bg-[#00704a] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md group-hover:shadow-lg cursor-pointer flex items-center justify-center space-x-1.5 group/btn"
              >
                <span>Claim Offer</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};




