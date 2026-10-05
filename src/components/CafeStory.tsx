import React from 'react';
import { MapPin, Clock, Wifi, Heart, Coffee, ShieldCheck } from 'lucide-react';
import { CAFE_IMAGE } from '../data/coffeeData';

interface CafeStoryProps {
  onOpenReservation: () => void;
}

export const CafeStory: React.FC<CafeStoryProps> = ({ onOpenReservation }) => {
  return (
    <section id="cafe" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div id="story" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-xl overflow-hidden aspect-[16/10] shadow-md border border-[#EAE4DC] bg-[#EFE9DF]">
              <img
                src={CAFE_IMAGE}
                alt="Equinox Coffee shop sunlit interior with terrazzo bar and Scandinavian oak seating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Roastery Story Prose */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">
              The Roasting Philosophy
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1C] tracking-tight">
              Honoring the farmers behind every cherry.
            </h2>
            
            <p className="text-sm text-[#574D45] leading-relaxed">
              Equinox was founded in 2018 with a singular commitment: never roast the character out of great green coffee. By developing roasting curves that respect each farm's unique harvest elevation and processing microclimate, we allow the natural fruit sweetness and floral aromatics to shine untamed.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE4DC]">
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-[#241F1C]">100%</span>
                <p className="text-xs text-[#6B5E55]">Direct Trade sourcing directly from family estate farms.</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-[#241F1C]">2.5×</span>
                <p className="text-xs text-[#6B5E55]">Average price paid above Fair Trade market baseline.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Visit The Cafe Box */}
        <div className="bg-white border border-[#EAE4DC] rounded-xl p-8 sm:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">
                Visit Our Historic Quarter Sanctuary
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#241F1C]">
                244 High Street · Historic District
              </h3>
              <p className="text-xs sm:text-sm text-[#574D45] max-w-2xl leading-relaxed">
                A calm, sunlit space designed for slow mornings, contemplative reading, and friendly neighborhood connection. Enjoy our dedicated pour-over bar or relax on the courtyard garden patio.
              </p>

              {/* Cafe Amenities & Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
                <div className="flex items-center gap-2 text-xs text-[#574D45]">
                  <Clock className="w-4 h-4 text-[#78350F] shrink-0" />
                  <span>Mon–Sun: 7am – 6pm</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#574D45]">
                  <Wifi className="w-4 h-4 text-[#78350F] shrink-0" />
                  <span>Fiber Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#574D45]">
                  <Heart className="w-4 h-4 text-[#78350F] shrink-0" />
                  <span>Dog Friendly Patio</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#574D45]">
                  <ShieldCheck className="w-4 h-4 text-[#78350F] shrink-0" />
                  <span>Step-Free Access</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors text-center shadow-xs"
              >
                Reserve Table / Schedule Pickup
              </button>
              <div className="text-[11px] text-[#8C7E72] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Call counter: (555) 384-9120</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
