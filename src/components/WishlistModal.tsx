'use client';

import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { Product } from '@/types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lovedProductIds: string[];
  allProducts: Product[];
  onToggleLoved: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  lovedProductIds,
  allProducts,
  onToggleLoved,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const lovedProducts = allProducts.filter((p) => lovedProductIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Wishlist Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-rose-950 text-white">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h3 className="font-bold text-base tracking-wide">Your Loved Items</h3>
              <span className="bg-rose-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                {lovedProducts.length} saved
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-rose-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Wishlist Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {lovedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-gray-400">
                <Heart className="w-16 h-16 stroke-1 text-gray-300" />
                <p className="font-semibold text-sm text-gray-600">No loved items yet</p>
                <p className="text-xs text-gray-400">Click the heart icon on any product to save it here!</p>
              </div>
            ) : (
              lovedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs group"
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
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold py-1 px-3 rounded-full flex items-center space-x-1 shadow-xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleLoved(product.id)}
                    className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
                    title="Remove from Loved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs py-3 px-4 rounded-full transition-colors shadow-xs"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
