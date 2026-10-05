'use client';

import React from 'react';
import { Leaf, Truck, ShieldCheck, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';

export const BrandFeatures: React.FC = () => {
  const features = [
    {
      id: 'feat-1',
      icon: Leaf,
      title: '100% Farm Fresh & Organic',
      description: 'Harvested daily directly from green pastures without any chemical preservatives or artificial ripening.',
      badge: 'Natural Purity',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'feat-2',
      icon: HeartHandshake,
      title: 'Directly From Local Farmers',
      description: 'We partner directly with regional Indian farmers to ensure fair trade pricing and sustainable agriculture.',
      badge: 'Direct Source',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1595855719940-5934225816da?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'feat-3',
      icon: Truck,
      title: 'Express Same-Day Delivery',
      description: 'Packed in eco-friendly crates and delivered straight to your kitchen doorstep with zero minimum cost.',
      badge: 'Free Express',
      color: 'bg-sky-50 text-sky-900 border-sky-200',
      iconBg: 'bg-sky-600 text-white',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'feat-4',
      icon: ShieldCheck,
      title: '100% Freshness Guarantee',
      description: 'If you are not completely delighted with your produce, we offer an instant hassle-free replacement.',
      badge: 'Guaranteed Quality',
      color: 'bg-rose-50 text-rose-900 border-rose-200',
      iconBg: 'bg-rose-600 text-white',
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Barcoop Bevy Inspired Brand Banner Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-emerald-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-lime-300 text-xs font-bold px-3 py-1 rounded-full border border-lime-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nandi Farms Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-sans">
            Crafted By Nature.<br />Delivered Fresh To Your Door.
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Every fruit, vegetable, and dairy product at Nandi Farms is sourced with care from local Indian farms to bring pure nutrition directly to your family.
          </p>
        </div>

        {/* CTA Link */}
        <div className="z-10 shrink-0">
          <a
            href="#todays-picks"
            className="inline-flex items-center space-x-2 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-lg hover:scale-105"
          >
            <span>Explore Farm Fresh Produce</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid of 4 Brand Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {features.map((feat) => {
          const IconComp = feat.icon;
          return (
            <div
              key={feat.id}
              className={`rounded-3xl p-6 border ${feat.color} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5`}
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-full border border-current shadow-2xs">
                    {feat.badge}
                  </span>
                </div>

                {/* Feature Image Frame */}
                <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 border border-white/80 shadow-inner bg-white/60">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="font-extrabold text-base text-gray-900 mb-1.5 font-sans">
                  {feat.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
