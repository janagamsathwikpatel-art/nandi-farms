'use client';

import React from 'react';
import { Leaf, Award, Truck, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const TrustSignalsBar: React.FC = () => {
  const trustItems = [
    {
      id: 'trust-1',
      icon: Leaf,
      emoji: '🌿',
      title: '100% Organic Certified',
      subtitle: 'Zero Synthetic Chemicals',
      description: 'Grown naturally with organic compost without artificial pesticides or harmful ripeners.',
      cardBg: 'bg-white border-emerald-100 hover:border-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
      accentColor: 'text-emerald-700',
    },
    {
      id: 'trust-2',
      icon: Award,
      emoji: '🐄',
      title: 'Single Source A2 Cows',
      subtitle: 'Indigenous Breed Protection',
      description: 'Pure A2 milk & bilona churned ghee from grass-fed indigenous Gir and Hallikar cows.',
      cardBg: 'bg-white border-amber-100 hover:border-amber-300',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
      accentColor: 'text-amber-800',
    },
    {
      id: 'trust-3',
      icon: Truck,
      emoji: '📦',
      title: 'Same Day Express Delivery',
      subtitle: 'Direct Farm Harvest',
      description: 'Harvested fresh every morning and delivered directly to your doorstep in eco-friendly crates.',
      cardBg: 'bg-white border-sky-100 hover:border-sky-300',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
      iconBg: 'bg-sky-600 text-white',
      accentColor: 'text-sky-800',
    },
    {
      id: 'trust-4',
      icon: ShieldCheck,
      emoji: '🛡️',
      title: '70+ Quality Lab Checks',
      subtitle: 'FSSAI & NABL Certified Purity',
      description: 'Every single batch undergoes rigorous multi-parameter lab testing for absolute purity.',
      cardBg: 'bg-white border-rose-100 hover:border-rose-300',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
      iconBg: 'bg-rose-600 text-white',
      accentColor: 'text-rose-800',
    },
  ];

  return (
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 my-6 sm:my-8">
      {/* Soft Eco Sage Container Wrapper — Clean, Simple & Attractive Theme */}
      <div className="bg-[#f2f7f3] p-5 sm:p-8 rounded-3xl border border-emerald-100/90 shadow-2xs">
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>The Nandi Farms Quality Promise</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 tracking-tight">
            Why 3+ Lakh Families Trust Our Produce
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Clean, chemical-free nutrition harvested with care from local Indian farms
          </p>
        </div>

        {/* 4 Clean White Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trustItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-2xl p-5 border shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group bg-white ${item.cardBg}`}
              >
                <div>
                  {/* Top Icon Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <span className={`text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
                      Verified Purity
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className={`text-xs font-bold mt-0.5 mb-1.5 ${item.accentColor}`}>
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Trust Tag */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-extrabold text-emerald-900">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Guaranteed</span>
                  </span>
                  <span className="text-xs text-emerald-700 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
