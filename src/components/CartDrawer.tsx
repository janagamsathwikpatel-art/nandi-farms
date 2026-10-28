"use client";

import React, { useState } from "react";
import { X, Plus, Minus, Trash2, ArrowRight, Zap, CheckCircle, ShieldCheck } from "lucide-react";
import { HARVEST_PRODUCTS } from "./ZeptoHarvestSection";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [productId: string]: number };
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}: CartDrawerProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = HARVEST_PRODUCTS.find((p) => p.id === id);
      return product ? { ...product, quantity: qty } : null;
    })
    .filter(Boolean) as (typeof HARVEST_PRODUCTS[0] & { quantity: number })[];

  const itemTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = itemTotal >= 199 || itemTotal === 0 ? 0 : 29;
  const grandTotal = itemTotal + deliveryFee;

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col z-10 border-l border-[#e5dfd3]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#162e1e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b87a38] flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Your Farm Basket</h3>
              <p className="text-xs text-[#cad8cc]">Dispatched fresh in 15–25 mins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlaced ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#183420] mb-2">
              Harvest Order Confirmed!
            </h4>
            <p className="text-sm text-[#4d5f50] mb-6">
              Our harvest team at Nandi Farms has received your order. Your produce is being packed fresh from the morning yield!
            </p>
            <button
              onClick={() => {
                setOrderPlaced(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#183420] text-white text-sm font-semibold hover:bg-[#254d30] transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center text-[#738374]">
            <div className="w-16 h-16 rounded-full bg-[#eee9df] flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-[#98a69a]" />
            </div>
            <p className="font-serif text-lg text-[#253928] font-medium">Your basket is empty</p>
            <p className="text-xs text-[#738374] mt-1 max-w-xs">
              Explore today&apos;s fresh morning harvest and add pesticide-free organic produce to your basket.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 rounded-full bg-[#162e1e] text-white text-xs font-semibold hover:bg-[#254d30]"
            >
              Browse Fresh Produce
            </button>
          </div>
        ) : (
          <>
            {/* Free Delivery Bar */}
            <div className="bg-[#ede7da] px-4 py-2.5 text-xs text-[#2a3c2c] border-b border-[#ded7c8]">
              {itemTotal >= 199 ? (
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Free Farm Express Delivery unlocked!</span>
                </div>
              ) : (
                <p>
                  Add <span className="font-bold text-[#183420]">₹{199 - itemTotal}</span> more to unlock <span className="font-bold">Free Express Delivery</span>!
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border border-[#e8e2d4] flex items-center justify-between gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#f3efe6]"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-xs sm:text-sm text-[#183420] truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-[#738374]">{item.weight}</p>
                    <p className="font-bold text-xs sm:text-sm text-[#183420] mt-0.5">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#1c4028] text-white rounded-lg px-1.5 py-1">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-1 hover:bg-[#2b5a3a] rounded"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAddToCart(item.id)}
                      className="p-1 hover:bg-[#2b5a3a] rounded"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#e2dcd0] space-y-2">
              <div className="flex justify-between text-xs text-[#526454]">
                <span>Items Subtotal</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-[#526454]">
                <span>Farm-to-Door Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#f0ece1] flex justify-between font-bold text-sm text-[#183420]">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full mt-3 py-3 rounded-xl bg-[#b87a38] hover:bg-[#cb883f] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <span>Place Express Harvest Order (₹{grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#738374]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Harvested fresh upon order confirmation</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
