'use client';

import React from 'react';
import { X, Plus, Minus, Star, ShieldCheck, Truck, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  isLoved: boolean;
  onToggleLoved: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  quantity,
  onAddToCart,
  onUpdateQuantity,
  isLoved,
  onToggleLoved,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-6 sm:gap-8">
            {/* Product Image */}
            <div className="relative flex items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100 overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => onToggleLoved(product.id)}
                className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isLoved
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/80 text-gray-600 hover:text-rose-600 border border-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLoved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                  {product.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {product.name}
                </h3>

                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  Sourced from {product.farmer}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-900 ml-1">
                      {product.rating || 4.9}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.reviewsCount || 48} Verified Customer Reviews
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    per {product.unit}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-3">
                  Freshly harvested 100% organic produce delivered straight from Nandi Farms to your doorstep. Guaranteed farm-fresh quality with zero chemical preservatives.
                </p>
              </div>

              {/* Delivery Features */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Same Day Delivery</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Quality Assured</span>
                </div>
              </div>

              {/* Quantity / Add to Cart Action */}
              <div className="pt-2">
                {quantity === 0 ? (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart - ₹{product.price}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-950 text-white rounded-full py-2 px-4 shadow-md">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-7 h-7 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm">
                      {quantity} in Cart (₹{product.price * quantity})
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-7 h-7 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
