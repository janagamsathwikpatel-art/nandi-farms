"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

interface MilkSubscriptionBannerProps {
  onOpenModal?: (planDays?: number) => void;
}

export interface SubscriptionPlan {
  days: number;
  totalPrice: number;
  perDayPrice: number;
  popular?: boolean;
}

const PLANS: SubscriptionPlan[] = [
  { days: 7, totalPrice: 490, perDayPrice: 70 },
  { days: 15, totalPrice: 945, perDayPrice: 63 },
  { days: 30, totalPrice: 1800, perDayPrice: 60, popular: true },
];

export default function MilkSubscriptionBanner({ onOpenModal }: MilkSubscriptionBannerProps) {
  const [selectedPlan, setSelectedPlan] = useState<number>(30);

  const handleSelectPlan = (days: number) => {
    setSelectedPlan(days);
  };

  const handleStartSubscription = () => {
    if (onOpenModal) {
      onOpenModal(selectedPlan);
    }
  };

  return (
    <section
      className="relative w-full bg-[#FAF6ED] py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 select-none border-t border-[#193E2D]/5 overflow-hidden"
      aria-label="Milk Subscriptions"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Text-Free Editorial Photographic Plate       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[540px] aspect-[535/512] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(25,62,45,0.06)] bg-[#FAF6ED] border border-[#193E2D]/5">
              <Image
                src="/images/milk-subscription-editorial-plate.jpg"
                alt="Fresh Farm Milk Bottle, Glass and Pasture Heritage"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-contain object-center select-none pointer-events-none"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Live HTML Content & Interactive Plan Rows  */}
          {/* Rendered 100% OUTSIDE the image                          */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl mx-auto lg:mx-0 w-full">
            
            {/* Eyebrow Tag */}
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#193E2D]/80 mb-2">
              MILK SUBSCRIPTIONS
            </p>

            {/* Editorial Heading */}
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-[#193E2D] tracking-tight leading-[1.12] mb-3">
              Fresh milk,
              <br />
              every morning.
            </h2>

            {/* Subheading / Description */}
            <p className="text-sm sm:text-base text-[#193E2D]/75 leading-relaxed font-normal mb-8 sm:mb-10">
              Pure milk from trusted farms, delivered to your doorstep in Hyderabad.
            </p>

            {/* Interactive Subscription Plan Rows (Clickable Buttons) */}
            <div className="w-full space-y-2.5" role="radiogroup" aria-label="Subscription Plans">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.days;
                return (
                  <button
                    key={plan.days}
                    type="button"
                    onClick={() => handleSelectPlan(plan.days)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-center border ${
                      isSelected
                        ? "bg-white border-[#193E2D] shadow-[0_4px_16px_rgba(25,62,45,0.08)] ring-1 ring-[#193E2D]"
                        : "bg-white/40 hover:bg-white/90 border-[#193E2D]/10 hover:border-[#193E2D]/30"
                    }`}
                  >
                    {/* Most Popular Label */}
                    {plan.popular && (
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#A87428] mb-1 block">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="flex items-center justify-between w-full">
                      {/* Left: Duration with Selection Indicator */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-[#193E2D] bg-[#193E2D] text-white"
                              : "border-[#193E2D]/30 bg-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-[#193E2D] uppercase">
                          {plan.days} DAYS
                        </span>
                      </div>

                      {/* Right: Pricing */}
                      <div className="flex items-baseline gap-3 sm:gap-4">
                        <span className="font-playfair text-xl sm:text-2xl font-medium text-[#193E2D]">
                          ₹{plan.totalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs sm:text-sm text-[#193E2D]/60 font-normal">
                          ₹{plan.perDayPrice} per day
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Primary CTA Button */}
            <div className="pt-6 sm:pt-8">
              <button
                type="button"
                onClick={handleStartSubscription}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-[#193E2D] hover:bg-[#122E21] text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                aria-label={`Start ${selectedPlan} days milk subscription`}
              >
                <span>Start milk subscription</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
