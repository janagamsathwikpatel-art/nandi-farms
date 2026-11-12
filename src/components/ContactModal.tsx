"use client";

import React, { useState } from "react";
import { X, CheckCircle, Calendar, Users, Phone, Mail, MapPin } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    guests: "2",
    interest: "Farm Tour & Harvest Walk",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#faf8f5] rounded-2xl shadow-2xl overflow-hidden border border-[#ded7c8] z-10">
        {/* Modal Header */}
        <div className="bg-[#162e1e] p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Visit Nandi Farms
            </h3>
            <p className="text-xs text-[#cfded1] mt-0.5">
              Plan your farm tour, weekend harvest, or farm-stay retreat
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#183420] mb-2">
              We Can&apos;t Wait to Welcome You!
            </h4>
            <p className="text-sm text-[#4d5f50]">
              Thank you for reaching out, {formData.name || "friend"}. Our farm host will reach out via WhatsApp/Call to confirm your visit itinerary.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">Family / Small Group (3–5)</option>
                  <option value="6+">Large Gathering (6+)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#253928] mb-1">
                  Experience Type
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
                >
                  <option value="Farm Tour & Harvest Walk">Guided Farm Tour & Harvest</option>
                  <option value="Farmstead Gazebo Lunch">Farmstead Gazebo Dining</option>
                  <option value="Organic Farming Workshop">Regenerative Farming Workshop</option>
                  <option value="Produce Supply Inquiry">Bulk Farm Produce Supply</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#253928] mb-1">
                Special Requests or Dietary Preferences
              </label>
              <textarea
                rows={2}
                placeholder="Let us know if you'd like an organic meal, have allergies, or need special arrangements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d8d2c2] focus:border-[#b87a38] focus:outline-none text-sm text-[#183420]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#d8d2c2] text-xs font-medium text-[#495b4c] hover:bg-[#ede7da]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#b87a38] hover:bg-[#cb883f] text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Submit Visit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
