'use client';

import React from 'react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer }) => {
  const handleOfferClick = (title: string) => {
    if (onClaimOffer) {
      onClaimOffer(title);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-0 my-0 mb-0">
      {/* Standalone HD Promo Banner Image — Outer Box Background Frame Removed */}
      <div className="relative rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 bg-transparent">
        
        {/* Banner Image with Top Header Logo Bar Cropped via Container Negative Top Margin */}
        <div className="-mt-[7%] sm:-mt-[9%] lg:-mt-[10.5%] pointer-events-none">
          <img
            src="/promo-banners-organic-wave.jpg"
            alt="Organic Farm Fresh Offers — 10% OFF First Order, Free Express Delivery, 100% Farm Fresh"
            className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Interactive Click Hotspots for the 3 Offer Banners */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 pt-[7%] sm:pt-[9%] lg:pt-[10.5%]">
          {/* Left Card: 10% OFF FIRST ORDER */}
          <div
            onClick={() => handleOfferClick('10% OFF FIRST ORDER')}
            className="cursor-pointer hover:bg-black/5 transition-colors relative group/spot flex flex-col justify-between p-4 sm:p-6"
            title="Click to claim 10% OFF FIRST ORDER"
          >
            <div className="opacity-0 group-hover/spot:opacity-100 transition-opacity bg-emerald-800/90 text-white text-[11px] font-extrabold px-3 py-1 rounded-full w-max shadow-md">
              Claim 10% OFF →
            </div>
          </div>

          {/* Center Card: FREE EXPRESS DELIVERY */}
          <div
            onClick={() => handleOfferClick('FREE EXPRESS DELIVERY')}
            className="cursor-pointer hover:bg-black/5 transition-colors relative group/spot flex flex-col justify-between p-4 sm:p-6"
            title="Click to claim FREE EXPRESS DELIVERY"
          >
            <div className="opacity-0 group-hover/spot:opacity-100 transition-opacity bg-rose-700/90 text-white text-[11px] font-extrabold px-3 py-1 rounded-full w-max mx-auto shadow-md">
              Claim Free Delivery →
            </div>
          </div>

          {/* Right Card: 100% FARM FRESH */}
          <div
            onClick={() => handleOfferClick('100% FARM FRESH')}
            className="cursor-pointer hover:bg-black/5 transition-colors relative group/spot flex flex-col justify-between p-4 sm:p-6"
            title="Click to claim 100% FARM FRESH"
          >
            <div className="opacity-0 group-hover/spot:opacity-100 transition-opacity bg-amber-700/90 text-white text-[11px] font-extrabold px-3 py-1 rounded-full w-max ml-auto shadow-md">
              Claim Farm Fresh →
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};



