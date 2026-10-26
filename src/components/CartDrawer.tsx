'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Tag,
  QrCode,
  CreditCard,
  Banknote,
  Copy,
  Check,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  Phone,
  User,
  Clock,
  Truck,
  MapPin,
  PackageCheck,
  Navigation,
} from 'lucide-react';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

interface AppliedCoupon {
  code: string;
  discountAmount: number;
  label: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  // Navigation & Step State: 'cart' | 'payment_select' | 'qr_scanner' | 'order_complete'
  const [currentStep, setCurrentStep] = useState<'cart' | 'payment_select' | 'qr_scanner' | 'order_complete'>('cart');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  
  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Payment Verification State
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset internal states when cart closes
  const handleCloseDrawer = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep('cart');
      setAppliedCoupon(null);
      setCouponInput('');
      setCouponError('');
      setCouponSuccess('');
      setIsVerifyingPayment(false);
    }, 300);
  };

  if (!isOpen) return null;

  // Calculation Logic
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Delivery Fee calculation
  const deliveryFee = subtotal > 300 || (appliedCoupon && appliedCoupon.code === 'FREESHIP') ? 0 : 40;

  // Coupon discount computation
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;

  // Grand Total calculation
  const netTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  // Estimated savings
  const totalSavings = Math.round(subtotal * 0.2) + (deliveryFee === 0 ? 40 : 0) + couponDiscount;

  // Handle coupon application
  const handleApplyCoupon = (manualCode?: string) => {
    setCouponError('');
    setCouponSuccess('');
    const codeToTest = (manualCode || couponInput).trim().toUpperCase();

    if (!codeToTest) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (codeToTest === 'NANDI10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon({
        code: 'NANDI10',
        discountAmount: discount,
        label: '10% Instant Discount on farm groceries',
      });
      setCouponSuccess(`Coupon NANDI10 applied! You saved ₹${discount}`);
      setCouponInput('');
    } else if (codeToTest === 'ORGANIC50') {
      if (subtotal < 299) {
        setCouponError('ORGANIC50 requires a minimum order amount of ₹299.');
        return;
      }
      setAppliedCoupon({
        code: 'ORGANIC50',
        discountAmount: 50,
        label: 'Flat ₹50 OFF on Fresh Harvest',
      });
      setCouponSuccess('Coupon ORGANIC50 applied! You saved ₹50');
      setCouponInput('');
    } else if (codeToTest === 'FREESHIP') {
      setAppliedCoupon({
        code: 'FREESHIP',
        discountAmount: 0,
        label: 'Free Doorstep Delivery Unlocked',
      });
      setCouponSuccess('Free Delivery coupon applied successfully!');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try NANDI10 or ORGANIC50.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('nandifarms@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleProceedToPaymentSelect = () => {
    setCurrentStep('payment_select');
  };

  const handleConfirmPaymentOption = () => {
    if (selectedPaymentMethod === 'upi') {
      setCurrentStep('qr_scanner');
    } else {
      setIsVerifyingPayment(true);
      setTimeout(() => {
        setIsVerifyingPayment(false);
        setCurrentStep('order_complete');
        onClearCart();
      }, 1500);
    }
  };

  const handleCompleteQrPayment = () => {
    setIsVerifyingPayment(true);
    setTimeout(() => {
      setIsVerifyingPayment(false);
      setCurrentStep('order_complete');
      onClearCart();
    }, 2000);
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f9f9f8] font-sans animate-in fade-in duration-200 flex flex-col">
      
      {/* 1. STICKY FULL-PAGE TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={
                currentStep !== 'cart' && currentStep !== 'order_complete'
                  ? () => setCurrentStep(currentStep === 'qr_scanner' ? 'payment_select' : 'cart')
                  : handleCloseDrawer
              }
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition border border-emerald-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                {currentStep === 'cart' || currentStep === 'order_complete' ? 'Back to Shopping' : 'Back'}
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl">🌿</span>
              <span className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight">Nandi Farms</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep === 'cart' && cartItems.length > 0 && (
              <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full hidden sm:inline-block">
                🛒 {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'} in Cart
              </span>
            )}
            <div className="hidden md:flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Checkout</span>
            </div>
            <button
              onClick={handleCloseDrawer}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              title="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN FULL-PAGE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* STEP 1: CART ITEMS & CHECKOUT OVERVIEW */}
        {currentStep === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
                <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <ShoppingBag className="w-12 h-12 stroke-1 text-emerald-600" />
                </div>
                <h3 className="font-black text-xl text-gray-900">Your Grocery Cart is Empty</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Add farm-fresh organic vegetables, pure A2 dairy, cold pressed oils, and groceries from Nandi Farms to get started.
                </p>
                <button
                  onClick={handleCloseDrawer}
                  className="mt-2 bg-[#07362a] hover:bg-emerald-900 text-white font-extrabold text-xs px-6 py-3 rounded-full shadow-md transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>Explore Fresh Harvest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: Cart Items & Delivery Info (7 Cols on LG) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                  
                  {/* Delivery Promise Card */}
                  <div className="bg-[#07362a] text-white rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-md">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-800/80 border border-emerald-700 flex items-center justify-center text-2xl shrink-0">
                        ⚡
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-black text-white">Express Delivery in 10-15 Minutes</h4>
                          <span className="bg-amber-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Live
                          </span>
                        </div>
                        <p className="text-xs text-emerald-200 mt-0.5 font-medium">
                          Delivering directly from Nandi Farms Hub to your address
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black bg-emerald-700/90 text-white px-3 py-1.5 rounded-xl uppercase tracking-wider hidden sm:inline-block">
                      FREE DELIVERY
                    </span>
                  </div>

                  {/* Cart Items List Container */}
                  <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-black text-base text-gray-900">
                          Review Your Items ({totalItemCount})
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">All items farm-harvested daily</p>
                      </div>
                      <button
                        onClick={onClearCart}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {cartItems.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4 group"
                        >
                          <div className="flex items-center space-x-4 min-w-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-gray-200 bg-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500 font-medium mt-0.5">
                                ₹{product.price} / {product.unit}
                              </p>
                              <span className="inline-block text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-1">
                                {product.farmer || 'Nandi Farms Harvest'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-5 sm:space-x-8 shrink-0">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-2 py-1 shadow-2xs">
                              <button
                                onClick={() => onUpdateQuantity(product.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-emerald-800 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                                title="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                              <span className="w-8 text-center font-black text-sm text-gray-900">
                                {quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(product.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-emerald-800 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                                title="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>

                            {/* Item Total Price & Delete */}
                            <div className="text-right min-w-[70px]">
                              <span className="font-black text-base text-emerald-950 block">
                                ₹{product.price * quantity}
                              </span>
                              <button
                                onClick={() => onRemoveItem(product.id)}
                                className="text-gray-400 hover:text-rose-600 p-1 transition-colors cursor-pointer inline-block"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Savings Callout Banner */}
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                      <span className="text-lg">🎉</span>
                      <span>
                        You are saving <strong className="text-emerald-700">₹{totalSavings}</strong> on this order compared to retail supermarket prices!
                      </span>
                    </div>
                    <span className="text-[11px] font-black text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                      Direct Farm Source
                    </span>
                  </div>

                  {/* Farm Quality Guarantee Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-white rounded-2xl border border-gray-200/80 p-3.5 text-center">
                      <span className="text-xl">🌿</span>
                      <h5 className="font-bold text-xs text-gray-900 mt-1">100% Certified Organic</h5>
                      <p className="text-[11px] text-gray-500">Zero artificial pesticides</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200/80 p-3.5 text-center">
                      <span className="text-xl">🚜</span>
                      <h5 className="font-bold text-xs text-gray-900 mt-1">Direct from Farmers</h5>
                      <p className="text-[11px] text-gray-500">Fair prices to producers</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200/80 p-3.5 text-center">
                      <span className="text-xl">🛡️</span>
                      <h5 className="font-bold text-xs text-gray-900 mt-1">Hygiene Packed Cold</h5>
                      <p className="text-[11px] text-gray-500">Sealed at farm gate</p>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Sticky Coupons & Bill Summary (5 Cols on LG) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-24">
                  
                  {/* Coupons & Promo Codes Box */}
                  <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-emerald-950 font-bold text-xs">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Apply Coupon / Promo Code</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Offers Available
                      </span>
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50/80 p-3 rounded-2xl border border-emerald-300">
                        <div className="flex items-center space-x-2.5">
                          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                          <div>
                            <p className="text-xs font-black text-emerald-900 uppercase">
                              {appliedCoupon.code}
                            </p>
                            <p className="text-[11px] text-emerald-700 font-medium">
                              {appliedCoupon.label}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-white px-2.5 py-1 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="Enter coupon (e.g. NANDI10)"
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 uppercase tracking-wide placeholder:normal-case placeholder:font-normal"
                          />
                          <button
                            onClick={() => handleApplyCoupon()}
                            className="bg-[#07362a] hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>

                        {couponError && (
                          <p className="text-[11px] text-rose-600 font-semibold pl-1">
                            ⚠️ {couponError}
                          </p>
                        )}
                        {couponSuccess && (
                          <p className="text-[11px] text-emerald-700 font-bold pl-1">
                            🎉 {couponSuccess}
                          </p>
                        )}

                        {/* Quick Coupon Chips */}
                        <div className="pt-1">
                          <p className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                            Available Offers (Tap to Apply):
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => handleApplyCoupon('NANDI10')}
                              className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-200 transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <span>🏷️ NANDI10</span>
                              <span className="text-[9px] text-amber-700 font-medium">(10% OFF)</span>
                            </button>
                            <button
                              onClick={() => handleApplyCoupon('ORGANIC50')}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <span>🌱 ORGANIC50</span>
                              <span className="text-[9px] text-emerald-700 font-medium">(₹50 OFF)</span>
                            </button>
                            <button
                              onClick={() => handleApplyCoupon('FREESHIP')}
                              className="bg-sky-50 hover:bg-sky-100 text-sky-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-sky-200 transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <span>🚀 FREESHIP</span>
                              <span className="text-[9px] text-sky-700 font-medium">(Free Delivery)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bill Summary Card */}
                  <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-xs space-y-3.5">
                    <h4 className="font-black text-sm text-gray-900 pb-2 border-b border-gray-100">
                      Bill Summary
                    </h4>

                    <div className="space-y-2 text-xs font-bold text-gray-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal ({totalItemCount} items)</span>
                        <span className="text-gray-900 font-extrabold">₹{subtotal}</span>
                      </div>

                      {appliedCoupon && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Coupon Discount ({appliedCoupon.code})</span>
                          <span>-₹{couponDiscount}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="font-extrabold">
                          {deliveryFee === 0 ? (
                            <span className="text-emerald-700">FREE</span>
                          ) : (
                            `₹${deliveryFee}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Handling & Packaging</span>
                        <span className="text-emerald-700 font-extrabold">FREE</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                      <div>
                        <span className="font-black text-base text-gray-900">Total Amount</span>
                        <p className="text-[10px] text-gray-400 font-semibold">Inclusive of all taxes</p>
                      </div>
                      <span className="font-black text-2xl text-[#1b6b38]">₹{netTotal}</span>
                    </div>

                    {/* Proceed Button */}
                    <button
                      onClick={handleProceedToPaymentSelect}
                      className="w-full bg-[#07362a] hover:bg-[#05271e] text-white py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-xl transition-all cursor-pointer"
                    >
                      <span>Proceed to Select Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Security & Support Guarantee */}
                  <div className="text-center text-[11px] font-bold text-gray-400 space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Safe & Secure Checkout</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Guaranteed freshness or instant replacement</p>
                  </div>

                </div>

              </div>
            )}
          </>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {currentStep === 'payment_select' && (
          <div className="max-w-3xl mx-auto py-4 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-black text-xl text-gray-900">Select Payment Method</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Order Total: <strong className="text-emerald-800 text-sm">₹{netTotal}</strong> ({totalItemCount} items)
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Encrypted</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Option 1: UPI QR Scanner (RECOMMENDED) */}
                <label
                  onClick={() => setSelectedPaymentMethod('upi')}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'upi'
                      ? 'bg-emerald-50/90 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-gray-900">UPI Instant QR Scanner</span>
                        <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM, CRED UPI
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={() => setSelectedPaymentMethod('upi')}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                {/* Option 2: Cash on Delivery */}
                <label
                  onClick={() => setSelectedPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'cod'
                      ? 'bg-emerald-50/90 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Cash on Delivery (COD)</span>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">Pay with cash or UPI on delivery</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentMethod === 'cod'}
                    onChange={() => setSelectedPaymentMethod('cod')}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                {/* Option 3: Credit / Debit Card & NetBanking */}
                <label
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'bg-emerald-50/90 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Credit / Debit Card & NetBanking</span>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">Visa, Mastercard, RuPay, Corporate Banking</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={() => setSelectedPaymentMethod('card')}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep('cart')}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition cursor-pointer"
                >
                  ← Return to Review Items
                </button>
                <button
                  onClick={handleConfirmPaymentOption}
                  disabled={isVerifyingPayment}
                  className="w-full sm:w-auto min-w-[240px] bg-[#07362a] hover:bg-emerald-900 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifyingPayment ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>{selectedPaymentMethod === 'upi' ? 'Open UPI QR Scanner' : `Pay ₹${netTotal}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: HIGH-DEFINITION UPI QR SCANNER */}
        {currentStep === 'qr_scanner' && (
          <div className="max-w-xl mx-auto py-4 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs text-center space-y-5">
              
              <div className="bg-[#07362a] text-white p-5 rounded-2xl shadow-inner space-y-1">
                <span className="text-xs text-emerald-300 font-medium uppercase tracking-wider block">
                  Scan QR Code to Pay Total Amount
                </span>
                <p className="text-3xl sm:text-4xl font-black text-amber-300">
                  ₹{netTotal}
                </p>
                <p className="text-xs text-emerald-200">Merchant: Nandi Farms Organics Pvt Ltd</p>
              </div>

              {/* QR Code Container */}
              <div className="p-6 bg-white border-2 border-dashed border-emerald-500 rounded-3xl shadow-lg max-w-[280px] mx-auto relative group">
                <div className="relative aspect-square w-full bg-white flex items-center justify-center p-2 rounded-2xl overflow-hidden border border-gray-100">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full text-emerald-950"
                    fill="currentColor"
                  >
                    <rect x="10" y="10" width="50" height="50" fill="#07362a" rx="8" />
                    <rect x="20" y="20" width="30" height="30" fill="#ffffff" rx="4" />
                    <rect x="27" y="27" width="16" height="16" fill="#07362a" rx="2" />

                    <rect x="140" y="10" width="50" height="50" fill="#07362a" rx="8" />
                    <rect x="150" y="20" width="30" height="30" fill="#ffffff" rx="4" />
                    <rect x="157" y="27" width="16" height="16" fill="#07362a" rx="2" />

                    <rect x="10" y="140" width="50" height="50" fill="#07362a" rx="8" />
                    <rect x="20" y="150" width="30" height="30" fill="#ffffff" rx="4" />
                    <rect x="27" y="157" width="16" height="16" fill="#07362a" rx="2" />

                    <rect x="70" y="15" width="12" height="12" rx="2" />
                    <rect x="90" y="15" width="12" height="12" rx="2" />
                    <rect x="110" y="15" width="12" height="12" rx="2" />
                    <rect x="70" y="35" width="12" height="12" rx="2" />
                    <rect x="105" y="35" width="12" height="12" rx="2" />
                    <rect x="15" y="70" width="12" height="12" rx="2" />
                    <rect x="35" y="70" width="12" height="12" rx="2" />
                    <rect x="70" y="70" width="12" height="12" rx="2" />
                    <rect x="90" y="70" width="12" height="12" rx="2" />
                    <rect x="115" y="70" width="12" height="12" rx="2" />
                    <rect x="140" y="70" width="12" height="12" rx="2" />
                    <rect x="165" y="70" width="12" height="12" rx="2" />
                    <rect x="15" y="90" width="12" height="12" rx="2" />
                    <rect x="45" y="90" width="12" height="12" rx="2" />
                    <rect x="70" y="90" width="12" height="12" rx="2" />
                    <rect x="100" y="90" width="12" height="12" rx="2" />
                    <rect x="125" y="90" width="12" height="12" rx="2" />
                    <rect x="150" y="90" width="12" height="12" rx="2" />
                    <rect x="175" y="90" width="12" height="12" rx="2" />
                    <rect x="70" y="110" width="12" height="12" rx="2" />
                    <rect x="95" y="110" width="12" height="12" rx="2" />
                    <rect x="120" y="110" width="12" height="12" rx="2" />
                    <rect x="145" y="110" width="12" height="12" rx="2" />
                    <rect x="170" y="110" width="12" height="12" rx="2" />
                    <rect x="70" y="140" width="12" height="12" rx="2" />
                    <rect x="95" y="140" width="12" height="12" rx="2" />
                    <rect x="140" y="140" width="12" height="12" rx="2" />
                    <rect x="165" y="140" width="12" height="12" rx="2" />
                    <rect x="70" y="165" width="12" height="12" rx="2" />
                    <rect x="100" y="165" width="12" height="12" rx="2" />
                    <rect x="125" y="165" width="12" height="12" rx="2" />
                    <rect x="150" y="165" width="12" height="12" rx="2" />
                    <rect x="175" y="165" width="12" height="12" rx="2" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-[#07362a] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-white shadow-md uppercase tracking-wider">
                      NANDI
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy UPI ID */}
              <div className="flex items-center justify-center space-x-2 pt-1">
                <span className="text-xs text-gray-600 font-medium">UPI ID:</span>
                <code className="bg-gray-100 text-emerald-950 text-xs font-bold px-3 py-1 rounded-lg border border-gray-200">
                  nandifarms@upi
                </code>
                <button
                  onClick={handleCopyUpi}
                  className="p-1.5 text-gray-500 hover:text-emerald-700 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Supported Payment Apps */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Scan with any payment app:
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2 text-[10px] font-extrabold">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">Google Pay</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg border border-purple-200">PhonePe</span>
                  <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-lg border border-cyan-200">Paytm</span>
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg border border-orange-200">BHIM UPI</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep('payment_select')}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition cursor-pointer"
                >
                  ← Change Payment Method
                </button>
                <button
                  onClick={handleCompleteQrPayment}
                  disabled={isVerifyingPayment}
                  className="w-full sm:w-auto min-w-[220px] bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifyingPayment ? (
                    <span>Verifying UPI Payment...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Complete Payment</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: POST-PAYMENT LIVE TRACKING SCREEN */}
        {currentStep === 'order_complete' && (
          <div className="max-w-2xl mx-auto py-4 space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Order Confirmation Hero Banner */}
              <div className="bg-gradient-to-br from-[#07362a] to-emerald-950 text-white p-5 sm:p-6 rounded-3xl shadow-xl text-left relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-800/80 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300/30 uppercase tracking-wider">
                    Order ID: NF-892401
                  </span>
                  <span className="text-xs text-emerald-200 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Payment Verified</span>
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-emerald-200 font-medium">Estimated Arrival at Your Doorstep:</p>
                  <div className="flex items-baseline space-x-3 mt-1">
                    <h4 className="text-3xl sm:text-4xl font-black text-white">8-10 Mins</h4>
                    <span className="text-xs text-amber-300 font-bold animate-pulse">⚡ Express Delivery Active</span>
                  </div>
                </div>

                <div className="mt-4 bg-emerald-950/60 rounded-full h-2 overflow-hidden p-0.5 border border-emerald-700/50">
                  <div className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 h-full rounded-full w-[70%] animate-pulse" />
                </div>
              </div>

              {/* Delivery Boy Details */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 space-y-3 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Assigned Delivery Executive</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    On the way 🛵
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-black text-lg shadow-2xs shrink-0">
                      <User className="w-6 h-6 text-emerald-800" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm sm:text-base text-gray-900">Ramesh Kumar</h5>
                      <p className="text-xs text-gray-500 font-medium">
                        ⭐ 4.9 <span className="text-gray-400">(1,250+ deliveries)</span>
                      </p>
                      <p className="text-xs text-emerald-700 font-bold mt-0.5">
                        📱 +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <a
                    href="tel:+919876543210"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center space-x-1.5 shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Ramesh</span>
                  </a>
                </div>
              </div>

              {/* Live Map Route */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden text-left relative shadow-sm">
                <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-extrabold text-xs tracking-wide">Live GPS Route Tracker</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                    1.2 km away • 4 Mins
                  </span>
                </div>

                <div className="relative h-44 bg-[#e8ece9] overflow-hidden flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-35 text-slate-400" fill="none" stroke="currentColor">
                    <path d="M 0,20 Q 80,40 160,20 T 320,30" strokeWidth="6" stroke="#94a3b8" />
                    <path d="M 40,0 Q 60,100 80,200" strokeWidth="8" stroke="#cbd5e1" />
                    <path d="M 200,0 Q 180,120 220,200" strokeWidth="7" stroke="#cbd5e1" />
                    <path d="M 0,110 L 400,110" strokeWidth="10" stroke="#ffffff" />
                  </svg>
                  <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <path
                      d="M 60,110 C 130,110 150,50 320,50"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="4"
                      strokeDasharray="6 6"
                      className="animate-pulse"
                    />
                  </svg>
                  <div className="absolute left-[50px] top-[90px] z-20 flex flex-col items-center animate-bounce">
                    <div className="bg-[#07362a] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-amber-300">
                      🛵 Ramesh Kumar
                    </div>
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl text-sm mt-0.5">
                      🛵
                    </div>
                  </div>
                  <div className="absolute right-[50px] top-[30px] z-20 flex flex-col items-center">
                    <div className="bg-rose-950 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-rose-300">
                      🏠 Doorstep
                    </div>
                    <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-xl text-sm mt-0.5">
                      📍
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 text-left space-y-3">
                <h5 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                  Live Order Status Timeline:
                </h5>
                <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[23px] top-0 w-3 h-3 bg-emerald-600 rounded-full ring-4 ring-white" />
                    <p className="text-xs font-bold text-gray-900">Order Placed & Payment Verified</p>
                    <p className="text-[10px] text-gray-500">Order ID: NF-892401 • Paid via {selectedPaymentMethod.toUpperCase()}</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[23px] top-0 w-3 h-3 bg-emerald-600 rounded-full ring-4 ring-white" />
                    <p className="text-xs font-bold text-gray-900">Packed at Nandi Farms Hub</p>
                    <p className="text-[10px] text-gray-500">Quality checked & sealed for fresh delivery</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[23px] top-0 w-3 h-3 bg-amber-500 rounded-full ring-4 ring-white animate-ping" />
                    <p className="text-xs font-bold text-emerald-800">Out for Doorstep Delivery</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">Ramesh Kumar is approaching your location</p>
                  </div>
                </div>
              </div>

              {/* Return to Shopping CTA */}
              <button
                onClick={handleCloseDrawer}
                className="w-full bg-[#07362a] hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm py-4 rounded-2xl transition-all shadow-md cursor-pointer"
              >
                Close & Return to Shopping
              </button>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
