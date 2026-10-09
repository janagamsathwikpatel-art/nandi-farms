'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  productName: string;
  category: string;
  likes: number;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Radhika Sharma',
    location: 'Hyderabad, Telangana',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 days ago',
    title: 'Purest A2 Bilona Ghee I have ever tasted!',
    content: 'The divine aroma when opening the jar brought back memories of my grandmother preparing homemade bilona ghee. Beautiful grainy texture and rich taste!',
    productName: 'A2 Gir Cow Bilona Ghee (1L)',
    category: 'ghee',
    likes: 42,
  },
  {
    id: 'rev-2',
    author: 'Vikram Rao',
    location: 'Bengaluru, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 week ago',
    title: 'Authentic Wood Pressed Mustard Oil!',
    content: 'Cooking with Nandi Farms cold pressed oil keeps natural nutrients intact. Pungent aroma, genuine purity, and zero artificial processing.',
    productName: 'Wood Pressed Mustard Oil (1L)',
    category: 'oils',
    likes: 38,
  },
  {
    id: 'rev-3',
    author: 'Ananya Patel',
    location: 'Chennai, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 days ago',
    title: 'Fresh Vegetables delivered within hours!',
    content: 'The organic spinach and tomatoes arrived crisp and chemical-free. Express delivery packaging kept everything farm-fresh.',
    productName: 'Organic Fresh Veggie Basket (5kg)',
    category: 'veggies',
    likes: 29,
  },
  {
    id: 'rev-4',
    author: 'Suresh Kumar',
    location: 'Vijayawada, Andhra Pradesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '5 days ago',
    title: 'Unadulterated Raw Honey - 100% Pure!',
    content: 'You can immediately tell the difference between commercial syrup honey and real raw wildflower honey from Nandi Farms. Truly high quality.',
    productName: 'Organic Raw Wildflower Honey (500g)',
    category: 'ghee',
    likes: 54,
  },
];

export const CustomerReviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const filteredReviews = activeFilter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === activeFilter);

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-none bg-[#f8f7f0] border-y border-emerald-100/90 py-10 sm:py-14 px-4 sm:px-8 lg:px-12 my-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Customer Verification & Trust</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-sans">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Real reviews from 50,000+ conscious Indian households who trust Nandi Farms essentials.
            </p>
          </div>

          {/* Overall Rating Box */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center space-x-4 shrink-0">
            <div className="text-center pr-4 border-r border-gray-200">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 block leading-none">4.9</span>
              <div className="flex text-amber-400 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-black text-gray-900 block">12,850+ Verified Reviews</span>
              <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> 100% Authentic Quality
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'ghee', label: 'Desi Bilona Ghee & Honey' },
            { id: 'oils', label: 'Wood Pressed Oils' },
            { id: 'veggies', label: 'Fresh Vegetables' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-950 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];
            const likeCount = rev.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Quote Icon Accent */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Star Rating & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 space-x-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center text-[10px] font-extrabold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                      Verified Buyer
                    </span>
                  </div>

                  {/* Review Headline & Body */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                      "{rev.title}"
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {rev.content}
                    </p>
                  </div>

                  {/* Purchased Product Tag */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-[11px] text-gray-700 font-semibold">
                    <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Item Purchased:</span>
                    <span className="text-emerald-950 font-bold">{rev.productName}</span>
                  </div>
                </div>

                {/* Author Info & Helpful Button */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-200 shadow-2xs"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">{rev.author}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">{rev.location}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleLike(rev.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-emerald-800 text-emerald-800' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
