'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base tracking-wide">Your Grocery Cart</h3>
              <span className="bg-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-emerald-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-bounce" />
                <h4 className="text-xl font-bold text-gray-900">Order Placed Successfully!</h4>
                <p className="text-xs text-gray-600">
                  Thank you for shopping with <strong>Nandi Farms</strong>! Your fresh produce will be delivered shortly.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-gray-400">
                <ShoppingBag className="w-16 h-16 stroke-1 text-gray-300" />
                <p className="font-semibold text-sm text-gray-600">Your cart is empty</p>
                <p className="text-xs text-gray-400">Add some fresh groceries to get started!</p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-200"
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
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
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
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
