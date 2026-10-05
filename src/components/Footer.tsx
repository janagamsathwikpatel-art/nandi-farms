'use client';

import React from 'react';
import { MapPin, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Logo & Tagline (Spans 2 columns on medium screens) */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Leaf className="w-4 h-4 fill-emerald-100 text-emerald-600" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 font-serif">
                Nandi<span className="text-emerald-600 font-sans font-bold">Farms</span>
              </span>
            </a>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
              Skip the long lines and heavy bags we'll handle the delivery for you.
            </p>
          </div>

          {/* Column 1: Main Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-sans">
              Main Pages
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-700 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-sans">
              Help
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li><a href="#help" className="hover:text-emerald-700 transition-colors">Help Center</a></li>
              <li><a href="#policy" className="hover:text-emerald-700 transition-colors">Return Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Contact */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-sans">
                Company
              </h4>
              <ul className="space-y-2 text-xs font-medium text-gray-600">
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-emerald-700 transition-colors">Partnerships</a></li>
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-sans">
                Contact Information
              </h4>
              <div className="flex items-start space-x-2 text-xs font-medium text-gray-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Aurora, colorado amerika serikat,US</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Nandi Farms. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#policy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
