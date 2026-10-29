"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";

interface MilkSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MilkSubscriptionModal({ isOpen, onClose }: MilkSubscriptionModalProps) {
  const [quantity, setQuantity] = useState<string>("1-litre");
  const [frequency, setFrequency] = useState<string>("daily");
  const [timeSlot, setTimeSlot] = useState<string>("6am-7am");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("2026-10-30");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  React.useEffect(() => {
    // Populate client-side tomorrow date without blocking prerender
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setStartDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const prices: Record<string, { label: string; price: number; per: string }> = {
    "1-litre": { label: "1 Litre Glass Bottle", price: 74, per: "day" },
    "2-litre": { label: "2 Litres (2 × 1L Bottles)", price: 145, per: "day" },
    "3-litre": { label: "3 Litres (3 × 1L Bottles)", price: 215, per: "day" },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#ded8cb] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-[#003628] text-white px-6 py-5 flex items-center justify-between border-b border-[#004e3a]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Farm Fresh Milk Subscription</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f5efe4]">
              Pure A2 Desi Cow Milk
            </h3>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Chilled morning delivery in sanitized glass bottles before 7:00 AM
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            /* Confirmation View */
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#003628]">
                Subscription Activated!
              </h4>
              <p className="text-sm text-[#4c5c4f] max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#003628]">{name || "Valued Customer"}</span>!
                Your first chilled delivery of <span className="font-semibold">{prices[quantity].label}</span> will arrive on{" "}
                <span className="font-semibold text-[#003628]">{startDate}</span> between{" "}
                <span className="font-semibold">{timeSlot === "6am-7am" ? "6:00 AM – 7:00 AM" : "7:00 AM – 8:00 AM"}</span>.
              </p>

              <div className="bg-[#faf8f5] border border-[#e8e2d4] rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between text-[#38483b]">
                  <span className="text-[#6c7d6e]">Frequency:</span>
                  <span className="font-semibold capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between text-[#38483b]">
                  <span className="text-[#6c7d6e]">Daily Total:</span>
                  <span className="font-bold text-[#003628]">₹{prices[quantity].price} / day</span>
                </div>
                <div className="flex justify-between text-[#38483b]">
                  <span className="text-[#6c7d6e]">Packaging:</span>
                  <span className="font-semibold text-emerald-800">Sterilized Glass Bottle (Zero Waste)</span>
                </div>
                <div className="flex justify-between text-[#38483b]">
                  <span className="text-[#6c7d6e]">Delivery Address:</span>
                  <span className="font-semibold text-right max-w-[200px] truncate">{address || "Registered Address"}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full bg-[#003628] hover:bg-[#004e3a] text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  Done & Back to Farm
                </button>
              </div>
            </div>
          ) : (
            /* Subscription Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Highlight Banner */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#faf8f5] border border-[#eee8dc]">
                <img
                  src="/images/products/milk-desi-a2.jpg"
                  alt="A2 Milk Bottle"
                  className="w-14 h-14 object-cover rounded-lg border border-[#e0d8ca]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#003628]">
                      Nandi Farm Fresh Pure A2 Cow Milk
                    </span>
                    <span className="font-extrabold text-sm text-[#b87a38]">
                      ₹{prices[quantity].price} / {prices[quantity].per}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#637466] mt-0.5">
                    100% Gir cow whole milk, unadulterated, untouched by hand.
                  </p>
                </div>
              </div>

              {/* Step 1: Select Quantity */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003628] mb-2">
                  1. Select Quantity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "1-litre", title: "1 Litre", price: "₹74/day" },
                    { id: "2-litre", title: "2 Litres", price: "₹145/day", popular: true },
                    { id: "3-litre", title: "3 Litres", price: "₹215/day" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setQuantity(item.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                        quantity === item.id
                          ? "border-[#003628] bg-[#003628]/5 shadow-xs"
                          : "border-[#e5dfd2] hover:border-[#003628]/50"
                      }`}
                    >
                      {item.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#b87a38] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                          Popular
                        </span>
                      )}
                      <span className="block font-bold text-xs text-[#003628]">{item.title}</span>
                      <span className="block text-[11px] text-[#718273] mt-0.5">{item.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Delivery Frequency */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003628] mb-2">
                  2. Delivery Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "daily", label: "Everyday" },
                    { id: "alternate", label: "Alternate Days" },
                    { id: "weekdays", label: "Mon - Fri Only" },
                  ].map((freq) => (
                    <button
                      type="button"
                      key={freq.id}
                      onClick={() => setFrequency(freq.id)}
                      className={`p-2 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                        frequency === freq.id
                          ? "border-[#003628] bg-[#003628] text-white shadow-xs"
                          : "border-[#e5dfd2] text-[#334636] hover:bg-[#faf8f5]"
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Preferred Delivery Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#003628] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#b87a38]" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-[#ded8cb] bg-white text-[#223326] focus:border-[#003628] focus:ring-1 focus:ring-[#003628] outline-none"
                  >
                    <option value="6am-7am">6:00 AM – 7:00 AM (Recommended)</option>
                    <option value="7am-8am">7:00 AM – 8:00 AM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003628] mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#b87a38]" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-[#ded8cb] bg-white text-[#223326] focus:border-[#003628] focus:ring-1 focus:ring-[#003628] outline-none"
                  />
                </div>
              </div>

              {/* Step 4: Contact & Delivery Details */}
              <div className="space-y-2 pt-1 border-t border-[#f0ece2]">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xs p-2 rounded-lg border border-[#ded8cb] bg-white placeholder-[#98a79a] focus:border-[#003628] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (e.g. 9876543210)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs p-2 rounded-lg border border-[#ded8cb] bg-white placeholder-[#98a79a] focus:border-[#003628] outline-none"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute top-2.5 left-2.5 text-[#88988a]" />
                  <input
                    type="text"
                    required
                    placeholder="Delivery Address (House/Flat No, Apartment, Street)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2 pl-8 rounded-lg border border-[#ded8cb] bg-white placeholder-[#98a79a] focus:border-[#003628] outline-none"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between py-1 px-2 text-[10px] text-[#677769] bg-[#faf8f5] rounded-md">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Pause or cancel anytime</span>
                </span>
                <span>•</span>
                <span>Glass bottle swap on arrival</span>
                <span>•</span>
                <span>No delivery charges</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#003628] hover:bg-[#004e3a] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                Start Milk Subscription (₹{prices[quantity].price} / {prices[quantity].per})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
