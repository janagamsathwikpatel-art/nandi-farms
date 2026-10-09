'use client';

import React from 'react';
import { Leaf, Award, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export const TrustSignalsBar: React.FC = () => {
  const trustItems = [
    {
      id: 'trust-1',
      icon: Leaf,
      emoji: '🌿',
      title: '100% Organic Certified',
      subtitle: 'Zero Synthetic Chemicals',
      description: 'Grown with natural Jeevamrutha and organic compost without artificial pesticides.',
      themeBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:border-emerald-500',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconBg: 'bg-emerald-700 text-white',
    },
    {
      id: 'trust-2',
      icon: Award,
      emoji: '🐄',
      title: 'Single Source A2 Cows',
      subtitle: 'Gir & Hallikar Indigenous Breed',
      description: 'Hand churned Bilona A2 ghee from grass-fed indigenous cows rich in A2 beta-casein.',
      themeBg: 'bg-amber-500/10 text-amber-900 border-amber-200 hover:border-amber-500',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-600 text-white',
    },
    {
      id: 'trust-3',
      icon: Truck,
      emoji: '📦',
      title: 'Same Day Express Delivery',
      subtitle: 'Direct Farm Harvest',
      description: 'Harvested fresh every morning and delivered straight to your kitchen doorstep.',
      themeBg: 'bg-sky-500/10 text-sky-900 border-sky-200 hover:border-sky-500',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
      iconBg: 'bg-sky-700 text-white',
    },
    {
      id: 'trust-4',
      icon: ShieldCheck,
      emoji: '🛡️',
      title: '70+ Quality Lab Checks',
      subtitle: 'FSSAI & NABL Certified Purity',
      description: 'Every batch undergoes rigorous lab testing for safety, fat content, and purity.',
      themeBg: 'bg-rose-500/10 text-rose-900 border-rose-200 hover:border-rose-500',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      iconBg: 'bg-rose-700 text-white',
    },
  ];

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 my-6 sm:my-8 py-2">
      {/* 4-Column Trust Signals & Quality Guarantees Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trustItems.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 ${item.themeBg}`}
            >
              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
                    Verified Purity
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-amber-700 mt-0.5 mb-1.5">
                  {item.subtitle}
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Guarantee Indicator */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-emerald-950">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% Guaranteed</span>
                </span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
