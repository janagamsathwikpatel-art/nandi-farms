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

  // Reset internal states when drawer closes
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
  const isFreeDeliveryBySubtotal = subtotal > 499 || subtotal === 0;
  const isFreeDeliveryByCoupon = appliedCoupon?.code === 'FREESHIP';
  const deliveryFee = (isFreeDeliveryBySubtotal || isFreeDeliveryByCoupon) ? 0 : 40;

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'NANDI10') {
      couponDiscount = Math.round(subtotal * 0.1);
    } else if (appliedCoupon.code === 'ORGANIC50') {
      couponDiscount = Math.min(50, subtotal);
    }
  }

  const netTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  // Coupon Handlers
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');
    setCouponSuccess('');

    if (!code) {
      setCouponError('Please enter a valid coupon code');
      return;
    }

    if (code === 'NANDI10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon({
        code: 'NANDI10',
        discountAmount: discount,
        label: '10% OFF Special Discount',
      });
      setCouponSuccess('Coupon NANDI10 applied successfully! Saved 10%');
      setCouponInput('NANDI10');
    } else if (code === 'ORGANIC50') {
      if (subtotal < 200) {
        setCouponError('ORGANIC50 requires minimum cart value of ₹200');
        return;
      }
      setAppliedCoupon({
        code: 'ORGANIC50',
        discountAmount: 50,
        label: 'Flat ₹50 OFF Organic Savings',
      });
      setCouponSuccess('Coupon ORGANIC50 applied! ₹50 Discount');
      setCouponInput('ORGANIC50');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({
        code: 'FREESHIP',
        discountAmount: 40,
        label: 'Free Doorstep Delivery Waived',
      });
      setCouponSuccess('Coupon FREESHIP applied! Free delivery granted.');
      setCouponInput('FREESHIP');
    } else {
      setCouponError('Invalid coupon code. Try NANDI10 or ORGANIC50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    setCouponSuccess('');
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('nandifarms@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleProceedToPaymentSelect = () => {
    if (cartItems.length === 0) return;
    setCurrentStep('payment_select');
  };

  const handleConfirmPaymentOption = () => {
    if (selectedPaymentMethod === 'upi') {
      setCurrentStep('qr_scanner');
    } else {
      // COD or Card
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={handleCloseDrawer}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-emerald-900/10 flex items-center justify-between bg-[#07362a] text-white shadow-sm">
            <div className="flex items-center space-x-2">
              {currentStep !== 'cart' && currentStep !== 'order_complete' && (
                <button
                  onClick={() => setCurrentStep(currentStep === 'qr_scanner' ? 'payment_select' : 'cart')}
                  className="mr-1 p-1 hover:bg-emerald-800 rounded-full transition-colors text-emerald-200"
                  title="Go Back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base tracking-wide">
                {currentStep === 'cart' && 'Your Grocery Cart'}
                {currentStep === 'payment_select' && 'Select Payment Method'}
                {currentStep === 'qr_scanner' && 'Pay via UPI QR Scanner'}
                {currentStep === 'order_complete' && 'Order Placed!'}
              </h3>
              {currentStep === 'cart' && (
                <span className="bg-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
              )}
            </div>
            <button
              onClick={handleCloseDrawer}
              className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-emerald-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
            
            {/* STEP 1: CART ITEMS LIST & COUPONS BOX */}
            {currentStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-gray-400 my-auto">
                    <ShoppingBag className="w-16 h-16 stroke-1 text-gray-300" />
                    <p className="font-semibold text-sm text-gray-600">Your cart is empty</p>
                    <p className="text-xs text-gray-400">Add fresh groceries from Nandi Farms to get started!</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-3">
                      {cartItems.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3.5 p-3 bg-gray-50/90 rounded-2xl border border-gray-100 shadow-2xs hover:border-emerald-200 transition-all"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl border border-gray-200 bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium">
                              ₹{product.price} / {product.unit}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-2xs">
                                <button
                                  onClick={() => onUpdateQuantity(product.id, -1)}
                                  className="text-gray-500 hover:text-emerald-700 p-0.5"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(product.id, 1)}
                                  className="text-gray-500 hover:text-emerald-700 p-0.5"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-extrabold text-sm text-gray-900 block">
                              ₹{product.price * quantity}
                            </span>
                            <button
                              onClick={() => onRemoveItem(product.id)}
                              className="text-rose-400 hover:text-rose-600 p-1 mt-1 inline-block transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* WORKING COUPONS & PROMO CODE BOX */}
                    <div className="mt-5 p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-emerald-950 font-bold text-xs">
                          <Tag className="w-4 h-4 text-emerald-600" />
                          <span>Apply Coupon / Promo Code</span>
                        </div>
                        <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          Offers Inside
                        </span>
                      </div>

                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-300">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                            <div>
                              <p className="text-xs font-black text-emerald-900 uppercase">
                                {appliedCoupon.code}
                              </p>
                              <p className="text-[10px] text-emerald-700 font-medium">
                                {appliedCoupon.label}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              placeholder="Enter coupon code (e.g. NANDI10)"
                              className="flex-1 bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase tracking-wide placeholder:normal-case placeholder:font-normal"
                            />
                            <button
                              onClick={() => handleApplyCoupon()}
                              className="bg-[#0a4233] hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs"
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
                            <p className="text-[10px] font-bold text-emerald-900/70 mb-1.5 uppercase tracking-wider">
                              Available Offers (Tap to Apply):
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                onClick={() => handleApplyCoupon('NANDI10')}
                                className="bg-white hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-300 transition-all flex items-center space-x-1"
                              >
                                <span>🏷️ NANDI10</span>
                                <span className="text-[9px] text-emerald-700 font-medium">(10% OFF)</span>
                              </button>
                              <button
                                onClick={() => handleApplyCoupon('ORGANIC50')}
                                className="bg-white hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-300 transition-all flex items-center space-x-1"
                              >
                                <span>🌱 ORGANIC50</span>
                                <span className="text-[9px] text-emerald-700 font-medium">(₹50 OFF)</span>
                              </button>
                              <button
                                onClick={() => handleApplyCoupon('FREESHIP')}
                                className="bg-white hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-300 transition-all flex items-center space-x-1"
                              >
                                <span>🚀 FREESHIP</span>
                                <span className="text-[9px] text-emerald-700 font-medium">(Free Delivery)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {/* STEP 2: SELECT PAYMENT METHOD */}
            {currentStep === 'payment_select' && (
              <div className="space-y-4 py-2">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>100% Encrypted & Secure Checkout guaranteed by Nandi Farms.</span>
                </div>

                <h4 className="font-bold text-sm text-gray-900">Choose Payment Method:</h4>

                <div className="space-y-2.5">
                  {/* Option 1: UPI QR Scanner (RECOMMENDED) */}
                  <label
                    onClick={() => setSelectedPaymentMethod('upi')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPaymentMethod === 'upi'
                        ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                        <QrCode className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-xs text-gray-900">UPI QR Scanner</span>
                          <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                            Fast & Instant
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                          Scan & Pay via GPay, PhonePe, Paytm, BHIM, CRED
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedPaymentMethod === 'upi'}
                      onChange={() => setSelectedPaymentMethod('upi')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  {/* Option 2: Cash on Delivery */}
                  <label
                    onClick={() => setSelectedPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPaymentMethod === 'cod'
                        ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Cash on Delivery (COD)</span>
                        <p className="text-[11px] text-gray-500 font-medium">Pay cash upon doorstep delivery</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedPaymentMethod === 'cod'}
                      onChange={() => setSelectedPaymentMethod('cod')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  {/* Option 3: Credit / Debit Card & NetBanking */}
                  <label
                    onClick={() => setSelectedPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPaymentMethod === 'card'
                        ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Credit / Debit Card / NetBanking</span>
                        <p className="text-[11px] text-gray-500 font-medium">Visa, Mastercard, RuPay, Banking</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedPaymentMethod === 'card'}
                      onChange={() => setSelectedPaymentMethod('card')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* STEP 3: HIGH-DEFINITION UPI QR CODE SCANNER VIEW */}
            {currentStep === 'qr_scanner' && (
              <div className="space-y-4 text-center py-2">
                <div className="bg-emerald-950 text-white p-4 rounded-2xl shadow-inner space-y-1">
                  <span className="text-[11px] text-emerald-300 font-medium uppercase tracking-wider block">
                    Scan QR Code to Pay Total Amount
                  </span>
                  <p className="text-3xl font-black text-amber-300">
                    ₹{netTotal}
                  </p>
                  <p className="text-[10px] text-emerald-200">Merchant: Nandi Farms Organics Pvt Ltd</p>
                </div>

                {/* HD QR CODE DISPLAY BOX */}
                <div className="p-5 bg-white border-2 border-dashed border-emerald-500 rounded-3xl shadow-xl max-w-[280px] mx-auto relative group">
                  
                  {/* High Quality Styled QR Canvas Graphic */}
                  <div className="relative aspect-square w-full bg-white flex items-center justify-center p-2 rounded-2xl overflow-hidden border border-gray-100">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full text-emerald-950"
                      fill="currentColor"
                    >
                      {/* Outer Position Detection Pattern 1 - Top Left */}
                      <rect x="10" y="10" width="50" height="50" fill="#07362a" rx="8" />
                      <rect x="20" y="20" width="30" height="30" fill="#ffffff" rx="4" />
                      <rect x="27" y="27" width="16" height="16" fill="#07362a" rx="2" />

                      {/* Outer Position Detection Pattern 2 - Top Right */}
                      <rect x="140" y="10" width="50" height="50" fill="#07362a" rx="8" />
                      <rect x="150" y="20" width="30" height="30" fill="#ffffff" rx="4" />
                      <rect x="157" y="27" width="16" height="16" fill="#07362a" rx="2" />

                      {/* Outer Position Detection Pattern 3 - Bottom Left */}
                      <rect x="10" y="140" width="50" height="50" fill="#07362a" rx="8" />
                      <rect x="20" y="150" width="30" height="30" fill="#ffffff" rx="4" />
                      <rect x="27" y="157" width="16" height="16" fill="#07362a" rx="2" />

                      {/* QR Data Bit Modules */}
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

                    {/* Center Brand Badge Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-[#07362a] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-white shadow-md uppercase tracking-wider">
                        NANDI
                      </span>
                    </div>
                  </div>

                  {/* Animated Scanner Laser Beam Graphic */}
                  <div className="absolute inset-x-5 top-5 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-bounce opacity-80" />
                </div>

                {/* Copy UPI ID */}
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <span className="text-xs text-gray-600 font-medium">UPI ID:</span>
                  <code className="bg-gray-100 text-emerald-950 text-xs font-bold px-2.5 py-1 rounded-lg border border-gray-200">
                    nandifarms@upi
                  </code>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1.5 text-gray-500 hover:text-emerald-700 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Payment Apps Supported Pills */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Supported Payment Apps:
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-[10px] font-extrabold text-gray-700">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200">Google Pay</span>
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-200">PhonePe</span>
                    <span className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-md border border-cyan-200">Paytm</span>
                    <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md border border-orange-200">BHIM</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: POST-PAYMENT LIVE ORDER TRACKING SCREEN */}
            {currentStep === 'order_complete' && (
              <div className="space-y-4 py-2 animate-in fade-in duration-300">
                
                {/* 1. HERO ETA & ORDER CONFIRMATION HEADER */}
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-4 sm:p-5 rounded-3xl shadow-xl text-left relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-800/80 text-amber-300 font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-amber-300/30 uppercase tracking-wider">
                      Order ID: NF-892401
                    </span>
                    <span className="text-xs text-emerald-200 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Payment Verified</span>
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-emerald-200 font-medium">Estimated Delivery Arrival:</p>
                    <div className="flex items-baseline space-x-2 mt-0.5">
                      <h4 className="text-2xl sm:text-3xl font-black text-white">8-10 Mins</h4>
                      <span className="text-xs text-amber-300 font-bold animate-pulse">⚡ Express 10-Min Delivery</span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-4 bg-emerald-950/60 rounded-full h-2 overflow-hidden p-0.5 border border-emerald-700/50">
                    <div className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 h-full rounded-full w-[65%] animate-pulse" />
                  </div>
                </div>

                {/* 2. DELIVERY BOY (DELIVERY EXECUTIVE) DETAILS CARD */}
                <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-md space-y-3 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>Assigned Delivery Executive</span>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                      On the way 🛵
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-black text-lg shadow-2xs shrink-0">
                        <User className="w-6 h-6 text-emerald-800" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-gray-900">Ramesh Kumar</h5>
                        <p className="text-[11px] text-gray-500 font-medium">
                          ⭐ 4.9 <span className="text-gray-400">(1,250+ deliveries)</span>
                        </p>
                        <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                          📱 Mobile: +91 98765 43210
                        </p>
                      </div>
                    </div>

                    {/* Instant Call Button */}
                    <a
                      href="tel:+919876543210"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl shadow-md transition-transform active:scale-95 flex items-center space-x-1.5 shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Ramesh</span>
                    </a>
                  </div>
                </div>

                {/* 3. LIVE GPS MAP LOCATION & ROUTE TRACKER */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden text-left relative group">
                  {/* Map Header Status */}
                  <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="font-extrabold text-xs tracking-wide">Live GPS Location Map</span>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                      1.2 km away • 4 Mins
                    </span>
                  </div>

                  {/* Simulated Map View Canvas */}
                  <div className="relative h-48 bg-[#e8ece9] overflow-hidden flex items-center justify-center">
                    {/* Map Grid Road Vector Pattern Background */}
                    <svg className="absolute inset-0 w-full h-full opacity-35 text-slate-400" fill="none" stroke="currentColor">
                      <path d="M 0,20 Q 80,40 160,20 T 320,30" strokeWidth="6" stroke="#94a3b8" />
                      <path d="M 40,0 Q 60,100 80,200" strokeWidth="8" stroke="#cbd5e1" />
                      <path d="M 200,0 Q 180,120 220,200" strokeWidth="7" stroke="#cbd5e1" />
                      <path d="M 0,110 L 400,110" strokeWidth="10" stroke="#ffffff" />
                      <path d="M 0,160 Q 150,140 400,170" strokeWidth="6" stroke="#cbd5e1" />
                    </svg>

                    {/* Dotted Delivery Route Path Line */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                      <path
                        d="M 60,130 C 130,130 150,60 280,60"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="4"
                        strokeDasharray="6 6"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Delivery Executive Marker (🛵 Ramesh Kumar) */}
                    <div className="absolute left-[50px] top-[108px] z-20 flex flex-col items-center animate-bounce">
                      <div className="bg-[#07362a] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-amber-300 flex items-center space-x-1 whitespace-nowrap">
                        <span>🛵 Ramesh Kumar</span>
                      </div>
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-emerald-400/40 text-sm mt-0.5">
                        🛵
                      </div>
                    </div>

                    {/* Customer Destination Marker (🏠 Home) */}
                    <div className="absolute right-[50px] top-[40px] z-20 flex flex-col items-center">
                      <div className="bg-rose-950 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-rose-300 flex items-center space-x-1 whitespace-nowrap">
                        <span>🏠 Doorstep</span>
                      </div>
                      <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-rose-400/40 text-sm mt-0.5">
                        📍
                      </div>
                    </div>

                    {/* Map Footer Overlay Badge */}
                    <div className="absolute bottom-2 left-2 right-2 z-20 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between text-[11px] font-bold text-gray-800">
                      <span className="flex items-center space-x-1.5 text-emerald-800">
                        <Navigation className="w-3.5 h-3.5 animate-spin" />
                        <span>In Transit • Speed 26 km/h</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">GPS Signal 🟢 Strong</span>
                    </div>
                  </div>
                </div>

                {/* 3. STEP-BY-STEP LIVE TIMELINE TRACKER */}
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-200/80 space-y-3 text-left">
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

                    <div className="relative opacity-60">
                      <span className="absolute -left-[23px] top-0 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white" />
                      <p className="text-xs font-bold text-gray-600">Expected Arrival at Doorstep</p>
                      <p className="text-[10px] text-gray-500">12-4-36/10, Pragathi Nagar, Moosapet</p>
                    </div>

                  </div>
                </div>

                {/* 4. RECEIPT SUMMARY & CLOSE BUTTON */}
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-gray-600">Total Paid Amount:</span>
                  <span className="font-black text-emerald-950 text-sm">₹{netTotal}</span>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="w-full bg-[#07362a] hover:bg-emerald-900 text-white font-bold text-xs py-3.5 rounded-full transition-all shadow-md"
                >
                  Close & Continue Shopping
                </button>

              </div>
            )}

          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && currentStep !== 'order_complete' && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/70 space-y-3">
              
              {/* Detailed Financial Summary */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-800 font-extrabold text-base">₹{netTotal}</span>
                </div>
              </div>

              {/* Action Buttons Depending on Current Step */}
              {currentStep === 'cart' && (
                <button
                  onClick={handleProceedToPaymentSelect}
                  className="w-full bg-[#07362a] hover:bg-emerald-900 text-white font-bold text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Select Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {currentStep === 'payment_select' && (
                <button
                  onClick={handleConfirmPaymentOption}
                  disabled={isVerifyingPayment}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isVerifyingPayment ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>{selectedPaymentMethod === 'upi' ? 'Show UPI QR Scanner' : `Pay ₹${netTotal}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}

              {currentStep === 'qr_scanner' && (
                <button
                  onClick={handleCompleteQrPayment}
                  disabled={isVerifyingPayment}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isVerifyingPayment ? (
                    <span>Verifying Payment...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Complete Payment</span>
                    </>
                  )}
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
