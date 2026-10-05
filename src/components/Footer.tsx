'use client';

import React from 'react';
import { 
  MapPin, 
  Phone, 
  Leaf,
  Globe,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800 font-sans">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900 font-sans">
                Nandi<span className="text-emerald-600">Farms</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed font-normal max-w-xs">
              Skip the long lines and heavy bags we'll handle the delivery for you.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 font-sans">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-gray-600">
              <li>
                <a 
                  href="https://eveggie.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-600 transition-colors inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="https://eveggie.in/products" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-600 transition-colors inline-block"
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="https://eveggie.in/shops" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-600 transition-colors inline-block"
                >
                  Shops
                </a>
              </li>
              <li>
                <a 
                  href="https://eveggie.in/order-history" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-600 transition-colors inline-block"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a 
                  href="https://eveggie.in/contact-us" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-600 transition-colors inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 font-sans">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:9949777844" className="hover:text-emerald-600 transition-colors font-semibold text-gray-900">
                  9949777844
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-700 leading-snug">
                  📍 Hyderabad
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Updates */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 font-sans">
              FOLLOW US
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Stay connected for updates and offers.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-emerald-600 text-gray-600 hover:text-white flex items-center justify-center transition-colors border border-gray-200"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a 
                href="https://eveggie.in" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Website"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-emerald-600 text-gray-600 hover:text-white flex items-center justify-center transition-colors border border-gray-200"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Nandi Farms. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
