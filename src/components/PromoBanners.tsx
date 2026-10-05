'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const cards = [
    {
      id: 'promo-1',
      title: 'NEW HERE? ENJOY 10% OFF YOUR FIRST ORDER',
      description: 'Sign up today and get instant savings on your first grocery purchase.',
      gradient: 'from-emerald-600 to-teal-700 text-white',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'promo-2',
      title: 'FREE DELIVERY WITH NO MINIMUM COST',
      description: 'Order your daily essentials anywhere in India with zero delivery charges!',
      gradient: 'from-rose-500 to-pink-600 text-white',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'promo-3',
      title: 'FRESH GROCERIES FOR YOUR FAMILY, WITHOUT HASSLE.',
      description: 'We deliver everything you need straight to your door.',
      gradient: 'from-amber-400 via-amber-300 to-yellow-400 text-gray-900',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${card.gradient} shadow-md border border-white/20 flex flex-col justify-between min-h-[340px] group transform hover:-translate-y-1 transition-all duration-200`}
          >
            {/* Title Header */}
            <div>
              <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight max-w-[90%] font-sans uppercase">
                {card.title}
              </h3>
            </div>

            {/* Circular Frame for Image */}
            <div className="my-4 flex justify-center items-center">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl bg-white/20 backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Row: Description + Arrow Button */}
            <div className="flex items-end justify-between gap-3 pt-2">
              <p className="text-xs font-medium leading-relaxed max-w-[80%] opacity-90">
                {card.description}
              </p>
              <button
                className="w-9 h-9 rounded-full bg-gray-950 text-white flex items-center justify-center shrink-0 hover:bg-gray-800 transition-colors shadow-md group-hover:scale-110"
                aria-label="View offer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
