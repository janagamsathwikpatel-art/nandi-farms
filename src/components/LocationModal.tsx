'use client';

import React from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  const cities = [
    { name: 'Hyderabad', state: 'Telangana', pin: '500001' },
    { name: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    { name: 'Mumbai', state: 'Maharashtra', pin: '400001' },
    { name: 'Chennai', state: 'Tamil Nadu', pin: '600001' },
    { name: 'Delhi NCR', state: 'Delhi', pin: '110001' },
    { name: 'Vijayawada', state: 'Andhra Pradesh', pin: '520001' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-gray-100 animate-in zoom-in-95 duration-200 p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🇮🇳</span>
              <h3 className="text-lg font-black text-gray-900">Select Delivery Location</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* City List */}
          <div className="py-4 space-y-2">
            {cities.map((city) => {
              const isSelected = selectedCity === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                      : 'border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{city.name}</h4>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {city.state} • {city.pin}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <p className="text-[11px] text-center text-gray-400 font-medium">
              ⚡ Same-day delivery active in all selected metro cities
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
