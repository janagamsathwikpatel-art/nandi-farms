"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Truck, Check } from "lucide-react";
import "./MilkSubscriptionBanner.css";

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

  const handlePlanClick = (days: number) => {
    setSelectedPlan(days);
    if (onOpenModal) {
      onOpenModal(days);
    }
  };

  return (
    <section className="milk-sub-banner-section" aria-label="Milk Subscriptions">
      {/* 1. 4K Ultra-HD Text-Free Master Photographic Plate */}
      <div className="milk-sub-banner-bg" aria-hidden="true">
        <Image
          src="/images/milk-subscriptions-banner-4k.png"
          alt="Fresh Farm Milk Subscriptions Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-right md:object-center select-none pointer-events-none"
        />
        {/* Soft mobile gradient overlay to ensure contrast on small screens */}
        <div className="milk-sub-mobile-gradient" />
      </div>

      {/* 2. Live Interactive HTML/React Layer Rendered OUTSIDE Image */}
      <div className="milk-sub-banner-content max-w-[1920px] 2xl:max-w-[2400px] 4k:max-w-[3400px] mx-auto w-full">
        <div className="milk-sub-grid">
          {/* Left Editorial Column */}
          <div className="milk-sub-editorial">
            <p className="milk-sub-eyebrow">MILK SUBSCRIPTIONS</p>
            <h2 className="milk-sub-heading">
              FRESH MILK
              <br />
              EVERY MORNING
            </h2>
            <p className="milk-sub-desc">
              Pure milk from trusted farms,
              <br className="hidden sm:inline" /> delivered to your doorstep in Hyderabad.
            </p>

            <button
              type="button"
              onClick={() => handlePlanClick(selectedPlan)}
              className="milk-sub-cta-btn"
              aria-label="Start milk subscription"
            >
              <span>Start milk subscription</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Center-Right Subscription Plan Cards */}
          <div className="milk-sub-plans-container">
            <div className="milk-sub-cards-row">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.days;
                return (
                  <div
                    key={plan.days}
                    className={`milk-sub-plan-card ${plan.popular ? "is-popular" : ""} ${
                      isSelected ? "is-selected" : ""
                    }`}
                    onClick={() => handlePlanClick(plan.days)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handlePlanClick(plan.days);
                      }
                    }}
                    aria-label={`${plan.days} Days milk subscription for ₹${plan.totalPrice}`}
                  >
                    {/* Most Popular Floating Badge */}
                    {plan.popular && (
                      <span className="milk-sub-popular-badge">MOST POPULAR</span>
                    )}

                    <div className="milk-sub-card-inner">
                      <div className="milk-sub-card-header">
                        <span className="milk-sub-days-num">{plan.days}</span>
                        <span className="milk-sub-days-label">DAYS</span>
                      </div>

                      <div className="milk-sub-card-divider" />

                      <div className="milk-sub-card-pricing">
                        <span className="milk-sub-total-price">
                          ₹{plan.totalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="milk-sub-per-day">
                          ₹{plan.perDayPrice} per day
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality Trust Badges */}
            <div className="milk-sub-trust-badges">
              <span className="milk-sub-trust-item">
                <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Farm Fresh</span>
              </span>
              <span className="milk-sub-trust-divider">|</span>
              <span className="milk-sub-trust-item">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No Preservatives</span>
              </span>
              <span className="milk-sub-trust-divider">|</span>
              <span className="milk-sub-trust-item">
                <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Daily Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
