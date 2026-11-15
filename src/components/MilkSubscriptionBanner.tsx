"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./MilkSubscriptionBanner.css";

interface MilkSubscriptionBannerProps {
  onOpenModal?: (planDays?: number) => void;
}

export interface SubscriptionPlan {
  days: number;
  label: string;
  totalPrice: number;
  perDayPrice: number;
  popular?: boolean;
}

const PLANS: SubscriptionPlan[] = [
  { days: 7, label: "7 DAYS", totalPrice: 490, perDayPrice: 70 },
  { days: 15, label: "15 DAYS", totalPrice: 945, perDayPrice: 63 },
  { days: 30, label: "30 DAYS", totalPrice: 1800, perDayPrice: 60, popular: true },
];

export default function MilkSubscriptionBanner({ onOpenModal }: MilkSubscriptionBannerProps) {
  const [selectedPlan, setSelectedPlan] = useState<number>(7);

  const handleSelectPlan = (days: number) => {
    setSelectedPlan(days);
  };

  const handleStartSubscription = () => {
    if (onOpenModal) {
      onOpenModal(selectedPlan);
    }
  };

  return (
    <div className="milk-plans-wrapper">
      <div className="milk-plans-container">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Text-Free Editorial Photographic Plate       */}
        {/* ======================================================== */}
        <div className="milk-plans-image-col">
          <div className="milk-plans-card">
            <Image
              src="/images/milk-subscription-editorial-plate.jpg"
              alt="Fresh Farm Milk Bottle, Glass and Pasture Heritage"
              width={535}
              height={512}
              priority
              className="milk-plans-plate-img"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: User-Provided Milk Plans Code & Structure  */}
        {/* ======================================================== */}
        <section className="milk-plans" aria-label="Milk Subscriptions">
          <p className="eyebrow">MILK SUBSCRIPTIONS</p>
          <h1>
            Fresh milk,
            <br />
            every morning.
          </h1>
          <p className="description">
            Pure milk from trusted farms, delivered to your doorstep in Hyderabad.
          </p>

          <div className="plans" id="plans" role="radiogroup">
            {PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.days;
              return (
                <button
                  key={plan.days}
                  type="button"
                  data-plan={plan.label}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectPlan(plan.days)}
                  className={`plan ${isSelected ? "selected" : ""} ${plan.popular ? "popular" : ""}`}
                >
                  {plan.popular && <span className="popular-label">MOST POPULAR</span>}
                  <span className="check">{isSelected ? "✓" : ""}</span>
                  <strong>{plan.label}</strong>
                  <span className="price">₹{plan.totalPrice.toLocaleString("en-IN")}</span>
                  <span className="per-day">₹{plan.perDayPrice} per day</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="start-button"
            onClick={handleStartSubscription}
            aria-label={`Start ${selectedPlan} days milk subscription`}
          >
            Start milk subscription <span>→</span>
          </button>
        </section>

      </div>
    </div>
  );
}
