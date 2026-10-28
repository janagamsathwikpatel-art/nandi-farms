"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, Star, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { NANDI_PRODUCTS, NandiProduct } from "@/data/nandiProducts";

export interface QuickCategory {
  id: string;
  title: string;
  image: string;
  productKey: string;
  badge?: string;
}

export const QUICK_CATEGORIES: QuickCategory[] = [
  {
    id: "flour",
    title: "Atta, Flours & Dals",
    image: "/images/quick_categories/c9.webp",
    productKey: "flour",
    badge: "Stone Ground",
  },
  {
    id: "ghee-oil",
    title: "Oils, Ghee & Masala",
    image: "/images/quick_categories/c10.webp",
    productKey: "ghee",
    badge: "Wood Pressed",
  },
  {
    id: "dairy",
    title: "Dairy, Bread & Eggs",
    image: "/images/quick_categories/c2.webp",
    productKey: "dairy",
    badge: "Farm Fresh",
  },
  {
    id: "veggies",
    title: "Fruits & Vegetables",
    image: "/images/quick_categories/c1.webp",
    productKey: "flour", // or vegetable items
    badge: "Morning Pluck",
  },
  {
    id: "honey",
    title: "Honey & Sweeteners",
    image: "/images/quick_categories/c8.webp",
    productKey: "honey",
    badge: "100% Raw",
  },
  {
    id: "bakery",
    title: "Bakery & Biscuits",
    image: "/images/quick_categories/c7.webp",
    productKey: "bread",
  },
  {
    id: "tea",
    title: "Tea & Health Drinks",
    image: "/images/quick_categories/c6.webp",
    productKey: "spices",
  },
  {
    id: "organic",
    title: "Organic & Healthy Living",
    image: "/images/quick_categories/c14.webp",
    productKey: "sweeteners",
    badge: "Certified",
  },
];

export default function ShopByCategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Default to first category
  const [activeCategoryId, setActiveCategoryId] = useState<string>("flour");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [basketToast, setBasketToast] = useState<string | null>(null);

  const activeCategory =
    QUICK_CATEGORIES.find((c) => c.id === activeCategoryId) || QUICK_CATEGORIES[0];

  // Get products based on active category
  const productsForCategory: NandiProduct[] =
    activeCategoryId === "ghee-oil"
      ? [...(NANDI_PRODUCTS.ghee || []), ...(NANDI_PRODUCTS.oil || [])]
      : activeCategoryId === "dairy"
      ? [...(NANDI_PRODUCTS.dairy || []), ...(NANDI_PRODUCTS["desi-milk"] || []), ...(NANDI_PRODUCTS.eggs || [])]
      : activeCategoryId === "flour"
      ? [...(NANDI_PRODUCTS.flour || []), ...(NANDI_PRODUCTS.dal || [])]
      : activeCategoryId === "honey"
      ? [...(NANDI_PRODUCTS.honey || []), ...(NANDI_PRODUCTS.sweeteners || [])]
      : NANDI_PRODUCTS[activeCategory.productKey] || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: NandiProduct) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    setBasketToast(`Added ${product.title} to Farm Basket`);
    setTimeout(() => setBasketToast(null), 2500);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: current - 1 };
    });
  };

  const totalItemsCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    for (const catProds of Object.values(NANDI_PRODUCTS)) {
      const p = catProds.find((prod) => prod.id === id);
      if (p) return sum + p.price * qty;
    }
    return sum;
  }, 0);

  return (
    <section id="categories" className="stories-insta-sec bg-[#ffffff] py-12 sm:py-16 relative border-b border-[#eeebe2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching reference */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="primary-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#003628] tracking-tight">
            Shop By Category
          </h2>
          <div className="mt-2.5 mx-auto w-16 h-[2px] bg-[#d89b4f] rounded-full" />
        </div>

        {/* Category Carousel / Grid with Left/Right Nav Arrows */}
        <div className="relative group mb-10">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="custom-insta-arrow absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="custom-insta-arrow absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Category Cards Slider (Zepto & Blinkit Style) */}
          <div
            ref={scrollContainerRef}
            className="stories-insta-row flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth px-2 py-4"
          >
            {QUICK_CATEGORIES.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`story-item flex flex-col items-center flex-shrink-0 cursor-pointer select-none text-center p-2.5 sm:p-3 rounded-2xl transition-all duration-300 w-28 sm:w-36 lg:w-40 border ${
                    isActive
                      ? "bg-[#faf6ee] border-[#003628] ring-2 ring-[#003628] shadow-md transform -translate-y-1"
                      : "bg-[#fcfbf9] border-[#e8e2d4] hover:border-[#b87a38] hover:bg-white hover:shadow-md"
                  }`}
                >
                  {/* Category Image Box */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-white flex items-center justify-center p-1">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {cat.badge && (
                      <div className="absolute top-1 right-1 bg-[#162e1e] text-[#e8c07e] text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                        {cat.badge}
                      </div>
                    )}
                  </div>

                  {/* Category Title */}
                  <span
                    className={`story-item-title text-xs sm:text-sm font-semibold leading-tight line-clamp-2 transition-colors ${
                      isActive ? "text-[#003628] font-bold" : "text-[#2e3e31]"
                    }`}
                  >
                    {cat.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Items Section for Selected Category */}
        <div className="mt-8 pt-8 border-t border-[#f0ece2]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162e1e]/10 text-xs font-semibold text-[#162e1e] mb-1.5">
                <span>Nandi Farms Harvest</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#183420]">
                {activeCategory.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#677769]">
              Showing {productsForCategory.length} authentic farm-fresh items
            </p>
          </div>

          {/* Product Items Grid */}
          {productsForCategory.length === 0 ? (
            <div className="text-center py-12 bg-[#faf8f5] rounded-2xl border border-dashed border-[#dcd6c8]">
              <p className="font-serif text-lg text-[#183420] font-medium">
                Fresh harvest for {activeCategory.title} coming soon!
              </p>
              <p className="text-xs text-[#718173] mt-1">
                Our farmers at Nandi Farms are preparing the next batch. Check other categories above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {productsForCategory.map((product) => {
                const qty = cart[product.id] || 0;

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-[#e8e2d4] hover:border-[#003628] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#faf8f5] mb-3 border border-[#f0ece3]">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Discount Badge */}
                        {product.discount && (
                          <div className="absolute top-2.5 left-2.5 bg-[#b87a38] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                            {product.discount}
                          </div>
                        )}

                        {/* Tag */}
                        {product.tag && (
                          <div className="absolute bottom-2.5 left-2.5 bg-[#003628] text-[#e8c07e] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            {product.tag}
                          </div>
                        )}

                        {/* Nandi Farms Organic Badge */}
                        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#003628] text-[9px] font-bold px-2 py-0.5 rounded shadow-xs border border-[#e2dbce] flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>100% Organic</span>
                        </div>
                      </div>

                      {/* Weight / Pack Specification */}
                      <span className="text-[11px] font-semibold text-[#738374] block uppercase tracking-wider mb-1">
                        {product.weight}
                      </span>

                      {/* Product Title */}
                      <h4 className="font-semibold text-xs sm:text-sm text-[#183420] line-clamp-2 leading-snug group-hover:text-[#b87a38] transition-colors">
                        {product.title}
                      </h4>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-[#9c7a28]">
                        <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="text-xs font-bold text-[#183420]">{product.rating}</span>
                        <span className="text-[10px] text-[#738374]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="mt-4 pt-3 border-t border-[#f2ede4] flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-sm sm:text-base text-[#183420]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-[#91a093] line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        {qty === 0 ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-3.5 sm:px-4 py-1.5 rounded-lg border-2 border-[#003628] bg-white text-[#003628] hover:bg-[#003628] hover:text-white font-bold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#003628] text-white rounded-lg px-1.5 py-1 shadow-md">
                            <button
                              onClick={() => handleRemoveFromCart(product.id)}
                              className="p-1 hover:bg-[#004e3a] rounded transition-colors active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="p-1 hover:bg-[#004e3a] rounded transition-colors active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Basket Summary Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#003628] text-white rounded-2xl shadow-2xl p-3 sm:p-3.5 border border-[#1b5040] flex items-center justify-between backdrop-blur-md animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#b87a38] flex items-center justify-center text-white shadow">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#003628] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-white">
                ₹{totalPrice}
              </span>
              <p className="text-[11px] text-[#b3c7b6]">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in Farm Basket
              </p>
            </div>
          </div>

          <a
            href="#visit"
            className="px-4 py-2 rounded-xl bg-[#b87a38] hover:bg-[#c98741] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
          >
            <span>Proceed to Order</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Toast Notification */}
      {basketToast && (
        <div className="fixed top-24 right-5 z-50 bg-[#003628] text-white px-4 py-2.5 rounded-xl shadow-xl border border-[#215746] text-xs font-medium animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{basketToast}</span>
        </div>
      )}
    </section>
  );
}
