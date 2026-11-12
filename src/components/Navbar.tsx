"use client";

import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ onOpenContact, cartCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#162e1e] border-b border-[#22402a] text-[#f4f6f2] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <svg
            className="w-5 h-5 text-[#c8924b] transition-transform group-hover:rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#f4f7f1] uppercase">
            NANDI FARMS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
          <a
            href="#home"
            className="text-[#d89b4f] border-b-2 border-[#d89b4f] pb-1 transition-colors hover:text-[#e4ae67]"
          >
            Home
          </a>
          <a
            href="#our-story"
            className="text-[#d0ded0] hover:text-[#ffffff] pb-1 border-b-2 border-transparent hover:border-[#d89b4f]/60 transition-all"
          >
            Our Story
          </a>
          <a
            href="#harvest-store"
            className="text-[#d0ded0] hover:text-[#ffffff] pb-1 border-b-2 border-transparent hover:border-[#d89b4f]/60 transition-all flex items-center gap-1.5"
          >
            <span>What We Grow</span>
            <span className="bg-[#b87a38] text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full tracking-wide uppercase">
              Fresh
            </span>
          </a>
          <a
            href="#practices"
            className="text-[#d0ded0] hover:text-[#ffffff] pb-1 border-b-2 border-transparent hover:border-[#d89b4f]/60 transition-all"
          >
            Our Practices
          </a>
          <a
            href="#visit"
            className="text-[#d0ded0] hover:text-[#ffffff] pb-1 border-b-2 border-transparent hover:border-[#d89b4f]/60 transition-all"
          >
            Visit
          </a>
        </nav>

        {/* Action Buttons: Zepto Quick Cart + Get in Touch */}
        <div className="flex items-center gap-3">
          {/* Quick Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Farm Basket"
            className="relative p-2 rounded-full text-[#d0ded0] hover:text-white hover:bg-[#203f2a] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b87a38] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Get in Touch CTA Button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#b87a38] hover:bg-[#c98741] text-white text-sm font-semibold tracking-wide shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            Get in Touch
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#d0ded0] hover:text-white hover:bg-[#203f2a] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#13271a] border-b border-[#22402a] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#d89b4f] font-semibold border-l-2 border-[#d89b4f] pl-3"
          >
            Home
          </a>
          <a
            href="#our-story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#d0ded0] hover:text-white pl-3"
          >
            Our Story
          </a>
          <a
            href="#harvest-store"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#d0ded0] hover:text-white pl-3 flex items-center justify-between"
          >
            <span>What We Grow (Zepto Quick Farm)</span>
            <span className="bg-[#b87a38] text-[10px] text-white px-2 py-0.5 rounded-full">
              Live
            </span>
          </a>
          <a
            href="#practices"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#d0ded0] hover:text-white pl-3"
          >
            Our Practices
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#d0ded0] hover:text-white pl-3"
          >
            Visit
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-full bg-[#b87a38] hover:bg-[#c98741] text-white font-medium text-center shadow"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
