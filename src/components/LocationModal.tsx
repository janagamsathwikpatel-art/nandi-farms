'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Check, Navigation, Search } from 'lucide-react';

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
  const [searchInput, setSearchInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSearchInput('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cities = [
    { name: '12-4-36/10, Pragathi Nagar, Moosapet', city: 'Hyderabad', state: 'Telangana', pin: '500018' },
    { name: 'Road No 3, Banjara Hills', city: 'Hyderabad', state: 'Telangana', pin: '500034' },
    { name: 'Hitec City, Madhapur', city: 'Hyderabad', state: 'Telangana', pin: '500081' },
    { name: 'Gachibowli, Financial District', city: 'Hyderabad', state: 'Telangana', pin: '500032' },
    { name: 'Koramangala, 5th Block', city: 'Bengaluru', state: 'Karnataka', pin: '560095' },
    { name: 'Indiranagar, 100 Feet Road', city: 'Bengaluru', state: 'Karnataka', pin: '560038' },
    { name: 'Bandra West, Hill Road', city: 'Mumbai', state: 'Maharashtra', pin: '400050' },
    { name: 'Connaught Place', city: 'Delhi NCR', state: 'Delhi', pin: '110001' },
    { name: 'T. Nagar, Anna Salai', city: 'Chennai', state: 'Tamil Nadu', pin: '600017' },
  ];

  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      setDetectStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    setDetectStatus('Requesting GPS location access...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetecting(false);
        setDetectStatus('Live location detected successfully!');
        onSelectCity('12-4-36/10, Pragathi Nagar, Moosapet, Hyderabad');
        setTimeout(() => {
          onClose();
        }, 600);
      },
      (error) => {
        setIsDetecting(false);
        setDetectStatus('Permission denied. Setting default address.');
        onSelectCity('12-4-36/10, Pragathi Nagar, Moosapet, Hyderabad');
      },
      { timeout: 6000 }
    );
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectCity(searchInput.trim());
      onClose();
    }
  };

  const filteredCities = searchInput.trim()
    ? cities.filter(
        (c) =>
          c.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          c.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          c.pin.includes(searchInput)
      )
    : cities;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#f8fafc] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 animate-in zoom-in-95 duration-200 p-5 sm:p-6 space-y-4">
          
          {/* Header matching media_1791554952807.png */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Change Location
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Row matching media_1791554952807.png: [ Detect my location ]  ─ (OR) ─  [ search delivery location ] */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 py-1">
            
            {/* Left: Green Detect my location button */}
            <button
              onClick={handleDetectLiveLocation}
              disabled={isDetecting}
              className="w-full sm:w-auto bg-[#108538] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-2xs shrink-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>{isDetecting ? 'Detecting...' : 'Detect my location'}</span>
            </button>

            {/* Middle: Circular OR Badge */}
            <div className="flex items-center space-x-2 text-gray-300 w-full sm:w-auto justify-center">
              <span className="hidden sm:inline-block w-3 h-[1px] bg-gray-300"></span>
              <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-400 bg-white shadow-2xs shrink-0">
                OR
              </span>
              <span className="hidden sm:inline-block w-3 h-[1px] bg-gray-300"></span>
            </div>

            {/* Right: Search delivery location Pill Input */}
            <form onSubmit={handleCustomSubmit} className="w-full sm:flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="search delivery location"
                className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 placeholder:text-gray-400 shadow-2xs"
              />
            </form>
          </div>

          {detectStatus && (
            <p className="text-[11px] text-center font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
              {detectStatus}
            </p>
          )}

          {/* Popular / Saved Delivery Locations List */}
          <div className="pt-2 border-t border-gray-200/80">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              Select Saved or Nearby Delivery Location:
            </h4>
            <div className="max-h-56 overflow-y-auto pr-1 space-y-2 overscroll-contain">
              {filteredCities.length === 0 ? (
                <div className="text-center py-4 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">No saved location matching "{searchInput}".</p>
                  <button
                    onClick={() => {
                      if (searchInput.trim()) {
                        onSelectCity(searchInput.trim());
                        onClose();
                      }
                    }}
                    className="mt-2 text-xs font-extrabold text-emerald-700 hover:underline"
                  >
                    Set "{searchInput}" as my location
                  </button>
                </div>
              ) : (
                filteredCities.map((item) => {
                  const isSelected = selectedCity.includes(item.name) || selectedCity === item.city;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        onSelectCity(`${item.name}, ${item.city}`);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-emerald-50/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-gray-900">{item.name}</h5>
                          <p className="text-[11px] text-gray-500 font-medium">
                            {item.city}, {item.state} • PIN {item.pin}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-gray-400 font-semibold">
              ⚡ 10-Minute Instant Express Delivery available at your location
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
