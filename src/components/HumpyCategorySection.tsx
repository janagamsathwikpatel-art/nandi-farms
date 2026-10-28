"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, Star, ShoppingBag, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { NANDI_PRODUCTS, NandiProduct } from "@/data/nandiProducts";

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
}

export const HUMPY_CATEGORIES: CategoryItem[] = [
  {
    id: "flour",
    title: "Flour",
    image: "/images/categories/flour.png",
  },
  {
    id: "ghee",
    title: "Ghee",
    image: "/images/categories/ghee.png",
  },
  {
    id: "dairy",
    title: "Dairy",
    image: "/images/categories/dairy.png",
  },
  {
    id: "desi-milk",
    title: "Desi Milk",
    image: "/images/categories/desi-milk.png",
  },
  {
    id: "eggs",
    title: "Eggs",
    image: "/images/categories/eggs.png",
  },
  {
    id: "dal",
    title: "Dal",
    image: "/images/categories/dal.png",
  },
  {
    id: "sweeteners",
    title: "Sweeteners",
    image: "/images/categories/sweeteners.png",
  },
  {
    id: "oil",
    title: "Oil",
    image: "/images/categories/oil.png",
  },
  {
    id: "honey",
    title: "Honey",
    image: "/images/categories/honey.png",
  },
  {
    id: "dry-fruits",
    title: "Dry Fruits",
    image: "/images/categories/dry-fruits.png",
  },
  {
    id: "seeds",
    title: "Seeds",
    image: "/images/categories/seeds.png",
  },
  {
    id: "rice",
    title: "Rice",
    image: "/images/categories/rice.png",
  },
  {
    id: "spices",
    title: "Spices",
    image: "/images/categories/spices.png",
  },
  {
    id: "millet",
    title: "Millet",
    image: "/images/categories/millet.png",
  },
  {
    id: "bread",
    title: "Bread",
    image: "/images/categories/bread.png",
  },
];

export default function HumpyCategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Default to 'flour' matching user reference screenshot
  const [activeCategoryId, setActiveCategoryId] = useState<string>("flour");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [basketToast, setBasketToast] = useState<string | null>(null);

  const activeCategory =
    HUMPY_CATEGORIES.find((c) => c.id === activeCategoryId) || HUMPY_CATEGORIES[0];

  const productsForCategory: NandiProduct[] = NANDI_PRODUCTS[activeCategoryId] || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
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
    <section id="categories" className="stories-insta-sec bg-[#ffffff] py-10 sm:py-14 relative border-b border-[#eeebe2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Image 1 */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="primary-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#003628] tracking-tight">
            Shop By Category
          </h2>
          <div className="mt-2.5 mx-auto w-16 h-[2px] bg-[#d89b4f] rounded-full" />
        </div>

        {/* Carousel Container matching Image 1 exactly (unchanged) */}
        <div className="relative group mb-8">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="custom-insta-arrow absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="custom-insta-arrow absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontally Scrollable Story Row (Image 1 Unchanged) */}
          <div
            ref={scrollContainerRef}
            className="stories-insta-row flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth px-2 py-3"
          >
            {HUMPY_CATEGORIES.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className="story-item flex flex-col items-center flex-shrink-0 cursor-pointer group/item select-none text-center"
                >
                  {/* Circular Avatar with Active Dark Green Ring (Exact Image 1) */}
                  <div
                    className={`story-border p-[3.5px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "ring-3 ring-[#003628] ring-offset-2 scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    <div
                      className={`story-avatar w-20 h-20 sm:w-24 sm:h-24 lg:w-26 lg:h-26 rounded-full overflow-hidden bg-[#faf8f5] border-2 transition-all flex items-center justify-center p-2.5 ${
                        isActive
                          ? "border-[#003628] shadow-md bg-white"
                          : "border-[#e6e0d3] group-hover/item:border-[#003628] shadow-xs"
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover/item:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Category Title */}
                  <span
                    className={`story-item-title mt-2 text-xs sm:text-sm font-semibold transition-colors tracking-tight ${
                      isActive
                        ? "text-[#003628] font-bold"
                        : "text-[#2e3e31] group-hover/item:text-[#003628]"
                    }`}
                  >
                    {cat.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Zepto/Blinkit Style Product Grid (Decreased Size) */}
        <div className="mt-6 pt-6 border-t border-[#f0ece2]">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#162e1e]/10 text-[11px] font-semibold text-[#162e1e] mb-1">
                <span>Nandi Farms Harvest</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#183420]">
                {activeCategory.title} Collection
              </h3>
            </div>
            <p className="text-xs text-[#677769]">
              Showing {productsForCategory.length} packaged grocery items
            </p>
          </div>

          {/* Compact Product Grid: 5 to 6 Columns on Desktop (Zepto / Blinkit Layout) */}
          {productsForCategory.length === 0 ? (
            <div className="text-center py-10 bg-[#faf8f5] rounded-xl border border-dashed border-[#dcd6c8]">
              <p className="font-serif text-base text-[#183420] font-medium">
                Fresh harvest for {activeCategory.title} coming soon!
              </p>
              <p className="text-xs text-[#718173] mt-0.5">
                Check other categories above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
              {productsForCategory.map((product) => {
                const qty = cart[product.id] || 0;

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-[#e8e2d4] hover:border-[#003628] overflow-hidden flex flex-col justify-between p-2.5 sm:p-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Compact Packshot Image Box on Neutral Background */}
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#faf8f5] mb-2 p-1.5 flex items-center justify-center border border-[#f2ede4]">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Zepto/Blinkit ETA Badge */}
                        <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-xs text-[#003628] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-[#ded8cb] flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 text-[#f59e0b] fill-[#f59e0b]" />
                          <span>{product.eta}</span>
                        </div>

                        {/* Discount Tag */}
                        {product.discount && (
                          <div className="absolute top-1.5 left-1.5 bg-[#b87a38] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            {product.discount}
                          </div>
                        )}
                      </div>

                      {/* Weight / Pack Size */}
                      <span className="text-[11px] font-semibold text-[#738374] block tracking-tight">
                        {product.weight}
                      </span>

                      {/* Product Title (2-Line Clamp) */}
                      <h4 className="font-medium text-xs text-[#183420] mt-0.5 line-clamp-2 leading-snug group-hover:text-[#b87a38] transition-colors">
                        {product.title}
                      </h4>

                      {/* Customer Rating */}
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-[#9c7a28]">
                        <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="font-bold text-[#183420]">{product.rating}</span>
                        <span className="text-[10px] text-[#738374]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Price & Compact Zepto/Blinkit Add Button */}
                    <div className="mt-2.5 pt-2 border-t border-[#f3eee5] flex items-center justify-between gap-1">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-[#183420]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-[#91a093] line-through block leading-none mt-0.5">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Compact + ADD Stepper */}
                      <div>
                        {qty === 0 ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-2.5 sm:px-3 py-1 rounded-md border border-[#003628] bg-white text-[#003628] hover:bg-[#003628] hover:text-white font-bold text-[11px] tracking-wider uppercase transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center gap-0.5"
                          >
                            <Plus className="w-3 h-3" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#003628] text-white rounded-md px-1 py-0.5 shadow-xs">
                            <button
                              onClick={() => handleRemoveFromCart(product.id)}
                              className="p-0.5 hover:bg-[#004e3a] rounded"
                              aria-label="Decrease"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-1.5 text-[11px] font-bold min-w-[16px] text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="p-0.5 hover:bg-[#004e3a] rounded"
                              aria-label="Increase"
                            >
                              <Plus className="w-2.5 h-2.5" />
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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-[#003628] text-white rounded-xl shadow-2xl p-2.5 sm:p-3 border border-[#1b5040] flex items-center justify-between backdrop-blur-md animate-fade-in-up">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg bg-[#b87a38] flex items-center justify-center text-white shadow">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-white text-[#003628] text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-white">
                ₹{totalPrice}
              </span>
              <p className="text-[10px] text-[#b3c7b6]">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in Farm Basket
              </p>
            </div>
          </div>

          <a
            href="#visit"
            className="px-3.5 py-1.5 rounded-lg bg-[#b87a38] hover:bg-[#c98741] text-white font-semibold text-xs flex items-center gap-1 shadow transition-all active:scale-95 cursor-pointer"
          >
            <span>Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Toast Notification */}
      {basketToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#003628] text-white px-3.5 py-2 rounded-lg shadow-xl border border-[#215746] text-xs font-medium animate-fade-in flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{basketToast}</span>
        </div>
      )}
    </section>
  );
}
